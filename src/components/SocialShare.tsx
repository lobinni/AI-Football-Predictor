import { Share2, Send, Copy, Check, X } from 'lucide-react';
import { useState } from 'react';

interface ShareData {
  homeTeam: string;
  awayTeam: string;
  prediction: {
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
    predictedScore: string;
  };
  tournament?: string;
}

interface SocialShareProps {
  data: ShareData;
  onClose: () => void;
}

export function SocialShare({ data, onClose }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `⚽ My AI Prediction on @GenLayer:

${data.homeTeam} vs ${data.awayTeam}
${data.tournament ? `🏆 ${data.tournament}\n` : ''}
📊 Prediction:
• ${data.homeTeam} Win: ${data.prediction.homeWinProb}%
• Draw: ${data.prediction.drawProb}%
• ${data.awayTeam} Win: ${data.prediction.awayWinProb}%
• Score: ${data.prediction.predictedScore}

🔗 Powered by FootballAI on GenLayer
#FootballAI #GenLayer #AIprediction`;

  const shareUrl = window.location.href;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.homeTeam} vs ${data.awayTeam} - AI Prediction`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            <h3 className="font-bold">Share Prediction</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="bg-white rounded-lg p-3 border shadow-sm">
            <div className="text-center mb-2">
              <span className="text-xs text-gray-500">{data.tournament}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="font-bold text-gray-800">{data.homeTeam}</span>
              <span className="text-gray-400">vs</span>
              <span className="font-bold text-gray-800">{data.awayTeam}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-green-50 rounded p-1">
                <div className="font-bold text-green-600">{data.prediction.homeWinProb}%</div>
                <div className="text-xs text-green-700">Win</div>
              </div>
              <div className="bg-gray-50 rounded p-1">
                <div className="font-bold text-gray-600">{data.prediction.drawProb}%</div>
                <div className="text-xs text-gray-700">Draw</div>
              </div>
              <div className="bg-red-50 rounded p-1">
                <div className="font-bold text-red-600">{data.prediction.awayWinProb}%</div>
                <div className="text-xs text-red-700">Loss</div>
              </div>
            </div>
            <div className="text-center mt-2 text-sm">
              Predicted Score: <span className="font-bold">{data.prediction.predictedScore}</span>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </button>
            
            <button
              onClick={shareToTelegram}
              className="flex items-center justify-center gap-2 bg-[#0088cc] text-white py-3 px-4 rounded-xl hover:bg-[#0077b5] transition-colors"
            >
              <Send className="w-5 h-5" />
              Telegram
            </button>
          </div>

          <button
            onClick={shareToFacebook}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3 px-4 rounded-xl hover:bg-[#166fe5] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>

          {'share' in navigator && (
            <button
              onClick={nativeShare}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              More Options
            </button>
          )}

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Text
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
