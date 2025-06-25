# 🤖 Jarvis AI Assistant

A sophisticated AI assistant mobile app inspired by Iron Man's JARVIS, featuring voice recognition, text-to-speech, and integration with advanced AI providers like OpenAI and DeepSeek.

![Jarvis AI Assistant](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎙️ **Voice Interaction**
- **Speech Recognition**: Tap to speak and interact naturally
- **Text-to-Speech**: Jarvis responds with a sophisticated British accent
- **Auto-send**: Voice input automatically processes your requests
- **Voice Visualizer**: Real-time audio feedback during conversations

### 🤖 **AI Integration**
- **Multiple AI Providers**: Choose between Local, OpenAI GPT, or DeepSeek
- **OpenAI GPT Support**: GPT-3.5 Turbo, GPT-4, and GPT-4 Turbo models
- **DeepSeek Integration**: DeepSeek Chat and DeepSeek Coder models
- **Fallback System**: Automatically falls back to local responses if API fails
- **Secure API Key Storage**: Encrypted local storage for API credentials

### 📱 **Mobile-First Design**
- **Progressive Web App (PWA)**: Install as a native app on any device
- **Offline Support**: Works without internet connection (local mode)
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
- **System Status**: Battery, connection, and device information
- **Professional Personality**: British assistant personality like the original JARVIS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- API keys for OpenAI or DeepSeek (optional)

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

Free testing API from [OpenAI Platform](https://hdstockimages.com/get-free-openai-chatgpt-api/)

#### OpenAI Setup:
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open the app settings (gear icon)
3. Select "OpenAI GPT" as your AI provider
4. Enter your API key and choose your preferred model
5. Enable the OpenAI integration

#### DeepSeek Setup:
1. Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Open the app settings (gear icon)
3. Select "DeepSeek" as your AI provider
4. Enter your API key and choose your preferred model
5. Enable the DeepSeek integration

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
- **Local Mode**: Basic responses, works offline
- **OpenAI GPT**: Advanced conversational AI with context awareness
- **DeepSeek**: Specialized AI with coding and reasoning capabilities

### Text Input
Type any message in the input field and press Enter or tap the send button.

## ⚙️ Configuration

### AI Settings
- **Provider Selection**: Choose between Local, OpenAI, or DeepSeek
- **API Key Management**: Secure storage with show/hide functionality
- **Model Selection**: Choose specific models for each provider
- **Fallback System**: Automatic fallback to local responses

### Audio Settings
- **Voice Output Toggle**: Enable/disable text-to-speech
- **British Accent**: Automatic selection of British voice
- **Adjustable Parameters**: Speech rate, pitch, and volume

### PWA Settings
- **Offline Functionality**: Works without internet
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

The app stores API keys securely in local storage. No environment variables are required for basic functionality.

### Browser Compatibility

- **Chrome/Edge**: Full support including all AI features
- **Safari**: Full support (iOS 14.3+) with PWA capabilities
- **Firefox**: Limited speech synthesis, full AI support
- **Mobile browsers**: Optimized experience with touch controls

## 💰 API Costs

### OpenAI Pricing (Approximate)
- **GPT-3.5 Turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens
- **GPT-4 Turbo**: ~$0.01 per 1K tokens

### DeepSeek Pricing (Approximate)
- **DeepSeek Chat**: ~$0.0014 per 1K tokens
- **DeepSeek Coder**: ~$0.0014 per 1K tokens

*Note: Prices may vary. Check provider websites for current pricing.*

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

- **API Key Encryption**: Keys are stored securely in local storage
- **No Server Storage**: All data remains on your device
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
- Special thanks to the React and Vite communities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/inertz/jarvis/issues)
- **Discussions**: [GitHub Discussions](https://github.com/inertz/jarvis/discussions)
- **Email**: webmaster@inertz.org

## 🔮 Roadmap

- [x] OpenAI GPT integration
- [x] DeepSeek AI integration
- [x] Advanced settings panel
- [x] Secure API key storage
- [ ] Conversation history export
- [ ] Custom voice training
- [ ] Weather and news integration
- [ ] Calendar and reminder features
- [ ] Multi-language support
- [ ] Smart home integration
- [ ] Advanced conversation memory
- [ ] Claude AI integration
- [ ] Gemini AI integration

---

<div align="center">

**Made with ❤️ by [inertz](https://github.com/inertz)**

[⭐ Star this repo](https://github.com/inertz/jarvis) • [🐛 Report Bug](https://github.com/inertz/jarvis/issues) • [✨ Request Feature](https://github.com/inertz/jarvis/issues)

</div>
