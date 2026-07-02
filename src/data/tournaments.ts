export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  stage: string;
  status: 'upcoming' | 'live' | 'finished';
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  country: string;
  status: 'ongoing' | 'upcoming' | 'finished';
  matches: Match[];
}

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
    status: 'ongoing',
    matches: [
      {
        id: 'wc-1',
        homeTeam: 'Brazil',
        awayTeam: 'Serbia',
        date: formatDate(1),
        time: '20:00',
        stadium: 'MetLife Stadium, New Jersey',
        stage: 'Group Stage - Group G',
        status: 'upcoming'
      },
      {
        id: 'wc-2',
        homeTeam: 'Argentina',
        awayTeam: 'Mexico',
        date: formatDate(2),
        time: '23:00',
        stadium: 'AT&T Stadium, Texas',
        stage: 'Group Stage - Group C',
        status: 'upcoming'
      },
      {
        id: 'wc-3',
        homeTeam: 'France',
        awayTeam: 'Denmark',
        date: formatDate(3),
        time: '17:00',
        stadium: 'SoFi Stadium, Los Angeles',
        stage: 'Group Stage - Group D',
        status: 'upcoming'
      },
      {
        id: 'wc-4',
        homeTeam: 'England',
        awayTeam: 'USA',
        date: formatDate(3),
        time: '20:00',
        stadium: 'Mercedes-Benz Stadium, Atlanta',
        stage: 'Group Stage - Group B',
        status: 'upcoming'
      },
    ]
  },
  {
    id: 'premier-league',
    name: 'English Premier League 2025/26',
    shortName: 'Premier League',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    country: 'England',
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
        date: formatDate(2),
        time: '14:00',
        stadium: 'Emirates Stadium',
        stage: 'Matchweek 25',
        status: 'upcoming'
      },
    ]
  },
  {
    id: 'champions-league',
    name: 'UEFA Champions League 2025/26',
    shortName: 'Champions League',
    icon: '⭐',
    country: 'Europe',
    status: 'ongoing',
    matches: [
      {
        id: 'ucl-1',
        homeTeam: 'Bayern Munich',
        awayTeam: 'PSG',
        date: formatDate(4),
        time: '21:00',
        stadium: 'Allianz Arena',
        stage: 'Round of 16',
        status: 'upcoming'
      },
      {
        id: 'ucl-2',
        homeTeam: 'Real Madrid',
        awayTeam: 'Manchester City',
        date: formatDate(5),
        time: '21:00',
        stadium: 'Santiago Bernabéu',
        stage: 'Round of 16',
        status: 'upcoming'
      },
    ]
  },
  {
    id: 'la-liga',
    name: 'La Liga 2025/26',
    shortName: 'La Liga',
    icon: '🇪🇸',
    country: 'Spain',
    status: 'ongoing',
    matches: [
      {
        id: 'll-1',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: formatDate(2),
        time: '21:00',
        stadium: 'Santiago Bernabéu',
        stage: 'El Clásico',
        status: 'upcoming'
      },
    ]
  },
];
