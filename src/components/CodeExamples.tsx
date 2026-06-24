import { useState } from 'react';
import { Copy, Check, FileCode, ExternalLink } from 'lucide-react';
import { codeExamples } from '../data/feasibility';

export function CodeExamples() {
  const [activeTab, setActiveTab] = useState<'contract' | 'frontend'>('contract');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'contract' as const, label: 'Intelligent Contract (Python)', icon: '🐍' },
    { id: 'frontend' as const, label: 'Frontend Integration', icon: '⚛️' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <FileCode className="w-8 h-8" />
          Code Examples
        </h2>
        <p className="text-gray-300">
          Real code examples for FootballAI - from Intelligent Contract to Frontend integration.
          You can copy and use as a template.
        </p>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Reference Documentation</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="https://docs.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <div className="bg-purple-500 text-white p-2 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">GenLayer Docs</h4>
              <p className="text-sm text-gray-600">Official documentation</p>
            </div>
          </a>
          
          <a
            href="https://github.com/genlayerlabs/genlayer-project-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="bg-gray-800 text-white p-2 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Boilerplate Repo</h4>
              <p className="text-sm text-gray-600">Project template</p>
            </div>
          </a>
          
          <a
            href="https://studio.genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <div className="bg-emerald-500 text-white p-2 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">GenLayer Studio</h4>
              <p className="text-sm text-gray-600">Online IDE</p>
            </div>
          </a>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="relative">
          <button
            onClick={() => copyToClipboard(codeExamples[activeTab])}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>

          <div className="bg-gray-900 p-6 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
              {codeExamples[activeTab]}
            </pre>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🔑 Key Concepts</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">gl.get_webpage(url, mode)</h4>
              <p className="text-sm text-yellow-700">
                Fetch content from any URL. Mode can be 'text' or 'html'.
                This is how contracts access data from the web.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">gl.exec_prompt(prompt)</h4>
              <p className="text-sm text-blue-700">
                Run AI prompt and receive result. LLM is connected directly to validators.
                Results are validated by multiple validators for consensus.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">gl.eq_principle_strict_eq(func)</h4>
              <p className="text-sm text-purple-700">
                Ensures function result is deterministic. 
                Validators will compare and only accept if results match.
              </p>
            </div>
            
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">@gl.public.write / @gl.public.view</h4>
              <p className="text-sm text-emerald-700">
                Decorators to mark methods. 'write' changes state (costs gas), 
                'view' only reads data (free).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* File Structure */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📁 Recommended Project Structure</h3>
        
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300">
          <pre>{`football-ai/
├── contracts/
│   ├── FootballPredictor.py      # Main prediction contract
│   ├── BettingPool.py            # Betting/staking contract
│   └── tests/
│       └── test_predictor.py     # Contract tests
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── MatchInput.tsx
│   │   │   ├── PredictionResult.tsx
│   │   │   └── WalletConnect.tsx
│   │   ├── hooks/
│   │   │   └── useGenLayer.ts    # SDK integration
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD
├── requirements.txt
├── README.md
└── .devcontainer/
    └── devcontainer.json         # Codespace config`}</pre>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🚀 Next Steps</h3>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <span>Fork boilerplate repo and setup GitHub Codespace</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <span>Run the PredictionMarket example from GenLayer docs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <span>Modify contract to add multi-source aggregation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <span>Build frontend and integrate with GenLayer SDK</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
            <span>Deploy to Testnet Bradbury and test with real data</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
