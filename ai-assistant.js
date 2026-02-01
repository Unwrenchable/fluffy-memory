// Hugging Face AI Integration for Medical Assistance
// This module provides intelligent assistance using Hugging Face models

class MedicalAIAssistant {
    constructor() {
        // Hugging Face API configuration
        this.apiKey = null; // User will need to provide their own API key
        this.apiUrl = 'https://api-inference.huggingface.co/models/';
        
        // Models for different tasks
        this.models = {
            conversational: 'facebook/blenderbot-400M-distill', // Conversational AI
            textGeneration: 'gpt2', // Text generation for appeals
            questionAnswering: 'deepset/roberta-base-squad2', // Q&A for medical questions
            sentiment: 'distilbert-base-uncased-finetuned-sst-2-english', // Analyze user frustration
            summarization: 'facebook/bart-large-cnn' // Summarize complex documents
        };
        
        // User context and journey tracking
        this.userContext = {
            currentStep: 'initial',
            history: [],
            frustrationLevel: 0,
            denialCount: 0,
            needsIdentified: [],
            documentsAnalyzed: [],
            recommendations: []
        };
        
        this.conversationHistory = [];
    }

    // Initialize with user's API key (optional - can work in demo mode)
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    // Main AI assistant function - analyzes user input and provides guidance
    async getIntelligentGuidance(userInput, context = {}) {
        // Update user context
        this.userContext = { ...this.userContext, ...context };
        
        // If no API key, use intelligent rule-based system
        if (!this.apiKey) {
            return this.getRuleBasedGuidance(userInput, context);
        }
        
        try {
            // Use Hugging Face conversational model
            const response = await this.queryHuggingFace(
                this.models.conversational,
                {
                    inputs: {
                        past_user_inputs: this.conversationHistory.filter((_, i) => i % 2 === 0),
                        generated_responses: this.conversationHistory.filter((_, i) => i % 2 === 1),
                        text: userInput
                    }
                }
            );
            
            // Add to conversation history
            this.conversationHistory.push(userInput);
            this.conversationHistory.push(response.generated_text);
            
            return {
                response: response.generated_text,
                suggestions: this.generateActionSuggestions(userInput, context),
                confidence: 0.85
            };
        } catch (error) {
            console.error('AI Error:', error);
            return this.getRuleBasedGuidance(userInput, context);
        }
    }

    // Intelligent rule-based guidance (works without API key)
    getRuleBasedGuidance(userInput, context) {
        const input = userInput.toLowerCase();
        let response = '';
        let suggestions = [];
        
        // Detect user frustration and confusion
        const frustrationWords = ['confused', 'frustrated', 'give up', 'denied', 'rejected', 'don\'t understand', 'complicated', 'difficult'];
        const isFrustrated = frustrationWords.some(word => input.includes(word));
        
        if (isFrustrated) {
            this.userContext.frustrationLevel++;
            response = "I understand this process can be overwhelming and frustrating. Let me help simplify things for you. ";
        }
        
        // Detect denial situation
        if (input.includes('denied') || input.includes('rejected') || input.includes('turned down')) {
            this.userContext.denialCount++;
            response += "I see you've been denied. This is common and there are specific steps we can take. Don't give up - many successful applicants are initially denied. ";
            suggestions.push({
                action: 'appeal_help',
                text: 'Start Appeal Process',
                icon: '📝',
                description: 'I\'ll help you write a strong appeal letter'
            });
            suggestions.push({
                action: 'document_review',
                text: 'Review Documentation',
                icon: '📄',
                description: 'Let\'s see what additional evidence we need'
            });
            suggestions.push({
                action: 'find_advocate',
                text: 'Find an Advocate',
                icon: '👥',
                description: 'Connect with disability advocates who can help'
            });
        }
        
        // Detect need identification
        if (input.includes('need') || input.includes('looking for') || input.includes('want')) {
            response += "Let me understand what you need. ";
            
            // Insurance related
            if (input.includes('insurance') || input.includes('coverage')) {
                response += "For insurance coverage, I recommend: 1) Checking Medicare/Medicaid eligibility, 2) Exploring marketplace plans, 3) Looking into state-specific programs. ";
                suggestions.push({
                    action: 'insurance_wizard',
                    text: 'Insurance Eligibility Check',
                    icon: '🏥',
                    description: 'Quick questionnaire to find your best options'
                });
            }
            
            // Disability related
            if (input.includes('disability') || input.includes('ssdi') || input.includes('ssi')) {
                response += "For disability benefits, the key is thorough medical documentation and understanding the criteria. Many applications are denied initially, but appeals often succeed. ";
                suggestions.push({
                    action: 'disability_strategy',
                    text: 'Disability Application Strategy',
                    icon: '♿',
                    description: 'Step-by-step plan to maximize approval chances'
                });
            }
            
            // Financial assistance
            if (input.includes('afford') || input.includes('cost') || input.includes('money') || input.includes('financial')) {
                response += "For financial assistance, there are multiple programs available including hospital charity care, pharmaceutical assistance, and state programs. ";
                suggestions.push({
                    action: 'financial_programs',
                    text: 'Find Financial Help',
                    icon: '💰',
                    description: 'Programs that can help with medical costs'
                });
            }
        }
        
        // Detect bureaucracy/red tape concerns
        if (input.includes('red tape') || input.includes('bureaucracy') || input.includes('paperwork') || input.includes('forms')) {
            response += "I'll help you cut through the bureaucracy. The key is knowing exactly what forms you need and how to fill them correctly. ";
            suggestions.push({
                action: 'paperwork_helper',
                text: 'Smart Paperwork Assistant',
                icon: '📋',
                description: 'I\'ll guide you through each form step-by-step'
            });
        }
        
        // Doctor/recommendation issues
        if (input.includes('doctor') && (input.includes('denied') || input.includes('won\'t') || input.includes('refuses'))) {
            response += "If your doctor isn't providing needed recommendations, you have options: 1) Request a second opinion, 2) Find specialists who understand your condition, 3) Document all symptoms and limitations yourself. ";
            suggestions.push({
                action: 'find_specialist',
                text: 'Find Supportive Doctors',
                icon: '👨‍⚕️',
                description: 'Doctors who specialize in disability evaluations'
            });
        }
        
        // General help
        if (response === '') {
            response = "I'm here to help you navigate the medical assistance system. What specific challenge are you facing right now?";
            suggestions = this.generateGeneralSuggestions();
        }
        
        return {
            response: response.trim(),
            suggestions: suggestions,
            confidence: 0.75,
            userContext: this.userContext
        };
    }

    // Generate action suggestions based on context
    generateActionSuggestions(input, context) {
        const suggestions = [];
        
        // Always offer to start simple questionnaire
        if (this.userContext.currentStep === 'initial') {
            suggestions.push({
                action: 'start_questionnaire',
                text: 'Start Simple Assessment',
                icon: '📝',
                description: 'Quick questions to understand your situation'
            });
        }
        
        // Offer document analysis if they mention paperwork
        if (input.toLowerCase().includes('document') || input.toLowerCase().includes('form')) {
            suggestions.push({
                action: 'document_analyzer',
                text: 'Analyze Documents',
                icon: '🔍',
                description: 'Upload documents for AI analysis'
            });
        }
        
        return suggestions;
    }

    // Generate general helpful suggestions
    generateGeneralSuggestions() {
        return [
            {
                action: 'assess_needs',
                text: 'Assess My Needs',
                icon: '🎯',
                description: 'Take a short quiz to identify what help you need'
            },
            {
                action: 'check_eligibility',
                text: 'Check Eligibility',
                icon: '✅',
                description: 'See what programs you qualify for'
            },
            {
                action: 'appeal_denial',
                text: 'Appeal a Denial',
                icon: '⚖️',
                description: 'Help with denied applications or claims'
            },
            {
                action: 'simplify_process',
                text: 'Simplify My Process',
                icon: '🎯',
                description: 'Get a clear, simple roadmap'
            }
        ];
    }

    // Smart intake questionnaire to understand user needs
    async conductIntakeQuestionnaire() {
        return {
            questions: [
                {
                    id: 'situation',
                    question: 'What best describes your current situation?',
                    type: 'multiple-choice',
                    options: [
                        'I need health insurance',
                        'I\'m applying for disability benefits',
                        'I need help paying for medical care',
                        'I need to find a doctor who can help me',
                        'I was denied and need to appeal',
                        'I\'m confused about what steps to take'
                    ]
                },
                {
                    id: 'previous_attempts',
                    question: 'Have you tried to get help before?',
                    type: 'multiple-choice',
                    options: [
                        'No, this is my first time',
                        'Yes, but I got confused',
                        'Yes, and I was denied',
                        'Yes, multiple times without success'
                    ]
                },
                {
                    id: 'main_challenge',
                    question: 'What\'s your biggest challenge right now?',
                    type: 'multiple-choice',
                    options: [
                        'Understanding what I qualify for',
                        'Filling out the forms correctly',
                        'Getting the right medical documentation',
                        'Finding doctors who will support my application',
                        'Dealing with denials and appeals',
                        'Understanding the confusing process'
                    ]
                },
                {
                    id: 'urgency',
                    question: 'How urgent is your need?',
                    type: 'multiple-choice',
                    options: [
                        'Very urgent - immediate medical needs',
                        'Somewhat urgent - within a few months',
                        'Not urgent - planning ahead'
                    ]
                }
            ],
            purpose: 'Understanding your situation helps me provide the most relevant guidance'
        };
    }

    // Analyze denial and provide appeal strategy
    analyzeDenial(denialReason, userSituation) {
        const strategies = {
            'insufficient_medical_evidence': {
                title: 'Insufficient Medical Evidence',
                strategy: 'The most common reason for denial. We need to strengthen your medical documentation.',
                steps: [
                    'Request detailed medical records from all treating physicians',
                    'Get a comprehensive evaluation from a specialist',
                    'Have your doctor write a detailed Residual Functional Capacity (RFC) form',
                    'Document all symptoms, limitations, and how they affect daily activities',
                    'Include objective medical test results (MRIs, X-rays, lab work)'
                ],
                timeline: '2-3 months to gather evidence, file appeal within 60 days'
            },
            'able_to_work': {
                title: 'Deemed Able to Work',
                strategy: 'They believe you can still work. We need to prove your functional limitations.',
                steps: [
                    'Get a Residual Functional Capacity evaluation showing specific limitations',
                    'Document how your condition prevents you from working 8 hours/day, 5 days/week',
                    'Include statements about bad days, flare-ups, and symptom variability',
                    'Show how medications affect your ability to concentrate and work',
                    'Get statements from former employers if you had to stop working'
                ],
                timeline: 'File appeal within 60 days with new evidence'
            },
            'not_severe_enough': {
                title: 'Condition Not Severe Enough',
                strategy: 'They don\'t think your condition meets their severity criteria.',
                steps: [
                    'Get evaluation from specialists, not just general practitioners',
                    'Request testing that objectively measures your limitations',
                    'Document combination of conditions (multiple conditions can add up)',
                    'Show progression or worsening of condition over time',
                    'Include mental health impacts in addition to physical conditions'
                ],
                timeline: 'Gather comprehensive documentation, appeal within 60 days'
            },
            'technical_reasons': {
                title: 'Technical or Administrative Issues',
                strategy: 'Denied for paperwork issues, not medical reasons.',
                steps: [
                    'Carefully review the denial letter for specific issues',
                    'Correct any missing information or forms',
                    'Ensure all required documentation is included',
                    'Consider getting help from a disability advocate',
                    'Resubmit with all corrections clearly addressed'
                ],
                timeline: 'Can often be resolved quickly, act within 60 days'
            }
        };
        
        // Default strategy if specific reason not matched
        return strategies[denialReason] || {
            title: 'General Denial',
            strategy: 'Don\'t give up! Most successful applicants are denied initially.',
            steps: [
                'Request your complete file from Social Security (or relevant agency)',
                'Identify exactly why you were denied from the decision letter',
                'Gather additional medical evidence to address the denial reasons',
                'Consider hiring a disability attorney (they only get paid if you win)',
                'File your appeal before the deadline (usually 60 days)',
                'Be prepared to provide more detailed information at a hearing'
            ],
            timeline: 'Act within 60 days of denial, full process may take 6-18 months'
        };
    }

    // Create personalized roadmap based on user's situation
    createPersonalizedRoadmap(userAnswers) {
        const roadmap = {
            title: 'Your Personalized Path to Medical Assistance',
            steps: [],
            estimatedTimeline: '',
            urgentActions: [],
            resources: []
        };
        
        // Analyze answers to create custom roadmap
        const situation = userAnswers.situation || '';
        const previousAttempts = userAnswers.previous_attempts || '';
        const mainChallenge = userAnswers.main_challenge || '';
        const urgency = userAnswers.urgency || '';
        
        // Add steps based on situation
        if (situation.includes('insurance')) {
            roadmap.steps.push({
                number: 1,
                title: 'Check Insurance Eligibility',
                description: 'Determine which programs you qualify for',
                actions: ['Use our insurance search tool', 'Check income requirements', 'Verify state residency requirements'],
                timeframe: '1-2 days'
            });
            roadmap.steps.push({
                number: 2,
                title: 'Gather Required Documents',
                description: 'Collect necessary paperwork',
                actions: ['Social Security card', 'Proof of income', 'Proof of residency', 'ID documents'],
                timeframe: '3-5 days'
            });
        }
        
        if (situation.includes('disability')) {
            roadmap.steps.push({
                number: 1,
                title: 'Collect Medical Documentation',
                description: 'The foundation of your disability claim',
                actions: [
                    'Request records from all doctors',
                    'Get current evaluations from specialists',
                    'Document all medications and treatments tried',
                    'Keep a symptom diary'
                ],
                timeframe: '2-4 weeks'
            });
            roadmap.steps.push({
                number: 2,
                title: 'Complete Application Accurately',
                description: 'Avoid common mistakes that lead to denial',
                actions: [
                    'Use our guided application wizard',
                    'Be thorough about limitations',
                    'Include all medical conditions',
                    'Explain worst days, not best days'
                ],
                timeframe: '1 week'
            });
        }
        
        if (previousAttempts.includes('denied')) {
            roadmap.urgentActions.push({
                priority: 'HIGH',
                action: 'File Appeal Immediately',
                deadline: 'Within 60 days of denial',
                description: 'Don\'t let the deadline pass - you have rights!'
            });
        }
        
        if (urgency.includes('Very urgent')) {
            roadmap.urgentActions.push({
                priority: 'URGENT',
                action: 'Expedited Processing',
                deadline: 'Request now',
                description: 'Request expedited processing due to urgent medical needs'
            });
        }
        
        return roadmap;
    }

    // Query Hugging Face API (when API key is available)
    async queryHuggingFace(modelId, data) {
        if (!this.apiKey) {
            throw new Error('API key not set');
        }
        
        const response = await fetch(this.apiUrl + modelId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

    // Analyze user's emotional state and adjust communication
    analyzeUserState(userInput) {
        const input = userInput.toLowerCase();
        
        const frustrationIndicators = ['frustrated', 'angry', 'give up', 'impossible', 'tired of', 'fed up'];
        const confusionIndicators = ['confused', 'don\'t understand', 'unclear', 'complicated', 'overwhelmed'];
        const urgencyIndicators = ['urgent', 'emergency', 'immediately', 'asap', 'critical'];
        
        return {
            frustration: frustrationIndicators.some(word => input.includes(word)),
            confusion: confusionIndicators.some(word => input.includes(word)),
            urgency: urgencyIndicators.some(word => input.includes(word)),
            needsSimplification: this.userContext.frustrationLevel > 2 || confusionIndicators.some(word => input.includes(word))
        };
    }

    // Simplify complex medical/bureaucratic language
    simplifyLanguage(text) {
        const simplifications = {
            'Residual Functional Capacity': 'RFC - a form showing what activities you can still do',
            'Social Security Disability Insurance': 'SSDI - disability benefits for workers who paid into Social Security',
            'Supplemental Security Income': 'SSI - disability benefits for people with limited income',
            'prior authorization': 'pre-approval from insurance before getting treatment',
            'Explanation of Benefits': 'EOB - a document showing what your insurance paid',
            'co-payment': 'the amount you pay at each doctor visit',
            'deductible': 'the amount you pay before insurance starts covering costs',
            'pre-existing condition': 'health issues you had before getting insurance'
        };
        
        let simplified = text;
        for (const [complex, simple] of Object.entries(simplifications)) {
            const regex = new RegExp(complex, 'gi');
            simplified = simplified.replace(regex, simple);
        }
        
        return simplified;
    }

    // Track user's journey and provide encouragement
    trackProgress(milestone) {
        this.userContext.history.push({
            timestamp: new Date(),
            milestone: milestone
        });
        
        const encouragements = [
            "Great progress! You're moving forward.",
            "You're doing great - each step gets you closer.",
            "Keep going! Many people succeed by staying persistent.",
            "Excellent! You're on the right track.",
            "Well done! This is important progress."
        ];
        
        return {
            milestone: milestone,
            encouragement: encouragements[Math.floor(Math.random() * encouragements.length)],
            progress: this.calculateProgress()
        };
    }

    // Calculate user's progress through the process
    calculateProgress() {
        const steps = [
            'needs_identified',
            'eligibility_checked',
            'documents_gathered',
            'application_started',
            'application_submitted',
            'follow_up_completed'
        ];
        
        const completed = this.userContext.history.filter(h => 
            steps.some(s => h.milestone.includes(s))
        ).length;
        
        return {
            percentage: Math.min(100, (completed / steps.length) * 100),
            completedSteps: completed,
            totalSteps: steps.length,
            nextStep: steps[completed] || 'complete'
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalAIAssistant;
}
