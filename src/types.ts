export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface AIProvider {
  name: string;
  apiKey: string;
  model: string;
  enabled: boolean;
}

export interface AppSettings {
  audioEnabled: boolean;
  aiProvider: 'local' | 'openai' | 'deepseek' | 'google';
  openai: AIProvider;
  deepseek: AIProvider;
  google: AIProvider;
}

export interface APIResponse {
  success: boolean;
  message: string;
  error?: string;
}