import { CheckCircle, Circle, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { projectPhases } from '../data/feasibility';

export function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🗺️ Implementation Roadmap</h2>
        <p className="text-orange-100 mb-6">
          Detailed step-by-step plan to deploy the FootballAI project on GenLayer,
          suitable for development on GitHub Codespace.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {projectPhases.map((phase) => (
            <div key={phase.id} className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold">Phase {phase.id}</div>
              <div className="text-xs text-orange-100">{phase.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Codespace Setup */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">💻</span>
          GitHub Codespace Setup
        </h3>
        
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <div className="space-y-2">
            <p className="text-gray-500"># 1. Fork GenLayer boilerplate</p>
            <p>gh repo fork genlayerlabs/genlayer-project-boilerplate</p>
            <p></p>
            <p className="text-gray-500"># 2. Open in Codespace</p>
            <p>gh codespace create -r your-username/football-ai</p>
            <p></p>
            <p className="text-gray-500"># 3. Install dependencies</p>
            <p>pip install -r requirements.txt</p>
            <p>npm install</p>
            <p></p>
            <p className="text-gray-500"># 4. Start GenLayer Studio</p>
            <p>genlayer studio start</p>
            <p></p>
            <p className="text-gray-500"># 5. Run tests</p>
            <p>gltest</p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> GitHub Codespace provides a complete cloud development environment. 
            You can run GenLayer Studio directly in the browser without any local setup.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📅 Phase Details</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          {/* Phases */}
          <div className="space-y-6">
            {projectPhases.map((phase) => (
              <div key={phase.id} className="relative">
                {/* Status indicator */}
                <div className="absolute left-5 -translate-x-1/2 z-10 bg-white p-1">
                  {getStatusIcon(phase.status)}
                </div>
                
                {/* Content */}
                <div className="ml-16">
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className="w-full text-left"
                  >
                    <div className={`rounded-xl border-2 transition-all ${
                      expandedPhase === phase.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-gray-800">{phase.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(phase.status)} text-white`}>
                              {phase.status === 'completed' ? 'Completed' : 
                               phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Duration: {phase.duration} • {phase.tasks.length} tasks
                          </p>
                        </div>
                        {expandedPhase === phase.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* Tasks */}
                  {expandedPhase === phase.id && (
                    <div className="mt-3 ml-4 space-y-3">
                      {phase.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className={`p-4 rounded-lg border ${
                            task.completed 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              readOnly
                              className="mt-1 w-4 h-4 text-green-500 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className={`font-medium ${
                                  task.completed ? 'text-green-700 line-through' : 'text-gray-800'
                                }`}>
                                  {task.name}
                                </h5>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          CI/CD with GitHub Actions
        </h3>
        
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <pre>{`# .github/workflows/deploy.yml
name: Deploy to GenLayer

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run tests
        run: gltest
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Testnet
        run: genlayer deploy --network testnet
        env:
          GENLAYER_PRIVATE_KEY: \${{ secrets.PRIVATE_KEY }}`}</pre>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🎯 Key Milestones</h3>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl mb-2">🏁</div>
            <div className="font-bold">Week 2</div>
            <div className="text-sm text-purple-100">Environment Ready</div>
            <p className="text-xs text-purple-200 mt-2">GenLayer Studio setup, first contract deployed</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-bold">Week 5</div>
            <div className="text-sm text-purple-100">Smart Contract MVP</div>
            <p className="text-xs text-purple-200 mt-2">Prediction contract with web data aggregation</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-bold">Week 8</div>
            <div className="text-sm text-purple-100">Frontend Complete</div>
            <p className="text-xs text-purple-200 mt-2">Full UI with wallet integration</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-bold">Week 12</div>
            <div className="text-sm text-purple-100">Public Launch</div>
            <p className="text-xs text-purple-200 mt-2">Deployed on testnet, ready for users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
