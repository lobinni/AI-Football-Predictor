# ⚽ FootballAI — On-Chain AI Football Prediction dApp

**AI-powered football match predictions running directly on GenLayer Intelligent Contracts.**

> ⚠️ **This is NOT a prototype.** This is a fully working integration with a deployed Intelligent Contract.

---

## 🚀 Live Deployment

| Resource | Link |
|----------|------|
| **🌐 Live App** | **[ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/)** |
| **📜 Contract Address** | `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` |
| **🔍 Explorer** | [View on Explorer](https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D) |
| **🌐 Network** | GenLayer Testnet Bradbury |
| **💧 Faucet** | [Get GEN Tokens](https://testnet-faucet.genlayer.foundation/) |

---

## ✅ Working Integration Evidence

This project demonstrates **real GenLayer Intelligent Contract integration**:

| Feature | Implementation | Evidence |
|---------|----------------|----------|
| **Deployed Contract** | `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` | [Verify on Explorer](https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D) |
| **Live Frontend** | React + genlayer-js SDK | [ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/) |
| **Real Transactions** | `client.writeContract()` calls | Transaction hashes visible on explorer |
| **On-Chain AI** | `gl.exec_prompt()` | Validators run AI analysis |
| **Web Data Fetching** | `gl.get_webpage()` | Fetches live BBC Sport data |
| **Validator Consensus** | `gl.eq_principle_strict_eq()` | Multiple validators agree on prediction |

---

## 🎯 How to Verify This Integration

### Step 1: Visit the Live App
👉 **[https://ai-football-predictor.pages.dev/](https://ai-football-predictor.pages.dev/)**

### Step 2: Connect MetaMask
- Click "Connect Wallet"
- MetaMask will auto-add GenLayer Testnet Bradbury
- Get GEN tokens from [Faucet](https://testnet-faucet.genlayer.foundation/) if needed

### Step 3: Make a Real Prediction
- Select a tournament (World Cup, Premier League, etc.)
- Select a match
- Click **"Analyze & Predict (On-Chain)"**
- **MetaMask will popup** asking to confirm a **real contract call**

### Step 4: Verify on Explorer
- After confirmation, the transaction is sent to contract `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D`
- Validators run AI analysis using `gl.exec_prompt()`
- Result is stored on-chain and displayed in the app
- View transaction history: [Explorer Link](https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    User Browser                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │
│  │  React 19   │  │  MetaMask   │  │  genlayer-js SDK            │  │
│  │  TypeScript │  │  Wallet     │  │  client.writeContract()     │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────────┬──────────────┘  │
└─────────┼────────────────┼────────────────────────┼─────────────────┘
          │                │                        │
          └────────────────┴────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│              GenLayer Testnet Bradbury                               │
│                                                                      │
│  Contract: 0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D               │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  FootballPredictor.predict_match()                          │    │
│  │                                                              │    │
│  │  1. gl.get_webpage("bbc.com/sport/football/...")            │    │
│  │     → Fetches live match data                                │    │
│  │                                                              │    │
│  │  2. gl.exec_prompt("Analyze {home} vs {away}...")           │    │
│  │     → AI generates prediction                                │    │
│  │                                                              │    │
│  │  3. gl.eq_principle_strict_eq(analyze)                      │    │
│  │     → Validators reach consensus                             │    │
│  │                                                              │    │
│  │  4. self.predictions[id] = result                           │    │
│  │     → Stored permanently on-chain                            │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AI-Football-Predictor/
├── contracts/
│   └── football_predictor.py      # ✅ DEPLOYED Intelligent Contract
├── src/
│   ├── config/
│   │   └── contract.ts            # Contract address: 0x0112...
│   ├── hooks/
│   │   ├── useWallet.ts           # MetaMask + GenLayer network
│   │   └── useGenLayer.ts         # genlayer-js SDK integration
│   ├── components/
│   │   ├── Header.tsx             # Wallet connection UI
│   │   ├── ContractStatus.tsx     # Live contract status
│   │   ├── MatchSelector.tsx      # Tournament/match picker
│   │   ├── PredictionPanel.tsx    # AI prediction interface
│   │   └── HowItWorks.tsx         # Technical explanation
│   ├── data/
│   │   └── tournaments.ts         # Match data
│   └── App.tsx                    # Main application
├── README.md
├── package.json
└── index.html
```

---

## 🔧 Intelligent Contract Code

**Deployed at:** `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D`

```python
# { "Depends": "py-genlayer:test" }
from genlayer import *
import json

class FootballPredictor(gl.Contract):
    prediction_count: u32
    predictions: TreeMap[str, str]
    user_predictions: TreeMap[str, str]

    @gl.public.write
    def predict_match(self, home_team: str, away_team: str, match_date: str) -> str:
        def analyze() -> str:
            # Fetch live data from BBC Sport
            bbc_url = "https://www.bbc.com/sport/football/scores-fixtures/" + match_date
            web_data = gl.get_webpage(bbc_url, mode="text")

            # AI analysis prompt
            task = f"""You are a football analyst AI. Analyze:
            Home Team: {home_team}
            Away Team: {away_team}
            Date: {match_date}
            Data: {web_data[:3000]}
            
            Return JSON: {{ home_win_prob, draw_prob, away_win_prob, 
                           predicted_score, confidence, analysis }}
            """
            result = gl.exec_prompt(task)
            return json.dumps(json.loads(result), sort_keys=True)

        # Validators reach consensus
        prediction_json = gl.eq_principle_strict_eq(analyze)
        
        # Store on-chain
        self.prediction_count = u32(self.prediction_count + 1)
        prediction_id = f"{home_team}_vs_{away_team}_{match_date}_{self.prediction_count}"
        self.predictions[prediction_id] = prediction_json
        
        return prediction_json

    @gl.public.view
    def get_prediction(self, prediction_id: str) -> str:
        return self.predictions.get(prediction_id, "{}")

    @gl.public.view
    def get_prediction_count(self) -> u32:
        return self.prediction_count
```

---

## 🔗 Frontend Integration Code

```typescript
import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

const CONTRACT_ADDRESS = '0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D';

// Create client with wallet
const client = createClient({
  chain: testnetBradbury,
  account: walletAddress,
});

// Call predict_match — triggers REAL on-chain AI analysis
const txHash = await client.writeContract({
  address: CONTRACT_ADDRESS,
  functionName: 'predict_match',
  args: ['Brazil', 'Serbia', '2026-06-15'],
});

// Wait for validator consensus (AI analysis takes ~30-60 seconds)
const receipt = await client.waitForTransactionReceipt({
  hash: txHash,
  status: 'ACCEPTED',
});

// Read predictions (free, no gas)
const count = await client.readContract({
  address: CONTRACT_ADDRESS,
  functionName: 'get_prediction_count',
  args: [],
});
```

---

## 🌟 Why GenLayer?

| Feature | GenLayer | Traditional Blockchain |
|---------|----------|------------------------|
| **Web Data Access** | ✅ `gl.get_webpage()` native | ❌ Requires Chainlink oracle ($) |
| **AI Processing** | ✅ `gl.exec_prompt()` on-chain | ❌ Off-chain only |
| **Consensus** | ✅ `gl.eq_principle_strict_eq()` | ❌ Single source of truth |
| **Language** | Python | Solidity |
| **Cost** | GEN gas only | Oracle fees + gas |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MetaMask browser extension
- GEN tokens from [Faucet](https://testnet-faucet.genlayer.foundation/)

### Local Development

```bash
# Clone repository
git clone https://github.com/lobinni/AI-Football-Predictor.git
cd AI-Football-Predictor

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📊 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Blockchain** | GenLayer Testnet Bradbury | - |
| **Contract** | Python Intelligent Contract | - |
| **SDK** | genlayer-js | Latest |
| **Frontend** | React | 19 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **Charts** | Recharts | 3.x |
| **Wallet** | MetaMask | - |

---

## 📜 License

MIT License

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Live App** | [ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/) |
| **Contract Explorer** | [View Contract](https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D) |
| **GenLayer Docs** | [docs.genlayer.com](https://docs.genlayer.com) |
| **GenLayer Studio** | [studio.genlayer.com](https://studio.genlayer.com) |
| **GEN Faucet** | [testnet-faucet.genlayer.foundation](https://testnet-faucet.genlayer.foundation/) |

---

**Built with ❤️ on GenLayer**

**Contract:** `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` | **Network:** Testnet Bradbury | **Live:** [ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/)
