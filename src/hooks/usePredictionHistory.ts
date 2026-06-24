import { useState, useEffect, useCallback } from 'react';

export interface PredictionRecord {
  id: string;
  homeTeam: string;
  awayTeam: string;
  tournament: string;
  matchDate: string;
  predictedAt: string;
  txHash: string;
  prediction: {
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    predictedScore: string;
    confidence: number;
  };
  actualResult?: {
    score: string;
    winner: 'home' | 'away' | 'draw';
  };
  isCorrect?: boolean;
}

const STORAGE_KEY = 'footballai_predictions';

export function usePredictionHistory() {
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    correct: 0,
    accuracy: 0,
    streak: 0,
    bestStreak: 0,
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setPredictions(data);
        calculateStats(data);
      } catch (e) {
        console.error('Error loading predictions:', e);
      }
    }
  }, []);

  // Calculate stats
  const calculateStats = (data: PredictionRecord[]) => {
    const resolved = data.filter(p => p.actualResult !== undefined);
    const correct = resolved.filter(p => p.isCorrect).length;
    
    // Calculate streak
    let streak = 0;
    let bestStreak = 0;
    let currentStreak = 0;
    
    for (const p of resolved.reverse()) {
      if (p.isCorrect) {
        currentStreak++;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    }
    streak = currentStreak;

    setStats({
      total: data.length,
      correct,
      accuracy: resolved.length > 0 ? Math.round((correct / resolved.length) * 100) : 0,
      streak,
      bestStreak,
    });
  };

  // Save prediction
  const savePrediction = useCallback((record: Omit<PredictionRecord, 'id' | 'predictedAt'>) => {
    const newRecord: PredictionRecord = {
      ...record,
      id: `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      predictedAt: new Date().toISOString(),
    };

    setPredictions(prev => {
      const updated = [newRecord, ...prev].slice(0, 100); // Keep last 100
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      calculateStats(updated);
      return updated;
    });

    return newRecord;
  }, []);

  // Update result (simulate match resolution)
  const updateResult = useCallback((id: string, actualResult: PredictionRecord['actualResult']) => {
    setPredictions(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          const predictedWinner = 
            p.prediction.homeWinProb > p.prediction.awayWinProb && p.prediction.homeWinProb > p.prediction.drawProb ? 'home' :
            p.prediction.awayWinProb > p.prediction.homeWinProb && p.prediction.awayWinProb > p.prediction.drawProb ? 'away' : 'draw';
          
          return {
            ...p,
            actualResult,
            isCorrect: predictedWinner === actualResult?.winner,
          };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      calculateStats(updated);
      return updated;
    });
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPredictions([]);
    setStats({ total: 0, correct: 0, accuracy: 0, streak: 0, bestStreak: 0 });
  }, []);

  return {
    predictions,
    stats,
    savePrediction,
    updateResult,
    clearHistory,
  };
}
