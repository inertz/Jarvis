import React, { useState } from 'react';
import { X, Eye, EyeOff, Cpu, Zap, Globe, Brain } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onClose
}) => {
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showDeepSeekKey, setShowDeepSeekKey] = useState(false);
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [tempSettings, setTempSettings] = useState<AppSettings>(settings);

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const updateProvider = (provider: 'openai' | 'deepseek', field: string, value: string | boolean) => {
    setTempSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-jarvis-gray rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-jarvis-gray border-b border-jarvis-blue/30 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-jarvis-blue">AI Settings</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-jarvis-blue/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* AI Provider Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">AI Provider</label>
            <div className="space-y-2">
              {[
                { value: 'local', label: 'Local (Basic)', icon: Cpu },
                { value: 'openai', label: 'OpenAI GPT', icon: Zap },
                { value: 'deepseek', label: 'DeepSeek', icon: Globe },
                { value: 'google', label: 'Google AI (Gemini)', icon: Brain }
              ].map(({ value, label, icon: Icon }) => (
                <label key={value} className="flex items-center space-x-3 p-3 rounded-lg border border-jarvis-blue/30 hover:bg-jarvis-blue/10 cursor-pointer">
                  <input
                    type="radio"
                    name="aiProvider"
                    value={value}
                    checked={tempSettings.aiProvider === value}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, aiProvider: e.target.value as any }))}
                    className="text-jarvis-blue focus:ring-jarvis-blue"
                  />
                  <Icon size={20} className="text-jarvis-blue" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* OpenAI Configuration */}
          <div className={`space-y-4 p-4 rounded-lg border ${tempSettings.aiProvider === 'openai' ? 'border-jarvis-blue/50 bg-jarvis-blue/5' : 'border-gray-600 opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-jarvis-blue">OpenAI Configuration</h4>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tempSettings.openai.enabled}
                  onChange={(e) => updateProvider('openai', 'enabled', e.target.checked)}
                  disabled={tempSettings.aiProvider !== 'openai'}
                  className="text-jarvis-blue focus:ring-jarvis-blue"
                />
                <span className="text-sm">Enabled</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <div className="relative">
                <input
                  type={showOpenAIKey ? 'text' : 'password'}
                  value={tempSettings.openai.apiKey}
                  onChange={(e) => updateProvider('openai', 'apiKey', e.target.value)}
                  disabled={tempSettings.aiProvider !== 'openai'}
                  placeholder="sk-..."
                  className="w-full bg-black/50 border border-jarvis-blue/30 rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-jarvis-blue disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-jarvis-blue/20 rounded"
                >
                  {showOpenAIKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={tempSettings.openai.model}
                onChange={(e) => updateProvider('openai', 'model', e.target.value)}
                disabled={tempSettings.aiProvider !== 'openai'}
                className="w-full bg-black/50 border border-jarvis-blue/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-jarvis-blue disabled:opacity-50"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>
          </div>

          {/* DeepSeek Configuration */}
          <div className={`space-y-4 p-4 rounded-lg border ${tempSettings.aiProvider === 'deepseek' ? 'border-jarvis-blue/50 bg-jarvis-blue/5' : 'border-gray-600 opacity-50'}`}>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-jarvis-blue">DeepSeek Configuration</h4>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tempSettings.deepseek.enabled}
                  onChange={(e) => updateProvider('deepseek', 'enabled', e.target.checked)}
                  disabled={tempSettings.aiProvider !== 'deepseek'}
                  className="text-jarvis-blue focus:ring-jarvis-blue"
                />
                <span className="text-sm">Enabled</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <div className="relative">
                <input
                  type={showDeepSeekKey ? 'text' : 'password'}
                  value={tempSettings.deepseek.apiKey}
                  onChange={(e) => updateProvider('deepseek', 'apiKey', e.target.value)}
                  disabled={tempSettings.aiProvider !== 'deepseek'}
                  placeholder="sk-..."
                  className="w-full bg-black/50 border border-jarvis-blue/30 rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-jarvis-blue disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowDeepSeekKey(!showDeepSeekKey)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-jarvis-blue/20 rounded"
                >
                  {showDeepSeekKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={tempSettings.deepseek.model}
                onChange={(e) => updateProvider('deepseek', 'model', e.target.value)}
                disabled={tempSettings.aiProvider !== 'deepseek'}
                className="w-full bg-black/50 border border-jarvis-blue/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-jarvis-blue disabled:opacity-50"
              >
                <option value="deepseek-chat">DeepSeek Chat</option>
                <option value="deepseek-coder">DeepSeek Coder</option>
              </select>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4 p-4 rounded-lg border border-jarvis-blue/30">
            <h4 className="font-medium text-jarvis-blue">Audio Settings</h4>
            <div className="flex items-center justify-between">
              <span>Voice Output</span>
              <button
                onClick={() => setTempSettings(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  tempSettings.audioEnabled ? 'bg-jarvis-blue' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  tempSettings.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  // Clear conversation history
                  if (window.confirm('Clear conversation history? This will reset the AI\'s memory of your current conversation.')) {
                    // This would need to be passed as a prop or handled differently
                    // For now, we'll just show the confirmation
                  }
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-jarvis-blue/20 transition-colors flex items-center space-x-3"
              >
                <span>Clear Chat History</span>
              </button>
            </div>
          </div>

          {/* API Usage Notice */}
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> API usage may incur costs. Please check your provider's pricing before enabling.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-jarvis-gray border-t border-jarvis-blue/30 p-4 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-jarvis-blue hover:bg-jarvis-blue/80 text-black py-2 rounded-lg font-medium transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};