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
  confidence: string;
  analysis: string;
}

export interface PredictionRecord extends PredictionResult {
  id: string;
  submitter: string;
  home_team: string;
  away_team: string;
  match_date: string;
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
      const txHash = await client.writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'predict_match',
        args: [homeTeam, awayTeam, matchDate],
        value: 0n,
      });

      setState(prev => ({ ...prev, lastTxHash: txHash }));

      const receipt: any = await client.waitForTransactionReceipt({
        hash: txHash as any,
        status: 'ACCEPTED' as any,
        retries: 120,
        interval: 5000,
      });

      setState(prev => ({ ...prev, lastReceipt: receipt }));

      // The contract returns prediction_id (key), we need to fetch the prediction
      const predictionId = receipt?.data?.result || receipt?.result;
      
      if (predictionId !== undefined) {
        // Fetch the actual prediction data
        const prediction = await readPrediction(String(predictionId));
        setLoading(false);
        return prediction;
      }

      setLoading(false);
      return null;
    } catch (e: any) {
      console.error('Predict error:', e);
      setError(e.message);
      setLoading(false);
      return null;
    }
  }, []);

  // Read prediction from contract (view — free, no gas)
  const readPrediction = useCallback(async (predictionId: string): Promise<PredictionResult | null> => {
    const client = clientRef.current;
    if (!client) return null;

    try {
      const result: any = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_prediction',
        args: [predictionId],
      });
      
      if (result && result.exists !== false) {
        return result as PredictionResult;
      }
      return null;
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
      const result: any = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_count',
        args: [],
      });
      return result?.total || 0;
    } catch {
      return 0;
    }
  }, []);

  // Get all predictions
  const getAllPredictions = useCallback(async (): Promise<PredictionRecord[]> => {
    const client = clientRef.current;
    if (!client) return [];

    try {
      const result = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_all_predictions',
        args: [],
      });
      return (result as unknown as PredictionRecord[]) || [];
    } catch {
      return [];
    }
  }, []);

  // Get user's predictions
  const getUserPredictions = useCallback(async (userAddress: string): Promise<PredictionRecord[]> => {
    const client = clientRef.current;
    if (!client) return [];

    try {
      const result = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'get_user_predictions',
        args: [userAddress],
      });
      return (result as unknown as PredictionRecord[]) || [];
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
    getAllPredictions,
    getUserPredictions,
  };
}
