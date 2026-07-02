/**
 * Deploy FootballPredictor Intelligent Contract to GenLayer Testnet Bradbury
 *
 * Usage:
 *   node deploy/deploy.mjs
 *
 * Prerequisites:
 *   npm install genlayer-js
 *   Ensure you have GEN tokens from https://testnet-faucet.genlayer.foundation/
 */

import { createClient, createAccount } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';
import { readFileSync } from 'fs';

async function main() {
  console.log('='.repeat(60));
  console.log('  FootballPredictor — Deploy to GenLayer Testnet Bradbury');
  console.log('='.repeat(60));

  // 1. Create account (generates a new private key for signing)
  const account = createAccount();
  console.log('\n✅ Account created:', account.address);
  console.log('   ⚠️  Fund this address with GEN from the faucet:');
  console.log('   https://testnet-faucet.genlayer.foundation/\n');

  // 2. Create client
  const client = createClient({
    chain: testnetBradbury,
    account: account,
  });
  console.log('✅ Client created for Testnet Bradbury');

  // 3. Read contract code
  const contractCode = readFileSync('./contracts/football_predictor.py', 'utf-8');
  console.log('✅ Contract code loaded (' + contractCode.length + ' chars)');

  // 4. Deploy
  console.log('\n🚀 Deploying contract...');
  try {
    const txHash = await client.deployContract({
      code: contractCode,
      args: [],
      leaderOnly: false,
    });
    console.log('✅ Transaction sent:', txHash);

    // 5. Wait for receipt
    console.log('⏳ Waiting for confirmation...');
    const receipt = await client.waitForTransactionReceipt({
      hash: txHash,
      status: 'ACCEPTED',
      retries: 60,
      interval: 5000,
    });

    const contractAddress = receipt?.data?.contract_address;
    console.log('\n' + '='.repeat(60));
    console.log('  🎉 CONTRACT DEPLOYED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n  Contract Address:', contractAddress);
    console.log('  Explorer: https://explorer-bradbury.genlayer.com/contract/' + contractAddress);
    console.log('\n  📋 Next step: Update src/config/contract.ts with this address');
    console.log('='.repeat(60));
  } catch (err) {
    console.error('\n❌ Deploy failed:', err.message);
    console.error('   Make sure your account has GEN tokens.');
    process.exit(1);
  }
}

main();
