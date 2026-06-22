# 🤖 Jarvis AI Assistant

A sophisticated AI assistant mobile app inspired by Iron Man's JARVIS, featuring voice recognition, text-to-speech, and integration with local and cloud AI providers including Ollama, OpenAI, DeepSeek, Google AI, OpenRouter, and NVIDIA NIM.

![Jarvis AI Assistant](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎙️ **Voice Interaction**
- **Speech Recognition**: Tap to speak and interact naturally
- **Text-to-Speech**: Jarvis responds with a sophisticated British accent
- **Auto-send**: Voice input automatically processes your requests
- **Voice Visualizer**: Real-time audio feedback during conversations

### 🤖 **AI Integration**
- **Multiple AI Providers**: Choose between Local (Basic), Local (Advance), OpenAI GPT, DeepSeek, Google AI, OpenRouter, or NVIDIA NIM
- **Ollama Integration**: Connect to a local Ollama instance through `Local (Advance)`
- **Automatic Ollama Detection**: Detect local Ollama models from the settings panel
- **Test Ollama Connection**: Validate the local Ollama endpoint before saving settings
- **Provider Model Detection**: Detect available models for OpenAI, DeepSeek, Google AI, OpenRouter, and NVIDIA NIM when a valid API key is provided
- **Custom API Endpoints**: Configure provider-specific API URL endpoints directly in settings
- **OpenAI GPT Support**: OpenAI-compatible chat completion models
- **DeepSeek Integration**: DeepSeek chat models
- **Google AI Integration**: Gemini models supported by the configured endpoint
- **OpenRouter Integration**: Access to 100+ AI models through one API
- **NVIDIA NIM Integration**: Access NVIDIA-hosted chat models through an OpenAI-compatible API
- **Fallback System**: Automatically falls back to local responses if API fails
- **Reduced Credential Persistence**: API keys are stripped before settings are written back to local storage

### 📱 **Mobile-First Design**
- **Progressive Web App (PWA)**: Install as a native app on any device
- **Local Fallback Mode**: `Local (Basic)` works without a cloud provider
- **iOS Safe Area**: Full iPhone/iPad compatibility including notch support
- **Haptic Feedback**: Tactile responses for better user experience
- **Touch Optimized**: Large buttons and gesture-friendly interface

### 🎨 **Premium UI/UX**
- **Jarvis-themed Design**: Cyan blue accent colors with dark theme
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Status Indicators**: Real-time connection and activity status
- **Advanced Settings Panel**: Comprehensive AI and audio configuration

### 🧠 **AI Capabilities**
- **Conversational AI**: Natural language processing and responses
- **Context Awareness**: Intelligent replies based on conversation history
- **Time & Date**: Current time and date information
- **Connection Awareness**: Local responses can react to online/offline status
- **Professional Personality**: British assistant personality like the original JARVIS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, pnpm, or yarn
- Ollama (optional, for Local Advance mode)
- API keys for OpenAI, DeepSeek, Google AI, OpenRouter, or NVIDIA NIM (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/inertz/jarvis.git
   cd jarvis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### 🔑 API Configuration

#### Local (Advance) / Ollama Setup:
1. Install and run [Ollama](https://ollama.com/)
2. Pull at least one model, for example:
   ```bash
   ollama pull llama3.2
   ```
3. Open the app settings (gear icon)
4. Select "Local (Advance)" as your AI provider
5. Keep the endpoint as `http://localhost:11434`
6. Click **"Test Ollama Connection"**
7. Choose one of the detected models and save

Notes:
- Only localhost Ollama endpoints are allowed by the app
- If Ollama is running, the settings panel will try to detect models automatically
- `Local (Basic)` is still available as an offline fallback without Ollama

#### OpenAI Setup:
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open the app settings (gear icon)
3. Select "OpenAI GPT" as your AI provider
4. Enter your API key
5. Optionally change the `API URL Endpoint`
6. Click **"Detect Models"** to load available models automatically
7. Choose your preferred model and save

#### DeepSeek Setup:
1. Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Open the app settings (gear icon)
3. Select "DeepSeek" as your AI provider
4. Enter your API key
5. Optionally change the `API URL Endpoint`
6. Click **"Detect Models"** to load available models automatically
7. Choose your preferred model and save

#### Google AI Setup:
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open the app settings (gear icon)
3. Select "Google AI (Gemini)" as your AI provider
4. Enter your API key
5. Optionally change the `API URL Endpoint`
6. Click **"Detect Models"** to load available Gemini models automatically
7. Choose your preferred model and save

#### OpenRouter Setup:
1. Get your API key from [OpenRouter](https://openrouter.ai/keys)
2. Open the app settings (gear icon)
3. Select "OpenRouter" as your AI provider
4. Enter your API key
5. Optionally change the `API URL Endpoint`
6. Click **"Detect Models"** to load available models automatically
7. Choose your preferred model and save

#### NVIDIA Setup:
1. Get your API key from [NVIDIA Build / API Catalog](https://build.nvidia.com/)
2. Open the app settings (gear icon)
3. Select "NVIDIA NIM" as your AI provider
4. Enter your API key
5. Optionally change the `API URL Endpoint`
6. Click **"Detect Models"** to load available NVIDIA-compatible models automatically
7. Choose your preferred model and save

Notes for cloud providers:
- Model detection depends on the provider allowing browser-side access to its model-list endpoint
- If a provider blocks the request with CORS or policy restrictions, the app will show the returned error in the settings panel
- API keys are entered directly in the browser UI, so this setup is best suited to local or personal use unless you add a backend proxy

### 📲 Install as Mobile App

#### iPhone/iPad:
1. Open the app in Safari
2. Tap the **Share** button (square with arrow)
3. Select **"Add to Home Screen"**
4. Tap **"Add"**

#### Android:
1. Open the app in Chrome
2. Tap the **menu** (3 dots)
3. Select **"Add to Home Screen"**
4. Tap **"Add"**

## 🛠️ Built With

- **React 18** - Modern React with hooks and TypeScript
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **PWA** - Progressive Web App capabilities
- **Web Speech API** - Voice recognition and synthesis
- **Lucide React** - Beautiful icons
- **OpenAI API** - GPT models integration
- **DeepSeek API** - Advanced AI model integration
- **Google AI API** - Gemini models integration
- **OpenRouter API** - Access to 100+ AI models
- **NVIDIA API** - NVIDIA NIM and hosted model access

## 📁 Project Structure

```
jarvis-ai-assistant/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── pwa-*.png             # App icons
│   └── apple-touch-icon.png  # iOS icon
├── src/
│   ├── components/
│   │   └── SettingsPanel.tsx # AI configuration panel
│   ├── services/
│   │   └── aiService.ts      # AI provider integration
│   ├── hooks/
│   │   └── useLocalStorage.ts # Local storage hook
│   ├── types.ts              # TypeScript definitions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── package.json              # Dependencies and scripts
```

## 🎯 Usage Examples

### Voice Commands
- **"Hello Jarvis"** - Greeting and introduction
- **"What time is it?"** - Current time
- **"What's the date?"** - Current date
- **"How are you?"** - System status
- **"Help"** - Available commands
- **"Thank you"** - Polite acknowledgment

### AI Provider Features
- **Local (Basic)**: Basic built-in responses without a cloud provider
- **Local (Advance)**: Uses a local Ollama model with automatic model detection
- **OpenAI GPT**: Advanced conversational AI with context awareness and model autodetection
- **DeepSeek**: Specialized AI with coding and reasoning capabilities and model autodetection
- **Google AI**: Powerful Gemini models with advanced reasoning and model autodetection
- **OpenRouter**: Access to Claude, GPT, Llama, Gemini, and 100+ other models with model autodetection
- **NVIDIA NIM**: Hosted NVIDIA-compatible chat models with model autodetection

### Text Input
Type any message in the input field and press Enter or tap the send button.

## ⚙️ Configuration

### AI Settings
- **Provider Selection**: Choose between Local (Basic), Local (Advance), OpenAI, DeepSeek, Google AI, OpenRouter, or NVIDIA NIM
- **Ollama Detection**: Automatically discover local Ollama models
- **Connection Testing**: Test the Ollama endpoint directly from settings
- **Cloud Model Detection**: Detect supported models for OpenAI, DeepSeek, Google AI, OpenRouter, and NVIDIA NIM
- **API URL Endpoints**: Override the default provider endpoints when needed
- **API Key Management**: Show/hide input fields for cloud providers
- **Model Selection**: Choose specific models for each provider
- **Fallback System**: Automatic fallback to local responses

### Audio Settings
- **Voice Output Toggle**: Enable/disable text-to-speech
- **British Accent**: Automatic selection of British voice
- **Speech Tuning**: Speech rate, pitch, and volume are fixed in code

### PWA Settings
- **Installable App Shell**: Includes a manifest and PWA build configuration
- **Custom App Icons**: Professional Jarvis-themed icons
- **Standalone Display**: Full-screen app experience
- **Auto-update**: Automatic updates when available

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Environment Setup

No environment variables are required for basic functionality.

Important:
- Cloud API keys are entered directly in the browser UI
- The app strips API keys before saving settings back to local storage
- Because this is a frontend-only app, browser-entered cloud API keys are still exposed to the client runtime
- Some cloud provider model-detection requests may fail because of CORS or provider-side browser restrictions
- For stronger security, route provider calls through your own backend

### Browser Compatibility

- **Chrome/Edge**: Full support including all AI features
- **Safari**: Full support (iOS 14.3+) with PWA capabilities
- **Firefox**: Limited speech synthesis, full AI support
- **Mobile browsers**: Optimized experience with touch controls

## 💰 API Costs

Pricing changes frequently and depends on the selected provider and model.

Check the provider pricing pages directly before relying on a cost estimate:
- OpenAI: https://platform.openai.com/pricing
- DeepSeek: https://platform.deepseek.com/
- Google AI: https://ai.google.dev/pricing
- OpenRouter: https://openrouter.ai/models
- NVIDIA: https://build.nvidia.com/

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Enable HTTPS for PWA features

### Vercel
1. Connect your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🔒 Security

- **Reduced API Key Persistence**: Cloud API keys are stripped before settings are written to local storage
- **No Server Storage**: All data remains on your device
- **Local Ollama Restriction**: `Local (Advance)` only allows localhost Ollama endpoints
- **HTTPS Required**: PWA features require secure connection
- **Privacy First**: No data is sent to third parties except chosen AI providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain mobile-first responsive design
- Test on multiple devices and browsers
- Keep accessibility in mind
- Test with different AI providers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Marvel's Iron Man JARVIS AI
- Icons by [Lucide](https://lucide.dev/)
- Built with modern web technologies
- OpenAI for GPT model access
- DeepSeek for advanced AI capabilities
- NVIDIA for hosted model access
- Special thanks to the React and Vite communities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/inertz/jarvis/issues)
- **Discussions**: [GitHub Discussions](https://github.com/inertz/jarvis/discussions)
- **Email**: webmaster@inertz.org

## 🔮 Roadmap

- [x] OpenAI GPT integration
- [x] DeepSeek AI integration
- [x] Google AI (Gemini) integration
- [x] NVIDIA NIM integration
- [x] Advanced settings panel
- [x] Local Ollama integration
- [x] Ollama auto-detection and connection testing
- [x] Reduced API key persistence
- [x] OpenRouter integration (100+ models)
- [ ] Backend proxy for secure cloud API key handling
- [ ] Conversation history export
- [ ] Custom voice training
- [ ] Weather and news integration
- [ ] Calendar and reminder features
- [ ] Multi-language support
- [ ] Smart home integration
- [ ] Advanced conversation memory
- [ ] Claude AI integration

---

<div align="center">

**Made with ❤️ by [inertz](https://github.com/inertz)**

[⭐ Star this repo](https://github.com/inertz/jarvis) • [🐛 Report Bug](https://github.com/inertz/jarvis/issues) • [✨ Request Feature](https://github.com/inertz/jarvis/issues)

</div>
