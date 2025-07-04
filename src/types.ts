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
  aiProvider: 'local' | 'openai' | 'deepseek';
  openai: AIProvider;
  deepseek: AIProvider;
}

export interface APIResponse {
  success: boolean;
  message: string;
  error?: string;
}