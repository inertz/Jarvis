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
  baseUrl?: string;
}

export interface AppSettings {
  audioEnabled: boolean;
  aiProvider: 'local' | 'localAdvanced' | 'openai' | 'deepseek' | 'google' | 'openrouter';
  localAdvanced: AIProvider;
  openai: AIProvider;
  deepseek: AIProvider;
  google: AIProvider;
  openrouter: AIProvider;
}

export interface APIResponse {
  success: boolean;
  message: string;
  error?: string;
}
