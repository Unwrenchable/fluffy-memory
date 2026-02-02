// Medical Condition Categorization System
// Maps conditions to benefit categories and eligibility

class MedicalConditionCategorizer {
    constructor() {
        // Comprehensive condition database with categories
        this.conditionDatabase = {
            // Cardiovascular Conditions
            'heart_failure': {
                category: 'Cardiovascular',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicare'],
                keywords: ['heart failure', 'congestive heart failure', 'CHF', 'cardiomyopathy'],
                requirements: 'Chronic heart failure with documented reduced ejection fraction',
                documentation: ['Echocardiogram', 'Cardiac catheterization', 'EKG', 'Stress test results']
            },
            'coronary_artery_disease': {
                category: 'Cardiovascular',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicare'],
                keywords: ['coronary artery disease', 'CAD', 'heart disease', 'angina'],
                requirements: 'Documented with angiography, limiting chest pain or shortness of breath',
                documentation: ['Angiogram', 'EKG', 'Stress test', 'Medical records']
            },

            // Neurological Conditions
            'multiple_sclerosis': {
                category: 'Neurological',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid', 'State Disability'],
                keywords: ['multiple sclerosis', 'MS', 'demyelinating disease'],
                requirements: 'Documented MS with persistent disorganization of motor function',
                documentation: ['MRI reports', 'Neurologist evaluations', 'Function tests']
            },
            'parkinsons': {
                category: 'Neurological',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicare'],
                keywords: ['parkinsons', 'parkinson disease', 'PD'],
                requirements: 'Documented with tremor, rigidity, or bradykinesia affecting function',
                documentation: ['Neurologist evaluation', 'Movement disorder assessment']
            },
            'epilepsy': {
                category: 'Neurological',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicaid'],
                keywords: ['epilepsy', 'seizure disorder', 'convulsions'],
                requirements: 'Documented seizures despite medication, occurring at least once monthly',
                documentation: ['EEG results', 'Seizure diary', 'Medication records', 'Neurologist notes']
            },

            // Musculoskeletal Conditions
            'rheumatoid_arthritis': {
                category: 'Musculoskeletal',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid'],
                keywords: ['rheumatoid arthritis', 'RA', 'inflammatory arthritis'],
                requirements: 'Documented with joint inflammation and functional limitations',
                documentation: ['Rheumatologist evaluation', 'X-rays', 'Lab work (RF, CCP)', 'Range of motion tests']
            },
            'fibromyalgia': {
                category: 'Musculoskeletal',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI'],
                keywords: ['fibromyalgia', 'chronic pain syndrome'],
                requirements: 'Documented widespread pain and fatigue affecting function',
                documentation: ['Rheumatologist diagnosis', 'Pain management records', 'Function assessment']
            },
            'spinal_stenosis': {
                category: 'Musculoskeletal',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicare'],
                keywords: ['spinal stenosis', 'lumbar stenosis', 'cervical stenosis', 'back pain'],
                requirements: 'Documented nerve root compression with neurological findings',
                documentation: ['MRI/CT scan', 'Neurological exam', 'Pain management records']
            },

            // Mental Health Conditions
            'major_depression': {
                category: 'Mental Health',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid'],
                keywords: ['major depression', 'major depressive disorder', 'MDD', 'clinical depression'],
                requirements: 'Persistent depressive disorder with marked limitation in functioning',
                documentation: ['Psychiatric evaluation', 'Treatment records', 'Medication history', 'Function assessment']
            },
            'bipolar_disorder': {
                category: 'Mental Health',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid'],
                keywords: ['bipolar disorder', 'manic depression', 'bipolar I', 'bipolar II'],
                requirements: 'Documented manic or depressive episodes affecting function',
                documentation: ['Psychiatric evaluation', 'Hospitalization records', 'Medication compliance']
            },
            'schizophrenia': {
                category: 'Mental Health',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid', 'Medicare'],
                keywords: ['schizophrenia', 'psychotic disorder', 'schizoaffective'],
                requirements: 'Documented with psychotic symptoms and functional impairment',
                documentation: ['Psychiatric evaluation', 'Treatment history', 'Hospitalization records']
            },
            'ptsd': {
                category: 'Mental Health',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'VA Benefits'],
                keywords: ['PTSD', 'post-traumatic stress', 'trauma disorder'],
                requirements: 'Documented trauma exposure with persistent symptoms affecting function',
                documentation: ['Psychiatric evaluation', 'Trauma history', 'Treatment records']
            },

            // Respiratory Conditions
            'copd': {
                category: 'Respiratory',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicare', 'SSI'],
                keywords: ['COPD', 'chronic obstructive pulmonary disease', 'emphysema', 'chronic bronchitis'],
                requirements: 'Documented with pulmonary function tests showing severe limitation',
                documentation: ['Pulmonary function tests', 'Chest X-ray/CT', 'Oxygen saturation levels']
            },
            'asthma': {
                category: 'Respiratory',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicaid'],
                keywords: ['severe asthma', 'chronic asthma', 'asthmatic'],
                requirements: 'Documented severe attacks requiring frequent ER visits or hospitalizations',
                documentation: ['Pulmonary function tests', 'ER records', 'Medication history']
            },

            // Autoimmune/Systemic Conditions
            'lupus': {
                category: 'Autoimmune',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid'],
                keywords: ['lupus', 'SLE', 'systemic lupus erythematosus'],
                requirements: 'Documented with organ involvement and functional limitations',
                documentation: ['Rheumatologist evaluation', 'Lab work (ANA, anti-dsDNA)', 'Organ function tests']
            },
            'crohns_colitis': {
                category: 'Gastrointestinal',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid'],
                keywords: ['crohns', 'crohn disease', 'ulcerative colitis', 'IBD', 'inflammatory bowel'],
                requirements: 'Documented with persistent symptoms despite treatment',
                documentation: ['Colonoscopy results', 'GI specialist notes', 'Hospitalization records']
            },

            // Cancer
            'cancer': {
                category: 'Cancer',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid', 'Medicare', 'Cancer Support Programs'],
                keywords: ['cancer', 'carcinoma', 'malignancy', 'tumor', 'oncology'],
                requirements: 'Documented cancer diagnosis with treatment or metastasis',
                documentation: ['Pathology reports', 'Oncologist notes', 'Treatment records', 'Imaging']
            },

            // Kidney Disease
            'kidney_failure': {
                category: 'Renal',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicare (immediate)', 'SSI'],
                keywords: ['kidney failure', 'renal failure', 'ESRD', 'dialysis', 'end stage renal'],
                requirements: 'Chronic kidney disease requiring dialysis or transplant',
                documentation: ['Nephrologist evaluation', 'GFR levels', 'Dialysis records']
            },

            // Diabetes
            'diabetes_complications': {
                category: 'Endocrine',
                severity: 'moderate',
                disabilityEligible: true,
                programs: ['SSDI', 'Medicare', 'Medicaid'],
                keywords: ['diabetes complications', 'diabetic neuropathy', 'diabetic retinopathy', 'uncontrolled diabetes'],
                requirements: 'Diabetes with documented complications affecting function',
                documentation: ['Endocrinologist notes', 'HbA1c levels', 'Complication records', 'Vision tests']
            },

            // HIV/AIDS
            'hiv_aids': {
                category: 'Infectious Disease',
                severity: 'severe',
                disabilityEligible: true,
                programs: ['SSDI', 'SSI', 'Medicaid', 'Ryan White Program'],
                keywords: ['HIV', 'AIDS', 'human immunodeficiency virus'],
                requirements: 'Documented HIV with opportunistic infections or low CD4 count',
                documentation: ['HIV test results', 'CD4 counts', 'Viral load', 'Infectious disease specialist notes']
            }
        };

        // Category-specific program recommendations
        this.categoryPrograms = {
            'Cardiovascular': {
                urgency: 'high',
                specialists: ['Cardiologist', 'Interventional Cardiologist'],
                additionalResources: ['American Heart Association', 'Cardiac Rehab Programs']
            },
            'Neurological': {
                urgency: 'high',
                specialists: ['Neurologist', 'Movement Disorder Specialist'],
                additionalResources: ['National MS Society', 'Parkinson\'s Foundation']
            },
            'Musculoskeletal': {
                urgency: 'moderate',
                specialists: ['Rheumatologist', 'Orthopedic Surgeon', 'Pain Management'],
                additionalResources: ['Arthritis Foundation', 'Chronic Pain Support']
            },
            'Mental Health': {
                urgency: 'high',
                specialists: ['Psychiatrist', 'Clinical Psychologist', 'Therapist'],
                additionalResources: ['NAMI', 'Crisis Hotlines', 'Mental Health America']
            },
            'Respiratory': {
                urgency: 'high',
                specialists: ['Pulmonologist', 'Respiratory Therapist'],
                additionalResources: ['American Lung Association', 'COPD Foundation']
            },
            'Autoimmune': {
                urgency: 'high',
                specialists: ['Rheumatologist', 'Immunologist'],
                additionalResources: ['Lupus Foundation', 'Autoimmune Association']
            },
            'Gastrointestinal': {
                urgency: 'moderate',
                specialists: ['Gastroenterologist', 'GI Surgeon'],
                additionalResources: ['Crohn\'s & Colitis Foundation']
            },
            'Cancer': {
                urgency: 'critical',
                specialists: ['Oncologist', 'Radiation Oncologist', 'Surgical Oncologist'],
                additionalResources: ['American Cancer Society', 'Cancer Support Community', 'Clinical Trial Access']
            },
            'Renal': {
                urgency: 'critical',
                specialists: ['Nephrologist', 'Transplant Surgeon'],
                additionalResources: ['National Kidney Foundation', 'Dialysis Centers']
            },
            'Endocrine': {
                urgency: 'moderate',
                specialists: ['Endocrinologist', 'Diabetes Educator'],
                additionalResources: ['American Diabetes Association']
            },
            'Infectious Disease': {
                urgency: 'high',
                specialists: ['Infectious Disease Specialist', 'Immunologist'],
                additionalResources: ['Ryan White HIV/AIDS Program', 'HIV/AIDS Bureau']
            }
        };

        // Patient profile
        this.patientProfile = {
            conditions: [],
            categories: [],
            eligiblePrograms: [],
            recommendedSpecialists: [],
            urgencyLevel: 'low'
        };
    }

    // Analyze text (from documents or user input) to identify conditions
    identifyConditions(text) {
        const textLower = text.toLowerCase();
        const identifiedConditions = [];

        // Search for condition keywords
        for (const [conditionId, conditionData] of Object.entries(this.conditionDatabase)) {
            for (const keyword of conditionData.keywords) {
                if (textLower.includes(keyword.toLowerCase())) {
                    identifiedConditions.push({
                        id: conditionId,
                        name: keyword,
                        ...conditionData
                    });
                    break; // Only add once per condition
                }
            }
        }

        return identifiedConditions;
    }

    // Categorize patient based on identified conditions
    categorizePatient(conditions) {
        this.patientProfile.conditions = conditions;
        this.patientProfile.categories = [];
        this.patientProfile.eligiblePrograms = new Set();
        this.patientProfile.recommendedSpecialists = new Set();

        let highestUrgency = 'low';

        // Process each condition
        for (const condition of conditions) {
            // Add category
            if (!this.patientProfile.categories.includes(condition.category)) {
                this.patientProfile.categories.push(condition.category);
            }

            // Add eligible programs
            for (const program of condition.programs) {
                this.patientProfile.eligiblePrograms.add(program);
            }

            // Add recommended specialists
            const categoryInfo = this.categoryPrograms[condition.category];
            if (categoryInfo) {
                for (const specialist of categoryInfo.specialists) {
                    this.patientProfile.recommendedSpecialists.add(specialist);
                }

                // Update urgency level
                const urgencyLevels = ['low', 'moderate', 'high', 'critical'];
                if (urgencyLevels.indexOf(categoryInfo.urgency) > urgencyLevels.indexOf(highestUrgency)) {
                    highestUrgency = categoryInfo.urgency;
                }
            }
        }

        this.patientProfile.eligiblePrograms = Array.from(this.patientProfile.eligiblePrograms);
        this.patientProfile.recommendedSpecialists = Array.from(this.patientProfile.recommendedSpecialists);
        this.patientProfile.urgencyLevel = highestUrgency;

        return this.patientProfile;
    }

    // Get personalized recommendations based on patient category
    getPersonalizedRecommendations(patientProfile) {
        const recommendations = {
            immediateActions: [],
            documentation: [],
            specialists: patientProfile.recommendedSpecialists,
            programs: patientProfile.eligiblePrograms,
            resources: [],
            applicationStrategy: ''
        };

        // Immediate actions based on urgency
        if (patientProfile.urgencyLevel === 'critical') {
            recommendations.immediateActions.push(
                '🚨 URGENT: Apply for expedited disability processing',
                '🚨 Enroll in Medicare immediately if kidney failure',
                '🚨 Contact hospital social worker for emergency assistance',
                '🚨 Apply for emergency Medicaid'
            );
        } else if (patientProfile.urgencyLevel === 'high') {
            recommendations.immediateActions.push(
                '⚠️ Start disability application within 30 days',
                '⚠️ Schedule appointments with recommended specialists',
                '⚠️ Begin gathering medical documentation',
                '⚠️ Apply for applicable insurance programs'
            );
        }

        // Collect documentation requirements from all conditions
        const docSet = new Set();
        for (const condition of patientProfile.conditions) {
            for (const doc of condition.documentation) {
                docSet.add(doc);
            }
        }
        recommendations.documentation = Array.from(docSet);

        // Collect resources from all categories
        for (const category of patientProfile.categories) {
            const categoryInfo = this.categoryPrograms[category];
            if (categoryInfo && categoryInfo.additionalResources) {
                recommendations.resources.push(...categoryInfo.additionalResources);
            }
        }

        // Generate application strategy
        if (patientProfile.conditions.some(c => c.disabilityEligible)) {
            recommendations.applicationStrategy = this.generateApplicationStrategy(patientProfile);
        }

        return recommendations;
    }

    // Generate detailed application strategy
    generateApplicationStrategy(patientProfile) {
        const severeConditions = patientProfile.conditions.filter(c => c.severity === 'severe');
        const hasMultipleConditions = patientProfile.conditions.length > 1;

        let strategy = '';

        if (severeConditions.length > 0) {
            strategy += `Your ${severeConditions.map(c => c.name).join(', ')} condition(s) are considered severe and should qualify for disability. `;
        }

        if (hasMultipleConditions) {
            strategy += `You have multiple conditions which strengthens your case. Emphasize how they combine to limit your functioning. `;
        }

        strategy += `\n\nKey Points for Your Application:\n`;
        strategy += `1. Focus on your worst days, not your best days\n`;
        strategy += `2. Explain how your condition prevents you from working 8 hours/day, 5 days/week\n`;
        strategy += `3. Document all side effects from medications\n`;
        strategy += `4. Get detailed statements from all treating physicians\n`;
        strategy += `5. Keep a symptom diary showing frequency and severity\n`;

        if (patientProfile.categories.includes('Mental Health')) {
            strategy += `\nMental Health Specific: Document how your condition affects concentration, memory, social interaction, and ability to complete tasks.`;
        }

        return strategy;
    }

    // Match patient to specific forms they need
    matchToRequiredForms(patientProfile) {
        const forms = [];

        // Check program eligibility
        if (patientProfile.eligiblePrograms.includes('SSDI') || patientProfile.eligiblePrograms.includes('SSI')) {
            forms.push({
                name: 'SSA Disability Application',
                type: 'Disability Benefits',
                priority: 'high',
                forms: ['Form SSA-16 (Adult Disability Report)', 'Form SSA-3368 (Function Report)']
            });
        }

        if (patientProfile.eligiblePrograms.includes('Medicare')) {
            forms.push({
                name: 'Medicare Application',
                type: 'Health Insurance',
                priority: 'high',
                forms: ['Form CMS-40B (Medicare Application)']
            });
        }

        if (patientProfile.eligiblePrograms.includes('Medicaid')) {
            forms.push({
                name: 'Medicaid Application',
                type: 'Health Insurance',
                priority: 'high',
                forms: ['State-specific Medicaid application']
            });
        }

        // Medical records request
        forms.push({
            name: 'Medical Records Release',
            type: 'Documentation',
            priority: 'high',
            forms: ['HIPAA Authorization Form for each provider']
        });

        // RFC if applicable
        if (patientProfile.conditions.some(c => c.disabilityEligible)) {
            forms.push({
                name: 'Residual Functional Capacity Form',
                type: 'Medical Documentation',
                priority: 'critical',
                forms: ['RFC form for physical and/or mental limitations']
            });
        }

        return forms;
    }

    // Generate a comprehensive patient report
    generatePatientReport(text) {
        // Identify conditions from text
        const conditions = this.identifyConditions(text);

        if (conditions.length === 0) {
            return {
                success: false,
                message: 'No recognized medical conditions found in the provided text. Please ensure medical diagnoses are clearly stated.'
            };
        }

        // Categorize patient
        const profile = this.categorizePatient(conditions);

        // Get recommendations
        const recommendations = this.getPersonalizedRecommendations(profile);

        // Match to required forms
        const requiredForms = this.matchToRequiredForms(profile);

        return {
            success: true,
            profile: profile,
            recommendations: recommendations,
            requiredForms: requiredForms,
            summary: this.generateSummary(profile, conditions)
        };
    }

    // Generate human-readable summary
    generateSummary(profile, conditions) {
        let summary = `Based on your medical conditions, here's what we found:\n\n`;

        summary += `📋 Identified Conditions:\n`;
        for (const condition of conditions) {
            summary += `  • ${condition.name} (${condition.category})\n`;
        }

        summary += `\n✅ You appear eligible for:\n`;
        for (const program of profile.eligiblePrograms) {
            summary += `  • ${program}\n`;
        }

        summary += `\n👨‍⚕️ Recommended Specialists:\n`;
        for (const specialist of profile.recommendedSpecialists.slice(0, 3)) {
            summary += `  • ${specialist}\n`;
        }

        summary += `\n⚡ Urgency Level: ${profile.urgencyLevel.toUpperCase()}\n`;

        return summary;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalConditionCategorizer;
}
