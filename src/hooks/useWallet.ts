import { useState, useEffect, useCallback, useRef } from 'react';

// ── GenLayer Testnet Bradbury (official values from genlayer-js SDK) ──
// Source: https://github.com/genlayerlabs/genlayer-js/blob/main/src/chains/testnetBradbury.ts
// GenLayer sits on top of a zkSync-based settlement chain.
// The EVM chain-id is fetched dynamically the first time we connect.
export const GENLAYER_CHAIN = {
  chainName: 'GenLayer Testnet Bradbury',
  rpcUrl: 'https://rpc-bradbury.genlayer.com',
  explorerUrl: 'https://explorer-bradbury.genlayer.com',
  faucetUrl: 'https://testnet-faucet.genlayer.foundation/',
  nativeCurrency: { name: 'GEN', symbol: 'GEN', decimals: 18 },
  // Consensus contract (AddressManager) on the settlement chain
  consensusContract: '0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D',
};

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: string | null;
  isGenLayer: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────

let _genLayerChainIdHex: string | null = null; // cached after first RPC call

/** Ask the GenLayer RPC for its chain id (one-shot, cached). */
async function fetchGenLayerChainId(): Promise<string> {
  if (_genLayerChainIdHex) return _genLayerChainIdHex;
  try {
    const res = await fetch(GENLAYER_CHAIN.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_chainId', params: [], id: 1 }),
    });
    const json = await res.json();
    _genLayerChainIdHex = json.result as string; // e.g. "0xf24f"
    return _genLayerChainIdHex!;
  } catch {
    return ''; // RPC unreachable – we'll retry later
  }
}

/** Fetch GEN balance for `addr` directly via GenLayer RPC (not via MetaMask). */
async function fetchBalanceViaRpc(addr: string): Promise<string> {
  try {
    const res = await fetch(GENLAYER_CHAIN.rpcUrl, {
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

// ── Storage ─────────────────────────────────────────────────────────

const STORAGE_KEY = 'footballai_wallet';

function loadCached(): WalletState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { isConnected: false, address: null, balance: '0', chainId: null, isGenLayer: false };
}

function saveCache(s: WalletState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// ── Hook ────────────────────────────────────────────────────────────

export function useWallet() {
  const [state, setState] = useState<WalletState>(loadCached);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initDone = useRef(false);

  // Update helper
  const set = useCallback((patch: Partial<WalletState>) => {
    setState(prev => {
      const next = { ...prev, ...patch };
      saveCache(next);
      return next;
    });
  }, []);

  /** Is the wallet on the GenLayer chain right now? */
  const checkIsGenLayer = useCallback(async (walletChainId: string) => {
    const glId = await fetchGenLayerChainId();
    return glId !== '' && walletChainId.toLowerCase() === glId.toLowerCase();
  }, []);

  /** Add GenLayer network to MetaMask & switch to it. */
  const switchToGenLayer = useCallback(async () => {
    const eth = (window as any).ethereum;
    if (!eth) return false;

    const chainIdHex = await fetchGenLayerChainId();
    if (!chainIdHex) {
      setError('Cannot reach GenLayer RPC — please try again later');
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
              chainName: GENLAYER_CHAIN.chainName,
              nativeCurrency: GENLAYER_CHAIN.nativeCurrency,
              rpcUrls: [GENLAYER_CHAIN.rpcUrl],
              blockExplorerUrls: [GENLAYER_CHAIN.explorerUrl],
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

    // After switching, refresh state
    const accounts: string[] = await eth.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const balance = await fetchBalanceViaRpc(accounts[0]);
      set({ chainId: chainIdHex, isGenLayer: true, balance });
    }
    return true;
  }, [set]);

  /** Refresh GEN balance via direct RPC (always accurate). */
  const refreshBalance = useCallback(async () => {
    if (state.address) {
      const balance = await fetchBalanceViaRpc(state.address);
      set({ balance });
    }
  }, [state.address, set]);

  /** Connect MetaMask → auto-switch to GenLayer → fetch GEN balance. */
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
      if (accounts.length === 0) { setError('No accounts'); setIsConnecting(false); return; }

      const addr = accounts[0];
      const walletChainId: string = await eth.request({ method: 'eth_chainId' });
      const onGL = await checkIsGenLayer(walletChainId);

      // Show address immediately
      set({ isConnected: true, address: addr, chainId: walletChainId, isGenLayer: onGL, balance: '...' });
      setIsConnecting(false);

      // If not on GenLayer, switch automatically
      if (!onGL) {
        await switchToGenLayer();
      }

      // Fetch real balance via GenLayer RPC
      const balance = await fetchBalanceViaRpc(addr);
      set({ balance });
    } catch (err: any) {
      setError(err.message || 'Connection failed');
      setIsConnecting(false);
    }
  }, [checkIsGenLayer, switchToGenLayer, set]);

  const disconnect = useCallback(() => {
    const fresh: WalletState = { isConnected: false, address: null, balance: '0', chainId: null, isGenLayer: false };
    setState(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const checkIfMetaMaskInstalled = useCallback(() => {
    return Boolean((window as any).ethereum?.isMetaMask);
  }, []);

  // ── Lifecycle: auto-reconnect + event listeners ──
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    const eth = (window as any).ethereum;
    if (!eth) return;

    // Reconnect if previously connected
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

    // Account changes
    eth.on('accountsChanged', async (accs: string[]) => {
      if (accs.length === 0) { disconnect(); return; }
      const balance = await fetchBalanceViaRpc(accs[0]);
      set({ address: accs[0], balance });
    });

    // Chain changes
    eth.on('chainChanged', async (newChainId: string) => {
      const onGL = await checkIsGenLayer(newChainId);
      set({ chainId: newChainId, isGenLayer: onGL });
      if (state.address) {
        const balance = await fetchBalanceViaRpc(state.address);
        set({ balance });
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    isConnecting,
    error,
    connect,
    disconnect,
    switchToGenLayer,
    refreshBalance,
    checkIfMetaMaskInstalled,
  };
}
