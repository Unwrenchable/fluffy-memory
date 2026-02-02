// Configuration loader for API keys
// This file safely loads environment variables and provides default values

class AppConfig {
    constructor() {
        // Check if we're in a browser environment
        this.isBrowser = typeof window !== 'undefined';
        
        // Storage key for browser-based config
        this.storageKey = 'medicalAssistant_apiConfig';
        
        // Default configuration
        this.config = {
            xai: {
                apiKey: null,
                model: 'grok-4-latest',
                temperature: 0,
                enabled: true
            },
            huggingface: {
                apiKey: null,
                enabled: true
            },
            teamMode: 'auto', // auto, xai-only, huggingface-only, both
            debugMode: false
        };
        
        // Load configuration
        this.loadConfig();
    }
    
    // Load configuration from localStorage (browser) or environment (node)
    loadConfig() {
        if (this.isBrowser) {
            // Load from localStorage
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    this.config = { ...this.config, ...parsed };
                } catch (error) {
                    console.error('Failed to parse saved config:', error);
                }
            }
        } else {
            // Load from environment variables (Node.js)
            if (typeof process !== 'undefined' && process.env) {
                this.config.xai.apiKey = process.env.XAI_API_KEY || null;
                this.config.huggingface.apiKey = process.env.HUGGINGFACE_API_KEY || null;
                this.config.teamMode = process.env.AI_TEAM_MODE || 'auto';
                this.config.xai.enabled = process.env.ENABLE_XAI !== 'false';
                this.config.huggingface.enabled = process.env.ENABLE_HUGGINGFACE !== 'false';
                this.config.debugMode = process.env.DEBUG_MODE === 'true';
                
                if (process.env.XAI_MODEL) {
                    this.config.xai.model = process.env.XAI_MODEL;
                }
                if (process.env.XAI_TEMPERATURE) {
                    this.config.xai.temperature = parseFloat(process.env.XAI_TEMPERATURE);
                }
            }
        }
    }
    
    // Save configuration (browser only)
    saveConfig() {
        if (this.isBrowser) {
            // Never save actual API keys in localStorage - only save preferences
            const safeConfig = {
                teamMode: this.config.teamMode,
                xai: {
                    enabled: this.config.xai.enabled,
                    model: this.config.xai.model,
                    temperature: this.config.xai.temperature
                },
                huggingface: {
                    enabled: this.config.huggingface.enabled
                },
                debugMode: this.config.debugMode
            };
            localStorage.setItem(this.storageKey, JSON.stringify(safeConfig));
        }
    }
    
    // Set API keys (in memory only, never persisted)
    setApiKeys(xaiKey, huggingfaceKey) {
        if (xaiKey) {
            this.config.xai.apiKey = xaiKey;
        }
        if (huggingfaceKey) {
            this.config.huggingface.apiKey = huggingfaceKey;
        }
        // Note: API keys are NOT saved to localStorage for security
    }
    
    // Get API key for a service
    getApiKey(service) {
        if (service === 'xai') {
            return this.config.xai.apiKey;
        } else if (service === 'huggingface') {
            return this.config.huggingface.apiKey;
        }
        return null;
    }
    
    // Set team mode
    setTeamMode(mode) {
        if (['auto', 'xai-only', 'huggingface-only', 'both'].includes(mode)) {
            this.config.teamMode = mode;
            this.saveConfig();
        }
    }
    
    // Get team mode
    getTeamMode() {
        return this.config.teamMode;
    }
    
    // Check if a service is configured
    isConfigured(service) {
        if (service === 'xai') {
            return !!this.config.xai.apiKey && this.config.xai.enabled;
        } else if (service === 'huggingface') {
            return !!this.config.huggingface.apiKey && this.config.huggingface.enabled;
        }
        return false;
    }
    
    // Get full configuration
    getConfig() {
        return { ...this.config };
    }
    
    // Validate API key format (basic validation)
    validateApiKey(service, key) {
        if (!key || typeof key !== 'string' || key.trim() === '') {
            return { valid: false, error: 'API key is required' };
        }
        
        const MIN_API_KEY_LENGTH = 20; // Minimum secure key length
        
        if (service === 'xai') {
            // X.AI keys typically start with 'xai-'
            if (!key.startsWith('xai-')) {
                return { 
                    valid: false, 
                    error: 'X.AI API keys should start with "xai-"' 
                };
            }
            if (key.length < MIN_API_KEY_LENGTH) {
                return { 
                    valid: false, 
                    error: 'X.AI API key appears too short' 
                };
            }
        } else if (service === 'huggingface') {
            // HuggingFace keys typically start with 'hf_'
            if (!key.startsWith('hf_')) {
                return { 
                    valid: false, 
                    error: 'HuggingFace API keys should start with "hf_"' 
                };
            }
            if (key.length < MIN_API_KEY_LENGTH) {
                return { 
                    valid: false, 
                    error: 'HuggingFace API key appears too short' 
                };
            }
        }
        
        return { valid: true };
    }
    
    // Clear API keys from memory
    clearApiKeys() {
        this.config.xai.apiKey = null;
        this.config.huggingface.apiKey = null;
    }
    
    // Get configuration status
    getStatus() {
        return {
            xaiConfigured: this.isConfigured('xai'),
            huggingfaceConfigured: this.isConfigured('huggingface'),
            teamMode: this.config.teamMode,
            anyConfigured: this.isConfigured('xai') || this.isConfigured('huggingface')
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}
