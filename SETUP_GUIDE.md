# Medical Assistance Helper - Setup Guide

## Quick Start

The Medical Assistance Helper is a Progressive Web App (PWA) that helps people navigate medical assistance, insurance, disability support, and healthcare programs. This guide will help you get it running.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for AI features and service worker)
- (Optional) X.AI and/or HuggingFace API keys for AI features

## Installation Methods

### Method 1: Open Directly in Browser (Basic)

The simplest way to use the app:

1. Clone or download the repository
2. Open `index.html` directly in your web browser
3. Most features will work, but AI features require a local server

### Method 2: Use a Local Web Server (Recommended)

For full functionality including PWA features and AI capabilities:

#### Using Python 3:
```bash
python3 -m http.server 8080
```

#### Using Python 2:
```bash
python -m SimpleHTTPServer 8080
```

#### Using Node.js (npx):
```bash
npx http-server -p 8080
```

#### Using PHP:
```bash
php -S localhost:8080
```

Then visit `http://localhost:8080` in your browser.

### Method 3: Deploy to a Hosting Service

Deploy to platforms like:
- **Vercel**: Includes `vercel.json` configuration
- **Netlify**: Drop the folder in Netlify Drop
- **GitHub Pages**: Enable in repository settings
- **Cloudflare Pages**: Connect your repository

## PWA Installation

### Generating Icons

The app requires PNG icons for PWA installation. Run the provided script:

```bash
# Ensure you have rsvg-convert installed
# On Ubuntu/Debian:
sudo apt-get install librsvg2-bin

# On macOS:
brew install librsvg

# Run the icon generation script
./create-icons.sh
```

This creates:
- `icon-192.png` - 192x192 pixel icon
- `icon-512.png` - 512x512 pixel icon
- `icon-192.svg` - SVG version (already created)
- `icon-512.svg` - SVG version (already created)

### Installing as PWA

Once the app is running via HTTPS or localhost:

1. Open the app in your browser
2. Look for the "📱 Install App" button in the navigation
3. Click it to install the app on your device
4. The app will be available offline and launch like a native app

## AI Configuration

The app supports two AI services working together:

### X.AI (Grok)
- Get your API key from: https://console.x.ai/
- Provides advanced conversational AI for complex medical guidance

### HuggingFace
- Get your API key from: https://huggingface.co/settings/tokens
- Provides specialized models for document analysis and medical text processing

### Configure AI Services

1. Scroll to the "⚙️ AI Configuration" section
2. Enter your API keys (stored only in browser memory - never saved to disk)
3. Choose your preferred team mode:
   - **Auto**: Smart routing to the best AI for each task
   - **X.AI Only**: Use only Grok for all queries
   - **HuggingFace Only**: Use only HuggingFace models
   - **Both**: Get responses from both AIs simultaneously
4. Click "💾 Save Configuration"
5. Click "🧪 Test AI Connection" to verify

**Security Note**: API keys are stored only in your browser's session memory and are NEVER sent to our servers or saved permanently. You'll need to re-enter them each session.

### Server-Side AI Configuration (Optional)

For deployment environments, you can set environment variables:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your API keys:
```
XAI_API_KEY=your_xai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
AI_TEAM_MODE=auto
```

3. **IMPORTANT**: Never commit the `.env` file to version control! It's already in `.gitignore`.

## Features Overview

### For Users

- **Universal Smart Search**: Type anything and the app figures out what you need
- **AI-Powered Assistance**: Get help with forms, documents, and finding resources
- **Location Services**: Find nearby free/low-cost medical care, dental clinics, pharmacies
- **Comprehensive Intake**: Answer questions to get personalized assistance
- **Document Library**: Store and manage all your completed forms
- **Auto-Fill System**: Complete documents automatically using your profile
- **Disability Support**: Find doctors who help with disability evaluations
- **Insurance Search**: Search for programs that accept your insurance

### Authentication & Data

- **User Accounts**: Create an account to save progress (stored in browser localStorage)
- **Auto-Save**: Progress is automatically saved every 2 minutes
- **Email Documents**: Send completed documents to yourself
- **Privacy**: All data stored locally in your browser - nothing sent to external servers

## File Structure

```
├── index.html              # Main application page
├── login.html              # Login/registration page
├── donation.html           # Support page
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── config.js               # Configuration management
├── auth.js                 # Authentication system
├── ai-assistant.js         # AI assistant functionality
├── xai-huggingface-integration.js  # AI integration
├── comprehensive-intake.js # Intake questionnaire
├── document-library.js     # Document management
├── smart-search.js         # Universal search
├── location-services.js    # Location-based services
├── disability-doctor-finder.js  # Doctor finder
├── condition-categorizer.js # Medical condition categorizer
├── crypto-payment.js       # Cryptocurrency donations
├── email-system.js         # Email functionality
├── user-data-manager.js    # User data management
├── pwa-install.js          # PWA installation handler
├── create-icons.sh         # Icon generation script
└── icon-*.png/svg          # App icons
```

## Troubleshooting

### Service Worker Issues

If the service worker isn't registering:

1. Ensure you're running on HTTPS or localhost
2. Clear browser cache and reload
3. Check browser console for errors
4. Try unregistering existing service workers in DevTools > Application > Service Workers

### PWA Not Installing

1. Check that PNG icons exist (`icon-192.png`, `icon-512.png`)
2. Run `./create-icons.sh` if they're missing
3. Ensure you're on HTTPS or localhost
4. Clear cache and reload
5. Check `manifest.json` is accessible at `/manifest.json`

### AI Features Not Working

1. Verify API keys are entered correctly
2. Check browser console for API errors
3. Test connection using "🧪 Test AI Connection" button
4. Ensure you're running via a web server (not file://)
5. Check API key quotas and validity

### Icons Not Displaying

If PWA icons aren't showing:

1. Run `./create-icons.sh` to generate PNG icons from SVG
2. Verify files exist: `ls -la icon-*.png`
3. Clear browser cache
4. Unregister service worker and re-register

## Development

### Testing Locally

1. Start a local server
2. Open http://localhost:8080
3. Open browser DevTools (F12)
4. Check Console for errors
5. Use Application tab to inspect:
   - Service Worker status
   - Manifest
   - Cache storage
   - Local storage

### Browser DevTools

Use Chrome/Edge DevTools for PWA testing:

1. Open DevTools (F12)
2. Go to "Application" tab
3. Check "Manifest" section
4. Verify "Service Workers" are registered
5. Use "Lighthouse" tab to audit PWA compliance

## Browser Support

- **Chrome/Edge**: Full support including installation
- **Firefox**: Full support
- **Safari**: Most features, limited PWA support
- **Mobile Browsers**: Full support on iOS Safari and Android Chrome

## Security & Privacy

- **No Backend**: All processing happens client-side
- **Local Storage**: User data stored in browser only
- **API Keys**: Never persisted or sent to our servers
- **HTTPS**: Required for production deployment
- **Gitignore**: Prevents accidental commits of sensitive data

## Contributing

This is an open-source project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:
- Check existing GitHub issues
- Open a new issue with detailed description
- Include browser version and console errors

## License

© 2026 Medical Assistance Helper

---

**Disclaimer**: This tool provides guidance only and does not constitute medical or legal advice. Always consult with qualified professionals for your specific situation.
