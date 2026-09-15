import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Key, MessageSquare, ShieldCheck } from 'lucide-react';
import { TELEGRAM_CONFIG, sendTelegramNotification } from '../config/telegram';

interface TelegramConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramConfigModal: React.FC<TelegramConfigModalProps> = ({ isOpen, onClose }) => {
  const [botToken, setBotToken] = useState(TELEGRAM_CONFIG.BOT_TOKEN);
  const [chatId, setChatId] = useState(TELEGRAM_CONFIG.CHAT_ID);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleTestNotification = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    // Temporarily set the entered config for testing
    TELEGRAM_CONFIG.BOT_TOKEN = botToken;
    TELEGRAM_CONFIG.CHAT_ID = chatId;

    const result = await sendTelegramNotification({
      step: 0,
      stepName: 'System Test Ping',
      timestamp: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
      fullName: 'Test Applicant',
      mobileNo: '0300-1234567',
      loanAmount: '10,00,000 PKR',
    });

    if (result.success) {
      setTestStatus('success');
    } else {
      setTestStatus('error');
      setErrorMessage(result.error || 'Failed to send message via Telegram API');
    }
  };

  const handleSave = () => {
    TELEGRAM_CONFIG.BOT_TOKEN = botToken;
    TELEGRAM_CONFIG.CHAT_ID = chatId;
    alert('Telegram settings updated in memory! You can also permanently keep them in src/config/telegram.ts');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#229ED9]/15 text-[#229ED9] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Telegram Bot Integration</h3>
              <p className="text-xs text-slate-500">Live notification dispatcher settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Integrated & Ready
            </div>
            <p>
              Your provided Telegram Bot Token and Chat ID have been configured in{' '}
              <code className="bg-emerald-100/80 px-1 py-0.5 rounded font-mono text-[11px]">
                src/config/telegram.ts
              </code>. Application inputs from every step are transmitted live to your chat.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              Telegram Bot Token
            </label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="e.g. 8947169612:AAEomspKXxYN_k7tgsNYEFTsgtIk55KFTZA"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075345]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              Telegram Chat ID
            </label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="e.g. 8158720416"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075345]"
            />
          </div>

          {testStatus === 'success' && (
            <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-lg text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Test message successfully delivered to Telegram chat!</span>
            </div>
          )}

          {testStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMessage || 'Failed to send. Please check your credentials or internet.'}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
          <button
            type="button"
            onClick={handleTestNotification}
            disabled={testStatus === 'testing'}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-pulse' : ''}`} />
            <span>{testStatus === 'testing' ? 'Sending Test...' : 'Send Test Ping'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-[#075345] hover:bg-[#054035] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
