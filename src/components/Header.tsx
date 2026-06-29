import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { WalletConnect } from './WalletConnect';
import { NotificationCenter } from './NotificationCenter';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'demo', label: 'Predictions', icon: '⚽' },
    { id: 'contract', label: 'Contract', icon: '📜' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'history', label: 'History', icon: '📊' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'achievements', label: 'Achievements', icon: '🎖️' },
    { id: 'feasibility', label: 'Feasibility', icon: '📋' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    { id: 'tech', label: 'Tech', icon: '🛠️' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'features', label: 'Features', icon: '✨' },
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FootballAI</h1>
              <p className="text-xs text-emerald-100">Powered by GenLayer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {tabs.slice(0, 6).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-emerald-100 hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
            
            {/* More dropdown for additional tabs */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:bg-white/10 flex items-center gap-1">
                <span>📁</span>
                <span>More</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {tabs.slice(6).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                      activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Side - Notifications & Wallet */}
          <div className="hidden md:flex items-center gap-2">
            <NotificationCenter />
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden pb-4 space-y-4">
            {/* Mobile Wallet & Notifications */}
            <div className="pb-4 border-b border-white/20 flex items-center gap-2">
              <NotificationCenter />
              <WalletConnect />
            </div>
            
            {/* Mobile Nav Links */}
            <nav className="grid grid-cols-3 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'text-emerald-100 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
