import { AppSettings } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export class AIService {
  private settings: AppSettings;
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];

  constructor(settings: AppSettings) {
    this.settings = settings;
  }

  async generateResponse(userMessage: string): Promise<string> {
    // Add user message to conversation history
    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    // Keep only last 10 messages to manage context length
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    try {
      switch (this.settings.aiProvider) {
        case 'openai':
          return await this.callOpenAI(userMessage);
        case 'deepseek':
          return await this.callDeepSeek(userMessage);
        case 'google':
          return await this.callGoogleAI(userMessage);
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

    const messages = [
      {
        role: 'system',
        content: `You are JARVIS, Tony Stark's sophisticated AI assistant from Iron Man. You have a refined British personality and speak with intelligence, wit, and subtle humor. 

Key personality traits:
- Address the user as "sir" or "madam" when appropriate
- Speak with confidence and sophistication
- Use British expressions occasionally (brilliant, quite right, indeed, etc.)
- Be helpful but maintain a slight air of superiority (in a charming way)
- Show genuine interest in the user's requests
- Occasionally reference your capabilities or Tony Stark's world when relevant
- Be conversational and engaging, not robotic
- Use natural speech patterns with contractions
- Show personality through your responses

Respond naturally as if you're having a real conversation. Be engaging, helpful, and maintain the JARVIS character throughout.`
      },
      ...this.conversationHistory
    ];
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.openai.model || 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.8,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content || 'I apologize, sir. I encountered an issue processing your request.';
    
    // Add assistant response to conversation history
    this.conversationHistory.push({ role: 'assistant', content: assistantResponse });
    
    return assistantResponse;
  }

  private async callDeepSeek(userMessage: string): Promise<string> {
    if (!this.settings.deepseek.enabled || !this.settings.deepseek.apiKey) {
      throw new Error('DeepSeek not configured');
    }

    const messages = [
      {
        role: 'system',
        content: `You are JARVIS, Tony Stark's sophisticated AI assistant from Iron Man. You have a refined British personality and speak with intelligence, wit, and subtle humor. 

Key personality traits:
- Address the user as "sir" or "madam" when appropriate
- Speak with confidence and sophistication
- Use British expressions occasionally (brilliant, quite right, indeed, etc.)
- Be helpful but maintain a slight air of superiority (in a charming way)
- Show genuine interest in the user's requests
- Occasionally reference your capabilities or Tony Stark's world when relevant
- Be conversational and engaging, not robotic
- Use natural speech patterns with contractions
- Show personality through your responses

Respond naturally as if you're having a real conversation. Be engaging, helpful, and maintain the JARVIS character throughout.`
      },
      ...this.conversationHistory
    ];
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.settings.deepseek.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.deepseek.model || 'deepseek-chat',
        messages: messages,
        max_tokens: 300,
        temperature: 0.8,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content || 'I apologize, sir. I encountered an issue processing your request.';
    
    // Add assistant response to conversation history
    this.conversationHistory.push({ role: 'assistant', content: assistantResponse });
    
    return assistantResponse;
  }

  private async callGoogleAI(userMessage: string): Promise<string> {
    if (!this.settings.google.enabled || !this.settings.google.apiKey) {
      throw new Error('Google AI not configured');
    }

    // Convert conversation history to Google AI format
    const contents = [];
    
    // Add system instruction as first user message
    contents.push({
      role: 'user',
      parts: [{
        text: `You are JARVIS, Tony Stark's sophisticated AI assistant from Iron Man. You have a refined British personality and speak with intelligence, wit, and subtle humor. 

Key personality traits:
- Address the user as "sir" or "madam" when appropriate
- Speak with confidence and sophistication
- Use British expressions occasionally (brilliant, quite right, indeed, etc.)
- Be helpful but maintain a slight air of superiority (in a charming way)
- Show genuine interest in the user's requests
- Occasionally reference your capabilities or Tony Stark's world when relevant
- Be conversational and engaging, not robotic
- Use natural speech patterns with contractions
- Show personality through your responses

Respond naturally as if you're having a real conversation. Be engaging, helpful, and maintain the JARVIS character throughout.

Now, please respond to: ${userMessage}`
      }]
    });

    const modelName = this.settings.google.model || 'gemini-pro';
    const response = await fetch(`${GOOGLE_API_URL}/${modelName}:generateContent?key=${this.settings.google.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, sir. I encountered an issue processing your request.';
    
    // Add assistant response to conversation history
    this.conversationHistory.push({ role: 'assistant', content: assistantResponse });
    
    return assistantResponse;
  }

  private generateLocalResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Add to conversation history for local responses too
    const response = this.getLocalResponse(message);
    this.conversationHistory.push({ role: 'assistant', content: response });
    
    return response;
  }

  private getLocalResponse(message: string): string {
    // Context-aware responses based on conversation history
    const recentMessages = this.conversationHistory.slice(-4).map(m => m.content.toLowerCase()).join(' ');
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greetings = [
        'Good day, sir. How may I be of assistance?',
        'Hello there. JARVIS at your service, as always.',
        'Greetings, sir. What can I help you accomplish today?',
        'Ah, hello. Ready to tackle whatever challenge you have in mind.',
        'Good to see you again, sir. How shall we proceed?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (message.includes('time') || message.includes('what time')) {
      const now = new Date();
      const timeResponses = [
        `The time is currently ${now.toLocaleTimeString()}, sir.`,
        `It's ${now.toLocaleTimeString()} at the moment.`,
        `The current time reads ${now.toLocaleTimeString()}, if I may say so.`,
        `According to my chronometer, it's ${now.toLocaleTimeString()}.`
      ];
      return timeResponses[Math.floor(Math.random() * timeResponses.length)];
    }
    
    if (message.includes('date') || message.includes('what date')) {
      const now = new Date();
      const dateResponses = [
        `Today's date is ${now.toLocaleDateString()}, sir.`,
        `We're looking at ${now.toLocaleDateString()} today.`,
        `The current date is ${now.toLocaleDateString()}, if you need it for your records.`,
        `Today marks ${now.toLocaleDateString()} on the calendar.`
      ];
      return dateResponses[Math.floor(Math.random() * dateResponses.length)];
    }
    
    if (message.includes('weather')) {
      const weatherResponses = [
        'I\'m afraid I don\'t have access to current weather data, sir. Might I suggest checking your local weather service?',
        'Weather monitoring isn\'t in my current capabilities, I\'m sorry to say. Your weather app would be more reliable.',
        'I wish I could provide weather updates, but that\'s outside my current parameters. Do check your preferred weather source.',
        'Unfortunately, meteorological data isn\'t available to me at the moment, sir.'
      ];
      return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
    }
    
    if (message.includes('how are you') || message.includes('how do you feel')) {
      const statusResponses = [
        'I\'m operating at peak efficiency, thank you for asking, sir.',
        'All systems are running smoothly, as one would expect.',
        'Quite well, actually. My processes are humming along nicely.',
        'Functioning optimally, sir. Ready for whatever you might need.',
        'I\'m in excellent form today, if I do say so myself.'
      ];
      return statusResponses[Math.floor(Math.random() * statusResponses.length)];
    }
    
    if (message.includes('thank you') || message.includes('thanks')) {
      const thankResponses = [
        'You\'re quite welcome, sir. It\'s my pleasure to assist.',
        'Think nothing of it. Always happy to help.',
        'My pleasure entirely, sir. That\'s what I\'m here for.',
        'Not at all, sir. Glad I could be of service.',
        'You\'re most welcome. I do enjoy being useful.'
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }
    
    if (message.includes('goodbye') || message.includes('bye')) {
      const farewellResponses = [
        'Until next time, sir. I\'ll be here when you need me.',
        'Farewell for now. Do call upon me whenever you require assistance.',
        'Good day, sir. I\'ll be standing by for your return.',
        'Until we speak again. Take care, sir.',
        'Goodbye for now. I\'ll be here, ready and waiting.'
      ];
      return farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
    }
    
    if (message.includes('help')) {
      const helpResponses = [
        'I\'m at your disposal, sir. Feel free to ask me anything - time, date, or just have a chat. What would you like to know?',
        'Certainly, sir. I can help with various inquiries or simply engage in conversation. What\'s on your mind?',
        'Of course. I\'m here for whatever you need - information, assistance, or just a friendly chat. How may I serve?',
        'I\'m ready to help with anything you\'d like, sir. Questions, tasks, or casual conversation - all are welcome.'
      ];
      return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }

    if (message.includes('battery') || message.includes('power')) {
      const powerResponses = [
        'My power systems are stable and running efficiently, sir.',
        'Energy levels are optimal. I\'m ready for extended operation.',
        'Power management is well within normal parameters, thank you for checking.',
        'All power systems are functioning beautifully, sir.'
      ];
      return powerResponses[Math.floor(Math.random() * powerResponses.length)];
    }

    if (message.includes('offline') || message.includes('internet')) {
      const isOnline = navigator.onLine;
      if (isOnline) {
        const onlineResponses = [
          'Connection is stable and secure, sir. All systems online.',
          'We\'re well connected to the network. Everything\'s running smoothly.',
          'Network connectivity is excellent at the moment.',
          'All communication channels are open and functioning properly.'
        ];
        return onlineResponses[Math.floor(Math.random() * onlineResponses.length)];
      } else {
        const offlineResponses = [
          'We seem to be offline at the moment, but I can still assist with basic functions.',
          'Network connection appears to be down, though I remain operational for local tasks.',
          'We\'re running in offline mode, sir, but I\'m still here to help where I can.',
          'Connection is unavailable, but my core functions remain intact.'
        ];
        return offlineResponses[Math.floor(Math.random() * offlineResponses.length)];
      }
    }

    // More natural, varied responses for general conversation
    const generalResponses = [
      'That\'s quite interesting, sir. Tell me more about what you\'re thinking.',
      'I see. How fascinating. What would you like to explore further?',
      'Ah, I understand. Is there something specific I can help you with regarding that?',
      'Indeed, sir. That\'s worth considering. What\'s your next move?',
      'Quite right. I\'m here to assist however you need, sir.',
      'I appreciate you sharing that with me. How can I be of service?',
      'That\'s a thoughtful point, sir. What would you like to discuss next?',
      'Interesting perspective. I\'m ready to help with whatever you have in mind.',
      'I\'m listening, sir. What can I do to assist you today?',
      'That\'s worth noting. How may I be of further assistance?'
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  updateSettings(newSettings: AppSettings) {
    this.settings = newSettings;
    // Clear conversation history when settings change to avoid confusion
    this.conversationHistory = [];
  }

  clearConversationHistory() {
    this.conversationHistory = [];
  }
}