# Medical Assistance Helper 🏥

A comprehensive web application that helps people get the medical help they need by searching for aid programs, insurance coverage, doctors, and providing complete paperwork assistance.

## Features

### 🔍 Insurance & Aid Program Search
Search for programs that accept your insurance, match your medical condition, and are available in your area. Find Medicare, Medicaid, CHIP, and Healthcare Marketplace options.

### 📋 Paperwork Guidance & Assistance
Step-by-step wizards to help complete:
- Insurance applications
- Medical records requests
- Financial assistance forms
- Treatment authorization requests

### ♿ Disability Support for Rare Conditions
Specialized assistance for rare conditions with access to:
- Social Security Disability Insurance (SSDI)
- Supplemental Security Income (SSI)
- State disability programs
- National Organization for Rare Disorders (NORD) resources

### 👨‍⚕️ Find Doctors for Approval & Treatment
Search for specialists who can help with:
- Disability approval evaluations
- Rare condition treatment
- Insurance-accepting providers

### 🤖 AI-Powered Assistance Tools
Six advanced AI tools to help with every step:
1. **Smart Form Filler** - AI-assisted form completion
2. **Virtual Health Assistant** - Interactive chat guidance
3. **Document Analyzer** - Upload and analyze medical documents
4. **Coverage Predictor** - Predict insurance coverage likelihood
5. **Appeal Letter Generator** - Generate professional appeal letters
6. **Appointment Coordinator** - Manage medical appointments

### 🤖 Dual AI Integration (X.AI + HuggingFace)
Intelligent AI support powered by two AI systems working as a medical expert team.

**Features:**
- **X.AI (Grok)** - Advanced conversational AI for complex medical guidance and reasoning
- **HuggingFace** - Specialized models for document analysis, summarization, and medical text processing
- **Smart Routing** - Automatically selects the best AI for your query
- **Team Modes**:
  - **Auto**: Intelligent routing to the most suitable AI
  - **X.AI Only**: Use only Grok for all queries
  - **HuggingFace Only**: Use only HuggingFace models
  - **Both**: Get responses from both AIs simultaneously

**API Key Configuration (Server-Side):**
- AI API keys are configured via environment variables on the server — they are never exposed in the browser
- See `.env.example` for all supported variables
- On Vercel: set `XAI_API_KEY` and `HUGGINGFACE_API_KEY` in your project's Environment Variables settings
- On Render: set these in the Environment section of your service dashboard

### 🔐 User Authentication & Progress Tracking
**NEW:** Create an account to save your progress and access your documents:
- **Save Your Place** - Your progress is automatically saved and persists across sessions
- **Document Library** - Store and manage all your completed forms and documents
- **Email Documents** - Send documents to yourself via email with one click
- **Secure Sessions** - Your data is stored securely in your browser's local storage
- **Auto-Save** - Progress is automatically saved every 2 minutes

## Quick Start

### 🚀 Get Started in 2 Minutes

1. **Clone or download** this repository
2. **Run a local server**:
   ```bash
   # Using Python 3 (recommended)
   python3 -m http.server 8080
   ```
3. **Open** http://localhost:8080 in your browser
4. **Start using** the app - no setup required!

### 📱 Install as PWA (Progressive Web App)

1. Click the "📱 Install App" button in the navigation
2. The app will install like a native app on your device
3. Use it offline and access it from your home screen

### 🤖 Enable AI Features (Optional)

1. Get API keys from [X.AI](https://console.x.ai/) and/or [HuggingFace](https://huggingface.co/settings/tokens)
2. Set `XAI_API_KEY` and/or `HUGGINGFACE_API_KEY` as environment variables on your hosting platform
3. The app auto-discovers keys via the `/api/config` endpoint (Vercel) or `js/env.js` (Render)

**Need help?** See our [**Complete Setup Guide**](SETUP_GUIDE.md) for detailed installation instructions, troubleshooting, and deployment options.

## Detailed Installation

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser. Most features work, but AI features require a local server.

### Option 2: Run with Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js
npx http-server -p 8080
```

Then visit `http://localhost:8080` in your browser.

## Technology Stack

- **HTML5** - Semantic, accessible structure
- **CSS3** - Modern responsive design with animations
- **JavaScript (ES6)** - Interactive features and dynamic content
- **AI Integration** - X.AI (Grok) and HuggingFace APIs for intelligent assistance
- **No external dependencies** - Works completely standalone

## Security & Privacy

- **API Keys**: Stored only in browser memory, never persisted or sent to our servers
- **Local Storage**: User data stored securely in browser's local storage
- **No Backend**: All processing happens client-side for maximum privacy
- **Gitignore Protection**: `.gitignore` file prevents accidental commits of sensitive data
- **Environment Variables**: Use `.env.example` as a template for server-side deployments

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### PWA Not Installing?
- Ensure you're running via a local server (not opening files directly)
- PNG icons should exist - run `./create-icons.sh` if missing
- Clear browser cache and reload

### AI Features Not Working?
- Verify you're using a local server (http://localhost:8080)
- Check that `XAI_API_KEY` and/or `HUGGINGFACE_API_KEY` environment variables are set correctly on your hosting platform
- For local development: set these in a `.env` file and ensure your server reads them

### Need More Help?
See the [**Complete Setup Guide**](SETUP_GUIDE.md) for detailed troubleshooting, installation options, and configuration help.

## Disclaimer

This tool provides guidance only and does not constitute medical or legal advice. Always consult with qualified professionals for your specific situation.

## License

© 2026 Medical Assistance Helper
