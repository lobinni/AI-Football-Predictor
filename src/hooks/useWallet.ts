import { useState, useEffect, useCallback, useRef } from 'react';
import { GENLAYER_CONFIG } from '../config/contract';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: string | null;
  isGenLayer: boolean;
}

let _genLayerChainIdHex: string | null = null;

async function fetchGenLayerChainId(): Promise<string> {
  if (_genLayerChainIdHex) return _genLayerChainIdHex;
  try {
    const res = await fetch(GENLAYER_CONFIG.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_chainId', params: [], id: 1 }),
    });
    const json = await res.json();
    _genLayerChainIdHex = json.result as string;
    return _genLayerChainIdHex!;
  } catch {
    return '';
  }
}

async function fetchBalanceViaRpc(addr: string): Promise<string> {
  try {
    const res = await fetch(GENLAYER_CONFIG.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [addr, 'latest'],
        id: 1,
      }),
    });
    const json = await res.json();
    const wei = BigInt(json.result as string);
    const whole = wei / BigInt(10 ** 18);
    const frac = (wei % BigInt(10 ** 18)).toString().padStart(18, '0').slice(0, 4);
    return `${whole}.${frac}`;
  } catch {
    return '0.0000';
  }
}

const STORAGE_KEY = 'footballai_wallet';

function loadCached(): WalletState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { isConnected: false, address: null, balance: '0', chainId: null, isGenLayer: false };
}

function saveCache(s: WalletState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function useWallet() {
  const [state, setState] = useState<WalletState>(loadCached);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initDone = useRef(false);

  const set = useCallback((patch: Partial<WalletState>) => {
    setState(prev => {
      const next = { ...prev, ...patch };
      saveCache(next);
      return next;
    });
  }, []);

  const checkIsGenLayer = useCallback(async (walletChainId: string) => {
    const glId = await fetchGenLayerChainId();
    return glId !== '' && walletChainId.toLowerCase() === glId.toLowerCase();
  }, []);

  const switchToGenLayer = useCallback(async () => {
    const eth = (window as any).ethereum;
    if (!eth) return false;

    const chainIdHex = await fetchGenLayerChainId();
    if (!chainIdHex) {
      setError('Cannot reach GenLayer RPC');
      return false;
    }

    try {
      await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chainIdHex }] });
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          await eth.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: GENLAYER_CONFIG.chainName,
              nativeCurrency: GENLAYER_CONFIG.nativeCurrency,
              rpcUrls: [GENLAYER_CONFIG.rpcUrl],
              blockExplorerUrls: [GENLAYER_CONFIG.explorerUrl],
            }],
          });
        } catch {
          setError('Failed to add GenLayer network');
          return false;
        }
      } else {
        setError('Failed to switch network');
        return false;
      }
    }

    const accounts: string[] = await eth.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const balance = await fetchBalanceViaRpc(accounts[0]);
      set({ chainId: chainIdHex, isGenLayer: true, balance });
    }
    return true;
  }, [set]);

  const refreshBalance = useCallback(async () => {
    if (state.address) {
      const balance = await fetchBalanceViaRpc(state.address);
      set({ balance });
    }
  }, [state.address, set]);

  const connect = useCallback(async () => {
    const eth = (window as any).ethereum;
    if (!eth?.isMetaMask) {
      setError('Please install MetaMask');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        setError('No accounts');
        setIsConnecting(false);
        return;
      }

      const addr = accounts[0];
      const walletChainId: string = await eth.request({ method: 'eth_chainId' });
      const onGL = await checkIsGenLayer(walletChainId);

      set({ isConnected: true, address: addr, chainId: walletChainId, isGenLayer: onGL, balance: '...' });
      setIsConnecting(false);

      if (!onGL) {
        await switchToGenLayer();
      }

      const balance = await fetchBalanceViaRpc(addr);
      set({ balance });
    } catch (err: any) {
      setError(err.message || 'Connection failed');
      setIsConnecting(false);
    }
  }, [checkIsGenLayer, switchToGenLayer, set]);

  const disconnect = useCallback(() => {
    const fresh: WalletState = {
      isConnected: false,
      address: null,
      balance: '0',
      chainId: null,
      isGenLayer: false,
    };
    setState(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const eth = (window as any).ethereum;
    if (!eth) return;

    eth.request({ method: 'eth_accounts' }).then(async (accs: string[]) => {
      if (accs.length > 0) {
        const chainId: string = await eth.request({ method: 'eth_chainId' });
        const onGL = await checkIsGenLayer(chainId);
        const balance = await fetchBalanceViaRpc(accs[0]);
        set({ isConnected: true, address: accs[0], chainId, isGenLayer: onGL, balance });
      } else if (state.isConnected) {
        disconnect();
      }
    }).catch(() => {});

    eth.on('accountsChanged', async (accs: string[]) => {
      if (accs.length === 0) {
        disconnect();
        return;
      }
      const balance = await fetchBalanceViaRpc(accs[0]);
      set({ address: accs[0], balance });
    });

    eth.on('chainChanged', async (newChainId: string) => {
      const onGL = await checkIsGenLayer(newChainId);
      set({ chainId: newChainId, isGenLayer: onGL });
      if (state.address) {
        const balance = await fetchBalanceViaRpc(state.address);
        set({ balance });
      }
    });
  }, []);

  return {
    ...state,
    isConnecting,
    error,
    connect,
    disconnect,
    switchToGenLayer,
    refreshBalance,
  };
}
