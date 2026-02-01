// Comprehensive User Intake System
// Asks thorough questions FIRST before providing any recommendations

class ComprehensiveIntakeSystem {
    constructor() {
        this.userProfile = {
            personalInfo: {},
            medicalInfo: {},
            functioningInfo: {},
            previousAttempts: {},
            goals: {},
            urgency: {},
            support: {},
            complete: false
        };
        
        this.currentSection = 0;
        this.totalSections = 7;
        
        // Comprehensive intake questions organized by section
        this.intakeSections = [
            {
                id: 'intro',
                title: 'Welcome - Let\'s Get to Know You',
                description: 'Before we can help, we need to understand your situation. This will take about 5-10 minutes, but it ensures you get the RIGHT help.',
                questions: [
                    {
                        id: 'first_name',
                        question: 'What\'s your first name?',
                        type: 'text',
                        required: true,
                        placeholder: 'Your first name'
                    },
                    {
                        id: 'preferred_name',
                        question: 'What would you like us to call you?',
                        type: 'text',
                        required: false,
                        placeholder: 'Nickname if different'
                    },
                    {
                        id: 'age_range',
                        question: 'What\'s your age range?',
                        type: 'select',
                        required: true,
                        options: ['Under 18', '18-25', '26-35', '36-45', '46-55', '56-64', '65+']
                    },
                    {
                        id: 'location_state',
                        question: 'What state do you live in?',
                        type: 'text',
                        required: true,
                        placeholder: 'Your state',
                        helper: 'This helps us find state-specific programs'
                    }
                ]
            },
            {
                id: 'medical_situation',
                title: 'Your Medical Situation',
                description: 'Tell us about your health conditions. Be specific - this is critical for getting you the right help.',
                questions: [
                    {
                        id: 'primary_condition',
                        question: 'What is your main medical condition or diagnosis?',
                        type: 'textarea',
                        required: true,
                        placeholder: 'Example: 41mm brain tumor, Multiple Sclerosis, severe rheumatoid arthritis, etc.',
                        helper: 'Include the specific diagnosis your doctor gave you'
                    },
                    {
                        id: 'other_conditions',
                        question: 'Do you have any other medical conditions?',
                        type: 'textarea',
                        required: false,
                        placeholder: 'List any other diagnoses, even if they seem minor',
                        helper: 'Multiple conditions strengthen your case - list everything'
                    },
                    {
                        id: 'diagnosis_date',
                        question: 'When were you diagnosed?',
                        type: 'select',
                        required: true,
                        options: ['Less than 6 months ago', '6 months to 1 year', '1-2 years ago', '2-5 years ago', 'More than 5 years ago']
                    },
                    {
                        id: 'getting_worse',
                        question: 'Is your condition getting worse, staying the same, or improving?',
                        type: 'select',
                        required: true,
                        options: ['Getting significantly worse', 'Slowly getting worse', 'Staying about the same', 'Slowly improving', 'Getting better']
                    },
                    {
                        id: 'terminal',
                        question: 'Has a doctor said your condition could be life-threatening or terminal?',
                        type: 'select',
                        required: true,
                        options: ['Yes', 'Not sure', 'No']
                    }
                ]
            },
            {
                id: 'doctors_treatment',
                title: 'Your Doctors and Treatment',
                description: 'Understanding your medical care helps us guide you better.',
                questions: [
                    {
                        id: 'has_specialist',
                        question: 'Do you currently see a specialist for your condition?',
                        type: 'select',
                        required: true,
                        options: ['Yes, regularly', 'Yes, but not often', 'No, only see primary care', 'No doctors currently']
                    },
                    {
                        id: 'specialist_types',
                        question: 'If yes, what type of specialist(s)?',
                        type: 'textarea',
                        required: false,
                        placeholder: 'Example: Neurologist, Cardiologist, Rheumatologist, etc.',
                        dependsOn: 'has_specialist',
                        showIf: ['Yes, regularly', 'Yes, but not often']
                    },
                    {
                        id: 'doctor_support',
                        question: 'Will your current doctor(s) support a disability claim?',
                        type: 'select',
                        required: true,
                        options: [
                            'Yes, they said they would help',
                            'Not sure, haven\'t asked',
                            'No, they refused to help',
                            'They said I don\'t qualify',
                            'I don\'t have a regular doctor'
                        ]
                    },
                    {
                        id: 'doctor_problem_details',
                        question: 'Tell us more about the problem with your doctor:',
                        type: 'textarea',
                        required: false,
                        placeholder: 'Example: Doctor won\'t fill out forms, says I look fine, rushes appointments, etc.',
                        dependsOn: 'doctor_support',
                        showIf: ['No, they refused to help', 'They said I don\'t qualify']
                    },
                    {
                        id: 'treatment_tried',
                        question: 'What treatments have you tried?',
                        type: 'checkboxes',
                        required: true,
                        options: [
                            'Medications',
                            'Physical therapy',
                            'Surgery',
                            'Counseling/therapy',
                            'Pain management',
                            'Alternative treatments',
                            'Nothing has helped',
                            'Cannot afford treatment'
                        ]
                    },
                    {
                        id: 'medication_side_effects',
                        question: 'Do your medications cause significant side effects?',
                        type: 'select',
                        required: true,
                        options: [
                            'Yes, severe side effects',
                            'Yes, moderate side effects',
                            'Some mild side effects',
                            'No major side effects',
                            'Not taking medications'
                        ]
                    }
                ]
            },
            {
                id: 'daily_functioning',
                title: 'How Your Condition Affects Daily Life',
                description: 'This is CRITICAL. We need to understand what you CAN\'T do, even if it\'s hard to explain.',
                questions: [
                    {
                        id: 'work_status',
                        question: 'Are you currently working?',
                        type: 'select',
                        required: true,
                        options: [
                            'No, stopped working due to my condition',
                            'No, but not because of health',
                            'Yes, full-time but struggling',
                            'Yes, part-time only',
                            'Yes, but may need to stop soon'
                        ]
                    },
                    {
                        id: 'stopped_work_when',
                        question: 'When did you stop working?',
                        type: 'select',
                        required: false,
                        placeholder: '',
                        dependsOn: 'work_status',
                        showIf: ['No, stopped working due to my condition'],
                        options: ['Less than 3 months ago', '3-6 months ago', '6-12 months ago', '1-2 years ago', 'More than 2 years ago']
                    },
                    {
                        id: 'bad_days',
                        question: 'How many days per week are "bad days" where you can barely function?',
                        type: 'select',
                        required: true,
                        options: ['Every day', '5-6 days', '3-4 days', '1-2 days', 'Few bad days per month'],
                        helper: 'Be honest - disability looks at your WORST days'
                    },
                    {
                        id: 'concentration_time',
                        question: 'How long can you concentrate on a task before needing a break?',
                        type: 'select',
                        required: true,
                        options: ['Less than 5 minutes', '5-15 minutes', '15-30 minutes', '30-60 minutes', 'Over an hour']
                    },
                    {
                        id: 'physical_limits',
                        question: 'Which physical activities are difficult or impossible for you?',
                        type: 'checkboxes',
                        required: true,
                        options: [
                            'Standing for more than 15 minutes',
                            'Walking more than a block',
                            'Lifting anything over 10 lbs',
                            'Climbing stairs',
                            'Reaching overhead',
                            'Bending or stooping',
                            'Sitting for long periods',
                            'Using my hands (writing, typing, etc.)'
                        ]
                    },
                    {
                        id: 'cognitive_problems',
                        question: 'Do you have problems with memory, concentration, or confusion?',
                        type: 'select',
                        required: true,
                        options: [
                            'Yes, severe problems daily',
                            'Yes, moderate problems frequently',
                            'Yes, occasional problems',
                            'Minor issues sometimes',
                            'No cognitive problems'
                        ]
                    },
                    {
                        id: 'daily_help_needed',
                        question: 'What daily activities do you need help with?',
                        type: 'checkboxes',
                        required: true,
                        options: [
                            'Bathing/showering',
                            'Getting dressed',
                            'Preparing meals',
                            'Housework/cleaning',
                            'Shopping',
                            'Managing medications',
                            'Driving',
                            'Managing finances',
                            'None - I can do everything'
                        ]
                    },
                    {
                        id: 'need_rest',
                        question: 'How often do you need to lie down or rest during the day?',
                        type: 'select',
                        required: true,
                        options: [
                            'Multiple times every day',
                            'Once or twice daily',
                            'Few times per week',
                            'Occasionally',
                            'Rarely need to rest'
                        ]
                    }
                ]
            },
            {
                id: 'previous_attempts',
                title: 'What You\'ve Already Tried',
                description: 'Have you tried getting help before? This tells us where to start.',
                questions: [
                    {
                        id: 'applied_before',
                        question: 'Have you applied for disability benefits before?',
                        type: 'select',
                        required: true,
                        options: [
                            'No, never applied',
                            'Yes, currently waiting for decision',
                            'Yes, was denied once',
                            'Yes, denied multiple times',
                            'Yes, and I\'m in the appeal process'
                        ]
                    },
                    {
                        id: 'denial_reason',
                        question: 'If denied, what reason did they give?',
                        type: 'textarea',
                        required: false,
                        placeholder: 'Example: Not enough medical evidence, said I could still work, technical issue, etc.',
                        dependsOn: 'applied_before',
                        showIf: ['Yes, was denied once', 'Yes, denied multiple times', 'Yes, and I\'m in the appeal process']
                    },
                    {
                        id: 'has_lawyer',
                        question: 'Do you have a disability lawyer or advocate?',
                        type: 'select',
                        required: true,
                        options: ['Yes', 'No, but considering it', 'No, can\'t afford one', 'No, didn\'t know I needed one']
                    },
                    {
                        id: 'tried_insurance',
                        question: 'Have you tried getting health insurance?',
                        type: 'select',
                        required: true,
                        options: [
                            'Yes, I have insurance',
                            'Yes, but got denied',
                            'Yes, but can\'t afford it',
                            'No, haven\'t tried',
                            'Don\'t know how to apply'
                        ]
                    },
                    {
                        id: 'confusion_level',
                        question: 'How do you feel about the process so far?',
                        type: 'select',
                        required: true,
                        options: [
                            'Completely overwhelmed and confused',
                            'Very confused, don\'t know where to start',
                            'Somewhat confused, need guidance',
                            'Understand basics, need help with details',
                            'Pretty clear on what to do'
                        ]
                    }
                ]
            },
            {
                id: 'goals_urgency',
                title: 'Your Goals and Timeline',
                description: 'What do you need most urgently?',
                questions: [
                    {
                        id: 'primary_goal',
                        question: 'What is your main goal right now?',
                        type: 'select',
                        required: true,
                        options: [
                            'Get disability benefits approved',
                            'Find health insurance I can afford',
                            'Find doctors who will help me',
                            'Get help with medical bills',
                            'Appeal a denial',
                            'Understand what programs I qualify for',
                            'Get help filling out forms'
                        ]
                    },
                    {
                        id: 'urgency_level',
                        question: 'How urgent is your situation?',
                        type: 'select',
                        required: true,
                        options: [
                            'Emergency - immediate medical needs',
                            'Very urgent - within weeks',
                            'Urgent - within months',
                            'Not urgent - planning ahead'
                        ]
                    },
                    {
                        id: 'financial_situation',
                        question: 'What\'s your current financial situation?',
                        type: 'select',
                        required: true,
                        options: [
                            'In crisis - no income, can\'t pay bills',
                            'Very difficult - struggling to get by',
                            'Tight but managing',
                            'Doing okay financially'
                        ]
                    },
                    {
                        id: 'biggest_obstacle',
                        question: 'What\'s your biggest obstacle right now?',
                        type: 'checkboxes',
                        required: true,
                        options: [
                            'Don\'t know where to start',
                            'Can\'t find doctors who will help',
                            'Don\'t understand the process',
                            'Can\'t afford medical care/tests',
                            'Don\'t have medical documentation',
                            'Already been denied',
                            'Can\'t fill out forms correctly',
                            'Too sick to handle the process'
                        ]
                    }
                ]
            },
            {
                id: 'support_resources',
                title: 'Your Support System',
                description: 'Understanding who can help you is important.',
                questions: [
                    {
                        id: 'has_support_person',
                        question: 'Do you have someone who can help you with this process?',
                        type: 'select',
                        required: true,
                        options: [
                            'Yes, family member helping',
                            'Yes, friend helping',
                            'Some help but limited',
                            'No, doing this alone',
                            'Need someone but don\'t have anyone'
                        ]
                    },
                    {
                        id: 'computer_access',
                        question: 'Do you have regular access to a computer/internet?',
                        type: 'select',
                        required: true,
                        options: ['Yes, my own computer', 'Yes, at library or friend\'s', 'Limited access', 'No access - using phone']
                    },
                    {
                        id: 'reading_level',
                        question: 'How comfortable are you reading complex documents?',
                        type: 'select',
                        required: true,
                        options: [
                            'Very difficult - need help',
                            'Somewhat difficult',
                            'Can read but takes time',
                            'No problem with reading'
                        ]
                    },
                    {
                        id: 'what_you_need_most',
                        question: 'What would help you the MOST right now?',
                        type: 'textarea',
                        required: true,
                        placeholder: 'Tell us what you need most...',
                        helper: 'Be specific - this helps us give you the right help'
                    }
                ]
            }
        ];
    }

    // Start the intake process
    startIntake() {
        this.currentSection = 0;
        return this.getCurrentSection();
    }

    // Get current section of questions
    getCurrentSection() {
        if (this.currentSection >= this.intakeSections.length) {
            return this.completeIntake();
        }
        
        const section = this.intakeSections[this.currentSection];
        return {
            section: section,
            progress: {
                current: this.currentSection + 1,
                total: this.intakeSections.length,
                percentage: Math.round(((this.currentSection + 1) / this.intakeSections.length) * 100)
            }
        };
    }

    // Process answers and move to next section
    processSection(answers) {
        const sectionId = this.intakeSections[this.currentSection].id;
        this.userProfile[sectionId] = answers;
        this.currentSection++;
        
        if (this.currentSection >= this.intakeSections.length) {
            return this.completeIntake();
        }
        
        return this.getCurrentSection();
    }

    // Complete intake and generate personalized plan
    completeIntake() {
        this.userProfile.complete = true;
        
        // Analyze all responses to create comprehensive profile
        const analysis = this.analyzeUserProfile();
        
        return {
            complete: true,
            userProfile: this.userProfile,
            analysis: analysis,
            recommendations: this.generateRecommendations(analysis)
        };
    }

    // Analyze user profile to understand their situation
    analyzeUserProfile() {
        const profile = this.userProfile;
        
        return {
            // Risk factors
            urgencyLevel: this.determineUrgency(profile),
            confusionLevel: profile.previous_attempts?.confusion_level || 'unknown',
            supportLevel: this.determineSupportLevel(profile),
            
            // Medical factors
            hasSpecialist: profile.doctors_treatment?.has_specialist || 'unknown',
            doctorSupport: profile.doctors_treatment?.doctor_support || 'unknown',
            needsDoctorHelp: this.needsDoctorHelp(profile),
            
            // Application status
            hasAppliedBefore: profile.previous_attempts?.applied_before || 'No, never applied',
            wasDenied: this.wasDenied(profile),
            
            // Limitations
            functionalLimitations: this.assessFunctionalLimitations(profile),
            cognitiveImpact: profile.daily_functioning?.cognitive_problems || 'unknown',
            
            // Barriers
            biggestObstacles: profile.goals_urgency?.biggest_obstacle || [],
            financialCrisis: profile.goals_urgency?.financial_situation === 'In crisis - no income, can\'t pay bills',
            
            // Strengths
            hasMedicalDiagnosis: !!profile.medical_situation?.primary_condition,
            hasSupport: profile.support_resources?.has_support_person !== 'No, doing this alone'
        };
    }

    determineUrgency(profile) {
        const urgency = profile.goals_urgency?.urgency_level;
        const terminal = profile.medical_situation?.terminal === 'Yes';
        const financial = profile.goals_urgency?.financial_situation === 'In crisis - no income, can\'t pay bills';
        
        if (terminal || urgency === 'Emergency - immediate medical needs') {
            return 'CRITICAL';
        } else if (financial || urgency === 'Very urgent - within weeks') {
            return 'HIGH';
        } else if (urgency === 'Urgent - within months') {
            return 'MODERATE';
        }
        return 'LOW';
    }

    determineSupportLevel(profile) {
        const support = profile.support_resources?.has_support_person;
        if (support === 'Yes, family member helping' || support === 'Yes, friend helping') {
            return 'GOOD';
        } else if (support === 'Some help but limited') {
            return 'LIMITED';
        }
        return 'NONE';
    }

    needsDoctorHelp(profile) {
        const doctorSupport = profile.doctors_treatment?.doctor_support;
        return doctorSupport === 'No, they refused to help' || 
               doctorSupport === 'They said I don\'t qualify' ||
               doctorSupport === 'I don\'t have a regular doctor';
    }

    wasDenied(profile) {
        const applied = profile.previous_attempts?.applied_before;
        return applied === 'Yes, was denied once' || 
               applied === 'Yes, denied multiple times' ||
               applied === 'Yes, and I\'m in the appeal process';
    }

    assessFunctionalLimitations(profile) {
        const badDays = profile.daily_functioning?.bad_days;
        const concentration = profile.daily_functioning?.concentration_time;
        const needRest = profile.daily_functioning?.need_rest;
        
        let severity = 0;
        
        if (badDays === 'Every day' || badDays === '5-6 days') severity += 3;
        else if (badDays === '3-4 days') severity += 2;
        
        if (concentration === 'Less than 5 minutes' || concentration === '5-15 minutes') severity += 3;
        else if (concentration === '15-30 minutes') severity += 2;
        
        if (needRest === 'Multiple times every day') severity += 3;
        else if (needRest === 'Once or twice daily') severity += 2;
        
        if (severity >= 7) return 'SEVERE';
        if (severity >= 4) return 'MODERATE';
        return 'MILD';
    }

    // Generate personalized recommendations based on analysis
    generateRecommendations(analysis) {
        const recommendations = {
            priority1: [],
            priority2: [],
            priority3: [],
            specialInstructions: [],
            nextSteps: []
        };

        // CRITICAL URGENCY
        if (analysis.urgencyLevel === 'CRITICAL') {
            recommendations.priority1.push({
                action: 'REQUEST EXPEDITED PROCESSING',
                why: 'Your situation qualifies for fast-track processing',
                how: 'We\'ll show you exactly how to request this'
            });
            
            if (analysis.financialCrisis) {
                recommendations.priority1.push({
                    action: 'APPLY FOR EMERGENCY ASSISTANCE',
                    why: 'You need immediate financial help',
                    how: 'Emergency Medicaid, hospital charity care, food assistance'
                });
            }
        }

        // DOCTOR ISSUES
        if (analysis.needsDoctorHelp) {
            recommendations.priority1.push({
                action: 'FIND DISABILITY-SUPPORTIVE DOCTORS',
                why: 'Your current doctors won\'t help - you NEED supportive doctors',
                how: 'Use our doctor finder tool to locate doctors who understand disability'
            });
            
            recommendations.priority1.push({
                action: 'DOCUMENT LIMITATIONS WITHOUT WORDS',
                why: 'Can\'t explain your limitations? Our tool helps you show them',
                how: 'Simple checklist - no need to "put it into words"'
            });
        }

        // ALREADY DENIED
        if (analysis.wasDenied) {
            recommendations.priority1.push({
                action: 'FILE APPEAL IMMEDIATELY',
                why: 'You have a deadline - don\'t let it pass!',
                how: 'We\'ll help you write a strong appeal'
            });
            
            recommendations.priority2.push({
                action: 'STRENGTHEN YOUR MEDICAL EVIDENCE',
                why: 'Denials usually mean more documentation needed',
                how: 'Get comprehensive evaluations and RFC forms'
            });
        }

        // NEVER APPLIED
        if (analysis.hasAppliedBefore === 'No, never applied') {
            recommendations.priority1.push({
                action: 'START DISABILITY APPLICATION',
                why: 'The process takes months - start NOW',
                how: 'We\'ll guide you through every step'
            });
            
            recommendations.priority2.push({
                action: 'GATHER MEDICAL DOCUMENTATION FIRST',
                why: 'Strong evidence = higher approval chance',
                how: 'Request all medical records and get current evaluations'
            });
        }

        // SEVERE LIMITATIONS
        if (analysis.functionalLimitations === 'SEVERE') {
            recommendations.specialInstructions.push(
                'Your limitations are SEVERE - you have a strong case for disability',
                'Focus on documenting how you function on your WORST days',
                'Document need for rest periods, bad days, and unpredictability'
            );
        }

        // CONFUSION/OVERWHELM
        if (analysis.confusionLevel === 'Completely overwhelmed and confused') {
            recommendations.specialInstructions.push(
                'We understand you\'re overwhelmed - we\'ll break this into simple steps',
                'You don\'t have to understand everything - just follow our guidance',
                'Use AI assistance at every step - you\'re not alone in this'
            );
        }

        // NO SUPPORT
        if (analysis.supportLevel === 'NONE') {
            recommendations.specialInstructions.push(
                'Doing this alone is hard - consider finding a disability advocate',
                'Use our AI tools to help with every step',
                'Many disability lawyers work for free until you win your case'
            );
        }

        // Generate next steps
        recommendations.nextSteps = this.generateNextSteps(analysis, recommendations);

        return recommendations;
    }

    generateNextSteps(analysis, recommendations) {
        const steps = [];
        let stepNum = 1;

        // Add priority 1 actions as immediate steps
        recommendations.priority1.forEach(rec => {
            steps.push({
                number: stepNum++,
                action: rec.action,
                description: rec.why,
                howTo: rec.how,
                urgent: true
            });
        });

        // Add some priority 2 actions
        recommendations.priority2.slice(0, 2).forEach(rec => {
            steps.push({
                number: stepNum++,
                action: rec.action,
                description: rec.why,
                howTo: rec.how,
                urgent: false
            });
        });

        return steps;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComprehensiveIntakeSystem;
}
