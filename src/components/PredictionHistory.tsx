import { History, TrendingUp, Target, Trash2, ExternalLink, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { usePredictionHistory, PredictionRecord } from '../hooks/usePredictionHistory';
import { useState } from 'react';

export function PredictionHistory() {
  const { predictions, stats, clearHistory } = usePredictionHistory();
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'pending'>('all');

  const filteredPredictions = predictions.filter(p => {
    switch (filter) {
      case 'correct':
        return p.isCorrect === true;
      case 'incorrect':
        return p.isCorrect === false;
      case 'pending':
        return p.actualResult === undefined;
      default:
        return true;
    }
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getResultIcon = (record: PredictionRecord) => {
    if (record.actualResult === undefined) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return record.isCorrect 
      ? <CheckCircle className="w-5 h-5 text-green-500" />
      : <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Prediction History</h2>
            <p className="text-indigo-100">Track your predictions and accuracy</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-indigo-100">Total</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{stats.correct}</div>
            <div className="text-sm text-indigo-100">Correct</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold flex items-center justify-center gap-1">
              <Target className="w-6 h-6" />
              {stats.accuracy}%
            </div>
            <div className="text-sm text-indigo-100">Accuracy</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold flex items-center justify-center gap-1">
              <TrendingUp className="w-6 h-6" />
              {stats.streak}
            </div>
            <div className="text-sm text-indigo-100">Current Streak</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">🔥 {stats.bestStreak}</div>
            <div className="text-sm text-indigo-100">Best Streak</div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex gap-1">
              {(['all', 'correct', 'incorrect', 'pending'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {predictions.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Predictions List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredPredictions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-700">No predictions yet</h3>
            <p className="text-sm mt-1">Your prediction history will appear here</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredPredictions.map((record) => (
              <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Result Icon */}
                  <div className="shrink-0 mt-1">
                    {getResultIcon(record)}
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {record.homeTeam} vs {record.awayTeam}
                      </h4>
                      {record.tournament && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {record.tournament}
                        </span>
                      )}
                    </div>
                    
                    {/* Prediction Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 font-medium">{record.prediction.homeWinProb}%</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-500 font-medium">{record.prediction.drawProb}%</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-red-600 font-medium">{record.prediction.awayWinProb}%</span>
                      </div>
                      <div>
                        Score: <span className="font-medium">{record.prediction.predictedScore}</span>
                      </div>
                      <div>
                        Confidence: <span className="font-medium">{record.prediction.confidence}/10</span>
                      </div>
                    </div>

                    {/* Actual Result */}
                    {record.actualResult && (
                      <div className={`mt-2 text-sm ${record.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        Actual: {record.actualResult.score} ({record.actualResult.winner})
                        {record.isCorrect ? ' ✓ Correct' : ' ✗ Incorrect'}
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{formatDate(record.predictedAt)}</span>
                      {record.txHash && (
                        <a
                          href={`https://explorer.testnet.genlayer.com/tx/${record.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View TX
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
