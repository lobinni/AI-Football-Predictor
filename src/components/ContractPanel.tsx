import { useState } from 'react';
import { useGenLayer, FOOTBALL_PREDICTOR_CODE } from '../hooks/useGenLayer';
import { useWallet } from '../hooks/useWallet';
import { FileCode, Rocket, Copy, Check, ExternalLink, Loader2, AlertTriangle, Settings, Search } from 'lucide-react';
import { GENLAYER_CHAIN } from '../hooks/useWallet';

export function ContractPanel() {
  const { isConnected, address, isGenLayer } = useWallet();
  const {
    isReady,
    contractAddress,
    lastTxHash,
    error: glError,
    loading: glLoading,
    connectWithWallet,
    setContractAddress,
    deployContract,
    getPredictionCount,
    readPrediction,
    getContractSchema,
  } = useGenLayer();

  const [copied, setCopied] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [predictionCount, setPredictionCount] = useState<number | null>(null);
  const [schema, setSchema] = useState<any>(null);
  const [queryId, setQueryId] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);

  // Initialize GenLayer client when wallet connects
  const handleInit = () => {
    if (address) {
      connectWithWallet(address);
    }
  };

  const handleDeploy = async () => {
    if (!isReady) handleInit();
    await deployContract(FOOTBALL_PREDICTOR_CODE);
  };

  const handleSetAddress = () => {
    if (manualAddress.startsWith('0x') && manualAddress.length === 42) {
      setContractAddress(manualAddress);
    }
  };

  const handleGetCount = async () => {
    const count = await getPredictionCount();
    setPredictionCount(count);
  };

  const handleGetSchema = async () => {
    const s = await getContractSchema();
    setSchema(s);
  };

  const handleQuery = async () => {
    if (!queryId) return;
    const result = await readPrediction(queryId);
    setQueryResult(result ? JSON.stringify(result, null, 2) : 'Not found');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(FOOTBALL_PREDICTOR_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <FileCode className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Intelligent Contract</h2>
            <p className="text-violet-200">Deploy & interact with FootballPredictor on GenLayer</p>
          </div>
        </div>
        <p className="text-violet-100 text-sm">
          This is a real GenLayer Intelligent Contract written in Python. It uses
          <code className="bg-white/20 px-1.5 py-0.5 rounded mx-1">gl.get_webpage()</code> to fetch live data and
          <code className="bg-white/20 px-1.5 py-0.5 rounded mx-1">gl.exec_prompt()</code> for AI analysis on-chain.
        </p>
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-violet-500" />
          Connection Status
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border-2 ${isConnected && isGenLayer ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`w-3 h-3 rounded-full mb-2 ${isConnected && isGenLayer ? 'bg-green-500' : 'bg-gray-300'}`} />
            <p className="text-sm font-medium text-gray-800">Wallet</p>
            <p className="text-xs text-gray-500">{isConnected && isGenLayer ? `${address?.slice(0,6)}...${address?.slice(-4)}` : 'Not connected to GenLayer'}</p>
          </div>
          <div className={`p-4 rounded-xl border-2 ${isReady ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`w-3 h-3 rounded-full mb-2 ${isReady ? 'bg-green-500' : 'bg-gray-300'}`} />
            <p className="text-sm font-medium text-gray-800">SDK Client</p>
            <p className="text-xs text-gray-500">{isReady ? 'Initialized (genlayer-js)' : 'Not initialized'}</p>
          </div>
          <div className={`p-4 rounded-xl border-2 ${contractAddress ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className={`w-3 h-3 rounded-full mb-2 ${contractAddress ? 'bg-green-500' : 'bg-gray-300'}`} />
            <p className="text-sm font-medium text-gray-800">Contract</p>
            <p className="text-xs text-gray-500 break-all">{contractAddress ? `${contractAddress.slice(0,10)}...` : 'Not deployed'}</p>
          </div>
        </div>

        {!isReady && isConnected && isGenLayer && (
          <button onClick={handleInit} className="mt-4 bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 text-sm font-medium">
            Initialize GenLayer SDK
          </button>
        )}
      </div>

      {/* Error */}
      {glError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Error</p>
            <p className="text-sm text-red-600">{glError}</p>
          </div>
        </div>
      )}

      {/* Deploy or Set Address */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-violet-500" />
          Deploy or Connect Contract
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Deploy New */}
          <div className="border-2 border-dashed border-violet-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2">Deploy New Contract</h4>
            <p className="text-sm text-gray-600 mb-4">
              Deploy FootballPredictor.py to GenLayer Testnet Bradbury. Requires GEN for gas.
            </p>
            <button
              onClick={handleDeploy}
              disabled={glLoading || !isReady}
              className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {glLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Deploying...</>
              ) : (
                <><Rocket className="w-4 h-4" /> Deploy Contract</>
              )}
            </button>
          </div>

          {/* Set Existing Address */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2">Use Existing Contract</h4>
            <p className="text-sm text-gray-600 mb-4">
              Enter the address of an already-deployed FootballPredictor contract.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualAddress}
                onChange={e => setManualAddress(e.target.value)}
                placeholder="0x..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <button
                onClick={handleSetAddress}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
              >
                Set
              </button>
            </div>
          </div>
        </div>

        {/* Contract address result */}
        {contractAddress && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Contract deployed!</p>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-xs text-green-700 font-mono break-all">{contractAddress}</code>
              <a
                href={`${GENLAYER_CHAIN.explorerUrl}/contract/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {lastTxHash && (
          <div className="mt-2 text-xs text-gray-500">
            TX: <a href={`${GENLAYER_CHAIN.explorerUrl}/tx/${lastTxHash}`} target="_blank" rel="noopener noreferrer" className="text-violet-600 underline">{lastTxHash.slice(0,20)}...</a>
          </div>
        )}
      </div>

      {/* Read Operations */}
      {contractAddress && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            Read Contract (View — Free)
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">get_prediction_count()</p>
              <button onClick={handleGetCount} className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600">
                Call
              </button>
              {predictionCount !== null && (
                <p className="mt-2 text-lg font-bold text-blue-600">{predictionCount} predictions</p>
              )}
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">getContractSchema()</p>
              <button onClick={handleGetSchema} className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600">
                Call
              </button>
              {schema && (
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">{JSON.stringify(schema, null, 2)}</pre>
              )}
            </div>
          </div>

          <div className="mt-4 p-4 border rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">get_prediction(prediction_id)</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={queryId}
                onChange={e => setQueryId(e.target.value)}
                placeholder="Brazil_vs_Serbia_2026-06-15_1"
                className="flex-1 px-3 py-2 border rounded text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button onClick={handleQuery} className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                Query
              </button>
            </div>
            {queryResult && (
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">{queryResult}</pre>
            )}
          </div>
        </div>
      )}

      {/* Contract Source Code */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-bold text-gray-800 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-500" />
            FootballPredictor.py — Source Code
          </span>
          <span className="text-sm text-gray-500">{showCode ? 'Hide' : 'Show'}</span>
        </button>

        {showCode && (
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 hover:bg-white z-10"
            >
              {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
            <pre className="bg-gray-900 text-green-400 p-6 text-sm overflow-auto max-h-[600px] font-mono leading-relaxed">
              {FOOTBALL_PREDICTOR_CODE}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
