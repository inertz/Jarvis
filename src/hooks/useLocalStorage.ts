import { useState, useEffect } from 'react';
import { AppSettings } from '../types';

function stripSensitiveSettings(settings: AppSettings): AppSettings {
  return {
    ...settings,
    localAdvanced: {
      ...settings.localAdvanced,
      apiKey: '',
    },
    openai: {
      ...settings.openai,
      apiKey: '',
    },
    deepseek: {
      ...settings.deepseek,
      apiKey: '',
    },
    google: {
      ...settings.google,
      apiKey: '',
    },
    openrouter: {
      ...settings.openrouter,
      apiKey: '',
    },
    nvidia: {
      ...settings.nvidia,
      apiKey: '',
    },
  };
}

// Helper function to deep merge settings with defaults
function mergeWithDefaults(stored: any, defaults: AppSettings): AppSettings {
  if (!stored || typeof stored !== 'object') {
    return defaults;
  }

  return {
    aiProvider: stored.aiProvider || defaults.aiProvider,
    audioEnabled: stored.audioEnabled ?? defaults.audioEnabled,
    localAdvanced: {
      name: stored.localAdvanced?.name || defaults.localAdvanced.name,
      enabled: stored.localAdvanced?.enabled ?? defaults.localAdvanced.enabled,
      apiKey: stored.localAdvanced?.apiKey || defaults.localAdvanced.apiKey,
      model: stored.localAdvanced?.model || defaults.localAdvanced.model,
      baseUrl: stored.localAdvanced?.baseUrl || defaults.localAdvanced.baseUrl,
    },
    openai: {
      name: stored.openai?.name || defaults.openai.name,
      enabled: stored.openai?.enabled ?? defaults.openai.enabled,
      apiKey: stored.openai?.apiKey || defaults.openai.apiKey,
      model: stored.openai?.model || defaults.openai.model,
      baseUrl: stored.openai?.baseUrl || defaults.openai.baseUrl,
    },
    deepseek: {
      name: stored.deepseek?.name || defaults.deepseek.name,
      enabled: stored.deepseek?.enabled ?? defaults.deepseek.enabled,
      apiKey: stored.deepseek?.apiKey || defaults.deepseek.apiKey,
      model: stored.deepseek?.model || defaults.deepseek.model,
      baseUrl: stored.deepseek?.baseUrl || defaults.deepseek.baseUrl,
    },
    google: {
      name: stored.google?.name || defaults.google.name,
      enabled: stored.google?.enabled ?? defaults.google.enabled,
      apiKey: stored.google?.apiKey || defaults.google.apiKey,
      model: stored.google?.model || defaults.google.model,
      baseUrl: stored.google?.baseUrl || defaults.google.baseUrl,
    },
    openrouter: {
      name: stored.openrouter?.name || defaults.openrouter.name,
      enabled: stored.openrouter?.enabled ?? defaults.openrouter.enabled,
      apiKey: stored.openrouter?.apiKey || defaults.openrouter.apiKey,
      model: stored.openrouter?.model || defaults.openrouter.model,
      baseUrl: stored.openrouter?.baseUrl || defaults.openrouter.baseUrl,
    },
    nvidia: {
      name: stored.nvidia?.name || defaults.nvidia.name,
      enabled: stored.nvidia?.enabled ?? defaults.nvidia.enabled,
      apiKey: stored.nvidia?.apiKey || defaults.nvidia.apiKey,
      model: stored.nvidia?.model || defaults.nvidia.model,
      baseUrl: stored.nvidia?.baseUrl || defaults.nvidia.baseUrl,
    },
  };
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Special handling for AppSettings to ensure all properties exist
        if (key === 'jarvis-settings' && initialValue) {
          return mergeWithDefaults(parsed, initialValue as unknown as AppSettings) as T;
        }
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (key === 'jarvis-settings') {
        window.localStorage.setItem(key, JSON.stringify(stripSensitiveSettings(value as unknown as AppSettings)));
        return;
      }
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
