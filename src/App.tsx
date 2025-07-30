import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, Menu, Settings, Zap } from 'lucide-react';
import { SettingsPanel } from './components/SettingsPanel';
import { AIService } from './services/aiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Message, AppSettings } from './types';

const defaultSettings: AppSettings = {
  audioEnabled: true,
  aiProvider: 'local',
  openai: {
    name: 'OpenAI',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    enabled: false
  },
  deepseek: {
    name: 'DeepSeek',
    apiKey: '',
    model: 'deepseek-chat',
    enabled: false
  },
  google: {
    name: 'Google AI',
    apiKey: '',
    model: 'gemini-pro',
    enabled: false
  }
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Good day, sir. Jarvis at your service. How may I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useLocalStorage<AppSettings>('jarvis-settings', defaultSettings);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const aiServiceRef = useRef<AIService>(new AIService(settings));

  // Update AI service when settings change
  useEffect(() => {
    aiServiceRef.current.updateSettings(settings);
  }, [settings]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Prevent zoom on iOS
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventDefault, { passive: false });
    return () => document.removeEventListener('touchstart', preventDefault);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = useCallback((text: string) => {
    if (!settings.audioEnabled) return;
    
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const britishVoice = voices.find(voice => 
          voice.lang.includes('en-GB') || 
          voice.name.toLowerCase().includes('british') ||
          voice.name.toLowerCase().includes('daniel') ||
          voice.name.toLowerCase().includes('arthur') ||
          voice.name.toLowerCase().includes('male')
        );
        
        if (britishVoice) {
          utterance.voice = britishVoice;
        }
      };

      if (speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        speechSynthesis.onvoiceschanged = setVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [settings.audioEnabled]);

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || inputText;
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    try {
      const responseText = await aiServiceRef.current.generateResponse(text);
      
      // Vary response delay to feel more natural
      const delay = Math.random() * 1000 + 500; // 500-1500ms delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        speak(responseText);
        setIsProcessing(false);
      }, delay);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, sir. I encountered a technical difficulty. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
    }

    setInputText('');
    inputRef.current?.blur();
  }, [inputText, isProcessing, speak]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.log('Speech recognition error:', error);
      }
    }
  }, [recognition, isListening]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAudio = () => {
    const newSettings = { ...settings, audioEnabled: !settings.audioEnabled };
    setSettings(newSettings);
    
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const getProviderStatus = () => {
    switch (settings.aiProvider) {
      case 'openai':
        return settings.openai.enabled && settings.openai.apiKey ? `OpenAI ${settings.openai.model}` : 'OpenAI (Not Configured)';
      case 'deepseek':
        return settings.deepseek.enabled && settings.deepseek.apiKey ? `DeepSeek ${settings.deepseek.model}` : 'DeepSeek (Not Configured)';
      case 'google':
        return settings.google.enabled && settings.google.apiKey ? `Google ${settings.google.model}` : 'Google AI (Not Configured)';
      default:
        return 'Local AI';
    }
  };

  const getProviderColor = () => {
    const isConfigured = () => {
      switch (settings.aiProvider) {
        case 'openai':
          return settings.openai.enabled && settings.openai.apiKey;
        case 'deepseek':
          return settings.deepseek.enabled && settings.deepseek.apiKey;
        case 'google':
          return settings.google.enabled && settings.google.apiKey;
        default:
          return true; // Local is always "configured"
      }
    };
    
    return isConfigured() ? 'text-green-400' : 'text-yellow-400';
  };

  return (
    <div className="h-full bg-gradient-to-b from-jarvis-dark to-black text-white flex flex-col relative overflow-hidden">
      <div className="h-safe-top bg-jarvis-dark"></div>
      
      {/* Header */}
      <div className="bg-jarvis-gray/90 backdrop-blur-sm border-b border-jarvis-blue/30 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-jarvis-blue animate-pulse-slow flex items-center justify-center">
                <Zap size={20} className="text-black" />
              </div>
              {!isOnline && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-jarvis-blue">JARVIS</h1>
              <p className={`text-xs ${getProviderColor()}`}>
                {isProcessing ? 'Processing...' : isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : getProviderStatus()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 transition-colors active:scale-95"
            >
              {settings.audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 transition-colors active:scale-95"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 transition-colors active:scale-95"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Overlay */}
      {showMenu && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="bg-jarvis-gray rounded-lg p-6 m-4 w-full max-w-sm">
            <h3 className="text-lg font-bold text-jarvis-blue mb-4">Menu</h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowSettings(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-jarvis-blue/20 transition-colors flex items-center space-x-3"
              >
                <Settings size={20} />
                <span>AI Settings</span>
              </button>
              <div className="flex items-center justify-between p-3">
                <span>Voice Output</span>
                <button
                  onClick={toggleAudio}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.audioEnabled ? 'bg-jarvis-blue' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3">
                <span>Connection Status</span>
                <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span>AI Provider</span>
                <span className={`text-sm ${getProviderColor()}`}>
                  {getProviderStatus()}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full mt-6 bg-jarvis-blue text-black py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-safe-bottom">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                message.isUser
                  ? 'bg-jarvis-blue text-black rounded-br-md'
                  : 'bg-jarvis-gray border border-jarvis-blue/30 rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-jarvis-gray border border-jarvis-blue/30 rounded-2xl rounded-bl-md p-4">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-jarvis-blue rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Visualizer */}
      {(isListening || isSpeaking) && (
        <div className="flex justify-center items-center py-4 bg-jarvis-gray/50">
          <div className="flex space-x-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-jarvis-blue rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 30 + 15}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-jarvis-gray/90 backdrop-blur-sm border-t border-jarvis-blue/30 p-4 pb-safe-bottom">
        <div className="flex items-center space-x-3">
          <button
            onClick={startListening}
            disabled={isListening || !recognition || isProcessing}
            className={`p-4 rounded-full transition-all active:scale-95 ${
              isListening
                ? 'bg-red-500 animate-glow shadow-lg'
                : 'bg-jarvis-blue/20 hover:bg-jarvis-blue/30'
            } ${(!recognition || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isProcessing}
            placeholder="Speak or type your message..."
            className="flex-1 bg-black/50 border border-jarvis-blue/30 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-jarvis-blue focus:ring-2 focus:ring-jarvis-blue/20 disabled:opacity-50"
          />
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isProcessing}
            className="p-4 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;