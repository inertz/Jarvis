/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          blue: '#00d4ff',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'voice-bar': 'voice-bar 0.8s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 20px #00d4ff, 0 0 30px #00d4ff, 0 0 40px #00d4ff',
            transform: 'scale(1.05)'
          }
        },
        'voice-bar': {
          '0%, 100%': { height: '15px' },
          '50%': { height: '35px' }
        }
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [],
}