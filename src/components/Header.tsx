import { Wallet, ExternalLink, RefreshCw, Droplets } from 'lucide-react';
import { GENLAYER_CONFIG, getContractExplorerUrl } from '../config/contract';

interface HeaderProps {
  isConnected: boolean;
  address: string | null;
  balance: string;
  isGenLayer: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefreshBalance: () => void;
}

export function Header({
  isConnected,
  address,
  balance,
  isGenLayer,
  isConnecting,
  onConnect,
  onDisconnect,
  onRefreshBalance,
}: HeaderProps) {
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <header className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 border-b border-green-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚽</span>
            <div>
              <h1 className="text-2xl font-bold text-white">FootballAI</h1>
              <p className="text-xs text-green-300">Powered by GenLayer Intelligent Contracts</p>
            </div>
          </div>

          {/* Contract Info */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={getContractExplorerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-green-800/50 rounded-lg text-sm text-green-200 hover:bg-green-800 transition-colors"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Contract Live
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Wallet */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                {/* Balance */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-black/30 rounded-lg">
                  <span className="text-green-400 font-mono">{balance} GEN</span>
                  <button
                    onClick={onRefreshBalance}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Faucet */}
                <a
                  href={GENLAYER_CONFIG.faucetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                >
                  <Droplets className="w-4 h-4" />
                  <span className="hidden sm:inline">Faucet</span>
                </a>

                {/* Address & Status */}
                <div className="flex items-center gap-2 px-3 py-2 bg-black/30 rounded-lg">
                  <span className={`w-2 h-2 rounded-full ${isGenLayer ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  <span className="font-mono text-sm text-white">{shortAddress}</span>
                </div>

                {/* Disconnect */}
                <button
                  onClick={onDisconnect}
                  className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-sm transition-colors"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg font-medium transition-colors"
              >
                <Wallet className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
