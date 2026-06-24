import { CheckCircle, AlertCircle, XCircle, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import { feasibilityAnalysis } from '../data/feasibility';

export function FeasibilityAnalysis() {
  const strengths = feasibilityAnalysis.filter(item => item.category === 'strengths');
  const challenges = feasibilityAnalysis.filter(item => item.category === 'challenges');
  const opportunities = feasibilityAnalysis.filter(item => item.category === 'opportunities');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'neutral':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'negative':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'neutral':
        return 'border-yellow-200 bg-yellow-50';
      case 'negative':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">📋 Feasibility Analysis</h2>
        <p className="text-indigo-100 mb-6">
          Comprehensive evaluation of building a football prediction dApp on GenLayer blockchain.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">85%</div>
            <div className="text-sm text-indigo-100">Technical Feasibility</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">70%</div>
            <div className="text-sm text-indigo-100">Market Potential</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">60%</div>
            <div className="text-sm text-indigo-100">Legal Risk</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold">12w</div>
            <div className="text-sm text-indigo-100">Estimated Time</div>
          </div>
        </div>
      </div>

      {/* GenLayer Benefits */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Why Choose GenLayer?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg shrink-0">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Intelligent Contracts</h4>
                <p className="text-sm text-gray-600">
                  Contracts can process natural language, access real-time web data - 
                  no need for external oracles like Chainlink.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Optimistic Democracy</h4>
                <p className="text-sm text-gray-600">
                  Consensus mechanism with LLM validators ensures reliable 
                  and verifiable AI results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Python Development</h4>
                <p className="text-sm text-gray-600">
                  No need to learn Solidity. Write contracts in familiar Python, 
                  leverage the rich AI/ML ecosystem.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Comparison with Traditional Smart Contracts</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600">Feature</th>
                  <th className="text-center py-2 text-gray-600">GenLayer</th>
                  <th className="text-center py-2 text-gray-600">Ethereum</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Web Data Access</td>
                  <td className="text-center">✅ Native</td>
                  <td className="text-center">❌ Oracle</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">AI Processing</td>
                  <td className="text-center">✅ Native</td>
                  <td className="text-center">❌ Off-chain</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Language</td>
                  <td className="text-center">Python</td>
                  <td className="text-center">Solidity</td>
                </tr>
                <tr>
                  <td className="py-2">NLP Support</td>
                  <td className="text-center">✅ Yes</td>
                  <td className="text-center">❌ No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">💪</span>
          Strengths
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {strengths.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${getStatusBg(item.status)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    {getStatusIcon(item.status)}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          Challenges & Risks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${getStatusBg(item.status)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    {getStatusIcon(item.status)}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          Opportunities
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 ${getStatusBg(item.status)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    {getStatusIcon(item.status)}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">📌 Conclusion</h3>
        <div className="space-y-3 text-emerald-50">
          <p>
            <strong className="text-white">Overall Assessment:</strong> The project has HIGH technical feasibility. 
            GenLayer provides all the necessary infrastructure for an intelligent football prediction dApp.
          </p>
          <p>
            <strong className="text-white">Recommendation:</strong> Start with a simple MVP focusing on 
            basic prediction features before expanding to betting/staking. Legal consultation is 
            required before commercial deployment.
          </p>
          <p>
            <strong className="text-white">Timeline:</strong> 10-12 weeks for MVP, additional 4-6 weeks for 
            betting features and security audit.
          </p>
        </div>
      </div>
    </div>
  );
}
