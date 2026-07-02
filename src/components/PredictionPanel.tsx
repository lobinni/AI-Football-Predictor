import { useState, useEffect } from 'react';
import { Loader2, Zap, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Match } from '../data/tournaments';
import { PredictionResult } from '../hooks/useGenLayer';
import { getTransactionExplorerUrl } from '../config/contract';

interface PredictionPanelProps {
  match: Match | null;
  isConnected: boolean;
  isGenLayer: boolean;
  loading: boolean;
  error: string | null;
  lastTxHash: string | null;
  onPredict: (homeTeam: string, awayTeam: string, matchDate: string) => Promise<PredictionResult | null>;
}

export function PredictionPanel({
  match,
  isConnected,
  isGenLayer,
  loading,
  error,
  lastTxHash,
  onPredict,
}: PredictionPanelProps) {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setPrediction(null);
    setLocalError(null);
  }, [match]);

  const handlePredict = async () => {
    if (!match) return;
    setLocalError(null);
    
    const result = await onPredict(match.homeTeam, match.awayTeam, match.date);
    if (result) {
      setPrediction(result);
    }
  };

  const chartData = prediction ? [
    { name: match?.homeTeam || 'Home', value: prediction.home_win_prob, color: '#22c55e' },
    { name: 'Draw', value: prediction.draw_prob, color: '#eab308' },
    { name: match?.awayTeam || 'Away', value: prediction.away_win_prob, color: '#ef4444' },
  ] : [];

  if (!match) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">👆 Select a match above to get AI prediction</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-400" />
        AI Prediction
      </h2>

      {/* Selected Match */}
      <div className="bg-black/30 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">
            {match.homeTeam} vs {match.awayTeam}
          </div>
          <div className="text-sm text-gray-400">
            {match.date} • {match.stadium}
          </div>
        </div>
      </div>

      {/* Predict Button */}
      {!prediction && (
        <button
          onClick={handlePredict}
          disabled={loading || !isConnected || !isGenLayer}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with AI... (This may take a minute)
            </>
          ) : !isConnected ? (
            'Connect Wallet First'
          ) : !isGenLayer ? (
            'Switch to GenLayer Network'
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Analyze & Predict (On-Chain)
            </>
          )}
        </button>
      )}

      {/* Info */}
      {!prediction && isConnected && isGenLayer && (
        <p className="text-xs text-gray-500 text-center mt-2">
          This will send a transaction to the Intelligent Contract. Validators will run AI analysis.
        </p>
      )}

      {/* Error */}
      {(error || localError) && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error || localError}</p>
        </div>
      )}

      {/* Transaction Hash */}
      {lastTxHash && loading && (
        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
          <p className="text-sm text-blue-300 mb-1">Transaction submitted:</p>
          <a
            href={getTransactionExplorerUrl(lastTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
          >
            {lastTxHash.slice(0, 20)}...{lastTxHash.slice(-10)}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-4 space-y-4">
          {/* Success Badge */}
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Prediction stored on-chain!</span>
            {lastTxHash && (
              <a
                href={getTransactionExplorerUrl(lastTxHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-xs flex items-center gap-1"
              >
                View TX <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-900/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">{prediction.home_win_prob}%</p>
              <p className="text-xs text-gray-400">{match.homeTeam} Win</p>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-yellow-400">{prediction.draw_prob}%</p>
              <p className="text-xs text-gray-400">Draw</p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-400">{prediction.away_win_prob}%</p>
              <p className="text-xs text-gray-400">{match.awayTeam} Win</p>
            </div>
          </div>

          {/* Predicted Score */}
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">Predicted Score</p>
            <p className="text-3xl font-bold text-white">{prediction.predicted_score}</p>
            <p className="text-sm text-gray-400 mt-2">
              Confidence: <span className="text-green-400">{prediction.confidence}%</span>
            </p>
          </div>

          {/* Analysis */}
          {prediction.analysis && (
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">AI Analysis</p>
              <p className="text-gray-300 text-sm">{prediction.analysis}</p>
            </div>
          )}

          {/* New Prediction */}
          <button
            onClick={() => setPrediction(null)}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            Make Another Prediction
          </button>
        </div>
      )}
    </div>
  );
}
