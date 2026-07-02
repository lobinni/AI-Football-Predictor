import { useState, useCallback, useRef } from 'react';
import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';
import { CONTRACT_ADDRESS } from '../config/contract';

export interface GenLayerState {
  isReady: boolean;
  lastTxHash: string | null;
  lastReceipt: any | null;
}

export interface PredictionResult {
  home_win_prob: number;
  draw_prob: number;
  away_win_prob: number;
  predicted_score: string;
  confidence: number;
  analysis: string;
}

export function useGenLayer() {
  const [state, setState] = useState<GenLayerState>({
    isReady: false,
    lastTxHash: null,
    lastReceipt: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);

  const initClient = useCallback((walletAddress: string) => {
    try {
      const client = createClient({
        chain: testnetBradbury,
        account: walletAddress as `0x${string}`,
      });
      clientRef.current = client;
      setState(prev => ({ ...prev, isReady: true }));
      return client;
    } catch (e: any) {
      console.error('GenLayer client init error:', e);
      setError(e.message);
      return null;
    }
  }, []);

  const connectWithWallet = useCallback((walletAddress: string | null) => {
    if (walletAddress) {
      initClient(walletAddress);
    }
  }, [initClient]);

  // Call predict_match on the DEPLOYED contract
  const predictMatch = useCallback(async (
    homeTeam: string,
    awayTeam: string,
    matchDate: string,
  ): Promise<PredictionResult | null> => {
    const client = clientRef.current;
    if (!client) {
      setError('Client not initialized — connect wallet first');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Write transaction to the deployed Intelligent Contract
      const txHash = await client.writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'predict_match',
        args: [homeTeam, awayTeam, matchDate],
        value: 0n,
      });

      setState(prev => ({ ...prev, lastTxHash: txHash }));

      // Wait for consensus (AI analysis by validators)
      const receipt: any = await client.waitForTransactionReceipt({
        hash: txHash as any,
        status: 'ACCEPTED' as any,
        retries: 120,
        interval: 5000,
      });

      setState(prev => ({ ...prev, lastReceipt: receipt }));

      // Parse prediction result
      let prediction: PredictionResult | null = null;
      try {
        const resultData = receipt?.data?.result || receipt?.result;
        if (typeof resultData === 'string') {
          prediction = JSON.parse(resultData);
        } else if (resultData) {
          prediction = resultData;
        }
      } catch {
        console.warn('Could not parse prediction from receipt');
      }

      setLoading(false);
      return prediction;
    } catch (e: any) {
      console.error('Predict error:', e);
      setError(e.message);
      setLoading(false);
      return null;
    }
  }, []);

  // Read prediction from contract (view — free, no gas)
  const readPrediction = useCallback(async (predictionId: string) => {
    const client = clientRef.current;
    if (!client) return null;

    try {
      const result = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_prediction',
        args: [predictionId],
      });
      return typeof result === 'string' ? JSON.parse(result) : result;
    } catch (e: any) {
      console.error('Read error:', e);
      return null;
    }
  }, []);

  // Get prediction count (view — free)
  const getPredictionCount = useCallback(async (): Promise<number> => {
    const client = clientRef.current;
    if (!client) return 0;

    try {
      const result = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_prediction_count',
        args: [],
      });
      return Number(result);
    } catch {
      return 0;
    }
  }, []);

  // Get user's predictions
  const getUserPredictions = useCallback(async (userAddress: string): Promise<string[]> => {
    const client = clientRef.current;
    if (!client) return [];

    try {
      const result = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_user_predictions',
        args: [userAddress],
      });
      if (typeof result === 'string' && result) {
        return result.split(',');
      }
      return [];
    } catch {
      return [];
    }
  }, []);

  return {
    ...state,
    contractAddress: CONTRACT_ADDRESS,
    error,
    loading,
    initClient,
    connectWithWallet,
    predictMatch,
    readPrediction,
    getPredictionCount,
    getUserPredictions,
  };
}
