import { ExternalLink, CheckCircle, Server, Cpu } from 'lucide-react';
import { CONTRACT_ADDRESS, getContractExplorerUrl, GENLAYER_CONFIG } from '../config/contract';

interface ContractStatusProps {
  predictionCount: number;
  isLoading: boolean;
}

export function ContractStatus({ predictionCount, isLoading }: ContractStatusProps) {
  return (
    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/30 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
          <Server className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            Intelligent Contract Status
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </h2>
          <p className="text-sm text-gray-400">Deployed on GenLayer Testnet Bradbury</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Contract Address */}
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Contract Address</p>
          <div className="flex items-center gap-2">
            <code className="text-sm text-green-400 font-mono truncate">
              {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-8)}
            </code>
            <a
              href={getContractExplorerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Network */}
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Network</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white">{GENLAYER_CONFIG.chainName}</span>
          </div>
        </div>

        {/* Predictions Count */}
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Total Predictions</p>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white">
              {isLoading ? '...' : predictionCount}
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-green-400">✓</span> gl.get_webpage()
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-green-400">✓</span> gl.exec_prompt()
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-green-400">✓</span> Validator Consensus
        </div>
      </div>
    </div>
  );
}
