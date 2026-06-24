import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'prediction' | 'streak' | 'social' | 'explorer';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const STORAGE_KEY = 'footballai_achievements';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  // Prediction achievements
  {
    id: 'first_prediction',
    name: 'First Steps',
    description: 'Make your first prediction',
    icon: '🎯',
    progress: 0,
    maxProgress: 1,
    category: 'prediction',
    rarity: 'common',
  },
  {
    id: 'predictions_10',
    name: 'Getting Started',
    description: 'Make 10 predictions',
    icon: '📊',
    progress: 0,
    maxProgress: 10,
    category: 'prediction',
    rarity: 'common',
  },
  {
    id: 'predictions_50',
    name: 'Dedicated Analyst',
    description: 'Make 50 predictions',
    icon: '🔮',
    progress: 0,
    maxProgress: 50,
    category: 'prediction',
    rarity: 'rare',
  },
  {
    id: 'predictions_100',
    name: 'Prediction Master',
    description: 'Make 100 predictions',
    icon: '🏆',
    progress: 0,
    maxProgress: 100,
    category: 'prediction',
    rarity: 'epic',
  },
  // Streak achievements
  {
    id: 'streak_3',
    name: 'Lucky Streak',
    description: 'Get 3 correct predictions in a row',
    icon: '🔥',
    progress: 0,
    maxProgress: 3,
    category: 'streak',
    rarity: 'common',
  },
  {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Get 5 correct predictions in a row',
    icon: '💫',
    progress: 0,
    maxProgress: 5,
    category: 'streak',
    rarity: 'rare',
  },
  {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Get 10 correct predictions in a row',
    icon: '⚡',
    progress: 0,
    maxProgress: 10,
    category: 'streak',
    rarity: 'legendary',
  },
  // Explorer achievements
  {
    id: 'tournaments_3',
    name: 'Globe Trotter',
    description: 'Predict matches from 3 different tournaments',
    icon: '🌍',
    progress: 0,
    maxProgress: 3,
    category: 'explorer',
    rarity: 'common',
  },
  {
    id: 'tournaments_all',
    name: 'World Explorer',
    description: 'Predict matches from all tournaments',
    icon: '🗺️',
    progress: 0,
    maxProgress: 8,
    category: 'explorer',
    rarity: 'epic',
  },
  {
    id: 'worldcup_predict',
    name: 'World Cup Fan',
    description: 'Predict a World Cup match',
    icon: '🏆',
    progress: 0,
    maxProgress: 1,
    category: 'explorer',
    rarity: 'rare',
  },
  // Social achievements
  {
    id: 'share_first',
    name: 'Social Butterfly',
    description: 'Share your first prediction',
    icon: '📤',
    progress: 0,
    maxProgress: 1,
    category: 'social',
    rarity: 'common',
  },
  {
    id: 'wallet_connect',
    name: 'Web3 Native',
    description: 'Connect your wallet',
    icon: '👛',
    progress: 0,
    maxProgress: 1,
    category: 'social',
    rarity: 'common',
  },
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Merge with defaults to handle new achievements
        const merged = DEFAULT_ACHIEVEMENTS.map(def => {
          const saved = data.find((a: Achievement) => a.id === def.id);
          return saved ? { ...def, ...saved } : def;
        });
        setAchievements(merged);
      } catch (e) {
        console.error('Error loading achievements:', e);
      }
    }
  }, []);

  // Save to localStorage
  const saveAchievements = useCallback((data: Achievement[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  // Update progress
  const updateProgress = useCallback((id: string, progress: number) => {
    setAchievements(prev => {
      const updated = prev.map(a => {
        if (a.id === id) {
          const newProgress = Math.min(progress, a.maxProgress);
          const wasUnlocked = a.unlockedAt !== undefined;
          const isNowUnlocked = newProgress >= a.maxProgress;
          
          if (!wasUnlocked && isNowUnlocked) {
            setNewUnlock({ ...a, progress: newProgress, unlockedAt: new Date().toISOString() });
          }
          
          return {
            ...a,
            progress: newProgress,
            unlockedAt: isNowUnlocked ? (a.unlockedAt || new Date().toISOString()) : undefined,
          };
        }
        return a;
      });
      saveAchievements(updated);
      return updated;
    });
  }, [saveAchievements]);

  // Increment progress
  const incrementProgress = useCallback((id: string, amount: number = 1) => {
    const current = achievements.find(a => a.id === id);
    if (current) {
      updateProgress(id, current.progress + amount);
    }
  }, [achievements, updateProgress]);

  // Clear new unlock notification
  const clearNewUnlock = useCallback(() => {
    setNewUnlock(null);
  }, []);

  // Get unlocked achievements
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);
  const totalPoints = unlockedAchievements.reduce((sum, a) => {
    const points = { common: 10, rare: 25, epic: 50, legendary: 100 };
    return sum + points[a.rarity];
  }, 0);

  return {
    achievements,
    unlockedAchievements,
    lockedAchievements,
    totalPoints,
    newUnlock,
    updateProgress,
    incrementProgress,
    clearNewUnlock,
  };
}
