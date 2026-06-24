import { 
  Zap, Bell, Trophy, Users, BarChart3, Globe, Smartphone, 
  Code, Award, Wifi, TrendingUp, Shield, Coins, MessageSquare,
  ChevronRight, Star, Clock, Target
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
  effort: 'small' | 'medium' | 'large';
  impact: 'high' | 'medium' | 'low';
  status: 'proposed' | 'in-progress' | 'planned';
  category: string;
}

const proposedFeatures: Feature[] = [
  {
    id: '1',
    title: 'Real-time Match Data',
    description: 'WebSocket integration for live scores, odds updates, and match events in real-time.',
    icon: <Wifi className="w-6 h-6" />,
    priority: 'high',
    effort: 'medium',
    impact: 'high',
    status: 'proposed',
    category: 'Data'
  },
  {
    id: '2',
    title: 'Prediction History & Accuracy',
    description: 'Track all user predictions on-chain and calculate accuracy statistics over time.',
    icon: <BarChart3 className="w-6 h-6" />,
    priority: 'high',
    effort: 'medium',
    impact: 'high',
    status: 'planned',
    category: 'Analytics'
  },
  {
    id: '3',
    title: 'Betting Pool with Staking',
    description: 'Allow users to stake GEN tokens on predictions and win rewards for correct predictions.',
    icon: <Coins className="w-6 h-6" />,
    priority: 'high',
    effort: 'large',
    impact: 'high',
    status: 'proposed',
    category: 'DeFi'
  },
  {
    id: '4',
    title: 'Global Leaderboard',
    description: 'Ranking system for top predictors with weekly, monthly, and all-time standings.',
    icon: <Trophy className="w-6 h-6" />,
    priority: 'medium',
    effort: 'medium',
    impact: 'high',
    status: 'planned',
    category: 'Gamification'
  },
  {
    id: '5',
    title: 'Social Sharing',
    description: 'Share predictions on Twitter, Telegram, and Discord with embedded prediction cards.',
    icon: <Users className="w-6 h-6" />,
    priority: 'medium',
    effort: 'small',
    impact: 'medium',
    status: 'proposed',
    category: 'Social'
  },
  {
    id: '6',
    title: 'Push Notifications',
    description: 'Get notified before matches, when predictions are ready, and when results are in.',
    icon: <Bell className="w-6 h-6" />,
    priority: 'medium',
    effort: 'medium',
    impact: 'medium',
    status: 'proposed',
    category: 'UX'
  },
  {
    id: '7',
    title: 'Multi-language Support',
    description: 'Support for English, Spanish, Portuguese, French, German, and more languages.',
    icon: <Globe className="w-6 h-6" />,
    priority: 'medium',
    effort: 'medium',
    impact: 'medium',
    status: 'proposed',
    category: 'Localization'
  },
  {
    id: '8',
    title: 'Mobile App (React Native)',
    description: 'Native mobile app for iOS and Android with push notifications and offline support.',
    icon: <Smartphone className="w-6 h-6" />,
    priority: 'low',
    effort: 'large',
    impact: 'high',
    status: 'proposed',
    category: 'Platform'
  },
  {
    id: '9',
    title: 'NFT Achievement Badges',
    description: 'Earn NFT badges for milestones: first prediction, winning streak, accuracy achievements.',
    icon: <Award className="w-6 h-6" />,
    priority: 'low',
    effort: 'medium',
    impact: 'medium',
    status: 'proposed',
    category: 'Gamification'
  },
  {
    id: '10',
    title: 'Public API',
    description: 'REST API for third-party integrations, bots, and data access.',
    icon: <Code className="w-6 h-6" />,
    priority: 'low',
    effort: 'medium',
    impact: 'medium',
    status: 'proposed',
    category: 'Developer'
  },
  {
    id: '11',
    title: 'Advanced Team Analytics',
    description: 'Deep dive into team form, player stats, injuries, and tactical analysis.',
    icon: <TrendingUp className="w-6 h-6" />,
    priority: 'high',
    effort: 'large',
    impact: 'high',
    status: 'proposed',
    category: 'Analytics'
  },
  {
    id: '12',
    title: 'Community Forum',
    description: 'Discussion threads for each match, expert opinions, and prediction debates.',
    icon: <MessageSquare className="w-6 h-6" />,
    priority: 'low',
    effort: 'large',
    impact: 'medium',
    status: 'proposed',
    category: 'Social'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'low': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getEffortColor = (effort: string) => {
  switch (effort) {
    case 'small': return 'bg-emerald-100 text-emerald-700';
    case 'medium': return 'bg-blue-100 text-blue-700';
    case 'large': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getImpactStars = (impact: string) => {
  switch (impact) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 1;
  }
};

export function ProposedFeatures() {
  const categories = [...new Set(proposedFeatures.map(f => f.category))];
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Proposed Features</h2>
            <p className="text-violet-100">Optimization roadmap for FootballAI</p>
          </div>
        </div>
        <p className="text-violet-50 text-sm">
          These features are proposed to enhance user experience, increase engagement, 
          and add more value to the platform. Prioritized by impact and development effort.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl font-bold text-violet-600">{proposedFeatures.length}</div>
          <div className="text-sm text-gray-600">Total Features</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">
            {proposedFeatures.filter(f => f.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {proposedFeatures.filter(f => f.status === 'planned').length}
          </div>
          <div className="text-sm text-gray-600">Planned</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl font-bold text-emerald-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-violet-500" />
          Priority Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Priority</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Effort</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Impact</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {proposedFeatures
                .sort((a, b) => {
                  const priorityOrder = { high: 0, medium: 1, low: 2 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((feature) => (
                  <tr key={feature.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-violet-500">{feature.icon}</span>
                        <span className="font-medium text-gray-800">{feature.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                        {feature.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(feature.effort)}`}>
                        {feature.effort}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < getImpactStars(feature.impact)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feature.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                        feature.status === 'in-progress' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {feature.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Cards by Category */}
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            {category}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {proposedFeatures
              .filter(f => f.category === category)
              .map((feature) => (
                <div 
                  key={feature.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-violet-100 text-violet-600 p-2 rounded-lg shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                          {feature.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {feature.effort} effort
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {feature.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Implementation Recommendations */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Implementation Recommendations
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Phase 1: Quick Wins (1-2 weeks)
            </h4>
            <ul className="space-y-2 text-emerald-50 text-sm">
              <li>• Social sharing buttons</li>
              <li>• Prediction history storage</li>
              <li>• Basic leaderboard</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Phase 2: Core Features (3-4 weeks)
            </h4>
            <ul className="space-y-2 text-emerald-50 text-sm">
              <li>• Real-time data integration</li>
              <li>• Accuracy tracking system</li>
              <li>• Push notifications</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Phase 3: DeFi Integration (4-6 weeks)
            </h4>
            <ul className="space-y-2 text-emerald-50 text-sm">
              <li>• Betting pool smart contract</li>
              <li>• GEN staking mechanism</li>
              <li>• Reward distribution</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Phase 4: Scale & Expand (6-8 weeks)
            </h4>
            <ul className="space-y-2 text-emerald-50 text-sm">
              <li>• Mobile app development</li>
              <li>• Multi-language support</li>
              <li>• NFT achievements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Considerations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">⚙️ Technical Considerations</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Performance</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Implement caching for API calls</li>
              <li>• Use React.memo for components</li>
              <li>• Lazy load tournament data</li>
              <li>• Optimize bundle size</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Security</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Smart contract audit</li>
              <li>• Rate limiting for API</li>
              <li>• Input validation</li>
              <li>• Secure wallet handling</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-800 mb-2">Scalability</h4>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Database for prediction history</li>
              <li>• CDN for static assets</li>
              <li>• Microservices architecture</li>
              <li>• Load balancing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
