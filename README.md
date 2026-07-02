# ⚽ FootballAI — On-Chain AI Football Prediction dApp

**AI-powered football match predictions running directly on GenLayer Intelligent Contracts.**

FootballAI leverages GenLayer's unique capabilities to perform AI analysis on-chain. The contract fetches live football data using `gl.get_webpage()`, analyzes it with `gl.exec_prompt()`, and reaches validator consensus via `gl.eq_principle_strict_eq()`. Every prediction is permanently stored on the blockchain.

## 🚀 Live Deployment

| Resource | Link |
|----------|------|
| **Contract Address** | `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` |
| **Explorer** | [explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D](https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D) |
| **Network** | GenLayer Testnet Bradbury |
| **Live App** | Deployed via this repository |

## ✨ Features

### On-Chain AI Analysis
- **Real contract calls**: `predict_match()` executes AI analysis via GenLayer validators
- **Live data fetching**: Uses `gl.get_webpage()` to fetch from BBC Sport
- **AI predictions**: Uses `gl.exec_prompt()` for LLM-powered analysis
- **Validator consensus**: `gl.eq_principle_strict_eq()` ensures prediction agreement

### Working Integration
- **genlayer-js SDK**: Full integration with `client.writeContract()` and `client.readContract()`
- **MetaMask support**: Auto-adds GenLayer Testnet Bradbury, handles chain switching
- **Real GEN transactions**: Predictions cost GEN gas, viewable on explorer

### Match Coverage
- FIFA World Cup 2026
- UEFA Champions League
- Premier League
- La Liga
- And more...

## 🏗️ Architecture

```
User → MetaMask → genlayer-js SDK → FootballPredictor Contract
                                            │
                                            ├── gl.get_webpage() → BBC Sport
                                            ├── gl.exec_prompt() → AI Analysis
                                            └── gl.eq_principle_strict_eq() → Consensus
                                            │
                                            └── Prediction stored on-chain
```

## 📁 Project Structure

```
football-ai/
├── src/
│   ├── App.tsx                    # Main application
│   ├── config/
│   │   └── contract.ts            # Contract address & config
│   ├── hooks/
│   │   ├── useWallet.ts           # MetaMask integration
│   │   └── useGenLayer.ts         # genlayer-js SDK wrapper
│   ├── components/
│   │   ├── Header.tsx             # Navigation + wallet
│   │   ├── ContractStatus.tsx     # Live contract info
│   │   ├── MatchSelector.tsx      # Tournament/match selection
│   │   ├── PredictionPanel.tsx    # AI prediction UI
│   │   └── HowItWorks.tsx         # Technical explanation
│   └── data/
│       └── tournaments.ts         # Match data
├── contracts/
│   └── football_predictor.py      # Deployed Intelligent Contract
└── README.md
```

## 🔧 Intelligent Contract

The contract is deployed at `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D`:

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

            task = f"""You are a football analyst AI. Analyze:
            Home Team: {home_team}
            Away Team: {away_team}
            Date: {match_date}
            Data: {web_data[:3000]}
            
            Return JSON: {{ home_win_prob, draw_prob, away_win_prob, predicted_score, confidence, analysis }}
            """
            result = gl.exec_prompt(task)
            return json.dumps(json.loads(result), sort_keys=True)

        # Validators reach consensus on the prediction
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

## 🔗 Frontend Integration

```typescript
import { createClient } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

const CONTRACT_ADDRESS = '0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D';

const client = createClient({
  chain: testnetBradbury,
  account: walletAddress,
});

// Call predict_match — triggers on-chain AI analysis
const txHash = await client.writeContract({
  address: CONTRACT_ADDRESS,
  functionName: 'predict_match',
  args: ['Brazil', 'Serbia', '2026-06-15'],
});

// Wait for validator consensus
const receipt = await client.waitForTransactionReceipt({
  hash: txHash,
  status: 'ACCEPTED',
});

// Read predictions (free, no gas)
const prediction = await client.readContract({
  address: CONTRACT_ADDRESS,
  functionName: 'get_prediction',
  args: ['Brazil_vs_Serbia_2026-06-15_1'],
});
```

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MetaMask browser extension
- GEN tokens from [faucet](https://testnet-faucet.genlayer.foundation/)

### Installation

```bash
git clone https://github.com/lobinni/AI-Football-Predictor.git
cd AI-Football-Predictor
npm install
npm run dev
```

### Usage

1. Open the app in your browser
2. Click **Connect Wallet**
3. MetaMask will prompt to add **GenLayer Testnet Bradbury**
4. Get GEN from the faucet if needed
5. Select a match → Click **Analyze & Predict**
6. Confirm the transaction in MetaMask
7. Wait for validators to run AI analysis (~30-60 seconds)
8. View your on-chain prediction!

## 🌟 Why GenLayer?

| Feature | GenLayer | Traditional |
|---------|----------|-------------|
| Web Data Access | ✅ Native `gl.get_webpage()` | ❌ Requires Chainlink oracle |
| AI Processing | ✅ Native `gl.exec_prompt()` | ❌ Off-chain only |
| Consensus | ✅ `gl.eq_principle_strict_eq()` | ❌ Single source of truth |
| Cost | GEN gas only | Oracle fees + gas |

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| Blockchain | GenLayer Testnet Bradbury |
| Contract | Python (Intelligent Contract) |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| SDK | genlayer-js |
| Wallet | MetaMask |

## 📜 License

MIT License

---

**Built with ❤️ on GenLayer**

*Contract: `0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D` | Network: Testnet Bradbury*
