// ══════════════════════════════════════════════════════════════════════════════
// DEPLOYED CONTRACT CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

/**
 * FootballPredictor Intelligent Contract - DEPLOYED on GenLayer Testnet Bradbury
 * 
 * Contract Address: 0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D
 * Network: GenLayer Testnet Bradbury (Chain ID: dynamically fetched)
 * Explorer: https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D
 * 
 * This contract uses GenLayer's Intelligent Contract features:
 * - gl.get_webpage() for fetching live football data
 * - gl.exec_prompt() for AI-powered match analysis
 * - gl.eq_principle_strict_eq() for validator consensus
 */

export const CONTRACT_ADDRESS = '0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D';

export const GENLAYER_CONFIG = {
  chainName: 'GenLayer Testnet Bradbury',
  rpcUrl: 'https://rpc-bradbury.genlayer.com',
  explorerUrl: 'https://explorer-bradbury.genlayer.com',
  faucetUrl: 'https://testnet-faucet.genlayer.foundation/',
  nativeCurrency: {
    name: 'GEN',
    symbol: 'GEN',
    decimals: 18,
  },
};

export const getContractExplorerUrl = () => 
  `${GENLAYER_CONFIG.explorerUrl}/contract/${CONTRACT_ADDRESS}`;

export const getTransactionExplorerUrl = (txHash: string) =>
  `${GENLAYER_CONFIG.explorerUrl}/tx/${txHash}`;
