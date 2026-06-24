import { useState, useEffect, useCallback } from 'react';

export interface FavoriteTeam {
  name: string;
  addedAt: string;
}

export interface FavoriteMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  tournament: string;
  matchDate: string;
  addedAt: string;
}

const TEAMS_KEY = 'footballai_favorite_teams';
const MATCHES_KEY = 'footballai_favorite_matches';

export function useFavorites() {
  const [favoriteTeams, setFavoriteTeams] = useState<FavoriteTeam[]>([]);
  const [favoriteMatches, setFavoriteMatches] = useState<FavoriteMatch[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedTeams = localStorage.getItem(TEAMS_KEY);
    const storedMatches = localStorage.getItem(MATCHES_KEY);
    
    if (storedTeams) {
      try {
        setFavoriteTeams(JSON.parse(storedTeams));
      } catch (e) {
        console.error('Error loading favorite teams:', e);
      }
    }
    
    if (storedMatches) {
      try {
        setFavoriteMatches(JSON.parse(storedMatches));
      } catch (e) {
        console.error('Error loading favorite matches:', e);
      }
    }
  }, []);

  // Toggle favorite team
  const toggleFavoriteTeam = useCallback((teamName: string) => {
    setFavoriteTeams(prev => {
      const exists = prev.find(t => t.name === teamName);
      let updated: FavoriteTeam[];
      
      if (exists) {
        updated = prev.filter(t => t.name !== teamName);
      } else {
        updated = [...prev, { name: teamName, addedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem(TEAMS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Toggle favorite match
  const toggleFavoriteMatch = useCallback((match: Omit<FavoriteMatch, 'addedAt'>) => {
    setFavoriteMatches(prev => {
      const exists = prev.find(m => m.id === match.id);
      let updated: FavoriteMatch[];
      
      if (exists) {
        updated = prev.filter(m => m.id !== match.id);
      } else {
        updated = [...prev, { ...match, addedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem(MATCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if team is favorite
  const isTeamFavorite = useCallback((teamName: string) => {
    return favoriteTeams.some(t => t.name === teamName);
  }, [favoriteTeams]);

  // Check if match is favorite
  const isMatchFavorite = useCallback((matchId: string) => {
    return favoriteMatches.some(m => m.id === matchId);
  }, [favoriteMatches]);

  return {
    favoriteTeams,
    favoriteMatches,
    toggleFavoriteTeam,
    toggleFavoriteMatch,
    isTeamFavorite,
    isMatchFavorite,
  };
}
