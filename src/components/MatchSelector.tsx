import { useState } from 'react';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { tournaments, Match, Tournament } from '../data/tournaments';

interface MatchSelectorProps {
  onSelectMatch: (match: Match) => void;
  selectedMatch: Match | null;
}

export function MatchSelector({ onSelectMatch, selectedMatch }: MatchSelectorProps) {
  const [selectedTournament, setSelectedTournament] = useState<Tournament>(tournaments[0]);

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        Select a Match
      </h2>

      {/* Tournament Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tournaments.map(tournament => (
          <button
            key={tournament.id}
            onClick={() => setSelectedTournament(tournament)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTournament.id === tournament.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span>{tournament.icon}</span>
            <span className="hidden sm:inline">{tournament.shortName}</span>
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {selectedTournament.matches.map(match => (
          <button
            key={match.id}
            onClick={() => onSelectMatch(match)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              selectedMatch?.id === match.id
                ? 'border-green-500 bg-green-900/30'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            {/* Teams */}
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-lg font-semibold text-white">{match.homeTeam}</span>
              <span className="text-gray-500">vs</span>
              <span className="text-lg font-semibold text-white">{match.awayTeam}</span>
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {match.date} • {match.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {match.stadium.split(',')[0]}
              </div>
            </div>

            {/* Stage */}
            <div className="mt-2 text-xs text-green-400">{match.stage}</div>
          </button>
        ))}
      </div>

      {selectedTournament.matches.length === 0 && (
        <p className="text-center text-gray-500 py-8">No upcoming matches</p>
      )}
    </div>
  );
}
