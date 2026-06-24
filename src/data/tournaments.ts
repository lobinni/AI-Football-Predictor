export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  stage: string;
  status: 'upcoming' | 'live' | 'finished';
  score?: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  country: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'upcoming' | 'finished';
  matches: Match[];
}

// Current date for demo purposes
const today = new Date();
const formatDate = (daysFromNow: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

export const tournaments: Tournament[] = [
  {
    id: 'world-cup-2026',
    name: 'FIFA World Cup 2026',
    shortName: 'World Cup',
    icon: '🏆',
    country: 'USA/Canada/Mexico',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    status: 'ongoing',
    matches: [
      {
        id: 'wc-1',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        date: formatDate(0),
        time: '20:00',
        stadium: 'MetLife Stadium, New Jersey',
        stage: 'Group Stage - Group G',
        status: 'upcoming'
      },
      {
        id: 'wc-2',
        homeTeam: 'Argentina',
        awayTeam: 'Mexico',
        date: formatDate(0),
        time: '23:00',
        stadium: 'AT&T Stadium, Texas',
        stage: 'Group Stage - Group C',
        status: 'upcoming'
      },
      {
        id: 'wc-3',
        homeTeam: 'France',
        awayTeam: 'Denmark',
        date: formatDate(1),
        time: '17:00',
        stadium: 'SoFi Stadium, Los Angeles',
        stage: 'Group Stage - Group D',
        status: 'upcoming'
      },
      {
        id: 'wc-4',
        homeTeam: 'England',
        awayTeam: 'USA',
        date: formatDate(1),
        time: '20:00',
        stadium: 'Mercedes-Benz Stadium, Atlanta',
        stage: 'Group Stage - Group B',
        status: 'upcoming'
      },
      {
        id: 'wc-5',
        homeTeam: 'Germany',
        awayTeam: 'Japan',
        date: formatDate(2),
        time: '14:00',
        stadium: 'BMO Stadium, Toronto',
        stage: 'Group Stage - Group E',
        status: 'upcoming'
      },
      {
        id: 'wc-6',
        homeTeam: 'Spain',
        awayTeam: 'Netherlands',
        date: formatDate(2),
        time: '20:00',
        stadium: 'Estadio Azteca, Mexico City',
        stage: 'Group Stage - Group A',
        status: 'upcoming'
      },
      {
        id: 'wc-7',
        homeTeam: 'Portugal',
        awayTeam: 'Ghana',
        date: formatDate(3),
        time: '17:00',
        stadium: 'BC Place, Vancouver',
        stage: 'Group Stage - Group H',
        status: 'upcoming'
      },
      {
        id: 'wc-8',
        homeTeam: 'Belgium',
        awayTeam: 'Croatia',
        date: formatDate(3),
        time: '23:00',
        stadium: 'Hard Rock Stadium, Miami',
        stage: 'Group Stage - Group F',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'uefa-euro-2024',
    name: 'UEFA Euro 2024',
    shortName: 'Euro 2024',
    icon: '🇪🇺',
    country: 'Germany',
    startDate: '2024-06-14',
    endDate: '2024-07-14',
    status: 'finished',
    matches: []
  },
  {
    id: 'premier-league',
    name: 'English Premier League 2025/26',
    shortName: 'Premier League',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    country: 'England',
    startDate: '2025-08-16',
    endDate: '2026-05-24',
    status: 'ongoing',
    matches: [
      {
        id: 'pl-1',
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        date: formatDate(1),
        time: '16:30',
        stadium: 'Old Trafford',
        stage: 'Matchweek 25',
        status: 'upcoming'
      },
      {
        id: 'pl-2',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        date: formatDate(1),
        time: '14:00',
        stadium: 'Emirates Stadium',
        stage: 'Matchweek 25',
        status: 'upcoming'
      },
      {
        id: 'pl-3',
        homeTeam: 'Manchester City',
        awayTeam: 'Tottenham',
        date: formatDate(2),
        time: '17:30',
        stadium: 'Etihad Stadium',
        stage: 'Matchweek 25',
        status: 'upcoming'
      },
      {
        id: 'pl-4',
        homeTeam: 'Newcastle',
        awayTeam: 'Aston Villa',
        date: formatDate(2),
        time: '15:00',
        stadium: 'St. James\' Park',
        stage: 'Matchweek 25',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'la-liga',
    name: 'La Liga 2025/26',
    shortName: 'La Liga',
    icon: '🇪🇸',
    country: 'Spain',
    startDate: '2025-08-18',
    endDate: '2026-05-24',
    status: 'ongoing',
    matches: [
      {
        id: 'll-1',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: formatDate(2),
        time: '21:00',
        stadium: 'Santiago Bernabéu',
        stage: 'Matchday 26 - El Clásico',
        status: 'upcoming'
      },
      {
        id: 'll-2',
        homeTeam: 'Atletico Madrid',
        awayTeam: 'Sevilla',
        date: formatDate(1),
        time: '18:30',
        stadium: 'Metropolitano',
        stage: 'Matchday 26',
        status: 'upcoming'
      },
      {
        id: 'll-3',
        homeTeam: 'Valencia',
        awayTeam: 'Villarreal',
        date: formatDate(3),
        time: '16:15',
        stadium: 'Mestalla',
        stage: 'Matchday 26',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'champions-league',
    name: 'UEFA Champions League 2025/26',
    shortName: 'Champions League',
    icon: '⭐',
    country: 'Europe',
    startDate: '2025-09-17',
    endDate: '2026-05-30',
    status: 'ongoing',
    matches: [
      {
        id: 'ucl-1',
        homeTeam: 'Bayern Munich',
        awayTeam: 'PSG',
        date: formatDate(4),
        time: '21:00',
        stadium: 'Allianz Arena',
        stage: 'Round of 16 - 1st Leg',
        status: 'upcoming'
      },
      {
        id: 'ucl-2',
        homeTeam: 'Real Madrid',
        awayTeam: 'Manchester City',
        date: formatDate(4),
        time: '21:00',
        stadium: 'Santiago Bernabéu',
        stage: 'Round of 16 - 1st Leg',
        status: 'upcoming'
      },
      {
        id: 'ucl-3',
        homeTeam: 'Inter Milan',
        awayTeam: 'Liverpool',
        date: formatDate(5),
        time: '21:00',
        stadium: 'San Siro',
        stage: 'Round of 16 - 1st Leg',
        status: 'upcoming'
      },
      {
        id: 'ucl-4',
        homeTeam: 'Borussia Dortmund',
        awayTeam: 'Chelsea',
        date: formatDate(5),
        time: '21:00',
        stadium: 'Signal Iduna Park',
        stage: 'Round of 16 - 1st Leg',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'serie-a',
    name: 'Serie A 2025/26',
    shortName: 'Serie A',
    icon: '🇮🇹',
    country: 'Italy',
    startDate: '2025-08-18',
    endDate: '2026-05-24',
    status: 'ongoing',
    matches: [
      {
        id: 'sa-1',
        homeTeam: 'AC Milan',
        awayTeam: 'Inter Milan',
        date: formatDate(3),
        time: '20:45',
        stadium: 'San Siro',
        stage: 'Matchday 27 - Derby della Madonnina',
        status: 'upcoming'
      },
      {
        id: 'sa-2',
        homeTeam: 'Juventus',
        awayTeam: 'Napoli',
        date: formatDate(2),
        time: '18:00',
        stadium: 'Allianz Stadium',
        stage: 'Matchday 27',
        status: 'upcoming'
      },
      {
        id: 'sa-3',
        homeTeam: 'Roma',
        awayTeam: 'Lazio',
        date: formatDate(4),
        time: '20:45',
        stadium: 'Stadio Olimpico',
        stage: 'Matchday 27 - Derby della Capitale',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga 2025/26',
    shortName: 'Bundesliga',
    icon: '🇩🇪',
    country: 'Germany',
    startDate: '2025-08-23',
    endDate: '2026-05-16',
    status: 'ongoing',
    matches: [
      {
        id: 'bl-1',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        date: formatDate(2),
        time: '18:30',
        stadium: 'Allianz Arena',
        stage: 'Matchday 24 - Der Klassiker',
        status: 'upcoming'
      },
      {
        id: 'bl-2',
        homeTeam: 'RB Leipzig',
        awayTeam: 'Bayer Leverkusen',
        date: formatDate(1),
        time: '15:30',
        stadium: 'Red Bull Arena',
        stage: 'Matchday 24',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1 2025/26',
    shortName: 'Ligue 1',
    icon: '🇫🇷',
    country: 'France',
    startDate: '2025-08-16',
    endDate: '2026-05-23',
    status: 'ongoing',
    matches: [
      {
        id: 'l1-1',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        date: formatDate(3),
        time: '20:45',
        stadium: 'Parc des Princes',
        stage: 'Matchday 26 - Le Classique',
        status: 'upcoming'
      },
      {
        id: 'l1-2',
        homeTeam: 'Lyon',
        awayTeam: 'Monaco',
        date: formatDate(2),
        time: '17:00',
        stadium: 'Groupama Stadium',
        stage: 'Matchday 26',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'copa-america',
    name: 'Copa América 2024',
    shortName: 'Copa América',
    icon: '🌎',
    country: 'USA',
    startDate: '2024-06-20',
    endDate: '2024-07-14',
    status: 'finished',
    matches: []
  }
];

export const getOngoingTournaments = () => {
  return tournaments.filter(t => t.status === 'ongoing');
};

export const getTournamentById = (id: string) => {
  return tournaments.find(t => t.id === id);
};

export const getUpcomingMatches = (tournamentId?: string) => {
  if (tournamentId) {
    const tournament = getTournamentById(tournamentId);
    return tournament?.matches.filter(m => m.status === 'upcoming') || [];
  }
  
  return tournaments
    .filter(t => t.status === 'ongoing')
    .flatMap(t => t.matches.filter(m => m.status === 'upcoming'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
