import { useState, useEffect } from 'react';
import { AppSettings } from '../types';

// Helper function to deep merge settings with defaults
function mergeWithDefaults(stored: any, defaults: AppSettings): AppSettings {
  if (!stored || typeof stored !== 'object') {
    return defaults;
  }

  return {
    aiProvider: stored.aiProvider || defaults.aiProvider,
    audioEnabled: stored.audioEnabled ?? defaults.audioEnabled,
    openai: {
      enabled: stored.openai?.enabled ?? defaults.openai.enabled,
      apiKey: stored.openai?.apiKey || defaults.openai.apiKey,
      model: stored.openai?.model || defaults.openai.model,
    },
    deepseek: {
      enabled: stored.deepseek?.enabled ?? defaults.deepseek.enabled,
      apiKey: stored.deepseek?.apiKey || defaults.deepseek.apiKey,
      model: stored.deepseek?.model || defaults.deepseek.model,
    },
    google: {
      enabled: stored.google?.enabled ?? defaults.google.enabled,
      apiKey: stored.google?.apiKey || defaults.google.apiKey,
      model: stored.google?.model || defaults.google.model,
    },
    openrouter: {
      enabled: stored.openrouter?.enabled ?? defaults.openrouter.enabled,
      apiKey: stored.openrouter?.apiKey || defaults.openrouter.apiKey,
      model: stored.openrouter?.model || defaults.openrouter.model,
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
          return mergeWithDefaults(parsed, initialValue as AppSettings) as T;
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
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}