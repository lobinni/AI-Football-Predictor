export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  source: string;
  sourceIcon: string;
  category: 'transfer' | 'match' | 'injury' | 'analysis' | 'breaking';
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

// Generate realistic timestamps
const hoursAgo = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'World Cup 2026: Brazil Announces 26-Man Squad for Group Stage',
    summary: 'Tite reveals his final selection including surprise call-ups and notable exclusions ahead of the tournament opener.',
    content: 'Brazil national team coach has unveiled the 26-man squad that will represent the Seleção at the 2026 FIFA World Cup...',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    source: 'ESPN',
    sourceIcon: '📺',
    category: 'breaking',
    publishedAt: hoursAgo(1),
    readTime: 4,
    tags: ['Brazil', 'World Cup', 'Squad'],
    featured: true,
  },
  {
    id: 'news-2',
    title: 'Mbappé Scores Hat-trick as France Dominates in Warm-up Match',
    summary: 'The French superstar delivers a stunning performance ahead of their World Cup campaign.',
    content: 'Kylian Mbappé continued his incredible form with a hat-trick in France\'s final preparation match...',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    source: 'BBC Sport',
    sourceIcon: '🔴',
    category: 'match',
    publishedAt: hoursAgo(3),
    readTime: 3,
    tags: ['France', 'Mbappé', 'World Cup'],
    featured: true,
  },
  {
    id: 'news-3',
    title: 'BREAKING: Bellingham Signs Record-Breaking Contract Extension',
    summary: 'Real Madrid secures their midfield star with a deal worth €200M over six years.',
    content: 'Jude Bellingham has committed his future to Real Madrid by signing a contract extension...',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    source: 'Sky Sports',
    sourceIcon: '🔵',
    category: 'transfer',
    publishedAt: hoursAgo(5),
    readTime: 5,
    tags: ['Real Madrid', 'Bellingham', 'Transfer'],
  },
  {
    id: 'news-4',
    title: 'Argentina vs Mexico: Tactical Preview and Key Battles',
    summary: 'Expert analysis of the highly anticipated World Cup clash between two passionate rivals.',
    content: 'When Argentina face Mexico in their second group stage match, expect fireworks...',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    source: 'The Athletic',
    sourceIcon: '📰',
    category: 'analysis',
    publishedAt: hoursAgo(6),
    readTime: 8,
    tags: ['Argentina', 'Mexico', 'Analysis', 'World Cup'],
  },
  {
    id: 'news-5',
    title: 'Injury Blow: England Captain Kane Doubtful for USA Match',
    summary: 'Spurs striker faces late fitness test after picking up knock in training.',
    content: 'Harry Kane is facing a race against time to be fit for England\'s crucial encounter...',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
    source: 'Goal',
    sourceIcon: '⚽',
    category: 'injury',
    publishedAt: hoursAgo(8),
    readTime: 3,
    tags: ['England', 'Kane', 'Injury'],
  },
  {
    id: 'news-6',
    title: 'VAR Controversy: New Rules Explained for World Cup 2026',
    summary: 'FIFA introduces semi-automated offside technology and updated handball guidelines.',
    content: 'The 2026 World Cup will feature the most advanced VAR technology ever used...',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    source: 'FIFA',
    sourceIcon: '🌐',
    category: 'analysis',
    publishedAt: hoursAgo(10),
    readTime: 6,
    tags: ['VAR', 'Technology', 'World Cup', 'FIFA'],
  },
  {
    id: 'news-7',
    title: 'El Clásico Preview: Real Madrid vs Barcelona This Weekend',
    summary: 'La Liga title race heats up as the two giants prepare for the season\'s first meeting.',
    content: 'The Santiago Bernabéu will host one of football\'s greatest rivalries this Saturday...',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    source: 'Marca',
    sourceIcon: '🇪🇸',
    category: 'match',
    publishedAt: hoursAgo(12),
    readTime: 5,
    tags: ['Real Madrid', 'Barcelona', 'El Clásico', 'La Liga'],
  },
  {
    id: 'news-8',
    title: 'Manchester City Agree Fee for €100M Midfielder',
    summary: 'Premier League champions close in on signing young talent from Bundesliga.',
    content: 'Manchester City have reached an agreement in principle for the transfer...',
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800',
    source: 'Transfer News',
    sourceIcon: '💰',
    category: 'transfer',
    publishedAt: hoursAgo(14),
    readTime: 4,
    tags: ['Manchester City', 'Transfer', 'Premier League'],
  },
  {
    id: 'news-9',
    title: 'Champions League Draw: Groups Revealed for 2025/26 Season',
    summary: 'Group of Death emerges as Europe\'s elite discover their fate.',
    content: 'The UEFA Champions League group stage draw has produced several exciting matchups...',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800',
    source: 'UEFA',
    sourceIcon: '⭐',
    category: 'breaking',
    publishedAt: hoursAgo(18),
    readTime: 4,
    tags: ['Champions League', 'Draw', 'UEFA'],
  },
  {
    id: 'news-10',
    title: 'Bayern Munich Sack Manager After Poor Start to Season',
    summary: 'German giants make managerial change following four games without a win.',
    content: 'Bayern Munich have parted ways with their head coach following a difficult run...',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800',
    source: 'Bild',
    sourceIcon: '🇩🇪',
    category: 'breaking',
    publishedAt: hoursAgo(20),
    readTime: 3,
    tags: ['Bayern Munich', 'Manager', 'Bundesliga'],
  },
  {
    id: 'news-11',
    title: 'AI in Football: How Technology is Changing Tactical Analysis',
    summary: 'Exclusive look at how top clubs use artificial intelligence to gain competitive edge.',
    content: 'The use of AI in football has evolved dramatically in recent years...',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    source: 'Wired',
    sourceIcon: '🤖',
    category: 'analysis',
    publishedAt: hoursAgo(24),
    readTime: 10,
    tags: ['AI', 'Technology', 'Analysis'],
  },
  {
    id: 'news-12',
    title: 'Serie A Round-up: Inter and Napoli Both Win in Title Race',
    summary: 'Top two teams maintain pressure on each other with commanding victories.',
    content: 'Inter Milan and Napoli both secured important wins this weekend...',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    source: 'Gazzetta',
    sourceIcon: '🇮🇹',
    category: 'match',
    publishedAt: hoursAgo(26),
    readTime: 4,
    tags: ['Serie A', 'Inter', 'Napoli'],
  },
];

export const getLatestNews = (limit?: number) => {
  const sorted = [...newsArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getFeaturedNews = () => {
  return newsArticles.filter(article => article.featured);
};

export const getNewsByCategory = (category: NewsArticle['category']) => {
  return newsArticles.filter(article => article.category === category);
};

export const getNewsByTag = (tag: string) => {
  return newsArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};
