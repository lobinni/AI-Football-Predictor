import { Trophy, Medal, TrendingUp, Target, Crown, Star } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  address: string;
  username?: string;
  predictions: number;
  accuracy: number;
  streak: number;
  points: number;
  isCurrentUser?: boolean;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: '0x1234...5678', username: 'CryptoOracle', predictions: 156, accuracy: 78, streak: 12, points: 2450 },
  { rank: 2, address: '0x2345...6789', username: 'FootballGuru', predictions: 203, accuracy: 72, streak: 8, points: 2180 },
  { rank: 3, address: '0x3456...789a', username: 'BetMaster', predictions: 178, accuracy: 71, streak: 5, points: 1920 },
  { rank: 4, address: '0x4567...89ab', username: 'AIPredictor', predictions: 145, accuracy: 69, streak: 4, points: 1750 },
  { rank: 5, address: '0x5678...9abc', username: 'GoalHunter', predictions: 167, accuracy: 67, streak: 6, points: 1680 },
  { rank: 6, address: '0x6789...abcd', predictions: 134, accuracy: 66, streak: 3, points: 1540 },
  { rank: 7, address: '0x789a...bcde', predictions: 112, accuracy: 65, streak: 2, points: 1420 },
  { rank: 8, address: '0x89ab...cdef', username: 'ScoreKing', predictions: 98, accuracy: 64, streak: 4, points: 1350 },
  { rank: 9, address: '0x9abc...def0', predictions: 87, accuracy: 63, streak: 1, points: 1280 },
  { rank: 10, address: '0xabcd...ef01', username: 'ProPredictor', predictions: 76, accuracy: 62, streak: 2, points: 1190 },
];

interface LeaderboardProps {
  currentUserAddress?: string;
}

export function Leaderboard({ currentUserAddress: _currentUserAddress }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Global Leaderboard</h2>
            <p className="text-amber-100">Top predictors on FootballAI</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{mockLeaderboard.length}</div>
            <div className="text-sm text-amber-100">Total Players</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{mockLeaderboard.reduce((sum, e) => sum + e.predictions, 0)}</div>
            <div className="text-sm text-amber-100">Total Predictions</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">{Math.round(mockLeaderboard.reduce((sum, e) => sum + e.accuracy, 0) / mockLeaderboard.length)}%</div>
            <div className="text-sm text-amber-100">Avg Accuracy</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Top Predictors
        </h3>
        
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <Medal className="w-10 h-10 text-gray-600" />
            </div>
            <div className="bg-gray-100 rounded-t-lg pt-4 pb-2 px-4 h-24">
              <p className="font-bold text-gray-800 text-sm truncate">{mockLeaderboard[1].username || mockLeaderboard[1].address}</p>
              <p className="text-xs text-gray-500">{mockLeaderboard[1].points} pts</p>
              <p className="text-lg font-bold text-gray-600">2nd</p>
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="text-center -mt-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center mb-2 shadow-xl ring-4 ring-yellow-200">
              <Crown className="w-12 h-12 text-yellow-700" />
            </div>
            <div className="bg-gradient-to-b from-yellow-100 to-amber-100 rounded-t-lg pt-4 pb-2 px-4 h-32">
              <p className="font-bold text-gray-800 truncate">{mockLeaderboard[0].username || mockLeaderboard[0].address}</p>
              <p className="text-sm text-amber-700">{mockLeaderboard[0].points} pts</p>
              <p className="text-xl font-bold text-amber-600">1st</p>
              <p className="text-xs text-amber-600">{mockLeaderboard[0].accuracy}% accuracy</p>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
              <Medal className="w-10 h-10 text-amber-700" />
            </div>
            <div className="bg-amber-50 rounded-t-lg pt-4 pb-2 px-4 h-20">
              <p className="font-bold text-gray-800 text-sm truncate">{mockLeaderboard[2].username || mockLeaderboard[2].address}</p>
              <p className="text-xs text-gray-500">{mockLeaderboard[2].points} pts</p>
              <p className="text-lg font-bold text-amber-600">3rd</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">All Rankings</h3>
        </div>
        
        <div className="divide-y">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`p-4 flex items-center gap-4 ${getRankBg(entry.rank)} border-l-4 ${
                entry.isCurrentUser ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              {/* Rank */}
              <div className="w-12 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-800 truncate">
                    {entry.username || entry.address}
                  </p>
                  {entry.isCurrentUser && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">You</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{entry.address}</p>
              </div>
              
              {/* Stats */}
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-bold text-gray-800">{entry.predictions}</p>
                  <p className="text-xs text-gray-500">Predictions</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <p className="font-bold text-emerald-600">{entry.accuracy}%</p>
                  </div>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <p className="font-bold text-orange-600">{entry.streak}</p>
                  </div>
                  <p className="text-xs text-gray-500">Streak</p>
                </div>
              </div>
              
              {/* Points */}
              <div className="text-right">
                <p className="font-bold text-lg text-amber-600">{entry.points}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Points Work */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h3 className="font-bold mb-4">📊 How Points Work</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">+10 pts</p>
            <p className="text-purple-100">Per prediction</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">+25 pts</p>
            <p className="text-purple-100">Correct prediction</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">+5 pts/match</p>
            <p className="text-purple-100">Streak bonus</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <p className="font-bold">+50 pts</p>
            <p className="text-purple-100">Exact score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
