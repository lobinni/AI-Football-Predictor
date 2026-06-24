import { Trophy, Star, Lock, X, Sparkles } from 'lucide-react';
import { useAchievements, Achievement } from '../hooks/useAchievements';


export function AchievementsPanel() {
  const {
    achievements,
    unlockedAchievements,
    totalPoints,
    newUnlock,
    clearNewUnlock,
  } = useAchievements();

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
    }
  };

  const getRarityBg = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 border-gray-200';
      case 'rare':
        return 'bg-blue-50 border-blue-200';
      case 'epic':
        return 'bg-purple-50 border-purple-200';
      case 'legendary':
        return 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200';
    }
  };

  const getCategoryAchievements = (category: string) => {
    return achievements.filter(a => a.category === category);
  };

  const categories = [
    { id: 'prediction', name: 'Predictions', icon: '🎯' },
    { id: 'streak', name: 'Streaks', icon: '🔥' },
    { id: 'explorer', name: 'Explorer', icon: '🌍' },
    { id: 'social', name: 'Social', icon: '📤' },
  ];

  return (
    <div className="space-y-6">
      {/* Achievement Unlock Popup */}
      {newUnlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-bounce-in">
            <div className={`bg-gradient-to-r ${getRarityColor(newUnlock.rarity)} p-6 text-white text-center relative`}>
              <button
                onClick={clearNewUnlock}
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
              <Sparkles className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Achievement Unlocked!</h3>
            </div>
            <div className="p-6 text-center">
              <div className="text-5xl mb-3">{newUnlock.icon}</div>
              <h4 className="text-xl font-bold text-gray-800">{newUnlock.name}</h4>
              <p className="text-gray-600 mt-1">{newUnlock.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                +{{ common: 10, rare: 25, epic: 50, legendary: 100 }[newUnlock.rarity]} points
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-purple-100">Unlock badges and earn points</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-sm text-purple-100">Unlocked</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{achievements.length}</div>
            <div className="text-sm text-purple-100">Total</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-purple-100">Points</div>
          </div>
        </div>
      </div>

      {/* Achievement Categories */}
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            {category.name}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {getCategoryAchievements(category.id).map((achievement) => (
              <div
                key={achievement.id}
                className={`border-2 rounded-xl p-4 transition-all ${
                  achievement.unlockedAt
                    ? getRarityBg(achievement.rarity)
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${!achievement.unlockedAt ? 'grayscale' : ''}`}>
                    {achievement.unlockedAt ? achievement.icon : <Lock className="w-8 h-8 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${achievement.unlockedAt ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h4>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium capitalize bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    
                    {/* Progress Bar */}
                    {!achievement.unlockedAt && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {achievement.unlockedAt && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Rarity Guide */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Rarity Guide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500" />
            <p className="font-medium text-gray-700">Common</p>
            <p className="text-sm text-gray-500">10 points</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
            <p className="font-medium text-blue-700">Rare</p>
            <p className="text-sm text-blue-500">25 points</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
            <p className="font-medium text-purple-700">Epic</p>
            <p className="text-sm text-purple-500">50 points</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
            <p className="font-medium text-amber-700">Legendary</p>
            <p className="text-sm text-amber-500">100 points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
