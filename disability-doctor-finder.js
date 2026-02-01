// Disability Doctor Finder & Daily Limitation Documentation System
// Helps patients find supportive doctors and articulate their limitations

class DisabilityDoctorFinder {
    constructor() {
        // Database of doctor specialties known for supporting disability claims
        this.disabilitySupportiveDoctors = {
            'brain_tumor': {
                specialties: [
                    'Neuro-Oncologist',
                    'Neurologist specializing in brain tumors',
                    'Neurosurgeon with disability evaluation experience',
                    'Neuropsychologist (for cognitive assessments)',
                    'Physiatrist (Physical Medicine & Rehabilitation)'
                ],
                evaluations: [
                    'Comprehensive neurological examination',
                    'Neuropsychological testing (memory, concentration, cognition)',
                    'MRI with measurements and documentation',
                    'Functional capacity evaluation',
                    'Seizure monitoring if applicable',
                    'Vision and balance testing'
                ],
                documentationTips: [
                    'Request detailed RFC (Residual Functional Capacity) form',
                    'Ask for specific cognitive limitation documentation',
                    'Get documentation of headache frequency and severity',
                    'Document medication side effects',
                    'Request objective test results with measurements',
                    'Get statements about unpredictability of symptoms'
                ]
            },
            'neurological': {
                specialties: [
                    'Neurologist with disability evaluation experience',
                    'Movement disorder specialist',
                    'Epilepsy specialist',
                    'Headache specialist',
                    'Neuropsychologist'
                ],
                evaluations: [
                    'Detailed neurological exam',
                    'Cognitive function testing',
                    'Balance and coordination tests',
                    'EMG/NCS if applicable',
                    'EEG if seizures involved'
                ],
                documentationTips: [
                    'Document frequency of symptoms',
                    'Note unpredictability of condition',
                    'Include cognitive limitations',
                    'Document fatigue levels'
                ]
            }
        };

        // Red flags that indicate a doctor may not be disability-supportive
        this.redFlags = [
            'Rushes through appointments (less than 10 minutes)',
            'Dismisses patient concerns',
            'Says "you look fine" without examination',
            'Refuses to fill out disability forms',
            'Only treats, doesn\'t document',
            'No experience with disability evaluations'
        ];

        // What to look for in disability-supportive doctors
        this.greenFlags = [
            'Takes time to listen to your daily struggles',
            'Documents symptoms in detail',
            'Understands disability determination process',
            'Willing to complete RFC forms thoroughly',
            'Orders objective testing',
            'Documents medication side effects',
            'Notes cognitive and functional limitations',
            'Specializes in your specific condition',
            'Has experience with Social Security cases'
        ];
    }

    // Find disability-supportive doctors for specific condition
    findDoctorsForCondition(condition) {
        const conditionKey = condition.toLowerCase().includes('tumor') || 
                            condition.toLowerCase().includes('brain') ? 'brain_tumor' : 'neurological';
        
        const doctorInfo = this.disabilitySupportiveDoctors[conditionKey];
        
        return {
            specialties: doctorInfo.specialties,
            evaluations: doctorInfo.evaluations,
            documentationTips: doctorInfo.documentationTips,
            howToFind: this.getHowToFindDoctors(),
            whatToAsk: this.getWhatToAskDoctors(),
            redFlags: this.redFlags,
            greenFlags: this.greenFlags
        };
    }

    getHowToFindDoctors() {
        return [
            '1. Call Social Security disability lawyers - ask who they recommend',
            '2. Contact local MS Society, Brain Tumor Foundation - they know good doctors',
            '3. Search "[your condition] disability evaluation doctor [your city]"',
            '4. Look for doctors advertising "disability consultations" or "RFC evaluations"',
            '5. University medical centers often have doctors experienced with disability',
            '6. Ask in support groups for your condition',
            '7. State vocational rehabilitation services may have doctor lists',
            '8. Independent Medical Examination (IME) doctors often understand disability criteria'
        ];
    }

    getWhatToAskDoctors() {
        return [
            'Questions to ask when calling for appointment:',
            '• "Do you have experience with Social Security disability cases?"',
            '• "Will you fill out RFC (Residual Functional Capacity) forms?"',
            '• "How long are your appointments typically?"',
            '• "Do you do comprehensive functional assessments?"',
            '• "Have you worked with patients with [your condition] on disability?"',
            '',
            'Green light answers:',
            '✓ "Yes, I do disability evaluations regularly"',
            '✓ "I\'ll take the time you need"',
            '✓ "I understand the disability process"',
            '',
            'Red flag answers:',
            '✗ "I just treat, I don\'t do disability paperwork"',
            '✗ "That\'s not really my area"',
            '✗ "Those forms take too much time"'
        ];
    }
}

// Daily Limitation Documentation System
// Helps patients describe limitations without needing to articulate in words
class DailyLimitationDocumentor {
    constructor() {
        this.limitationCategories = {
            physical: {
                title: 'Physical Limitations',
                icon: '🏃',
                activities: [
                    { id: 'standing', activity: 'Standing', unit: 'minutes', options: ['<15', '15-30', '30-60', '60-120', '2+ hours'] },
                    { id: 'walking', activity: 'Walking', unit: 'minutes continuously', options: ['<5', '5-10', '10-30', '30+ minutes'] },
                    { id: 'sitting', activity: 'Sitting', unit: 'minutes before needing to move', options: ['<15', '15-30', '30-60', '60+ minutes'] },
                    { id: 'lifting', activity: 'Lifting/Carrying', unit: 'weight', options: ['<5 lbs', '5-10 lbs', '10-20 lbs', '20-50 lbs', '50+ lbs'] },
                    { id: 'bending', activity: 'Bending/Stooping', frequency: true, options: ['Cannot do', 'Rarely', 'Occasionally', 'Frequently'] },
                    { id: 'reaching', activity: 'Reaching overhead', frequency: true, options: ['Cannot do', 'Rarely', 'Occasionally', 'Frequently'] },
                    { id: 'climbing', activity: 'Climbing stairs', unit: 'flights', options: ['Cannot', '<1 flight', '1 flight', '2+ flights'] }
                ]
            },
            cognitive: {
                title: 'Cognitive/Mental Limitations',
                icon: '🧠',
                activities: [
                    { id: 'concentration', activity: 'Concentrating on tasks', unit: 'minutes', options: ['<5', '5-15', '15-30', '30-60', '60+ minutes'] },
                    { id: 'memory', activity: 'Remembering instructions', severity: true, options: ['Cannot remember simple instructions', 'Frequent reminders needed', 'Occasional reminders', 'Remember well'] },
                    { id: 'decisions', activity: 'Making decisions', severity: true, options: ['Cannot make decisions', 'Very difficult', 'Somewhat difficult', 'Not difficult'] },
                    { id: 'multitask', activity: 'Handling multiple tasks', severity: true, options: ['Cannot multitask at all', 'Can only focus on one thing', 'Limited multitasking', 'Good multitasking'] },
                    { id: 'learning', activity: 'Learning new things', severity: true, options: ['Cannot learn new things', 'Very difficult', 'Takes much longer', 'Normal learning'] },
                    { id: 'confusion', activity: 'Confusion/Disorientation episodes', frequency: true, options: ['Multiple times daily', 'Daily', 'Few times weekly', 'Occasionally', 'Rarely'] }
                ]
            },
            sensory: {
                title: 'Sensory/Neurological Limitations',
                icon: '👁️',
                activities: [
                    { id: 'vision', activity: 'Vision problems', severity: true, options: ['Severe impairment', 'Moderate impairment', 'Mild impairment', 'No impairment'] },
                    { id: 'hearing', activity: 'Hearing problems', severity: true, options: ['Severe impairment', 'Moderate impairment', 'Mild impairment', 'No impairment'] },
                    { id: 'balance', activity: 'Balance/Dizziness', frequency: true, options: ['Constant problem', 'Multiple times daily', 'Daily', 'Few times weekly', 'Rarely'] },
                    { id: 'headaches', activity: 'Headaches/Migraines', frequency: true, options: ['Constant/Daily', '4-6 days/week', '2-3 days/week', 'Few times/month', 'Rarely'] },
                    { id: 'seizures', activity: 'Seizures or seizure-like episodes', frequency: true, options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'] },
                    { id: 'numbness', activity: 'Numbness/Tingling', severity: true, options: ['Severe/Constant', 'Frequent', 'Occasional', 'Rare', 'None'] }
                ]
            },
            daily_living: {
                title: 'Daily Living Activities',
                icon: '🏠',
                activities: [
                    { id: 'bathing', activity: 'Bathing/Showering', help: true, options: ['Cannot do', 'Need complete help', 'Need some help', 'Can do but difficult', 'Can do independently'] },
                    { id: 'dressing', activity: 'Dressing', help: true, options: ['Cannot do', 'Need complete help', 'Need some help', 'Can do but takes long time', 'Can do independently'] },
                    { id: 'cooking', activity: 'Preparing meals', help: true, options: ['Cannot do', 'Need complete help', 'Can only do simple things', 'Can do but limited', 'Can do most things'] },
                    { id: 'cleaning', activity: 'Household cleaning', help: true, options: ['Cannot do', 'Need complete help', 'Can do very little', 'Can do light cleaning', 'Can do most cleaning'] },
                    { id: 'shopping', activity: 'Shopping', help: true, options: ['Cannot do', 'Need someone to go with me', 'Can do but very limited', 'Can do short trips', 'No limitations'] },
                    { id: 'driving', activity: 'Driving', help: true, options: ['Cannot drive', 'Only very short distances', 'Limited to daytime/familiar routes', 'Most driving OK', 'No limitations'] }
                ]
            },
            social: {
                title: 'Social Functioning',
                icon: '👥',
                activities: [
                    { id: 'interact', activity: 'Interacting with others', severity: true, options: ['Cannot interact', 'Very difficult', 'Somewhat difficult', 'Occasional issues', 'No issues'] },
                    { id: 'stress', activity: 'Handling stress', severity: true, options: ['Cannot handle any stress', 'Very low tolerance', 'Low tolerance', 'Moderate tolerance', 'Good tolerance'] },
                    { id: 'changes', activity: 'Adapting to changes', severity: true, options: ['Cannot adapt to changes', 'Very difficult', 'Somewhat difficult', 'Usually can adapt', 'Adapt well'] },
                    { id: 'groups', activity: 'Being in groups/crowds', severity: true, options: ['Cannot tolerate', 'Very difficult', 'Somewhat difficult', 'Usually OK', 'No issues'] }
                ]
            },
            symptoms: {
                title: 'Symptom Frequency & Severity',
                icon: '📊',
                activities: [
                    { id: 'good_days', activity: 'Good days per week', unit: 'days', options: ['0-1', '2-3', '4-5', '6-7'] },
                    { id: 'bad_days', activity: 'Bad days per week (cannot function normally)', unit: 'days', options: ['0-1', '2-3', '4-5', '6-7'] },
                    { id: 'rest', activity: 'Need to rest/lie down during day', frequency: true, options: ['Multiple times daily', 'Daily', 'Few times weekly', 'Occasionally', 'Rarely'] },
                    { id: 'appointments', activity: 'Medical appointments per month', unit: 'appointments', options: ['1-2', '3-5', '6-10', '10+'] },
                    { id: 'medication_effects', activity: 'Medication side effects', severity: true, options: ['Severe/Debilitating', 'Moderate impact', 'Mild impact', 'Minimal impact', 'No side effects'] },
                    { id: 'fatigue', activity: 'Fatigue level', severity: true, options: ['Extreme/Bedridden', 'Severe/Very limited', 'Moderate/Limited', 'Mild', 'Normal energy'] }
                ]
            }
        };
    }

    // Generate comprehensive questionnaire
    generateQuestionnaire() {
        return {
            title: 'Daily Limitation Assessment',
            subtitle: 'NO NEED TO PUT INTO WORDS - Just select what applies to you',
            instructions: 'Answer honestly based on your TYPICAL day. Think about your WORST days, not your best days.',
            categories: this.limitationCategories
        };
    }

    // Process questionnaire responses into doctor-ready documentation
    processResponses(responses) {
        const documentation = {
            summary: '',
            limitationsByCategory: {},
            rfcRecommendations: {},
            narrativeSummary: ''
        };

        // Process each category
        for (const [categoryKey, categoryData] of Object.entries(this.limitationCategories)) {
            const categoryResponses = responses[categoryKey] || {};
            documentation.limitationsByCategory[categoryKey] = {
                title: categoryData.title,
                limitations: []
            };

            for (const activity of categoryData.activities) {
                const response = categoryResponses[activity.id];
                if (response) {
                    documentation.limitationsByCategory[categoryKey].limitations.push({
                        activity: activity.activity,
                        limitation: response,
                        severity: this.assessSeverity(response, activity.options)
                    });
                }
            }
        }

        // Generate narrative summary
        documentation.narrativeSummary = this.generateNarrativeSummary(documentation.limitationsByCategory);

        // Generate RFC recommendations
        documentation.rfcRecommendations = this.generateRFCRecommendations(documentation.limitationsByCategory);

        return documentation;
    }

    assessSeverity(response, options) {
        const index = options.indexOf(response);
        if (index <= 1) return 'severe';
        if (index === 2) return 'moderate';
        return 'mild';
    }

    generateNarrativeSummary(limitations) {
        let summary = 'FUNCTIONAL LIMITATIONS SUMMARY\n\n';
        summary += 'This patient reports significant functional limitations affecting their ability to perform work-related activities:\n\n';

        for (const [key, category] of Object.entries(limitations)) {
            if (category.limitations.length > 0) {
                summary += `${category.title}:\n`;
                category.limitations.forEach(lim => {
                    summary += `• ${lim.activity}: ${lim.limitation}\n`;
                });
                summary += '\n';
            }
        }

        summary += 'These limitations significantly impact the patient\'s ability to perform sustained work activity over an 8-hour workday, 5 days per week.\n';

        return summary;
    }

    generateRFCRecommendations(limitations) {
        const rfc = {
            physicalCapacity: 'Sedentary to Less than Sedentary',
            standingWalking: 'Less than 2 hours per 8-hour day',
            sitting: 'Limited due to pain/discomfort',
            lifting: 'Occasionally up to 10 lbs',
            mentalCapacity: {
                understanding: 'Limited',
                memory: 'Moderately to markedly limited',
                concentration: 'Markedly limited',
                adaptation: 'Markedly limited'
            },
            environmental: {
                heights: 'Avoid',
                machinery: 'Avoid',
                driving: 'Avoid or severely limited'
            },
            offTaskTime: 'Likely off-task 25%+ of workday',
            absences: 'Likely 3+ absences per month',
            recommendation: 'Patient does not appear capable of sustaining competitive employment'
        };

        return rfc;
    }

    // Generate letter for patient to give to doctor
    generateDoctorLetter(patientName, condition, documentationData) {
        return `
Dear Doctor,

I am seeking your professional medical opinion regarding my functional limitations due to my medical condition (${condition}).

I am applying for Social Security Disability benefits and need comprehensive documentation of how my condition affects my daily functioning and ability to work.

I have completed a detailed functional assessment (attached) that describes my limitations. I struggle to articulate these limitations verbally, but the attached assessment accurately represents my daily struggles.

Could you please:

1. Review the attached functional assessment
2. Complete a Residual Functional Capacity (RFC) form based on your examination and the functional assessment
3. Provide specific documentation of:
   - How my condition limits my physical functioning (standing, walking, lifting, etc.)
   - How my condition affects my cognitive abilities (concentration, memory, decision-making)
   - The frequency and severity of my symptoms
   - Medication side effects that impact functioning
   - How many days per month I would likely miss work due to my condition
   - How much time I would be "off-task" during a workday

4. Include objective test results and measurements in your documentation

I understand the disability determination process looks at whether I can work 8 hours per day, 5 days per week, on a sustained basis. My condition makes this impossible, but I need your help documenting this.

Thank you for your time and assistance.

Sincerely,
${patientName}

---

ATTACHED: Detailed Functional Limitations Assessment
`;
    }

    // Generate specific documentation for brain tumor patients
    generateBrainTumorDocumentation(tumorSize, location, responses) {
        return `
BRAIN TUMOR FUNCTIONAL IMPACT DOCUMENTATION

Tumor Details:
• Size: ${tumorSize}mm
• Location: ${location || 'Specified in medical records'}

Critical Points for Disability Documentation:

1. PHYSICAL EFFECTS:
${this.getBrainTumorPhysicalEffects(responses)}

2. COGNITIVE EFFECTS:
${this.getBrainTumorCognitiveEffects(responses)}

3. NEUROLOGICAL SYMPTOMS:
${this.getBrainTumorNeurologicalSymptoms(responses)}

4. UNPREDICTABILITY:
Brain tumor symptoms are unpredictable and can worsen without warning. This unpredictability alone makes consistent work impossible.

5. TREATMENT SIDE EFFECTS:
${this.getTreatmentSideEffects(responses)}

6. WORK IMPACT:
Due to the above limitations, the patient cannot:
• Maintain regular attendance (symptoms/appointments)
• Stay on task for required periods
• Handle workplace stress
• Respond to changes in routine
• Perform tasks requiring sustained concentration
• Work safely around machinery or heights

RECOMMENDATION: Patient requires comprehensive neurological and neuropsychological evaluation with detailed RFC form completion.
`;
    }

    getBrainTumorPhysicalEffects(responses) {
        return `• Headaches (frequency and severity documented)
• Balance/coordination problems affecting mobility
• Vision problems affecting ability to perform tasks
• Fatigue limiting activity duration
• Need for frequent rest periods`;
    }

    getBrainTumorCognitiveEffects(responses) {
        return `• Memory impairment affecting task completion
• Concentration problems limiting sustained work
• Difficulty with decision-making
• Confusion episodes
• Processing speed reduction
• Difficulty learning new tasks`;
    }

    getBrainTumorNeurologicalSymptoms(responses) {
        return `• Seizures or risk of seizures
• Sensory changes (numbness, tingling)
• Motor weakness or coordination problems
• Speech or language difficulties
• Balance problems/vertigo`;
    }

    getTreatmentSideEffects(responses) {
        return `• Radiation therapy effects (if applicable)
• Chemotherapy side effects (if applicable)
• Medication side effects (anti-seizure, pain meds, etc.)
• Post-surgical complications (if applicable)`;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DisabilityDoctorFinder, DailyLimitationDocumentor };
}
