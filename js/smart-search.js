// Smart Search System - Keyword Analysis & Intent Detection
// Understands what users need based on what they type

class SmartSearchSystem {
    constructor() {
        // Keyword mapping to user needs
        this.keywords = {
            // Confusion/Getting Started
            'confused': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'lost': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'help': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'start': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'where to begin': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'dont know': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            'overwhelmed': { intent: 'needs_guidance', action: 'start_intake', priority: 'high' },
            
            // Denial & Appeals
            'denied': { intent: 'appeal', action: 'show_denial_help', priority: 'urgent' },
            'denial': { intent: 'appeal', action: 'show_denial_help', priority: 'urgent' },
            'rejected': { intent: 'appeal', action: 'show_denial_help', priority: 'urgent' },
            'appeal': { intent: 'appeal', action: 'show_appeal_tools', priority: 'urgent' },
            'turned down': { intent: 'appeal', action: 'show_denial_help', priority: 'urgent' },
            
            // No Insurance
            'no insurance': { intent: 'uninsured', action: 'show_uninsured_pathway', priority: 'high' },
            'uninsured': { intent: 'uninsured', action: 'show_uninsured_pathway', priority: 'high' },
            'cant afford': { intent: 'uninsured', action: 'show_uninsured_pathway', priority: 'high' },
            'free care': { intent: 'uninsured', action: 'show_uninsured_pathway', priority: 'high' },
            'free clinic': { intent: 'uninsured', action: 'show_location_services', priority: 'high' },
            
            // Dental Care
            'teeth': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            'tooth': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            'dental': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            'dentist': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            'dentures': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            'dental work': { intent: 'dental', action: 'show_dental_pathway', priority: 'high' },
            
            // Doctors
            'doctor': { intent: 'find_doctor', action: 'show_doctor_finder', priority: 'medium' },
            'physician': { intent: 'find_doctor', action: 'show_doctor_finder', priority: 'medium' },
            'specialist': { intent: 'find_doctor', action: 'show_doctor_finder', priority: 'medium' },
            'wont help': { intent: 'find_doctor', action: 'show_doctor_finder', priority: 'high' },
            'doctor refuses': { intent: 'find_doctor', action: 'show_doctor_finder', priority: 'high' },
            
            // Disability
            'disability': { intent: 'disability', action: 'show_disability_help', priority: 'high' },
            'disabled': { intent: 'disability', action: 'show_disability_help', priority: 'high' },
            'ssdi': { intent: 'disability', action: 'show_disability_docs', priority: 'high' },
            'ssi': { intent: 'disability', action: 'show_disability_docs', priority: 'high' },
            'social security': { intent: 'disability', action: 'show_disability_docs', priority: 'high' },
            
            // Forms & Paperwork
            'forms': { intent: 'documents', action: 'show_document_library', priority: 'medium' },
            'paperwork': { intent: 'documents', action: 'show_document_library', priority: 'medium' },
            'application': { intent: 'documents', action: 'show_document_library', priority: 'medium' },
            'documents': { intent: 'documents', action: 'show_document_library', priority: 'medium' },
            'form': { intent: 'documents', action: 'show_document_library', priority: 'medium' },
            
            // Specific Conditions
            'brain tumor': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'brain_tumor' },
            'tumor': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'cancer' },
            'cancer': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'cancer' },
            'arthritis': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'rheumatoid_arthritis' },
            'pain': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'chronic_pain' },
            'depression': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'major_depression' },
            'anxiety': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'anxiety' },
            'diabetes': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'diabetes_complications' },
            'heart': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'heart_failure' },
            'back pain': { intent: 'condition', action: 'show_condition_help', priority: 'high', condition: 'spinal_stenosis' },
            
            // Location Services
            'near me': { intent: 'location', action: 'show_location_services', priority: 'medium' },
            'close to me': { intent: 'location', action: 'show_location_services', priority: 'medium' },
            'nearby': { intent: 'location', action: 'show_location_services', priority: 'medium' },
            'location': { intent: 'location', action: 'show_location_services', priority: 'medium' },
            
            // Insurance Types
            'medicare': { intent: 'insurance', action: 'show_medicare_info', priority: 'medium' },
            'medicaid': { intent: 'insurance', action: 'show_medicaid_info', priority: 'medium' },
            'insurance': { intent: 'insurance', action: 'show_insurance_search', priority: 'medium' },
            
            // Limitations
            'cant work': { intent: 'limitations', action: 'show_limitation_tool', priority: 'high' },
            'too sick': { intent: 'limitations', action: 'show_limitation_tool', priority: 'high' },
            'limitations': { intent: 'limitations', action: 'show_limitation_tool', priority: 'high' },
            'describe limitations': { intent: 'limitations', action: 'show_limitation_tool', priority: 'high' },
            
            // Upload/Documents
            'upload': { intent: 'upload', action: 'show_document_upload', priority: 'medium' },
            'scan': { intent: 'upload', action: 'show_document_upload', priority: 'medium' },
            'autofill': { intent: 'upload', action: 'show_document_upload', priority: 'medium' }
        };

        // Search history for learning
        this.searchHistory = [];
    }

    // Analyze search query and determine intent
    analyzeSearch(query) {
        const queryLower = query.toLowerCase().trim();
        const matches = [];
        
        // Find all matching keywords
        for (const [keyword, data] of Object.entries(this.keywords)) {
            if (queryLower.includes(keyword)) {
                matches.push({
                    keyword: keyword,
                    ...data,
                    relevance: this.calculateRelevance(keyword, queryLower)
                });
            }
        }
        
        // Sort by relevance and priority
        matches.sort((a, b) => {
            if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
            if (b.priority === 'urgent' && a.priority !== 'urgent') return 1;
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (b.priority === 'high' && a.priority !== 'high') return 1;
            return b.relevance - a.relevance;
        });
        
        // Store search
        this.searchHistory.push({
            query: query,
            timestamp: new Date(),
            matches: matches
        });
        
        return {
            query: query,
            matches: matches,
            topMatch: matches[0] || null,
            suggestions: this.generateSuggestions(query, matches)
        };
    }

    // Calculate relevance score
    calculateRelevance(keyword, query) {
        let score = 0;
        
        // Exact match
        if (query === keyword) score += 100;
        
        // Starts with keyword
        if (query.startsWith(keyword)) score += 50;
        
        // Keyword length ratio
        score += (keyword.length / query.length) * 30;
        
        // Word boundary match
        if (query.match(new RegExp(`\\b${keyword}\\b`))) score += 40;
        
        return score;
    }

    // Generate helpful suggestions
    generateSuggestions(query, matches) {
        const suggestions = [];
        
        if (matches.length === 0) {
            // No matches - give general suggestions
            suggestions.push({
                text: 'Start with simple questions to figure out what you need',
                action: 'start_intake',
                icon: '🎯'
            });
            suggestions.push({
                text: 'Search our document library',
                action: 'show_document_library',
                icon: '📚'
            });
            suggestions.push({
                text: 'Talk to AI assistant',
                action: 'open_ai_chat',
                icon: '🤖'
            });
        } else {
            // Have matches - provide related suggestions
            const topIntent = matches[0].intent;
            
            if (topIntent === 'appeal') {
                suggestions.push({
                    text: 'Get appeal letter template',
                    action: 'get_appeal_template',
                    icon: '✍️'
                });
                suggestions.push({
                    text: 'Understand why you were denied',
                    action: 'analyze_denial',
                    icon: '🔍'
                });
            } else if (topIntent === 'dental') {
                suggestions.push({
                    text: 'Find free dental care events',
                    action: 'find_dental_events',
                    icon: '🦷'
                });
                suggestions.push({
                    text: 'Locate dental school clinics',
                    action: 'find_dental_schools',
                    icon: '🏥'
                });
            } else if (topIntent === 'uninsured') {
                suggestions.push({
                    text: 'Find free clinics near you',
                    action: 'find_free_clinics',
                    icon: '🏥'
                });
                suggestions.push({
                    text: 'See all options for uninsured',
                    action: 'show_uninsured_pathway',
                    icon: '📋'
                });
            }
        }
        
        return suggestions;
    }

    // Search documents by query
    searchDocuments(query, documentLibrary) {
        if (!documentLibrary) return [];
        
        const results = documentLibrary.searchDocuments(query);
        return results;
    }

    // Generate search results display
    generateSearchResults(analysis, documentResults = []) {
        const results = {
            hasMatches: analysis.matches.length > 0 || documentResults.length > 0,
            primaryAction: null,
            relatedActions: [],
            documents: documentResults,
            suggestions: analysis.suggestions,
            message: ''
        };
        
        if (analysis.topMatch) {
            results.primaryAction = {
                title: this.getActionTitle(analysis.topMatch.action),
                description: this.getActionDescription(analysis.topMatch.action),
                action: analysis.topMatch.action,
                priority: analysis.topMatch.priority,
                icon: this.getActionIcon(analysis.topMatch.intent)
            };
            
            results.message = this.generateHelpfulMessage(analysis.topMatch);
        } else if (documentResults.length > 0) {
            results.message = `Found ${documentResults.length} document(s) matching "${analysis.query}"`;
        } else {
            results.message = `I'm not sure what you're looking for, but I can help you figure it out.`;
        }
        
        // Add related actions
        for (let i = 1; i < Math.min(4, analysis.matches.length); i++) {
            const match = analysis.matches[i];
            results.relatedActions.push({
                title: this.getActionTitle(match.action),
                action: match.action,
                icon: this.getActionIcon(match.intent)
            });
        }
        
        return results;
    }

    getActionTitle(action) {
        const titles = {
            'start_intake': 'Answer Simple Questions',
            'show_denial_help': 'Help with Denial/Appeal',
            'show_appeal_tools': 'Appeal Tools & Templates',
            'show_uninsured_pathway': 'Help for Uninsured',
            'show_dental_pathway': 'Free Dental Care Options',
            'show_doctor_finder': 'Find Disability-Supportive Doctors',
            'show_disability_help': 'Disability Application Help',
            'show_disability_docs': 'Disability Forms & Documents',
            'show_document_library': 'Browse All Documents',
            'show_condition_help': 'Help for Your Condition',
            'show_location_services': 'Find Care Near You',
            'show_medicare_info': 'Medicare Information',
            'show_medicaid_info': 'Medicaid Information',
            'show_insurance_search': 'Search Insurance Options',
            'show_limitation_tool': 'Document Your Limitations',
            'show_document_upload': 'Upload & Auto-Fill Documents'
        };
        return titles[action] || 'Get Help';
    }

    getActionDescription(action) {
        const descriptions = {
            'start_intake': 'Quick questions to understand what you need',
            'show_denial_help': 'Appeal your denial and understand next steps',
            'show_appeal_tools': 'Templates and guides for successful appeals',
            'show_uninsured_pathway': 'Free and low-cost care options',
            'show_dental_pathway': 'FREE dental care programs that ask no questions',
            'show_doctor_finder': 'Find doctors who will document your disability',
            'show_disability_help': 'Step-by-step disability application guidance',
            'show_disability_docs': 'All forms needed for disability application',
            'show_document_library': 'Complete library of forms and templates',
            'show_condition_help': 'Personalized help for your medical condition',
            'show_location_services': 'Closest free clinics and resources',
            'show_limitation_tool': 'Visual tool - no need to write anything',
            'show_document_upload': 'AI fills out all forms for you'
        };
        return descriptions[action] || 'We can help with this';
    }

    getActionIcon(intent) {
        const icons = {
            'needs_guidance': '🎯',
            'appeal': '⚖️',
            'uninsured': '🏥',
            'dental': '🦷',
            'find_doctor': '👨‍⚕️',
            'disability': '♿',
            'documents': '📋',
            'condition': '🩺',
            'location': '📍',
            'insurance': '🏥',
            'limitations': '📝',
            'upload': '📄'
        };
        return icons[intent] || '❓';
    }

    generateHelpfulMessage(match) {
        const messages = {
            'appeal': '✅ Don\'t give up! Most successful applicants are denied first. We\'ll help you appeal.',
            'uninsured': '✅ You CAN get care without insurance! There are programs specifically for you.',
            'dental': '✅ FREE dental care exists! Some programs ask NO questions at all.',
            'find_doctor': '✅ We\'ll help you find doctors who understand disability and will document properly.',
            'needs_guidance': '✅ Perfect! We\'ll ask simple questions and create your personalized plan.',
            'disability': '✅ We have all the forms and guidance you need for disability benefits.',
            'limitations': '✅ Great! Our tool helps you document limitations without needing to write anything.'
        };
        return messages[match.intent] || '✅ We can help you with this!';
    }

    // Get autocomplete suggestions as user types
    getAutocompleteSuggestions(partialQuery) {
        const partial = partialQuery.toLowerCase();
        const suggestions = [];
        
        // Common search phrases
        const commonPhrases = [
            'I was denied',
            'I need help',
            'I have no insurance',
            'I need dental care',
            'I need free dental work',
            'Where do I start',
            'I\'m confused',
            'I can\'t afford',
            'Find doctors near me',
            'How to apply for disability',
            'Appeal a denial',
            'Free clinic near me',
            'Disability forms',
            'I can\'t work',
            'Brain tumor help',
            'Help with paperwork'
        ];
        
        for (const phrase of commonPhrases) {
            if (phrase.toLowerCase().includes(partial) && partial.length > 2) {
                suggestions.push(phrase);
            }
        }
        
        return suggestions.slice(0, 5); // Return top 5
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartSearchSystem;
}
