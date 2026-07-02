// ══════════════════════════════════════════════════════════════════════════════
// DEPLOYED CONTRACT CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════
//
// Contract: FootballPredictor
// Network: GenLayer Testnet Bradbury
// Deployed: Successfully ✅
//
// ══════════════════════════════════════════════════════════════════════════════

export const CONTRACT_ADDRESS = '0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669';

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
  `${GENLAYER_CONFIG.explorerUrl}/address/${CONTRACT_ADDRESS}`;

export const getTransactionExplorerUrl = (txHash: string) =>
  `${GENLAYER_CONFIG.explorerUrl}/tx/${txHash}`;
