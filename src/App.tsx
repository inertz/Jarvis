import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, Menu, Settings, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

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
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Auto-send after voice input
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

  const generateResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello, sir. It\'s a pleasure to assist you today.';
    }
    
    if (message.includes('time') || message.includes('what time')) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}, sir.`;
    }
    
    if (message.includes('date') || message.includes('what date')) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString()}, sir.`;
    }
    
    if (message.includes('weather')) {
      return 'I apologize, sir, but I don\'t currently have access to weather data. Perhaps you could check your preferred weather application?';
    }
    
    if (message.includes('how are you') || message.includes('how do you feel')) {
      return 'I\'m functioning at optimal capacity, sir. All systems are running smoothly.';
    }
    
    if (message.includes('thank you') || message.includes('thanks')) {
      return 'You\'re most welcome, sir. Always happy to be of service.';
    }
    
    if (message.includes('goodbye') || message.includes('bye')) {
      return 'Farewell, sir. I\'ll be here whenever you need assistance.';
    }
    
    if (message.includes('help')) {
      return 'I\'m here to assist you, sir. You can ask me about the time, date, or simply have a conversation. How may I help you today?';
    }

    if (message.includes('battery') || message.includes('power')) {
      return 'I\'m running on your device\'s power, sir. My energy levels are stable and ready for extended operation.';
    }

    if (message.includes('offline') || message.includes('internet')) {
      return isOnline ? 'We have a stable connection, sir. All systems are online.' : 'We appear to be offline, sir, but I can still assist you with basic functions.';
    }
    
    return 'I understand, sir. While I\'m still learning, I\'m here to assist you to the best of my abilities. Is there anything specific you\'d like to know?';
  }, [isOnline]);

  const speak = useCallback((text: string) => {
    if (!audioEnabled) return;
    
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Wait for voices to load
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
  }, [audioEnabled]);

  const handleSendMessage = useCallback((messageText?: string) => {
    const text = messageText || inputText;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }

    // Generate and add AI response
    setTimeout(() => {
      const responseText = generateResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      speak(responseText);
    }, 800);

    setInputText('');
    inputRef.current?.blur();
  }, [inputText, generateResponse, speak]);

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
    setAudioEnabled(!audioEnabled);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-jarvis-dark to-black text-white flex flex-col relative overflow-hidden">
      {/* Status Bar Spacer for iOS */}
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
              <p className="text-xs text-gray-400">
                {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 transition-colors active:scale-95"
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
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
            <h3 className="text-lg font-bold text-jarvis-blue mb-4">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Voice Output</span>
                <button
                  onClick={toggleAudio}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    audioEnabled ? 'bg-jarvis-blue' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    audioEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Connection Status</span>
                <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
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
            disabled={isListening || !recognition}
            className={`p-4 rounded-full transition-all active:scale-95 ${
              isListening
                ? 'bg-red-500 animate-glow shadow-lg'
                : 'bg-jarvis-blue/20 hover:bg-jarvis-blue/30'
            } ${!recognition ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Speak or type your message..."
            className="flex-1 bg-black/50 border border-jarvis-blue/30 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-jarvis-blue focus:ring-2 focus:ring-jarvis-blue/20"
          />
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
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