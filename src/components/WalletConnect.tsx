import { Wallet, LogOut, RefreshCw, Coins, AlertTriangle } from 'lucide-react';
import { useWallet, GENLAYER_CHAIN } from '../hooks/useWallet';
import { memo } from 'react';

export const WalletConnect = memo(function WalletConnect() {
  const {
    isConnected,
    address,
    balance,
    isGenLayer,
    isConnecting,
    error,
    connect,
    disconnect,
    switchToGenLayer,
    refreshBalance,
  } = useWallet();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const openFaucet = () => {
    window.open(GENLAYER_CHAIN.faucetUrl, '_blank');
  };

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 text-sm font-medium"
        >
          {isConnecting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </>
          )}
        </button>
        {error && (
          <span className="text-red-300 text-xs max-w-32 truncate">{error}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Wrong network warning */}
      {!isGenLayer && (
        <button
          onClick={switchToGenLayer}
          className="flex items-center gap-1 bg-yellow-500 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-yellow-600 transition-all text-xs sm:text-sm font-medium animate-pulse"
          title="Switch to GenLayer"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline">Switch to GenLayer</span>
        </button>
      )}

      {/* Faucet */}
      <button
        onClick={openFaucet}
        className="flex items-center gap-1 bg-emerald-500 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-emerald-600 transition-all text-xs sm:text-sm font-medium"
        title="Get free GEN tokens"
      >
        <Coins className="w-4 h-4" />
        <span className="hidden sm:inline">Faucet</span>
      </button>

      {/* Balance */}
      <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-2 rounded-lg">
        <div className={`w-2 h-2 rounded-full shrink-0 ${isGenLayer ? 'bg-green-400' : 'bg-yellow-400'}`} />
        <span className="text-white text-xs sm:text-sm font-medium">
          {balance} <span className="text-white/70">GEN</span>
        </span>
        <button
          onClick={refreshBalance}
          className="text-white/60 hover:text-white transition-colors"
          title="Refresh GEN balance"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Address */}
      <div className="bg-white/10 px-2 sm:px-3 py-2 rounded-lg">
        <span className="text-white text-xs sm:text-sm font-mono">
          {truncateAddress(address!)}
        </span>
      </div>

      {/* Disconnect */}
      <button
        onClick={disconnect}
        className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
        title="Disconnect"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
});
