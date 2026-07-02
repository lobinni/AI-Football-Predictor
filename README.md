# ⚽ FootballAI — On-Chain AI Football Prediction dApp

**AI-powered football match predictions running directly on GenLayer Intelligent Contracts.**

> ⚠️ **This is NOT a prototype.** This is a fully working integration with a deployed Intelligent Contract.

---

## 🚀 Live Deployment

| Resource | Link |
|----------|------|
| **🌐 Live App** | **[ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/)** |
| **📜 Contract Address** | `0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669` |
| **🔍 Explorer** | [View on Explorer](https://explorer-bradbury.genlayer.com/address/0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669) |
| **🌐 Network** | GenLayer Testnet Bradbury |
| **💧 Faucet** | [Get GEN Tokens](https://testnet-faucet.genlayer.foundation/) |

---

## ✅ Working Integration Evidence

| Feature | Implementation | Status |
|---------|----------------|--------|
| **Deployed Contract** | `0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669` | ✅ Live |
| **Live Frontend** | React + genlayer-js SDK | ✅ |
| **On-Chain AI** | `gl.nondet.exec_prompt()` | ✅ |
| **Web Data Fetching** | `gl.nondet.web.render()` | ✅ |
| **Validator Consensus** | `gl.vm.run_nondet_unsafe()` | ✅ |

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
- View contract: [0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669](https://explorer-bradbury.genlayer.com/address/0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669)
- Transaction history visible on explorer

---

## 🔧 Intelligent Contract

Uses the **exact same pattern** as official GenLayer examples (NewsVerifier, DAOGuard):

```python
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

import json
from genlayer import *


class FootballPredictor(gl.Contract):
    predictions: TreeMap[str, str]
    prediction_count: u256

    def __init__(self):
        self.prediction_count = u256(0)

    @gl.public.write
    def predict_match(self, home_team: str, away_team: str, match_date: str) -> str:
        prediction = self._analyze_match(home_team, away_team, match_date)
        
        key = str(int(self.prediction_count))
        record = {
            "submitter": str(gl.message.sender_address),
            "home_team": home_team,
            "away_team": away_team,
            "match_date": match_date,
            **prediction
        }
        self.predictions[key] = json.dumps(record)
        self.prediction_count += u256(1)
        return key

    def _analyze_match(self, home_team: str, away_team: str, match_date: str) -> dict:
        def leader_fn() -> str:
            # Fetch live data from BBC Sport
            bbc_url = "https://www.bbc.com/sport/football/scores-fixtures/" + match_date
            page_content = gl.nondet.web.render(bbc_url, mode="text")[:4000]

            prompt = f"""You are a football analyst AI. Analyze:
HOME: {home_team} vs AWAY: {away_team} on {match_date}
Data: {page_content}

Reply JSON: {{"home_win_prob": <0-100>, "draw_prob": <0-100>, "away_win_prob": <0-100>, 
"predicted_score": "<score>", "confidence": "high/medium/low", "analysis": "<text>"}}"""

            raw = gl.nondet.exec_prompt(prompt, response_format="json")
            data = raw if isinstance(raw, dict) else json.loads(str(raw))
            return json.dumps(data, sort_keys=True)

        def validator_fn(leader_result) -> bool:
            if not isinstance(leader_result, gl.vm.Return):
                return False
            try:
                data = json.loads(leader_result.calldata)
                return data.get("confidence") in ("high", "medium", "low")
            except:
                return False

        return json.loads(gl.vm.run_nondet_unsafe(leader_fn, validator_fn))

    @gl.public.view
    def get_prediction(self, prediction_id: str) -> dict:
        if prediction_id not in self.predictions:
            return {"exists": False}
        return json.loads(self.predictions[prediction_id])

    @gl.public.view
    def get_count(self) -> dict:
        return {"total": int(self.prediction_count)}
```

---

## 🏗️ Architecture

```
User Browser
    │
    ├── React 19 + TypeScript
    ├── MetaMask Wallet  
    └── genlayer-js SDK
            │
            ▼
┌─────────────────────────────────────────────────────┐
│         GenLayer Testnet Bradbury                    │
│                                                      │
│  Contract: 0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669
│                                                      │
│  FootballPredictor                                   │
│  ├── gl.nondet.web.render() → BBC Sport data        │
│  ├── gl.nondet.exec_prompt() → AI analysis          │
│  ├── gl.vm.run_nondet_unsafe() → Consensus          │
│  └── TreeMap storage → On-chain predictions         │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AI-Football-Predictor/
├── contracts/
│   └── football_predictor.py    # Deployed Intelligent Contract
├── src/
│   ├── config/contract.ts       # Contract address config
│   ├── hooks/
│   │   ├── useWallet.ts         # MetaMask integration
│   │   └── useGenLayer.ts       # genlayer-js SDK
│   └── components/              # React UI components
├── deploy/
│   └── deploy.mjs               # Deploy script
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MetaMask browser extension
- GEN tokens from [Faucet](https://testnet-faucet.genlayer.foundation/)

### Run Locally

```bash
git clone https://github.com/lobinni/AI-Football-Predictor.git
cd AI-Football-Predictor
npm install
npm run dev
```

---

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| Blockchain | GenLayer Testnet Bradbury |
| Contract | Python + `py-genlayer` (pinned version) |
| Consensus | `gl.vm.run_nondet_unsafe()` |
| Frontend | React 19 + TypeScript |
| SDK | genlayer-js |
| Styling | Tailwind CSS 4 |

---

## 📜 License

MIT License

---

**Built with ❤️ on GenLayer**

**Contract:** `0x10BaD21722eA75a7CF67eF6fD3B6501fc92AF669` | **Network:** Testnet Bradbury | **Live:** [ai-football-predictor.pages.dev](https://ai-football-predictor.pages.dev/)
