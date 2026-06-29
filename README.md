# ⚽ FootballAI — On-Chain Football Prediction dApp

<div align="center">

![GenLayer](https://img.shields.io/badge/Blockchain-GenLayer-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**AI-powered football prediction dApp — every prediction is a real on-chain transaction on GenLayer Testnet Bradbury, paid with GEN gas.**

[Live Demo](#getting-started) · [GenLayer Docs](https://docs.genlayer.com) · [GenLayer Studio](https://studio.genlayer.com) · [GEN Faucet](https://testnet-faucet.genlayer.foundation/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [GenLayer Network Details](#genlayer-network-details)
- [On-Chain Transaction Flow](#on-chain-transaction-flow)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [How the Wallet Works](#how-the-wallet-works)
- [Intelligent Contract (Python)](#intelligent-contract-python)
- [Development Roadmap](#development-roadmap)
- [Feasibility Analysis](#feasibility-analysis)
- [Proposed Future Features](#proposed-future-features)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

FootballAI is a decentralized application that combines AI-driven football analysis with blockchain immutability. Users select a match from ongoing tournaments (World Cup 2026, Premier League, Champions League, etc.), connect their MetaMask wallet to GenLayer Testnet Bradbury, and every "Analyze & Predict" action sends a **real on-chain transaction** — paying GEN gas fees — with the prediction payload permanently stored in the transaction calldata.

The app is designed as a prototype for a full Intelligent Contract deployment on GenLayer, where the AI analysis itself would run on-chain via `gl.get_webpage()` and `gl.exec_prompt()`.

---

## GenLayer Network Details

All values sourced from the official [genlayer-js SDK](https://github.com/genlayerlabs/genlayer-js/blob/main/src/chains/testnetBradbury.ts):

| Parameter | Value |
|-----------|-------|
| **Network Name** | GenLayer Testnet Bradbury |
| **RPC URL** | `https://rpc-bradbury.genlayer.com` |
| **Explorer** | `https://explorer-bradbury.genlayer.com` |
| **Faucet** | `https://testnet-faucet.genlayer.foundation/` |
| **Native Token** | GEN (18 decimals) |
| **Chain ID** | Fetched dynamically via `eth_chainId` RPC |
| **Consensus Contract** | `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` |
| **Settlement Layer** | zkSync-based L2 → Ethereum |

### Getting GEN Tokens

1. Visit [https://testnet-faucet.genlayer.foundation/](https://testnet-faucet.genlayer.foundation/)
2. Connect your wallet (requires 0.01 ETH on Ethereum mainnet)
3. Claim **100 GEN** (once per week)

---

## On-Chain Transaction Flow

Every prediction is a **real transaction** on GenLayer Testnet with **3 execution modes**:

```
User clicks "Analyze & Predict"
│
├─ Mode A: Intelligent Contract deployed + wallet on GenLayer?
│   │
│   YES ──► genlayer-js SDK: client.writeContract({
│           │   address: contractAddress,
│           │   functionName: 'predict_match',
│           │   args: [homeTeam, awayTeam, matchDate]
│           │ })
│           │
│           ├─ Contract runs on-chain:
│           │   gl.get_webpage(bbc_url) → fetches live data
│           │   gl.exec_prompt(task)    → AI analyzes data
│           │   gl.eq_principle_strict_eq() → validators reach consensus
│           │
│           └─ Prediction stored in contract storage on-chain
│
├─ Mode B: No contract, but wallet on GenLayer + has GEN?
│   │
│   YES ──► eth_sendTransaction (self-transfer with prediction calldata)
│           Gas estimated by MetaMask automatically
│
├─ Mode C: No wallet / wrong chain
│   │
│   └──► Demo mode (simulated locally, no real TX)
│
└─ AI analysis results displayed with charts in all modes
```

**Mode A** is the full Intelligent Contract integration using `genlayer-js` SDK.
**Mode B** is a fallback that still records predictions on-chain via calldata.
**Mode C** allows trying the UI without any blockchain interaction.

---

## Features

### ⚽ Match Predictions
- **8 ongoing tournaments**: World Cup 2026 (featured), Premier League, La Liga, Champions League, Serie A, Bundesliga, Ligue 1
- **30+ pre-loaded matches** with stadium, stage, and schedule info
- **Custom match input** for any teams
- **AI analysis results**: Win/Draw/Loss probabilities, predicted score, confidence level, key factors
- **Multi-source data display**: Bookmakers (Bet365, 1xBet), analysts (ESPN), statistics (SofaScore), experts (Sky Sports)
- **Head-to-head charts** with Recharts visualization

### 👛 MetaMask + GenLayer Integration
- **Auto-add GenLayer network** to MetaMask on first connect
- **Auto-switch** from wrong networks to GenLayer Testnet
- **Real GEN balance** fetched directly via GenLayer RPC (`eth_getBalance`)
- **Chain ID** fetched dynamically (not hardcoded)
- **Faucet button** linking to official GEN faucet
- **Real on-chain transactions** with MetaMask gas estimation

### 📰 Football News
- **12 news articles** across 5 categories: Breaking, Transfer, Match, Injury, Analysis
- **Featured stories** with full-bleed images
- **Search** by title, summary, or tags
- **Category filtering** with article counts
- **Article detail view** with reading time
- **Live ticker** with marquee animation

### 📊 Prediction History
- **Persistent storage** (localStorage) of all predictions
- **Accuracy tracking**: total, correct, accuracy %, current streak, best streak
- **Filter** by status: All, Correct, Incorrect, Pending
- **Transaction hash links** to GenLayer Explorer

### 🏆 Global Leaderboard
- **Top 10 rankings** with podium visualization
- **Points system**: +10 per prediction, +25 correct, +5 streak bonus, +50 exact score
- **Stats per player**: predictions count, accuracy %, streak

### 🎖️ Achievement System
- **12 achievements** across 4 categories:
  - 🎯 **Prediction**: First Steps, Getting Started, Dedicated Analyst, Prediction Master
  - 🔥 **Streak**: Lucky Streak (3), On Fire (5), Unstoppable (10)
  - 🌍 **Explorer**: Globe Trotter, World Explorer, World Cup Fan
  - 📤 **Social**: Social Butterfly, Web3 Native
- **4 rarity tiers**: Common (10 pts), Rare (25 pts), Epic (50 pts), Legendary (100 pts)
- **Progress bars** and **unlock popup animation**

### 📤 Social Sharing
- Share predictions on **X (Twitter)**, **Telegram**, **Facebook**
- **Native share** API on mobile
- **Copy to clipboard** with formatted text
- Preview card with probabilities

### 🔔 Notification Center
- **Browser push notifications** (with permission)
- **In-app notification list** with unread badge
- Notifications for: prediction results, achievements, match alerts
- Mark as read / clear all

### ❤️ Favorites
- Save favorite matches with heart toggle
- Persistent across sessions

### 📋 Project Documentation (In-App)
- **Feasibility Analysis**: SWOT analysis, GenLayer vs Ethereum comparison, 85% technical feasibility
- **Roadmap**: 5 phases, 12 weeks, GitHub Codespace setup, CI/CD config
- **Tech Stack**: Architecture diagram, data flow visualization
- **Code Examples**: Intelligent Contract (Python) + Frontend integration code
- **Proposed Features**: Priority matrix with 12 future optimizations

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   React 19   │  │   MetaMask   │  │  Recharts / Lucide  │   │
│  │  TypeScript  │  │   Wallet     │  │  Data Visualization │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────┘   │
│         │                 │                                     │
│         └────────┬────────┘                                     │
│                  │                                              │
│         ┌────────▼────────┐                                     │
│         │   useWallet.ts  │  ← Wallet hook                     │
│         │  Auto-add chain │  ← Fetches chain ID dynamically    │
│         │  Balance via RPC│  ← Direct RPC, not via provider    │
│         └────────┬────────┘                                     │
└──────────────────┼──────────────────────────────────────────────┘
                   │
         ┌─────────▼──────────┐
         │  eth_sendTransaction │  ← Self-transfer with calldata
         │  (MetaMask signs)    │  ← Gas estimated automatically
         └─────────┬──────────┘
                   │
┌──────────────────▼──────────────────────────────────────────────┐
│                   GenLayer Testnet Bradbury                      │
│                                                                 │
│  RPC:      https://rpc-bradbury.genlayer.com                    │
│  Explorer: https://explorer-bradbury.genlayer.com               │
│  Token:    GEN (18 decimals)                                    │
│  Layer:    L2 on zkSync → Ethereum                              │
│                                                                 │
│  ┌─────────────────────────────────────────────┐                │
│  │  Transaction Calldata (permanent on-chain)  │                │
│  │  {"action":"predict","home":"Brazil",       │                │
│  │   "away":"Serbia","ts":1720000000}          │                │
│  └─────────────────────────────────────────────┘                │
│                                                                 │
│  Future: Intelligent Contract (FootballPredictor.py)            │
│  ┌─────────────────────────────────────────────┐                │
│  │  gl.get_webpage() → BBC Sport, bookmakers   │                │
│  │  gl.exec_prompt() → AI analysis on-chain    │                │
│  │  gl.eq_principle_strict_eq() → consensus    │                │
│  └─────────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
football-ai/
├── index.html                          # Entry HTML
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite + singlefile config
├── tsconfig.json                       # TypeScript config
├── README.md                           # This file
│
├── contracts/
│   └── football_predictor.py           # GenLayer Intelligent Contract (Python)
│
├── src/
│   ├── main.tsx                        # React entry point
│   ├── App.tsx                         # Root component + routing
│   ├── index.css                       # Tailwind + custom animations
│   │
│   ├── components/
│   │   ├── Header.tsx                  # Navigation + wallet + notifications
│   │   ├── WalletConnect.tsx           # MetaMask connect/disconnect (memo)
│   │   ├── NotificationCenter.tsx      # Bell icon + dropdown
│   │   ├── PredictionDemo.tsx          # Main prediction UI + on-chain TX
│   │   ├── NewsSection.tsx             # Football news with search/filter
│   │   ├── PredictionHistory.tsx       # History list + accuracy stats
│   │   ├── Leaderboard.tsx             # Rankings + podium
│   │   ├── AchievementsPanel.tsx       # Badges + progress + unlock popup
│   │   ├── SocialShare.tsx             # Share modal (X, TG, FB, copy)
│   │   ├── FeasibilityAnalysis.tsx     # SWOT + comparison table
│   │   ├── Roadmap.tsx                 # 5-phase timeline
│   │   ├── TechStack.tsx               # Architecture + data flow
│   │   ├── ContractPanel.tsx            # Deploy & interact with Intelligent Contract
│   │   ├── CodeExamples.tsx            # Python contract + frontend code
│   │   └── ProposedFeatures.tsx        # 12 feature proposals + matrix
│   │
│   ├── hooks/
│   │   ├── useWallet.ts                # GenLayer wallet (RPC, chain, balance)
│   │   ├── useGenLayer.ts              # genlayer-js SDK integration
│   │   ├── usePredictionHistory.ts     # Prediction storage + accuracy
│   │   ├── useAchievements.ts          # 12 achievements + progress
│   │   ├── useFavorites.ts             # Favorite teams/matches
│   │   └── useNotifications.ts         # Browser + in-app notifications
│   │
│   ├── data/
│   │   ├── tournaments.ts              # 8 tournaments, 30+ matches
│   │   ├── news.ts                     # 12 news articles, 5 categories
│   │   └── feasibility.ts              # Analysis data, roadmap, tech stack
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript interfaces
│   │
│   └── utils/
│       └── cn.ts                       # classNames utility
│
└── dist/
    └── index.html                      # Production build (single file)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MetaMask** browser extension
- **GEN tokens** from [the faucet](https://testnet-faucet.genlayer.foundation/) (requires 0.01 ETH on mainnet)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/football-ai.git
cd football-ai

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### First Use

1. Open the app in your browser
2. Click **Connect** in the header
3. MetaMask will prompt to add **GenLayer Testnet Bradbury** — approve it
4. If your GEN balance is 0, click **Faucet** to get 100 GEN
5. Select a tournament → pick a match → click **Analyze & Predict**
6. Confirm the transaction in MetaMask (gas paid in GEN)
7. View your prediction results with charts and analysis

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Blockchain** | GenLayer Testnet Bradbury | — | AI-native L2 on zkSync |
| **Wallet** | MetaMask | — | Transaction signing |
| **Frontend** | React | 19.2 | UI framework |
| **Language** | TypeScript | 5.9 | Type safety |
| **Styling** | Tailwind CSS | 4.1 | Utility-first CSS |
| **Charts** | Recharts | 3.9 | Pie/Bar charts |
| **Icons** | Lucide React | 1.21 | SVG icons |
| **Build** | Vite | 7.3 | Bundler + HMR |
| **Output** | vite-plugin-singlefile | 2.3 | Single HTML file |
| **GenLayer SDK** | genlayer-js | 1.1.8 | Intelligent Contract interaction |
| **EVM Client** | viem | 2.29+ | Wallet & chain abstraction (via genlayer-js) |

---

## GenLayer SDK Integration

The app uses the official `genlayer-js` SDK (`npm install genlayer-js`) for **real Intelligent Contract interaction**:

```typescript
import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

// Create client with MetaMask signing
const client = createClient({
  chain: testnetBradbury,
  account: '0xUserAddress...', // MetaMask handles signing
});

// Deploy the FootballPredictor contract
const hash = await client.deployContract({
  code: contractPythonCode,
  args: [],
  leaderOnly: false,
});

// Call predict_match (triggers on-chain AI analysis)
const txHash = await client.writeContract({
  address: contractAddress,
  functionName: 'predict_match',
  args: ['Brazil', 'Serbia', '2026-06-15'],
  value: 0n,
});

// Read predictions (free, no gas)
const result = await client.readContract({
  address: contractAddress,
  functionName: 'get_prediction',
  args: ['Brazil_vs_Serbia_2026-06-15_1'],
});
```

The `useGenLayer` hook (`src/hooks/useGenLayer.ts`) wraps this SDK with React state management, providing `deployContract()`, `predictMatch()`, `readPrediction()`, and `getPredictionCount()`.

---

## How the Wallet Works

The `useWallet` hook (`src/hooks/useWallet.ts`) handles all blockchain interaction:

### 1. Dynamic Chain ID
```typescript
// Fetches real chain ID from GenLayer RPC — not hardcoded
const res = await fetch('https://rpc-bradbury.genlayer.com', {
  method: 'POST',
  body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_chainId', params: [], id: 1 }),
});
const chainIdHex = (await res.json()).result; // e.g. "0xf24f"
```

### 2. Balance via Direct RPC
```typescript
// Always fetches from GenLayer RPC — not from MetaMask provider
// Works even if MetaMask is on a different network
const res = await fetch('https://rpc-bradbury.genlayer.com', {
  method: 'POST',
  body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getBalance', params: [addr, 'latest'], id: 1 }),
});
```

### 3. Auto Network Setup
```typescript
// Adds GenLayer to MetaMask if missing, then switches
await ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: chainIdHex,
    chainName: 'GenLayer Testnet Bradbury',
    nativeCurrency: { name: 'GEN', symbol: 'GEN', decimals: 18 },
    rpcUrls: ['https://rpc-bradbury.genlayer.com'],
    blockExplorerUrls: ['https://explorer-bradbury.genlayer.com'],
  }],
});
```

### 4. Transaction (Zero-Value Self-Transfer with Calldata)
```typescript
// Prediction data encoded in calldata — permanently on-chain
const payload = JSON.stringify({ action: 'predict', home: 'Brazil', away: 'Serbia', ts: Date.now() });
const hex = Array.from(new TextEncoder().encode(payload)).map(b => b.toString(16).padStart(2, '0')).join('');

await ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: address,
    to: address,        // self-transfer — always succeeds
    value: '0x0',       // zero GEN value
    data: '0x' + hex,   // prediction stored in calldata
    // gas: omitted — MetaMask estimates automatically
  }],
});
```

---

## Intelligent Contract (Python)

The production version would deploy this Intelligent Contract on GenLayer:

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
        def aggregate():
            # Fetch live data from the web — no oracle needed
            bbc = gl.get_webpage(
                f"https://www.bbc.com/sport/football/scores-fixtures/{match_date}",
                mode='text'
            )

            prompt = f"""
            Analyze {home_team} vs {away_team} on {match_date}.
            Data: {bbc[:2000]}
            Return JSON: {{ home_win_prob, draw_prob, away_win_prob, predicted_score, confidence }}
            """
            result = gl.exec_prompt(prompt)
            return json.dumps(json.loads(result), sort_keys=True)

        # Equivalence Principle ensures consensus across validators
        prediction = json.loads(gl.eq_principle_strict_eq(aggregate))

        self.predictions[f"{home_team}_{away_team}_{match_date}"] = prediction
        return prediction

    @gl.public.view
    def get_prediction(self, prediction_id: str) -> dict:
        return self.predictions.get(prediction_id, {})
```

---

## Development Roadmap

| Phase | Duration | Status | Key Deliverables |
|-------|----------|--------|------------------|
| **1. Research & Setup** | 2 weeks | ✅ Done | GenLayer docs, Studio setup, prototype UI |
| **2. Smart Contract** | 3 weeks | 🔲 Pending | FootballPredictor.py, data aggregation, gltest |
| **3. Frontend** | 3 weeks | ✅ Done | React app, MetaMask, tournaments, news, history, achievements |
| **4. Testing** | 2 weeks | 🔲 Pending | Integration tests, gas optimization, security audit |
| **5. Launch** | 2 weeks | 🔲 Pending | Mainnet deploy, documentation, marketing |

---

## Feasibility Analysis

| Criteria | Score | Notes |
|----------|-------|-------|
| **Technical Feasibility** | 85% | GenLayer provides native AI + web access in contracts |
| **Market Potential** | 70% | Early mover advantage in GenLayer ecosystem |
| **Legal Risk** | 60% | Prediction ≠ gambling, but varies by jurisdiction |
| **Development Time** | 12 weeks | MVP including smart contract + frontend |

### Why GenLayer?

| Feature | GenLayer | Ethereum |
|---------|----------|----------|
| Web Data Access | ✅ Native (`gl.get_webpage`) | ❌ Requires Chainlink oracle |
| AI Processing | ✅ Native (`gl.exec_prompt`) | ❌ Off-chain only |
| Language | Python | Solidity |
| NLP Support | ✅ Built-in | ❌ Not possible |
| Oracle Cost | $0 | $0.1–$1 per call |

---

## Proposed Future Features

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 1 | Real-time WebSocket data | High | Medium | Proposed |
| 2 | Betting pool with GEN staking | High | Large | Proposed |
| 3 | Advanced team analytics (xG, form) | High | Large | Proposed |
| 4 | Global leaderboard on-chain | Medium | Medium | Planned |
| 5 | Push notification for match start | Medium | Medium | Proposed |
| 6 | Multi-language (i18n) | Medium | Medium | Proposed |
| 7 | Mobile app (React Native) | Low | Large | Proposed |
| 8 | NFT achievement minting | Low | Medium | Proposed |
| 9 | Public REST API | Low | Medium | Proposed |
| 10 | Community forum / chat | Low | Large | Proposed |
| 11 | Dark mode | Low | Small | Proposed |
| 12 | Prediction accuracy ML model | Low | Large | Proposed |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Links

| Resource | URL |
|----------|-----|
| GenLayer Documentation | [docs.genlayer.com](https://docs.genlayer.com) |
| GenLayer Studio | [studio.genlayer.com](https://studio.genlayer.com) |
| GenLayer JS SDK | [github.com/genlayerlabs/genlayer-js](https://github.com/genlayerlabs/genlayer-js) |
| GenLayer CLI | [github.com/genlayerlabs/genlayer-cli](https://github.com/genlayerlabs/genlayer-cli) |
| Boilerplate Project | [github.com/genlayerlabs/genlayer-project-boilerplate](https://github.com/genlayerlabs/genlayer-project-boilerplate) |
| GEN Faucet | [testnet-faucet.genlayer.foundation](https://testnet-faucet.genlayer.foundation/) |
| Testnet Explorer | [explorer-bradbury.genlayer.com](https://explorer-bradbury.genlayer.com) |

---

<div align="center">

**Built with ❤️ for the GenLayer ecosystem**

*Every prediction is a transaction. Every transaction is permanent.*

</div>
