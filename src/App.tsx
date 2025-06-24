import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
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

  const generateResponse = (userMessage: string): string => {
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
    
    return 'I understand, sir. While I\'m still learning, I\'m here to assist you to the best of my abilities. Is there anything specific you\'d like to know?';
  };

  const speak = (text: string) => {
    if (!audioEnabled) return;
    
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to use a British accent
      const voices = speechSynthesis.getVoices();
      const britishVoice = voices.find(voice => 
        voice.lang.includes('en-GB') || 
        voice.name.toLowerCase().includes('british') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('arthur')
      );
      
      if (britishVoice) {
        utterance.voice = britishVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate and add AI response
    setTimeout(() => {
      const responseText = generateResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      speak(responseText);
    }, 500);

    setInputText('');
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-jarvis-dark to-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-jarvis-gray border-b border-jarvis-blue/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-jarvis-blue animate-pulse-slow"></div>
            <div>
              <h1 className="text-xl font-bold text-jarvis-blue">JARVIS</h1>
              <p className="text-xs text-gray-400">
                {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Online'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-2 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 transition-colors"
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-jarvis-blue text-black'
                  : 'bg-jarvis-gray border border-jarvis-blue/30'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Visualizer */}
      {(isListening || isSpeaking) && (
        <div className="flex justify-center items-center py-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-jarvis-blue rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-jarvis-gray border-t border-jarvis-blue/30 p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`p-3 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 animate-glow'
                : 'bg-jarvis-blue/20 hover:bg-jarvis-blue/30'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Speak or type your message..."
            className="flex-1 bg-black/50 border border-jarvis-blue/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-jarvis-blue"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 rounded-full bg-jarvis-blue/20 hover:bg-jarvis-blue/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;