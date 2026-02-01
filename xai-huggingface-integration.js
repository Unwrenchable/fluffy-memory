// X.AI + HuggingFace Integration for Medical Assistance
// This module coordinates both AI services to work as a team of medical experts

class DualAIMedicalTeam {
    constructor() {
        // X.AI Configuration (Grok)
        this.xaiConfig = {
            apiKey: null, // User will provide their API key
            apiUrl: 'https://api.x.ai/v1/chat/completions',
            model: 'grok-4-latest',
            temperature: 0
        };
        
        // HuggingFace Configuration
        this.huggingFaceConfig = {
            apiKey: null, // User will provide their API key
            apiUrl: 'https://api-inference.huggingface.co/models/',
            models: {
                conversational: 'facebook/blenderbot-400M-distill',
                medical: 'microsoft/BioGPT-Large',
                summarization: 'facebook/bart-large-cnn',
                questionAnswering: 'deepset/roberta-base-squad2'
            }
        };
        
        // Track which AI is currently active
        this.activeAI = null;
        this.conversationHistory = [];
        this.teamMode = 'auto'; // auto, xai-only, huggingface-only, both
        
        // Medical domain routing configuration
        this.routingRules = {
            // Use X.AI (Grok) for complex medical reasoning and conversations
            xaiDomains: [
                'complex diagnosis',
                'treatment planning',
                'medical advice',
                'symptom analysis',
                'conversational guidance',
                'appeals and legal',
                'insurance navigation'
            ],
            // Use HuggingFace for specialized tasks
            huggingFaceDomains: [
                'document summarization',
                'form filling',
                'medical text analysis',
                'quick factual questions',
                'classification tasks'
            ]
        };
    }

    // Initialize with API keys
    setApiKeys(xaiKey, huggingFaceKey) {
        this.xaiConfig.apiKey = xaiKey;
        this.huggingFaceConfig.apiKey = huggingFaceKey;
    }

    // Set team operation mode
    setTeamMode(mode) {
        if (['auto', 'xai-only', 'huggingface-only', 'both'].includes(mode)) {
            this.teamMode = mode;
        }
    }

    // Main entry point - intelligently routes query to appropriate AI(s)
    async getTeamResponse(userQuery, context = {}) {
        // Check if we have at least one API key
        const hasXAI = !!this.xaiConfig.apiKey;
        const hasHuggingFace = !!this.huggingFaceConfig.apiKey;
        
        if (!hasXAI && !hasHuggingFace) {
            return {
                response: "Please configure at least one API key (X.AI or HuggingFace) to use the AI assistant.",
                source: 'system',
                error: true
            };
        }

        try {
            // Route based on team mode
            switch (this.teamMode) {
                case 'xai-only':
                    if (hasXAI) {
                        return await this.getXAIResponse(userQuery, context);
                    }
                    break;
                    
                case 'huggingface-only':
                    if (hasHuggingFace) {
                        return await this.getHuggingFaceResponse(userQuery, context);
                    }
                    break;
                    
                case 'both':
                    // Get responses from both and combine
                    return await this.getCombinedResponse(userQuery, context);
                    
                case 'auto':
                default:
                    // Intelligently route to best AI
                    return await this.getAutoRoutedResponse(userQuery, context);
            }
        } catch (error) {
            console.error('AI Team Error:', error);
            return {
                response: `I encountered an error: ${error.message}. Let me try to help you anyway with what I know.`,
                source: 'error',
                error: true
            };
        }
    }

    // Auto-route to the best AI based on query type
    async getAutoRoutedResponse(userQuery, context) {
        const queryLower = userQuery.toLowerCase();
        
        // Determine which AI is better suited
        const useXAI = this.shouldUseXAI(queryLower);
        const hasXAI = !!this.xaiConfig.apiKey;
        const hasHuggingFace = !!this.huggingFaceConfig.apiKey;
        
        // Try primary choice, fallback to secondary
        if (useXAI && hasXAI) {
            try {
                return await this.getXAIResponse(userQuery, context);
            } catch (error) {
                console.error('X.AI failed, falling back to HuggingFace:', error);
                if (hasHuggingFace) {
                    return await this.getHuggingFaceResponse(userQuery, context);
                }
                throw error;
            }
        } else if (hasHuggingFace) {
            try {
                return await this.getHuggingFaceResponse(userQuery, context);
            } catch (error) {
                console.error('HuggingFace failed, falling back to X.AI:', error);
                if (hasXAI) {
                    return await this.getXAIResponse(userQuery, context);
                }
                throw error;
            }
        } else if (hasXAI) {
            return await this.getXAIResponse(userQuery, context);
        }
        
        throw new Error('No API keys configured');
    }

    // Determine if X.AI is better suited for the query
    shouldUseXAI(queryLower) {
        // X.AI (Grok) is better for complex reasoning and conversations
        const xaiIndicators = [
            'help me', 'what should i', 'i need advice', 'i\'m confused',
            'denied', 'appeal', 'how do i', 'can you explain',
            'diagnosis', 'treatment', 'doctor', 'insurance'
        ];
        
        // HuggingFace is better for specific NLP tasks
        const hfIndicators = [
            'summarize', 'extract', 'classify', 'analyze document'
        ];
        
        const xaiScore = xaiIndicators.filter(ind => queryLower.includes(ind)).length;
        const hfScore = hfIndicators.filter(ind => queryLower.includes(ind)).length;
        
        // Default to X.AI for conversational queries
        return xaiScore >= hfScore;
    }

    // Get response from X.AI (Grok)
    async getXAIResponse(userQuery, context = {}) {
        if (!this.xaiConfig.apiKey) {
            throw new Error('X.AI API key not configured');
        }

        // Build conversation messages with medical context
        const messages = [
            {
                role: 'system',
                content: `You are a compassionate medical assistance expert helping people navigate healthcare, insurance, disability benefits, and medical paperwork. Your role is to:
1. Provide clear, actionable guidance for medical assistance programs
2. Help users understand complex medical and insurance bureaucracy
3. Offer emotional support and encouragement
4. Guide users through appeals, applications, and documentation
5. Explain eligibility criteria and next steps
6. Simplify medical and legal terminology

Be empathetic, patient, and thorough. Many users are frustrated, confused, or have been denied help before.`
            }
        ];

        // Add conversation history (last 5 exchanges)
        const recentHistory = this.conversationHistory.slice(-10);
        messages.push(...recentHistory);

        // Add current query
        messages.push({
            role: 'user',
            content: userQuery
        });

        // Call X.AI API
        const response = await fetch(this.xaiConfig.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.xaiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: this.xaiConfig.model,
                messages: messages,
                stream: false,
                temperature: this.xaiConfig.temperature
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`X.AI API error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Update conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userQuery
        });
        this.conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        // Keep history manageable (last 10 messages = 5 exchanges)
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }

        this.activeAI = 'xai';

        return {
            response: aiResponse,
            source: 'X.AI (Grok)',
            model: this.xaiConfig.model,
            confidence: 0.9,
            suggestions: this.extractActionSuggestions(aiResponse)
        };
    }

    // Get response from HuggingFace
    async getHuggingFaceResponse(userQuery, context = {}) {
        if (!this.huggingFaceConfig.apiKey) {
            throw new Error('HuggingFace API key not configured');
        }

        // Determine which HuggingFace model to use
        const taskType = this.detectTaskType(userQuery);
        const modelId = this.huggingFaceConfig.models[taskType];

        let response;
        
        if (taskType === 'conversational') {
            // Use conversational model
            response = await this.queryHuggingFaceConversational(modelId, userQuery);
        } else if (taskType === 'summarization') {
            // Use summarization model
            response = await this.queryHuggingFaceSummarization(modelId, userQuery);
        } else if (taskType === 'questionAnswering') {
            // Use Q&A model
            response = await this.queryHuggingFaceQA(modelId, userQuery, context);
        } else {
            // Default to conversational
            response = await this.queryHuggingFaceConversational(
                this.huggingFaceConfig.models.conversational, 
                userQuery
            );
        }

        this.activeAI = 'huggingface';

        return {
            response: response.text,
            source: 'HuggingFace',
            model: modelId,
            confidence: response.confidence || 0.8,
            suggestions: this.extractActionSuggestions(response.text)
        };
    }

    // Detect task type for HuggingFace routing
    detectTaskType(query) {
        const queryLower = query.toLowerCase();
        
        if (queryLower.includes('summarize') || queryLower.includes('summary')) {
            return 'summarization';
        } else if (queryLower.includes('what is') || queryLower.includes('who is') || 
                   queryLower.includes('how many') || queryLower.includes('when')) {
            return 'questionAnswering';
        } else if (queryLower.includes('medical') || queryLower.includes('diagnosis')) {
            return 'medical';
        }
        
        return 'conversational';
    }

    // Query HuggingFace conversational model
    async queryHuggingFaceConversational(modelId, userQuery) {
        const response = await fetch(this.huggingFaceConfig.apiUrl + modelId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.huggingFaceConfig.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {
                    past_user_inputs: this.conversationHistory
                        .filter((_, i) => i % 2 === 0)
                        .map(m => m.content),
                    generated_responses: this.conversationHistory
                        .filter((_, i) => i % 2 === 1)
                        .map(m => m.content),
                    text: userQuery
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HuggingFace API error: ${response.status}`);
        }

        const data = await response.json();
        return {
            text: data.generated_text || data[0]?.generated_text || 'I apologize, I had trouble processing that.',
            confidence: 0.8
        };
    }

    // Query HuggingFace summarization model
    async queryHuggingFaceSummarization(modelId, text) {
        const response = await fetch(this.huggingFaceConfig.apiUrl + modelId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.huggingFaceConfig.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: text
            })
        });

        if (!response.ok) {
            throw new Error(`HuggingFace API error: ${response.status}`);
        }

        const data = await response.json();
        return {
            text: data[0]?.summary_text || 'Summary not available.',
            confidence: 0.85
        };
    }

    // Query HuggingFace Q&A model
    async queryHuggingFaceQA(modelId, question, context) {
        const contextText = context.documentText || 'Medical assistance information and healthcare guidance.';
        
        const response = await fetch(this.huggingFaceConfig.apiUrl + modelId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.huggingFaceConfig.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {
                    question: question,
                    context: contextText
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HuggingFace API error: ${response.status}`);
        }

        const data = await response.json();
        return {
            text: data.answer || 'I could not find an answer.',
            confidence: data.score || 0.7
        };
    }

    // Get combined response from both AIs
    async getCombinedResponse(userQuery, context) {
        const hasXAI = !!this.xaiConfig.apiKey;
        const hasHuggingFace = !!this.huggingFaceConfig.apiKey;

        if (!hasXAI || !hasHuggingFace) {
            return {
                response: 'Both API keys are required for combined mode.',
                source: 'system',
                error: true
            };
        }

        try {
            // Get responses from both in parallel
            const [xaiResult, hfResult] = await Promise.allSettled([
                this.getXAIResponse(userQuery, context),
                this.getHuggingFaceResponse(userQuery, context)
            ]);

            let combinedResponse = '**Team Response:**\n\n';

            if (xaiResult.status === 'fulfilled') {
                combinedResponse += `**🤖 X.AI (Grok):** ${xaiResult.value.response}\n\n`;
            }

            if (hfResult.status === 'fulfilled') {
                combinedResponse += `**🤗 HuggingFace:** ${hfResult.value.response}\n\n`;
            }

            if (xaiResult.status === 'rejected' && hfResult.status === 'rejected') {
                throw new Error('Both AI services failed');
            }

            return {
                response: combinedResponse,
                source: 'Combined (X.AI + HuggingFace)',
                confidence: 0.85,
                suggestions: []
            };
        } catch (error) {
            throw error;
        }
    }

    // Extract action suggestions from AI response
    extractActionSuggestions(responseText) {
        const suggestions = [];
        
        // Look for actionable items in response
        if (responseText.toLowerCase().includes('appeal')) {
            suggestions.push({
                action: 'start_appeal',
                text: 'Start Appeal Process',
                icon: '⚖️',
                description: 'Begin your appeal with guided assistance'
            });
        }
        
        if (responseText.toLowerCase().includes('document')) {
            suggestions.push({
                action: 'document_help',
                text: 'Document Assistance',
                icon: '📄',
                description: 'Help with gathering documentation'
            });
        }
        
        if (responseText.toLowerCase().includes('doctor') || responseText.toLowerCase().includes('specialist')) {
            suggestions.push({
                action: 'find_doctor',
                text: 'Find Doctors',
                icon: '👨‍⚕️',
                description: 'Search for specialists who can help'
            });
        }
        
        if (responseText.toLowerCase().includes('insurance') || responseText.toLowerCase().includes('coverage')) {
            suggestions.push({
                action: 'check_insurance',
                text: 'Check Insurance Options',
                icon: '🏥',
                description: 'Find insurance programs you qualify for'
            });
        }

        return suggestions;
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
    }

    // Get current AI status
    getStatus() {
        return {
            xaiConfigured: !!this.xaiConfig.apiKey,
            huggingFaceConfigured: !!this.huggingFaceConfig.apiKey,
            activeAI: this.activeAI,
            teamMode: this.teamMode,
            historyLength: this.conversationHistory.length
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DualAIMedicalTeam;
}
