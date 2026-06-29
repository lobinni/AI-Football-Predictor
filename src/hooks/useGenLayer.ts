import { useState, useCallback, useRef } from 'react';
import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

// ── Types ──

export interface GenLayerState {
  isReady: boolean;
  contractAddress: string | null;
  lastTxHash: string | null;
  lastReceipt: any | null;
}

export interface PredictionOnChain {
  home_win_prob: number;
  draw_prob: number;
  away_win_prob: number;
  predicted_score: string;
  confidence: number;
  analysis: string;
}

// ── Default deployed contract address (set after deploying via CLI / Studio) ──
// Users can override this by calling setContractAddress()
const DEFAULT_CONTRACT_ADDRESS = '';

// ── Hook ──

export function useGenLayer() {
  const [state, setState] = useState<GenLayerState>({
    isReady: false,
    contractAddress: DEFAULT_CONTRACT_ADDRESS || null,
    lastTxHash: null,
    lastReceipt: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clientRef = useRef<ReturnType<typeof createClient> | null>(null);

  // Initialize GenLayer client with MetaMask provider
  const initClient = useCallback((walletAddress: string) => {
    try {
      const client = createClient({
        chain: testnetBradbury,
        account: walletAddress as `0x${string}`,
        // MetaMask handles signing via window.ethereum
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

  // Set contract address (after deployment)
  const setContractAddress = useCallback((address: string) => {
    setState(prev => ({ ...prev, contractAddress: address }));
  }, []);

  // Deploy the FootballPredictor contract
  const deployContract = useCallback(async (contractCode: string) => {
    const client = clientRef.current;
    if (!client) { setError('Client not initialized'); return null; }

    setLoading(true);
    setError(null);

    try {
      const hash = await client.deployContract({
        code: contractCode,
        args: [],
        leaderOnly: false,
      });

      setState(prev => ({ ...prev, lastTxHash: hash }));

      const receipt: any = await client.waitForTransactionReceipt({
        hash: hash as any,
        status: 'ACCEPTED' as any,
        retries: 60,
        interval: 5000,
      });

      const contractAddress: string | null = receipt?.data?.contract_address
        ? String(receipt.data.contract_address)
        : null;
      setState(prev => ({
        ...prev,
        contractAddress,
        lastReceipt: receipt,
      }));

      setLoading(false);
      return contractAddress;
    } catch (e: any) {
      console.error('Deploy error:', e);
      setError(e.message);
      setLoading(false);
      return null;
    }
  }, []);

  // Call predict_match on the deployed contract
  const predictMatch = useCallback(async (
    homeTeam: string,
    awayTeam: string,
    matchDate: string,
  ): Promise<PredictionOnChain | null> => {
    const client = clientRef.current;
    if (!client) { setError('Client not initialized — connect wallet first'); return null; }
    if (!state.contractAddress) { setError('No contract deployed — deploy or set address first'); return null; }

    setLoading(true);
    setError(null);

    try {
      // Write transaction — triggers AI analysis on-chain
      const txHash = await client.writeContract({
        address: state.contractAddress as `0x${string}`,
        functionName: 'predict_match',
        args: [homeTeam, awayTeam, matchDate],
        value: 0n,
      });

      setState(prev => ({ ...prev, lastTxHash: txHash }));

      // Wait for consensus (this can take a while as validators run AI)
      const receipt: any = await client.waitForTransactionReceipt({
        hash: txHash as any,
        status: 'ACCEPTED' as any,
        retries: 120,  // AI analysis can take time
        interval: 5000,
      });

      setState(prev => ({ ...prev, lastReceipt: receipt }));

      // Parse the prediction result from receipt
      let prediction: PredictionOnChain | null = null;
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
  }, [state.contractAddress]);

  // Read prediction from contract (view — free, no gas)
  const readPrediction = useCallback(async (predictionId: string) => {
    const client = clientRef.current;
    if (!client || !state.contractAddress) return null;

    try {
      const result = await client.readContract({
        address: state.contractAddress as `0x${string}`,
        functionName: 'get_prediction',
        args: [predictionId],
      });
      return typeof result === 'string' ? JSON.parse(result) : result;
    } catch (e: any) {
      console.error('Read error:', e);
      return null;
    }
  }, [state.contractAddress]);

  // Get prediction count (view — free)
  const getPredictionCount = useCallback(async (): Promise<number> => {
    const client = clientRef.current;
    if (!client || !state.contractAddress) return 0;

    try {
      const result = await client.readContract({
        address: state.contractAddress as `0x${string}`,
        functionName: 'get_prediction_count',
        args: [],
      });
      return Number(result);
    } catch {
      return 0;
    }
  }, [state.contractAddress]);

  // Get contract schema
  const getContractSchema = useCallback(async () => {
    const client = clientRef.current;
    if (!client || !state.contractAddress) return null;

    try {
      const schema = await (client as any).getContractSchema(
        state.contractAddress as `0x${string}`,
      );
      return schema;
    } catch (e: any) {
      console.error('Schema error:', e);
      return null;
    }
  }, [state.contractAddress]);

  // Auto-init when wallet address changes
  const connectWithWallet = useCallback((walletAddress: string | null) => {
    if (walletAddress) {
      initClient(walletAddress);
    }
  }, [initClient]);

  return {
    ...state,
    error,
    loading,
    initClient,
    connectWithWallet,
    setContractAddress,
    deployContract,
    predictMatch,
    readPrediction,
    getPredictionCount,
    getContractSchema,
  };
}

// ── Contract source code (embedded for deployment from browser) ──
const lines = [
  '# { "Depends": "py-genlayer:test" }',
  '',
  'from genlayer import *',
  'import json',
  'import typing',
  '',
  '',
  'class FootballPredictor(gl.Contract):',
  '    prediction_count: u32',
  '    predictions: TreeMap[str, str]',
  '    user_predictions: TreeMap[str, str]',
  '',
  '    def __init__(self):',
  '        self.prediction_count = u32(0)',
  '        self.predictions = TreeMap[str, str]()',
  '        self.user_predictions = TreeMap[str, str]()',
  '',
  '    @gl.public.write',
  '    def predict_match(self, home_team: str, away_team: str, match_date: str) -> str:',
  '        def analyze() -> str:',
  '            bbc_url = "https://www.bbc.com/sport/football/scores-fixtures/" + match_date',
  '            web_data = gl.get_webpage(bbc_url, mode="text")',
  '',
  '            task = f"""You are a football analyst AI. Analyze the upcoming match:',
  '',
  'Home Team: {home_team}',
  'Away Team: {away_team}',
  'Date: {match_date}',
  '',
  'Use the following web data to inform your analysis:',
  '{web_data[:3000]}',
  '',
  'Based on historical performance, current form, head-to-head records,',
  'and any available information, provide your prediction.',
  '',
  'Respond ONLY with this exact JSON format, no other text:',
  '{{',
  '    "home_win_prob": <number 0-100>,',
  '    "draw_prob": <number 0-100>,',
  '    "away_win_prob": <number 0-100>,',
  '    "predicted_score": "<home_goals>-<away_goals>",',
  '    "confidence": <number 1-10>,',
  '    "analysis": "<2-3 sentence analysis>"',
  '}}',
  '"""',
  '            result = gl.exec_prompt(task)',
  '            cleaned = result.replace("```json", "").replace("```", "").strip()',
  '            parsed = json.loads(cleaned)',
  '            return json.dumps(parsed, sort_keys=True)',
  '',
  '        prediction_json = gl.eq_principle_strict_eq(analyze)',
  '        self.prediction_count = u32(self.prediction_count + 1)',
  '        prediction_id = f"{home_team}_vs_{away_team}_{match_date}_{self.prediction_count}"',
  '        self.predictions[prediction_id] = prediction_json',
  '        sender = str(gl.message.sender_address)',
  '        existing = self.user_predictions.get(sender, "")',
  '        if existing:',
  '            self.user_predictions[sender] = existing + "," + prediction_id',
  '        else:',
  '            self.user_predictions[sender] = prediction_id',
  '        return prediction_json',
  '',
  '    @gl.public.view',
  '    def get_prediction(self, prediction_id: str) -> str:',
  '        return self.predictions.get(prediction_id, "{}")',
  '',
  '    @gl.public.view',
  '    def get_prediction_count(self) -> u32:',
  '        return self.prediction_count',
  '',
  '    @gl.public.view',
  '    def get_user_predictions(self, user_address: str) -> str:',
  '        return self.user_predictions.get(user_address, "")',
];
export const FOOTBALL_PREDICTOR_CODE = lines.join('\n');
