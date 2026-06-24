import { techStack } from '../data/feasibility';
import { Database, Code, Layout, Globe } from 'lucide-react';

export function TechStack() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Blockchain':
        return <Database className="w-6 h-6" />;
      case 'Smart Contract':
        return <Code className="w-6 h-6" />;
      case 'Frontend':
        return <Layout className="w-6 h-6" />;
      case 'Data Sources':
        return <Globe className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Blockchain':
        return 'from-purple-500 to-indigo-500';
      case 'Smart Contract':
        return 'from-emerald-500 to-teal-500';
      case 'Frontend':
        return 'from-blue-500 to-cyan-500';
      case 'Data Sources':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🛠️ Tech Stack</h2>
        <p className="text-cyan-100">
          Overview of technologies used to build FootballAI on GenLayer blockchain.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📐 System Architecture</h3>
        
        <div className="relative">
          {/* User Layer */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="text-center mb-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Frontend Layer
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl mb-1">🖥️</div>
                <div className="text-sm font-medium">React App</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl mb-1">👛</div>
                <div className="text-sm font-medium">MetaMask</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm font-medium">Charts</div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <div className="text-2xl">⬇️</div>
          </div>

          {/* GenLayer SDK */}
          <div className="bg-purple-50 rounded-xl p-4 mb-4">
            <div className="text-center mb-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                GenLayer SDK
              </span>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-sm font-medium">Contract Interaction • Transaction Signing</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <div className="text-2xl">⬇️</div>
          </div>

          {/* Blockchain Layer */}
          <div className="bg-emerald-50 rounded-xl p-4 mb-4">
            <div className="text-center mb-2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                GenLayer Blockchain
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-1">📜</div>
                  <div className="text-sm font-medium">Intelligent Contract</div>
                  <div className="text-xs text-gray-500 mt-1">FootballPredictor.py</div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-1">🤖</div>
                  <div className="text-sm font-medium">GenVM</div>
                  <div className="text-xs text-gray-500 mt-1">AI Execution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <div className="text-2xl">⬇️</div>
          </div>

          {/* External Data */}
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="text-center mb-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                External Data Sources
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg mb-1">📰</div>
                <div className="text-xs font-medium">BBC Sport</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg mb-1">📈</div>
                <div className="text-xs font-medium">Bookmakers</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg mb-1">📊</div>
                <div className="text-xs font-medium">Sofascore</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-lg mb-1">🏆</div>
                <div className="text-xs font-medium">ESPN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {techStack.map((category) => (
          <div key={category.category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${getCategoryColor(category.category)} p-4 text-white`}>
              <div className="flex items-center gap-3">
                {getCategoryIcon(category.category)}
                <h3 className="text-lg font-bold">{category.category}</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Code className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🔄 Data Flow</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1 bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">User enters match information</p>
              <p className="text-sm text-gray-600">Home team, Away team, Match date</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
            <div className="flex-1 bg-purple-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Frontend calls Intelligent Contract</p>
              <p className="text-sm text-gray-600">predict_match(home, away, date) via GenLayer SDK</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
            <div className="flex-1 bg-emerald-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Contract fetches data from web</p>
              <p className="text-sm text-gray-600">gl.get_webpage() - BBC Sport, bookmakers, analysts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
            <div className="flex-1 bg-orange-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">AI analyzes and aggregates</p>
              <p className="text-sm text-gray-600">gl.exec_prompt() - LLM processing with validator consensus</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</div>
            <div className="flex-1 bg-pink-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Save prediction on-chain</p>
              <p className="text-sm text-gray-600">Results recorded on blockchain, verifiable</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-cyan-100 text-cyan-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">6</div>
            <div className="flex-1 bg-cyan-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Display results to user</p>
              <p className="text-sm text-gray-600">Win/Draw/Loss probabilities, predicted score, analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
