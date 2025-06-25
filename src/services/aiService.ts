import { AppSettings } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export class AIService {
  private settings: AppSettings;

  constructor(settings: AppSettings) {
    this.settings = settings;
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      switch (this.settings.aiProvider) {
        case 'openai':
          return await this.callOpenAI(userMessage);
        case 'deepseek':
          return await this.callDeepSeek(userMessage);
        default:
          return this.generateLocalResponse(userMessage);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.generateLocalResponse(userMessage);
    }
  }

  private async callOpenAI(userMessage: string): Promise<string> {
    if (!this.settings.openai.enabled || !this.settings.openai.apiKey) {
      throw new Error('OpenAI not configured');
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.openai.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are JARVIS, Tony Stark\'s AI assistant. Respond professionally with a British accent personality. Be helpful, intelligent, and concise. Address the user as "sir" when appropriate.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, sir. I encountered an issue processing your request.';
  }

  private async callDeepSeek(userMessage: string): Promise<string> {
    if (!this.settings.deepseek.enabled || !this.settings.deepseek.apiKey) {
      throw new Error('DeepSeek not configured');
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.deepseek.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.deepseek.model || 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are JARVIS, Tony Stark\'s AI assistant. Respond professionally with a British accent personality. Be helpful, intelligent, and concise. Address the user as "sir" when appropriate.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, sir. I encountered an issue processing your request.';
  }

  private generateLocalResponse(userMessage: string): string {
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
      const isOnline = navigator.onLine;
      return isOnline ? 'We have a stable connection, sir. All systems are online.' : 'We appear to be offline, sir, but I can still assist you with basic functions.';
    }
    
    return 'I understand, sir. While I\'m still learning, I\'m here to assist you to the best of my abilities. Is there anything specific you\'d like to know?';
  }

  updateSettings(newSettings: AppSettings) {
    this.settings = newSettings;
  }
}