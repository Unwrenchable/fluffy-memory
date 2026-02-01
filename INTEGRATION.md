# X.AI + HuggingFace Integration Guide

This document explains how the Medical Assistance Helper integrates X.AI (Grok) and HuggingFace APIs to provide intelligent medical assistance as a team of experts.

## Overview

The application uses a **dual AI architecture** where two different AI services work together:

1. **X.AI (Grok)** - Advanced conversational AI for complex reasoning
2. **HuggingFace** - Specialized models for specific NLP tasks

## Architecture

```
User Query
    ↓
DualAIMedicalTeam (Router)
    ↓
    ├── Auto Mode: Smart routing based on query type
    ├── X.AI Only: Route to X.AI
    ├── HuggingFace Only: Route to HuggingFace
    └── Both: Get responses from both services
```

## Key Components

### 1. Configuration Management (`config.js`)

Handles secure storage and retrieval of API keys and settings:

- **Browser Mode**: Stores preferences in localStorage (API keys only in memory)
- **Server Mode**: Reads from environment variables
- **Security**: API keys NEVER persisted to disk in browser mode
- **Validation**: Basic validation for API key format

```javascript
// Example usage
const config = new AppConfig();
config.setApiKeys('xai-your-key', 'hf_your-key');
config.setTeamMode('auto');
```

### 2. Dual AI Integration (`xai-huggingface-integration.js`)

Coordinates both AI services and routes queries intelligently:

**Features:**
- Smart query routing
- Automatic fallback between services
- Conversation history management
- Error handling and recovery
- Source attribution (shows which AI answered)

**Routing Logic:**
```javascript
// X.AI is preferred for:
- Complex reasoning
- Medical guidance
- Conversational queries
- Appeals and legal matters
- Insurance navigation

// HuggingFace is preferred for:
- Document summarization
- Text classification
- Quick factual questions
- Specialized NLP tasks
```

### 3. AI Assistant Integration (`ai-assistant.js` + `script.js`)

The existing AI assistant now integrates with the dual AI system:

```javascript
// In script.js - sendToAI function
if (window.aiTeam && window.appConfig) {
    // Try dual AI first if configured
    response = await window.aiTeam.getTeamResponse(userMessage);
} else {
    // Fallback to rule-based system
    response = await window.aiAssistant.getIntelligentGuidance(userMessage);
}
```

## API Integration Details

### X.AI (Grok) Integration

**Endpoint:** `https://api.x.ai/v1/chat/completions`

**Request Format:**
```javascript
{
  "model": "grok-4-latest",
  "messages": [
    {
      "role": "system",
      "content": "You are a compassionate medical assistance expert..."
    },
    {
      "role": "user",
      "content": "User's question"
    }
  ],
  "stream": false,
  "temperature": 0
}
```

**Features Used:**
- Chat completions with conversation history
- System prompts for medical expertise
- Temperature control for consistency
- Non-streaming responses

### HuggingFace Integration

**Endpoint:** `https://api-inference.huggingface.co/models/{model-id}`

**Models Used:**
1. **Conversational**: `facebook/blenderbot-400M-distill`
2. **Medical**: `microsoft/BioGPT-Large`
3. **Summarization**: `facebook/bart-large-cnn`
4. **Question Answering**: `deepset/roberta-base-squad2`

**Request Format (varies by model):**
```javascript
// Conversational
{
  "inputs": {
    "past_user_inputs": ["previous", "messages"],
    "generated_responses": ["previous", "responses"],
    "text": "current query"
  }
}

// Summarization
{
  "inputs": "long text to summarize"
}

// Question Answering
{
  "inputs": {
    "question": "What is...",
    "context": "Relevant context text"
  }
}
```

## Configuration

### Browser Configuration (Client-Side)

Users configure via the UI:
1. Navigate to "⚙️ AI Configuration" section
2. Enter API keys (stored in memory only)
3. Choose team mode
4. Test connection

**Security:**
- Keys stored only in `sessionStorage` or memory
- Never written to disk
- Cleared on page refresh
- Not sent to any server except the respective AI providers

### Server Configuration (Optional)

For server-side deployments, use environment variables:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` with your keys:
```bash
XAI_API_KEY=xai-your-key-here
HUGGINGFACE_API_KEY=hf_your-key-here
AI_TEAM_MODE=auto
```

3. Ensure `.env` is in `.gitignore` (already configured)

## Security Best Practices

1. **Never Commit API Keys**
   - Use `.gitignore` (already configured)
   - Use environment variables for production
   - Keep `.env` file out of version control

2. **Client-Side Security**
   - API keys stored only in memory during session
   - No localStorage persistence for keys
   - Keys cleared on logout/refresh

3. **Server-Side Security**
   - Use environment variables
   - Restrict file permissions on `.env`
   - Rotate keys regularly
   - Use different keys for dev/prod

## Usage Examples

### Basic Usage

```javascript
// Initialize
const aiTeam = new DualAIMedicalTeam();
aiTeam.setApiKeys('xai-key', 'hf-key');

// Get response
const response = await aiTeam.getTeamResponse(
    "I was denied disability benefits. What should I do?"
);

console.log(response.response); // AI's answer
console.log(response.source);   // Which AI answered
```

### Advanced Usage

```javascript
// Set team mode
aiTeam.setTeamMode('both'); // Get responses from both AIs

// Get combined response
const response = await aiTeam.getTeamResponse(
    "Explain SSDI eligibility requirements"
);
// Response contains answers from both X.AI and HuggingFace
```

### Error Handling

```javascript
try {
    const response = await aiTeam.getTeamResponse(query);
    if (response.error) {
        // Handle error
        console.error('AI Error:', response.response);
    } else {
        // Success
        console.log('AI Response:', response.response);
    }
} catch (error) {
    // Network or other errors
    console.error('Request failed:', error);
}
```

## Testing

### Test AI Configuration

Use the built-in test function:

```javascript
// Via UI
Click "🧪 Test AI Connection" button

// Programmatically
async function testConfig() {
    const response = await aiTeam.getTeamResponse(
        "Hello, this is a test."
    );
    console.log('Test result:', response);
}
```

### Manual Testing

1. Configure both API keys
2. Test each mode:
   - Auto mode with different query types
   - X.AI only mode
   - HuggingFace only mode
   - Both mode
3. Verify responses are appropriate
4. Check source attribution

## Troubleshooting

### "API key not configured"
- Ensure you've entered API keys in the configuration section
- Check that keys are valid format (xai-... or hf_...)
- Try refreshing and re-entering keys

### "HTTP error! status: 401"
- API key is invalid or expired
- Get a new key from the provider
- Ensure no extra spaces in the key

### "HTTP error! status: 429"
- Rate limit exceeded
- Wait a few minutes before retrying
- Consider upgrading your API plan

### No response from AI
- Check browser console for errors
- Verify internet connection
- Test with "Test AI Connection" button
- Try switching to a different team mode

## Cost Considerations

Both APIs have free tiers and paid plans:

### X.AI Pricing
- Check [console.x.ai](https://console.x.ai/) for current pricing
- Free tier available for testing
- Pay-per-use model

### HuggingFace Pricing
- Free tier: 1,000 requests/month per model
- Pro: Unlimited requests for $9/month
- Enterprise: Custom pricing

**Tips to Minimize Costs:**
1. Use "Auto" mode for smart routing
2. Leverage rule-based fallback when possible
3. Clear conversation history periodically
4. Use X.AI for complex queries only

## Future Enhancements

Potential improvements to consider:

1. **Caching**: Cache common responses
2. **Streaming**: Support streaming responses for faster UX
3. **Model Selection**: Allow users to choose specific models
4. **Analytics**: Track which AI handles what types of queries
5. **Fine-tuning**: Custom fine-tuned models for medical assistance
6. **Multi-language**: Support for multiple languages
7. **Voice Input**: Speech-to-text integration

## Contributing

To add new AI providers:

1. Create a new method in `DualAIMedicalTeam` class
2. Add configuration in `config.js`
3. Update routing logic in `getAutoRoutedResponse()`
4. Add UI controls in `index.html`
5. Update documentation

## Support

For issues or questions:
1. Check this documentation
2. Review console logs for errors
3. Test with the built-in test function
4. Open an issue on GitHub

## References

- [X.AI API Documentation](https://docs.x.ai/)
- [HuggingFace API Documentation](https://huggingface.co/docs/api-inference)
- [Medical Assistance Helper README](README.md)
