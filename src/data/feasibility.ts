import { FeasibilityItem, ProjectPhase } from '../types';

export const feasibilityAnalysis: FeasibilityItem[] = [
  // Strengths
  {
    category: 'strengths',
    title: 'GenLayer Native AI Support',
    description: 'GenLayer is the first blockchain with native AI integration. Intelligent Contracts can access real-time web data and process natural language - perfect for aggregating and analyzing football data.',
    status: 'positive',
    icon: '🚀'
  },
  {
    category: 'strengths',
    title: 'No External Oracle Required',
    description: 'Unlike traditional smart contracts, Intelligent Contracts can fetch data directly from the web (BBC Sport, bookmakers, etc.) without needing Chainlink or other oracle providers.',
    status: 'positive',
    icon: '🔗'
  },
  {
    category: 'strengths',
    title: 'Python-based Development',
    description: 'Contracts are written in Python - a popular, easy-to-learn language suitable for AI/ML. Development teams are easy to recruit and train.',
    status: 'positive',
    icon: '🐍'
  },
  {
    category: 'strengths',
    title: 'Optimistic Democracy Consensus',
    description: 'Validators use LLMs to reach consensus on subjective decisions - suitable for verifying AI analysis results.',
    status: 'positive',
    icon: '⚖️'
  },
  // Challenges
  {
    category: 'challenges',
    title: 'GenLayer Still in Testnet',
    description: 'GenLayer is currently in Testnet phase (Bradbury). Mainnet has not launched yet, need to monitor roadmap and prepare for migration.',
    status: 'neutral',
    icon: '⚠️'
  },
  {
    category: 'challenges',
    title: 'Prediction Accuracy',
    description: 'AI predictions cannot guarantee 100% accuracy. Clear disclaimers and user expectation management are required.',
    status: 'neutral',
    icon: '📊'
  },
  {
    category: 'challenges',
    title: 'Legal Considerations',
    description: 'Thorough research on sports prediction and betting regulations in target markets is needed. Operating licenses may be required.',
    status: 'negative',
    icon: '⚖️'
  },
  {
    category: 'challenges',
    title: 'Gas and Transaction Costs',
    description: 'Each AI prediction call on-chain will cost gas fees. Optimization needed to keep costs reasonable for users.',
    status: 'neutral',
    icon: '⛽'
  },
  // Opportunities
  {
    category: 'opportunities',
    title: 'Early Mover Advantage',
    description: 'GenLayer is new technology with few competitors. Opportunity to become a leading dApp in the ecosystem.',
    status: 'positive',
    icon: '🏆'
  },
  {
    category: 'opportunities',
    title: 'Prediction Market Integration',
    description: 'Can expand into a prediction market with staking and rewards - creating revenue streams and increasing engagement.',
    status: 'positive',
    icon: '💰'
  },
  {
    category: 'opportunities',
    title: 'Community Building',
    description: 'GenLayer is building its ecosystem, potential to receive support and grants from GenLayer Foundation.',
    status: 'positive',
    icon: '🤝'
  }
];

export const projectPhases: ProjectPhase[] = [
  {
    id: 1,
    name: 'Phase 1: Research & Setup',
    duration: '2 weeks',
    status: 'pending',
    tasks: [
      {
        name: 'Study GenLayer Documentation',
        description: 'Read docs about Intelligent Contracts, GenVM, Optimistic Democracy',
        priority: 'high',
        completed: false
      },
      {
        name: 'Setup GenLayer Studio',
        description: 'Install and familiarize with GenLayer Studio IDE',
        priority: 'high',
        completed: false
      },
      {
        name: 'Run Prediction Market Example',
        description: 'Clone and run the existing example from GenLayer',
        priority: 'high',
        completed: false
      },
      {
        name: 'Research Football Data Sources',
        description: 'List APIs and websites for data fetching (BBC Sport, ESPN, Sofascore...)',
        priority: 'medium',
        completed: false
      }
    ]
  },
  {
    id: 2,
    name: 'Phase 2: Smart Contract Development',
    duration: '3 weeks',
    status: 'pending',
    tasks: [
      {
        name: 'Write FootballPredictor Contract',
        description: 'Main contract handling prediction with gl.get_webpage() and gl.exec_prompt()',
        priority: 'high',
        completed: false
      },
      {
        name: 'Implement Data Aggregation Logic',
        description: 'Logic to aggregate data from multiple sources: bookmakers, analysts, statistics',
        priority: 'high',
        completed: false
      },
      {
        name: 'Write Betting/Staking Contract',
        description: 'Contract allowing users to bet and receive rewards',
        priority: 'medium',
        completed: false
      },
      {
        name: 'Unit Testing with gltest',
        description: 'Write comprehensive test cases for all contracts',
        priority: 'high',
        completed: false
      },
      {
        name: 'Deploy to Testnet',
        description: 'Deploy and test on GenLayer Testnet Bradbury',
        priority: 'high',
        completed: false
      }
    ]
  },
  {
    id: 3,
    name: 'Phase 3: Frontend Development',
    duration: '3 weeks',
    status: 'pending',
    tasks: [
      {
        name: 'Setup React + TypeScript + Tailwind',
        description: 'Initialize frontend project with modern stack',
        priority: 'high',
        completed: false
      },
      {
        name: 'Integrate GenLayer SDK',
        description: 'Connect frontend with GenLayer contracts',
        priority: 'high',
        completed: false
      },
      {
        name: 'UI Components: Match Input',
        description: 'Form to enter match information (teams, date, league)',
        priority: 'high',
        completed: false
      },
      {
        name: 'UI Components: Prediction Display',
        description: 'Display analysis results with charts and stats',
        priority: 'high',
        completed: false
      },
      {
        name: 'UI Components: Betting Interface',
        description: 'Betting interface and history view',
        priority: 'medium',
        completed: false
      },
      {
        name: 'Wallet Integration',
        description: 'Connect with crypto wallets (MetaMask, etc.)',
        priority: 'high',
        completed: false
      }
    ]
  },
  {
    id: 4,
    name: 'Phase 4: Testing & Optimization',
    duration: '2 weeks',
    status: 'pending',
    tasks: [
      {
        name: 'Integration Testing',
        description: 'Test end-to-end flow from frontend to contract',
        priority: 'high',
        completed: false
      },
      {
        name: 'Performance Optimization',
        description: 'Optimize gas fees and response time',
        priority: 'medium',
        completed: false
      },
      {
        name: 'Security Audit',
        description: 'Review code and fix vulnerabilities',
        priority: 'high',
        completed: false
      },
      {
        name: 'User Testing',
        description: 'Invite beta testers and collect feedback',
        priority: 'medium',
        completed: false
      }
    ]
  },
  {
    id: 5,
    name: 'Phase 5: Launch & Marketing',
    duration: '2 weeks',
    status: 'pending',
    tasks: [
      {
        name: 'Mainnet Deployment',
        description: 'Deploy contracts to GenLayer Mainnet (when available)',
        priority: 'high',
        completed: false
      },
      {
        name: 'Documentation',
        description: 'Write user guide and developer docs',
        priority: 'medium',
        completed: false
      },
      {
        name: 'Marketing Campaign',
        description: 'Social media, crypto communities, football forums',
        priority: 'medium',
        completed: false
      },
      {
        name: 'Apply for GenLayer Grants',
        description: 'Submit application for GenLayer Foundation grants',
        priority: 'low',
        completed: false
      }
    ]
  }
];

export const techStack = [
  {
    category: 'Blockchain',
    items: [
      { name: 'GenLayer', description: 'AI-native blockchain for Intelligent Contracts' },
      { name: 'GenVM', description: 'Execution environment for Python contracts' },
      { name: 'zkSync', description: 'L2 base layer for GenLayer' }
    ]
  },
  {
    category: 'Smart Contract',
    items: [
      { name: 'Python', description: 'Language for writing Intelligent Contracts' },
      { name: 'genlayer SDK', description: 'Library for contract development' },
      { name: 'gltest', description: 'Testing framework' }
    ]
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React 19', description: 'UI framework' },
      { name: 'TypeScript', description: 'Type safety' },
      { name: 'Tailwind CSS', description: 'Styling' },
      { name: 'Recharts', description: 'Data visualization' }
    ]
  },
  {
    category: 'Data Sources',
    items: [
      { name: 'BBC Sport', description: 'Scores and fixtures' },
      { name: 'Sofascore/ESPN', description: 'Statistics and analysis' },
      { name: 'Bookmaker APIs', description: 'Betting odds' }
    ]
  }
];

export const codeExamples = {
  contract: `# { "Depends": "py-genlayer:test" }
from genlayer import *
import json

class FootballPredictor(gl.Contract):
    predictions: dict[str, dict]
    
    def __init__(self):
        self.predictions = {}
    
    @gl.public.write
    def predict_match(self, home_team: str, away_team: str, match_date: str):
        """
        Analyze and predict match by aggregating
        data from multiple web sources
        """
        def aggregate_predictions():
            # 1. Fetch data from BBC Sport
            bbc_url = f"https://www.bbc.com/sport/football/scores-fixtures/{match_date}"
            bbc_data = gl.get_webpage(bbc_url, mode='text')
            
            # 2. Fetch data from other sources (bookmakers, analysts)
            # ... add more sources
            
            # 3. Use AI to analyze and aggregate
            prompt = f"""
            Analyze the upcoming football match:
            Home Team: {home_team}
            Away Team: {away_team}
            Date: {match_date}
            
            Based on available data, provide:
            1. Win/Draw/Loss probabilities (%)
            2. Predicted score
            3. Key factors affecting the outcome
            4. Confidence level (1-10)
            
            Data sources:
            {bbc_data[:2000]}
            
            Respond in JSON format:
            {{
                "home_win_prob": float,
                "draw_prob": float,
                "away_win_prob": float,
                "predicted_score": "X-Y",
                "key_factors": ["factor1", "factor2"],
                "confidence": int,
                "analysis": "brief analysis text"
            }}
            """
            
            result = gl.exec_prompt(prompt)
            return json.dumps(json.loads(result), sort_keys=True)
        
        # Use Equivalence Principle for consensus
        prediction_json = json.loads(gl.eq_principle_strict_eq(aggregate_predictions))
        
        # Save prediction on-chain
        prediction_id = f"{home_team}_{away_team}_{match_date}"
        self.predictions[prediction_id] = {
            "home_team": home_team,
            "away_team": away_team,
            "match_date": match_date,
            "prediction": prediction_json,
            "timestamp": gl.block.timestamp
        }
        
        return prediction_json
    
    @gl.public.view
    def get_prediction(self, prediction_id: str) -> dict:
        """Get saved prediction"""
        return self.predictions.get(prediction_id, {})
    
    @gl.public.view
    def get_all_predictions(self) -> dict:
        """Get all predictions"""
        return self.predictions`,

  frontend: `import { useEffect, useState } from 'react';
// import { GenLayerClient } from '@genlayer/sdk';

// Mock GenLayer SDK
const mockPredict = async (homeTeam: string, awayTeam: string) => {
  // In production, this would call the GenLayer contract
  return {
    home_win_prob: 45,
    draw_prob: 25,
    away_win_prob: 30,
    predicted_score: "2-1",
    confidence: 7,
    analysis: "Based on recent form and head-to-head records..."
  };
};

export function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const predict = async (homeTeam: string, awayTeam: string) => {
    setLoading(true);
    try {
      const prediction = await mockPredict(homeTeam, awayTeam);
      setResult(prediction);
    } finally {
      setLoading(false);
    }
  };
  
  return { predict, loading, result };
}`
};
