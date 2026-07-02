import { useState, useEffect } from 'react';
import { useWallet } from './hooks/useWallet';
import { useGenLayer } from './hooks/useGenLayer';
import { Header } from './components/Header';
import { ContractStatus } from './components/ContractStatus';
import { MatchSelector } from './components/MatchSelector';
import { PredictionPanel } from './components/PredictionPanel';
import { HowItWorks } from './components/HowItWorks';
import { Match } from './data/tournaments';
import { ExternalLink, FileText, Code2 } from 'lucide-react';
import { CONTRACT_ADDRESS, getContractExplorerUrl, GENLAYER_CONFIG } from './config/contract';

function App() {
  const wallet = useWallet();
  const genLayer = useGenLayer();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [predictionCount, setPredictionCount] = useState(0);

  // Initialize GenLayer client when wallet connects
  useEffect(() => {
    if (wallet.address && wallet.isGenLayer) {
      genLayer.connectWithWallet(wallet.address);
    }
  }, [wallet.address, wallet.isGenLayer]);

  // Fetch prediction count
  useEffect(() => {
    if (genLayer.isReady) {
      genLayer.getPredictionCount().then(count => setPredictionCount(count));
    }
  }, [genLayer.isReady]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header
        isConnected={wallet.isConnected}
        address={wallet.address}
        balance={wallet.balance}
        isGenLayer={wallet.isGenLayer}
        isConnecting={wallet.isConnecting}
        onConnect={wallet.connect}
        onDisconnect={wallet.disconnect}
        onRefreshBalance={wallet.refreshBalance}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              AI-Powered Football Predictions
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            On-chain AI analysis powered by GenLayer Intelligent Contracts.
            Every prediction is verified by validators and stored on the blockchain.
          </p>
        </div>

        {/* Contract Status */}
        <ContractStatus
          predictionCount={predictionCount}
          isLoading={!genLayer.isReady && wallet.isConnected}
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <MatchSelector
            onSelectMatch={setSelectedMatch}
            selectedMatch={selectedMatch}
          />
          <PredictionPanel
            match={selectedMatch}
            isConnected={wallet.isConnected}
            isGenLayer={wallet.isGenLayer}
            loading={genLayer.loading}
            error={genLayer.error}
            lastTxHash={genLayer.lastTxHash}
            onPredict={genLayer.predictMatch}
          />
        </div>

        {/* How It Works */}
        <HowItWorks />

        {/* Technical Details */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Technical Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-400 mb-3">Deployed Contract</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Address:</span>
                  <a
                    href={getContractExplorerUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-6)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-white">{GENLAYER_CONFIG.chainName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Explorer:</span>
                  <a
                    href={GENLAYER_CONFIG.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    explorer-bradbury.genlayer.com
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-400 mb-3">GenLayer Features Used</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <code className="bg-black/30 px-2 py-0.5 rounded text-xs">gl.get_webpage()</code>
                  <span className="text-gray-400">- Fetch live football data</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <code className="bg-black/30 px-2 py-0.5 rounded text-xs">gl.exec_prompt()</code>
                  <span className="text-gray-400">- AI analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <code className="bg-black/30 px-2 py-0.5 rounded text-xs">gl.eq_principle_strict_eq()</code>
                  <span className="text-gray-400">- Consensus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Code Preview */}
          <div className="mt-6">
            <h3 className="font-semibold text-green-400 mb-3">Contract Code (football_predictor.py)</h3>
            <pre className="bg-black/50 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
{`# { "Depends": "py-genlayer:test" }
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

            # AI analysis
            task = f"""Analyze {home_team} vs {away_team}..."""
            result = gl.exec_prompt(task)
            return json.dumps(json.loads(result), sort_keys=True)

        # Validators reach consensus
        prediction_json = gl.eq_principle_strict_eq(analyze)
        
        # Store on-chain
        self.predictions[prediction_id] = prediction_json
        return prediction_json`}
            </pre>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={getContractExplorerUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Contract on Explorer
          </a>
          <a
            href="https://github.com/lobinni/AI-Football-Predictor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Code2 className="w-4 h-4" />
            GitHub Repository
          </a>
          <a
            href="https://docs.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            GenLayer Docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Built with ❤️ on <span className="text-green-400">GenLayer</span> | 
            Contract: <code className="text-xs bg-black/30 px-2 py-0.5 rounded">{CONTRACT_ADDRESS}</code>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Every prediction is a transaction. Every transaction is permanent.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
