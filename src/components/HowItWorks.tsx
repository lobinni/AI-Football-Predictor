import { Cpu, Globe, Brain, Database, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Select Match',
      description: 'Choose from ongoing tournaments like World Cup, Premier League, Champions League',
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Call Contract',
      description: 'Your prediction request is sent to the deployed Intelligent Contract on GenLayer',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Analysis',
      description: 'Validators fetch live data via gl.get_webpage() and analyze using gl.exec_prompt()',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Consensus',
      description: 'Validators reach consensus on the prediction via gl.eq_principle_strict_eq()',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'On-Chain Storage',
      description: 'Final prediction is stored permanently on the GenLayer blockchain',
    },
  ];

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-6 text-center">
        How It Works
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center text-green-400 mb-3">
                {step.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
            
            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 -right-2 text-gray-600">→</div>
            )}
          </div>
        ))}
      </div>

      {/* Code Example */}
      <div className="mt-6 bg-black/30 rounded-lg p-4">
        <p className="text-xs text-gray-400 mb-2">Contract Method Called:</p>
        <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`await client.writeContract({
  address: "0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D",
  functionName: "predict_match",
  args: [homeTeam, awayTeam, matchDate]
});`}
        </pre>
      </div>
    </div>
  );
}
