# 🤖 Jarvis AI Assistant

A sophisticated AI assistant mobile app inspired by Iron Man's JARVIS, featuring voice recognition, text-to-speech, and a sleek mobile-first interface.

![Jarvis AI Assistant](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎙️ **Voice Interaction**
- **Speech Recognition**: Tap to speak and interact naturally
- **Text-to-Speech**: Jarvis responds with a sophisticated British accent
- **Auto-send**: Voice input automatically processes your requests
- **Voice Visualizer**: Real-time audio feedback during conversations

### 📱 **Mobile-First Design**
- **Progressive Web App (PWA)**: Install as a native app on any device
- **Offline Support**: Works without internet connection
- **iOS Safe Area**: Full iPhone/iPad compatibility including notch support
- **Haptic Feedback**: Tactile responses for better user experience
- **Touch Optimized**: Large buttons and gesture-friendly interface

### 🎨 **Premium UI/UX**
- **Jarvis-themed Design**: Cyan blue accent colors with dark theme
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Status Indicators**: Real-time connection and activity status
- **Settings Panel**: Customizable audio and system preferences

### 🧠 **AI Capabilities**
- **Conversational AI**: Natural language processing and responses
- **Time & Date**: Current time and date information
- **System Status**: Battery, connection, and device information
- **Contextual Responses**: Intelligent replies based on user input
- **Personality**: Professional British assistant personality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jarvis-ai-assistant.git
   cd jarvis-ai-assistant
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

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **PWA** - Progressive Web App capabilities
- **Web Speech API** - Voice recognition and synthesis
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
jarvis-ai-assistant/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── pwa-*.png             # App icons
│   └── apple-touch-icon.png  # iOS icon
├── src/
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # TypeScript definitions
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

### Text Input
Type any message in the input field and press Enter or tap the send button.

## ⚙️ Configuration

### Audio Settings
- Toggle voice output on/off
- Automatic British accent selection
- Adjustable speech rate and pitch

### PWA Settings
- Offline functionality
- Custom app icons
- Standalone display mode
- Auto-update capabilities

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

The app uses browser APIs and doesn't require external API keys for basic functionality.

### Browser Compatibility

- **Chrome/Edge**: Full support
- **Safari**: Full support (iOS 14.3+)
- **Firefox**: Limited speech synthesis
- **Mobile browsers**: Optimized experience

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Marvel's Iron Man JARVIS AI
- Icons by [Lucide](https://lucide.dev/)
- Built with modern web technologies
- Special thanks to the React and Vite communities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/jarvis-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/jarvis-ai-assistant/discussions)
- **Email**: your.email@example.com

## 🔮 Roadmap

- [ ] Integration with external AI APIs (OpenAI, Claude)
- [ ] Weather and news information
- [ ] Calendar and reminder features
- [ ] Multi-language support
- [ ] Custom voice training
- [ ] Smart home integration
- [ ] Advanced conversation memory

---

<div align="center">

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

[⭐ Star this repo](https://github.com/yourusername/jarvis-ai-assistant) • [🐛 Report Bug](https://github.com/yourusername/jarvis-ai-assistant/issues) • [✨ Request Feature](https://github.com/yourusername/jarvis-ai-assistant/issues)

</div>