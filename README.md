# ⚽ FootballAI - AI Football Prediction on GenLayer

<div align="center">

![FootballAI Banner](https://img.shields.io/badge/FootballAI-GenLayer-emerald?style=for-the-badge&logo=ethereum)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)

**An AI-powered football prediction dApp built on GenLayer blockchain using Intelligent Contracts**

[Live Demo](#) • [Documentation](https://docs.genlayer.com) • [GenLayer Studio](https://studio.genlayer.com)

</div>

---

## 📖 Overview

FootballAI is a decentralized application (dApp) that leverages GenLayer's Intelligent Contracts to provide AI-powered football match predictions. The system aggregates data from multiple sources including bookmakers, sports analysts, and statistics providers, then uses on-chain AI to generate predictions.

### ✨ Key Features

- 🏆 **Live Tournament Support** - World Cup 2026, Premier League, La Liga, Champions League, and more
- 🤖 **AI-Powered Analysis** - Aggregates data from multiple sources using on-chain AI
- 🔗 **On-Chain Predictions** - All predictions are recorded on GenLayer blockchain
- 👛 **MetaMask Integration** - Connect wallet and sign transactions
- 📊 **Visual Analytics** - Charts showing win/draw/loss probabilities
- 🎯 **Multi-Source Data** - Bookmakers, analysts, statistics, expert opinions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  React App  │  │  MetaMask   │  │  Recharts   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    GenLayer SDK                             │
│         Contract Interaction • Transaction Signing          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  GenLayer Blockchain                        │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ Intelligent Contract │  │       GenVM        │          │
│  │ FootballPredictor.py │  │   AI Execution     │          │
│  └─────────────────────┘  └─────────────────────┘          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 External Data Sources                       │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │BBC Sport│  │Bet365  │  │Sofascore│  │ ESPN  │           │
│  └────────┘  └────────┘  └────────┘  └────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask browser extension
- GEN tokens (get from [Faucet](https://testnet-faucet.genlayer.foundation/))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/football-ai.git
cd football-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

1. Install MetaMask extension
2. Connect to GenLayer Testnet (auto-added by the app)
3. Get free GEN tokens from the faucet
4. Start making predictions!

---

## 📁 Project Structure

```
football-ai/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles (Tailwind)
│   ├── components/
│   │   ├── Header.tsx          # Navigation & wallet connect
│   │   ├── WalletConnect.tsx   # MetaMask integration
│   │   ├── PredictionDemo.tsx  # Main prediction interface
│   │   ├── FeasibilityAnalysis.tsx  # Project analysis
│   │   ├── Roadmap.tsx         # Development roadmap
│   │   ├── TechStack.tsx       # Technology overview
│   │   └── CodeExamples.tsx    # Smart contract examples
│   ├── hooks/
│   │   └── useWallet.ts        # Wallet connection hook
│   ├── data/
│   │   ├── tournaments.ts      # Tournament & match data
│   │   └── feasibility.ts      # Project analysis data
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── utils/
│       └── cn.ts               # Utility functions
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Blockchain** | GenLayer | AI-native blockchain |
| **Smart Contract** | Python | Intelligent Contracts |
| **Frontend** | React 19 | UI Framework |
| **Language** | TypeScript | Type Safety |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Charts** | Recharts | Data Visualization |
| **Icons** | Lucide React | Icon Library |
| **Build** | Vite 7 | Build Tool |
| **Wallet** | MetaMask | Web3 Wallet |

---

## 📱 Features

### 🎯 Tournament Selection
- FIFA World Cup 2026 (Featured)
- English Premier League
- La Liga
- UEFA Champions League
- Serie A, Bundesliga, Ligue 1
- Custom Match Input

### 🤖 AI Match Prediction
- Win/Draw/Loss probabilities
- Predicted score
- Confidence level
- Head-to-head statistics
- Key factors analysis
- Multi-source data aggregation

### 👛 Wallet Integration
- MetaMask connection
- Auto network switching
- Balance display
- Transaction signing
- Faucet access

### 📊 Prediction History (NEW)
- Track all your predictions
- Accuracy statistics
- Current & best streak tracking
- Filter by status (correct/incorrect/pending)
- Export prediction data

### 🏆 Global Leaderboard (NEW)
- Compete with other predictors
- Points system for predictions
- Streak bonuses
- Accuracy rankings

### 🎖️ Achievement System (NEW)
- 12 unlockable achievements
- 4 rarity tiers (Common, Rare, Epic, Legendary)
- Progress tracking
- Points rewards

### 📤 Social Sharing (NEW)
- Share predictions on Twitter/X
- Share on Telegram & Facebook
- Copy prediction text
- Native share on mobile

### 🔔 Notifications (NEW)
- Browser notifications
- Match reminders
- Prediction results
- Achievement unlocks

### ❤️ Favorites System (NEW)
- Save favorite teams
- Bookmark matches
- Quick access to saved items

---

## 🔮 Intelligent Contract Example

```python
# { "Depends": "py-genlayer:test" }
from genlayer import *
import json

class FootballPredictor(gl.Contract):
    predictions: dict[str, dict]
    
    def __init__(self):
        self.predictions = {}
    
    @gl.public.write
    def predict_match(self, home_team: str, away_team: str, match_date: str):
        def aggregate_predictions():
            # Fetch data from BBC Sport
            bbc_url = f"https://www.bbc.com/sport/football/scores-fixtures/{match_date}"
            bbc_data = gl.get_webpage(bbc_url, mode='text')
            
            # AI analysis
            prompt = f"""
            Analyze the match: {home_team} vs {away_team}
            Data: {bbc_data[:2000]}
            
            Return JSON with probabilities and prediction.
            """
            
            result = gl.exec_prompt(prompt)
            return json.dumps(json.loads(result), sort_keys=True)
        
        prediction = json.loads(gl.eq_principle_strict_eq(aggregate_predictions))
        
        # Save on-chain
        prediction_id = f"{home_team}_{away_team}_{match_date}"
        self.predictions[prediction_id] = prediction
        
        return prediction
```

---

## 🗺️ Roadmap

### Phase 1: Research & Setup (2 weeks) ✅
- [x] Study GenLayer Documentation
- [x] Setup development environment
- [x] Create prototype UI

### Phase 2: Smart Contract (3 weeks)
- [ ] Write FootballPredictor contract
- [ ] Implement data aggregation
- [ ] Unit testing with gltest
- [ ] Deploy to Testnet

### Phase 3: Frontend (3 weeks) ✅
- [x] React + TypeScript setup
- [x] MetaMask integration
- [x] Match selection UI
- [x] Prediction results display
- [x] Prediction History
- [x] Leaderboard
- [x] Achievement System
- [x] Social Sharing
- [x] Notifications
- [x] Favorites System
- [ ] GenLayer SDK integration

### Phase 4: Testing (2 weeks)
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Beta testing

### Phase 5: Launch (2 weeks)
- [ ] Mainnet deployment
- [ ] Documentation
- [ ] Marketing campaign

---

## 🚧 Implemented Features (12 Optimizations)

### ✅ Implemented Features

| # | Feature | Status | Description |
|---|---------|--------|-------------|
| 1 | Prediction History | ✅ Done | localStorage-based history with accuracy tracking |
| 2 | Achievement System | ✅ Done | 12 achievements across 4 categories |
| 3 | Global Leaderboard | ✅ Done | Rankings with points system |
| 4 | Social Sharing | ✅ Done | Twitter, Telegram, Facebook, Copy |
| 5 | Notifications | ✅ Done | Browser notifications for events |
| 6 | Favorites System | ✅ Done | Save teams and matches |
| 7 | Accuracy Tracking | ✅ Done | Stats with streak tracking |
| 8 | Match Filtering | ✅ Done | Filter by tournament and status |
| 9 | Transaction History | ✅ Done | On-chain TX tracking |
| 10 | Points System | ✅ Done | Earn points for predictions |
| 11 | Progress Tracking | ✅ Done | Achievement progress bars |
| 12 | Rarity System | ✅ Done | Common/Rare/Epic/Legendary tiers |

### 🔮 Future Features

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| 1 | Real-time Data | High | WebSocket for live updates |
| 2 | Betting Pool | High | Stake GEN on predictions |
| 3 | Multi-language | Medium | i18n support |
| 4 | Mobile App | Low | React Native version |
| 5 | NFT Badges | Low | Mint achievements as NFTs |
| 6 | Public API | Low | REST API for integrations |

### Code Example: Betting Pool
```python
@gl.public.write.payable
def place_bet(self, match_id: str, prediction: str):
    """Allow users to stake GEN on predictions"""
    bet_amount = gl.message.value
    self.bets[match_id].append({
        "user": gl.message.sender_address,
        "prediction": prediction,
        "amount": bet_amount
    })
```

---

## ⚠️ Important Notes

1. **Testnet Only**: This is a prototype running on GenLayer Testnet
2. **No Real Betting**: This is for demonstration purposes only
3. **AI Accuracy**: Predictions are not guaranteed to be accurate
4. **Legal Compliance**: Check local regulations before commercial use

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Resources

- [GenLayer Documentation](https://docs.genlayer.com)
- [GenLayer Studio](https://studio.genlayer.com)
- [GenLayer GitHub](https://github.com/genlayerlabs)
- [GEN Faucet](https://testnet-faucet.genlayer.foundation/)

---

<div align="center">

**Built with ❤️ for the GenLayer Ecosystem**

[⬆ Back to Top](#-footballai---ai-football-prediction-on-genlayer)

</div>
