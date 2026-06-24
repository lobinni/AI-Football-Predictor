import { useState } from 'react';
import { Header } from './components/Header';
import { PredictionDemo } from './components/PredictionDemo';
import { PredictionHistory } from './components/PredictionHistory';
import { Leaderboard } from './components/Leaderboard';
import { AchievementsPanel } from './components/AchievementsPanel';
import { NewsSection } from './components/NewsSection';
import { FeasibilityAnalysis } from './components/FeasibilityAnalysis';
import { Roadmap } from './components/Roadmap';
import { TechStack } from './components/TechStack';
import { CodeExamples } from './components/CodeExamples';
import { ProposedFeatures } from './components/ProposedFeatures';
import { ExternalLink, Heart } from 'lucide-react';
import { useWallet } from './hooks/useWallet';

function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const { address } = useWallet();

  const renderContent = () => {
    switch (activeTab) {
      case 'demo':
        return <PredictionDemo />;
      case 'news':
        return <NewsSection />;
      case 'history':
        return <PredictionHistory />;
      case 'leaderboard':
        return <Leaderboard currentUserAddress={address || undefined} />;
      case 'achievements':
        return <AchievementsPanel />;
      case 'feasibility':
        return <FeasibilityAnalysis />;
      case 'roadmap':
        return <Roadmap />;
      case 'tech':
        return <TechStack />;
      case 'code':
        return <CodeExamples />;
      case 'features':
        return <ProposedFeatures />;
      default:
        return <PredictionDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-lg">
                  <span className="text-xl">⚽</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">FootballAI</h3>
                  <p className="text-sm text-gray-400">Powered by GenLayer</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered football prediction dApp using Intelligent Contracts on GenLayer blockchain. 
                Features include prediction history, achievements, leaderboards, and social sharing.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a 
                    href="https://docs.genlayer.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GenLayer Docs
                  </a>
                </li>
                <li>
                  <a 
                    href="https://studio.genlayer.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GenLayer Studio
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/genlayerlabs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GenLayer GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://testnet-faucet.genlayer.foundation/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GEN Faucet
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>🎯 AI Match Predictions</li>
                <li>📊 Prediction History</li>
                <li>🏆 Global Leaderboard</li>
                <li>🎖️ Achievement System</li>
                <li>📤 Social Sharing</li>
                <li>🔔 Notifications</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for the GenLayer ecosystem
            </p>
            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              © 2026 FootballAI. Proof-of-concept demo.
            </p>
          </div>
        </div>
      </footer>

      {/* GenLayer Badge */}
      <a
        href="https://genlayer.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-medium"
      >
        <span>🔗</span>
        Built on GenLayer
      </a>
    </div>
  );
}

export default App;
