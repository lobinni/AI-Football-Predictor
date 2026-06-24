export interface Team {
  name: string;
  logo?: string;
  recentForm?: string[];
  rank?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  league?: string;
}

export interface PredictionResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  predictedScore: string;
  confidence: number;
  analysis: string;
  sources: Source[];
  bettingOdds?: BettingOdds;
}

export interface Source {
  name: string;
  type: 'bookmaker' | 'analyst' | 'expert' | 'statistics';
  prediction?: string;
  confidence?: number;
}

export interface BettingOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  source: string;
}

export interface ContractTransaction {
  id: string;
  type: 'deploy' | 'predict' | 'resolve';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
  txHash?: string;
  data?: any;
}

export interface ProjectPhase {
  id: number;
  name: string;
  duration: string;
  tasks: Task[];
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Task {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface FeasibilityItem {
  category: string;
  title: string;
  description: string;
  status: 'positive' | 'neutral' | 'negative';
  icon: string;
}
