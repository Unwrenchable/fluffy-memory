// Document Library System
// Provides actual documents, forms, and templates directly to users

class DocumentLibrary {
        // Return all available documents (flat array)
        getAllDocuments() {
            const all = [];
            for (const section of Object.values(this.documents)) {
                if (section.documents && Array.isArray(section.documents)) {
                    all.push(...section.documents);
                }
            }
            return all;
        }
    constructor() {
        // Complete document library with forms, templates, and checklists
        this.documents = {
            // SOCIAL SECURITY DISABILITY FORMS
            ssdi_ssi: {
                name: 'Social Security Disability Forms',
                icon: '📋',
                documents: [
                    {
                        id: 'ssa-16',
                        name: 'Form SSA-16 (Adult Disability Report)',
                        description: 'Main disability application form',
                        pages: 16,
                        fillable: true,
                        url: 'https://www.ssa.gov/forms/ssa-16.pdf',
                        localTemplate: 'ssa-16-template.pdf',
                        helpText: 'This is your main disability application. Fill out completely and honestly.',
                        sections: [
                            'Personal Information',
                            'Medical Conditions',
                            'Work History',
                            'Education',
                            'Daily Activities'
                        ]
                    },
                    {
                        id: 'ssa-3368',
                        name: 'Form SSA-3368 (Disability Report - Adult)',
                        description: 'Detailed information about your disability',
                        pages: 15,
                        fillable: true,
                        url: 'https://www.ssa.gov/forms/ssa-3368.pdf',
                        localTemplate: 'ssa-3368-template.pdf',
                        helpText: 'Detailed medical and functional information',
                        sections: [
                            'Medical Conditions Details',
                            'Medications',
                            'Medical Treatments',
                            'Doctors & Hospitals',
                            'How Your Condition Limits You'
                        ]
                    },
                    {
                        id: 'ssa-827',
                        name: 'Form SSA-827 (Authorization to Release Information)',
                        description: 'Allows SSA to get your medical records',
                        pages: 2,
                        fillable: true,
                        url: 'https://www.ssa.gov/forms/ssa-827.pdf',
                        localTemplate: 'ssa-827-template.pdf',
                        helpText: 'Fill one out for EACH doctor/hospital. The more records, the better!',
                        required: true
                    },
                    {
                        id: 'ssa-561',
                        name: 'Form SSA-561 (Request for Reconsideration)',
                        description: 'Appeal form if you are denied',
                        pages: 4,
                        fillable: true,
                        url: 'https://www.ssa.gov/forms/ssa-561.pdf',
                        localTemplate: 'ssa-561-template.pdf',
                        helpText: 'Use this to appeal a denial. File within 60 days!',
                        urgent: true
                    }
                ]
            },

            // RFC FORMS (Critical for disability)
            rfc_forms: {
                name: 'RFC (Residual Functional Capacity) Forms',
                icon: '📝',
                documents: [
                    {
                        id: 'physical-rfc',
                        name: 'Physical RFC Questionnaire',
                        description: 'For doctor to document physical limitations',
                        pages: 8,
                        fillable: true,
                        template: true,
                        helpText: 'Give this to your doctor - it asks specific questions about what you CAN and CANNOT do physically',
                        sections: [
                            'Lifting/Carrying',
                            'Standing/Walking',
                            'Sitting',
                            'Reaching/Handling',
                            'Environmental Limitations',
                            'Pain Assessment',
                            'Side Effects of Medications'
                        ]
                    },
                    {
                        id: 'mental-rfc',
                        name: 'Mental RFC Questionnaire',
                        description: 'For doctor to document mental/cognitive limitations',
                        pages: 6,
                        fillable: true,
                        template: true,
                        helpText: 'Give this to psychiatrist/psychologist - documents cognitive limitations',
                        sections: [
                            'Understanding & Memory',
                            'Sustained Concentration',
                            'Social Interaction',
                            'Adaptation to Changes',
                            'Off-Task Time',
                            'Absences from Work'
                        ]
                    }
                ]
            },

            // MEDICAL RECORDS REQUEST
            medical_records: {
                name: 'Medical Records Request Forms',
                icon: '🏥',
                documents: [
                    {
                        id: 'hipaa-authorization',
                        name: 'HIPAA Authorization Form',
                        description: 'Request your own medical records',
                        pages: 2,
                        fillable: true,
                        template: true,
                        helpText: 'Use this to request your medical records from any provider',
                        required: true
                    },
                    {
                        id: 'medical-records-checklist',
                        name: 'Medical Records Checklist',
                        description: 'Track which records you have',
                        pages: 1,
                        fillable: true,
                        template: true,
                        helpText: 'Check off records as you receive them'
                    }
                ]
            },

            // MEDICARE FORMS
            medicare: {
                name: 'Medicare Application Forms',
                icon: '🏥',
                documents: [
                    {
                        id: 'cms-40b',
                        name: 'Form CMS-40B (Application for Medicare)',
                        description: 'Apply for Medicare',
                        pages: 5,
                        fillable: true,
                        url: 'https://www.cms.gov/Medicare/CMS-Forms/CMS-Forms/downloads/cms40b.pdf',
                        helpText: 'For people 65+ or disabled for 24+ months'
                    }
                ]
            },

            // MEDICAID FORMS (State-specific but general template)
            medicaid: {
                name: 'Medicaid Application Information',
                icon: '🏥',
                documents: [
                    {
                        id: 'medicaid-checklist',
                        name: 'Medicaid Application Checklist',
                        description: 'Documents you need to apply',
                        pages: 2,
                        fillable: false,
                        template: true,
                        helpText: 'Checklist of documents needed for Medicaid application'
                    }
                ]
            },

            // APPEAL LETTERS
            appeal_templates: {
                name: 'Appeal Letter Templates',
                icon: '✍️',
                documents: [
                    {
                        id: 'initial-denial-appeal',
                        name: 'Initial Denial Appeal Letter Template',
                        description: 'Template for first denial appeal',
                        pages: 3,
                        fillable: true,
                        template: true,
                        helpText: 'Customizable template for appealing your first denial',
                        urgent: true
                    },
                    {
                        id: 'new-evidence-letter',
                        name: 'New Medical Evidence Cover Letter',
                        description: 'Submit new medical evidence',
                        pages: 1,
                        fillable: true,
                        template: true,
                        helpText: 'Use when submitting additional medical records'
                    }
                ]
            },

            // DOCTOR LETTERS
            doctor_letters: {
                name: 'Letters for Your Doctor',
                icon: '👨‍⚕️',
                documents: [
                    {
                        id: 'doctor-request-letter',
                        name: 'Request for Doctor Support Letter',
                        description: 'Ask doctor to complete disability forms',
                        pages: 2,
                        fillable: true,
                        template: true,
                        helpText: 'Give this to your doctor explaining what you need'
                    },
                    {
                        id: 'rfc-request-letter',
                        name: 'RFC Form Request Letter',
                        description: 'Ask doctor to complete RFC form',
                        pages: 1,
                        fillable: true,
                        template: true,
                        helpText: 'Attach this to RFC form when giving to doctor'
                    }
                ]
            },

            // FINANCIAL ASSISTANCE
            financial: {
                name: 'Financial Assistance Forms',
                icon: '💰',
                documents: [
                    {
                        id: 'charity-care-application',
                        name: 'Hospital Charity Care Application Template',
                        description: 'Request free hospital care',
                        pages: 4,
                        fillable: true,
                        template: true,
                        helpText: 'General template - each hospital has own form but similar'
                    },
                    {
                        id: 'hill-burton-application',
                        name: 'Hill-Burton Free Care Application',
                        description: 'Apply for Hill-Burton free care',
                        pages: 2,
                        fillable: true,
                        template: true,
                        helpText: 'For hospitals that received Hill-Burton funding'
                    }
                ]
            },

            // CHECKLISTS & GUIDES
            checklists: {
                name: 'Checklists & Guides',
                icon: '✅',
                documents: [
                    {
                        id: 'disability-application-checklist',
                        name: 'Complete Disability Application Checklist',
                        description: 'Every document you need',
                        pages: 3,
                        fillable: false,
                        template: true,
                        helpText: 'Master checklist for disability application'
                    },
                    {
                        id: 'appeal-checklist',
                        name: 'Appeal Process Checklist',
                        description: 'Steps for successful appeal',
                        pages: 2,
                        fillable: false,
                        template: true,
                        helpText: 'Follow this checklist when appealing a denial'
                    },
                    {
                        id: 'doctor-appointment-guide',
                        name: 'What to Tell Your Doctor',
                        description: 'Guide for disability medical appointments',
                        pages: 2,
                        fillable: false,
                        template: true,
                        helpText: 'How to communicate with doctors about disability'
                    }
                ]
            },

            // DENTAL ASSISTANCE
            dental: {
                name: 'Dental Assistance Forms',
                icon: '🦷',
                documents: [
                    {
                        id: 'dental-financial-assistance',
                        name: 'Dental Financial Assistance Application',
                        description: 'Apply for dental assistance programs',
                        pages: 2,
                        fillable: true,
                        template: true,
                        helpText: 'General template for dental assistance'
                    }
                ]
            }
        };

        // Document templates in text format (can be filled with user data)
        this.templates = {
            'appeal-letter': this.generateAppealLetterTemplate(),
            'doctor-request': this.generateDoctorRequestTemplate(),
            'rfc-request': this.generateRFCRequestTemplate(),
            'medical-records-request': this.generateMedicalRecordsRequestTemplate()
        };
    }

    // Get all documents by category
    getDocumentsByCategory(category) {
        return this.documents[category] || null;
    }

    // Get all available categories
    getAllCategories() {
        return Object.keys(this.documents).map(key => ({
            id: key,
            name: this.documents[key].name,
            icon: this.documents[key].icon,
            documentCount: this.documents[key].documents.length
        }));
    }

    // Search for documents
    searchDocuments(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase();

        for (const [categoryId, category] of Object.entries(this.documents)) {
            for (const doc of category.documents) {
                if (doc.name.toLowerCase().includes(term) ||
                    doc.description.toLowerCase().includes(term) ||
                    (doc.helpText && doc.helpText.toLowerCase().includes(term))) {
                    results.push({
                        ...doc,
                        category: category.name,
                        categoryId: categoryId
                    });
                }
            }
        }

        return results;
    }

    // Get documents needed for specific situation
    getDocumentsForSituation(situation) {
        const needed = [];

        if (situation.applyingForDisability) {
            needed.push(
                ...this.documents.ssdi_ssi.documents.filter(d => d.id !== 'ssa-561'),
                ...this.documents.rfc_forms.documents,
                ...this.documents.medical_records.documents
            );
        }

        if (situation.appealing) {
            needed.push(
                this.documents.ssdi_ssi.documents.find(d => d.id === 'ssa-561'),
                ...this.documents.appeal_templates.documents
            );
        }

        if (situation.needsDoctorHelp) {
            needed.push(
                ...this.documents.doctor_letters.documents,
                ...this.documents.rfc_forms.documents
            );
        }

        if (situation.needsInsurance) {
            needed.push(
                ...this.documents.medicare.documents,
                ...this.documents.medicaid.documents
            );
        }

        if (situation.needsFinancialHelp) {
            needed.push(
                ...this.documents.financial.documents
            );
        }

        if (situation.needsDental) {
            needed.push(
                ...this.documents.dental.documents
            );
        }

        return needed;
    }

    // Generate appeal letter template
    generateAppealLetterTemplate() {
        return `[Your Name]
[Your Address]
[City, State ZIP]
[Phone Number]
[Email]

[Date]

Social Security Administration
Office of Disability Adjudication and Review
[Local Office Address]

RE: Request for Reconsideration / Appeal
Social Security Number: [Your SSN]
Claim Number: [Your Claim Number]

Dear Sir or Madam:

I am writing to appeal the denial of my application for Social Security Disability benefits dated [denial date]. I respectfully disagree with this decision and am requesting reconsideration.

REASON FOR APPEAL:

I believe the decision was incorrect for the following reasons:

1. My medical condition(s) [list conditions] significantly limit my ability to work.

2. The decision did not fully consider [describe what was missed - e.g., severity of symptoms, combination of conditions, medication side effects, etc.]

3. I am submitting additional medical evidence that supports my claim.

NEW EVIDENCE:

I am including the following new medical evidence:
- [List new medical records, test results, doctor statements, etc.]

FUNCTIONAL LIMITATIONS:

My condition prevents me from working because:
- [Describe physical limitations]
- [Describe mental/cognitive limitations]  
- [Describe symptoms: pain, fatigue, side effects]
- [Describe unpredictability of symptoms]

I cannot work 8 hours per day, 5 days per week on a sustained basis because [explain].

I respectfully request that you reconsider your decision based on this additional information. My medical conditions prevent me from engaging in substantial gainful activity, and I meet the criteria for disability benefits.

Thank you for your time and consideration.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: [List all attached documents]`;
    }

    // Generate doctor request template
    generateDoctorRequestTemplate() {
        return `Dear Dr. [Doctor's Name],

I am currently applying for Social Security Disability benefits due to my medical condition(s). As part of the application process, I need comprehensive medical documentation that explains how my condition affects my ability to work.

I am requesting your help with the following:

1. COMPLETE RFC FORM: I have attached a Residual Functional Capacity (RFC) questionnaire. This form asks specific questions about my functional limitations. Please complete this form based on your medical knowledge of my condition and limitations.

2. MEDICAL STATEMENT: If possible, please provide a statement on your letterhead that includes:
   - My diagnosis/diagnoses
   - How long you have been treating me
   - Treatments tried and their effectiveness
   - How my condition limits my daily activities
   - Whether my condition prevents me from working 8 hours/day, 5 days/week
   - Prognosis (expected duration of limitations)

3. OBJECTIVE MEDICAL EVIDENCE: Please include or reference any objective test results (MRIs, X-rays, lab work, etc.) that support your findings.

4. MEDICATION SIDE EFFECTS: Please document any significant side effects from my medications that affect my functioning.

I understand Social Security Disability is difficult to obtain, and thorough medical documentation is critical to my case. Your detailed evaluation of my limitations will be extremely helpful.

Please complete these documents within the next 2-3 weeks if possible, as timely submission is important for my case.

Thank you for your help and support during this difficult time.

Sincerely,

[Your Name]
[Date]

Attached: RFC Questionnaire`;
    }

    // Generate RFC request template
    generateRFCRequestTemplate() {
        return `RESIDUAL FUNCTIONAL CAPACITY (RFC) FORM REQUEST

To: Dr. [Doctor's Name]
From: [Patient Name]
Date: [Date]

This RFC form is critical for my disability application. Social Security needs to know SPECIFICALLY what I can and cannot do.

When completing this form, please consider:

✓ My WORST days, not my best days
✓ How long I can perform activities before needing to rest
✓ How medications affect my functioning
✓ How pain/fatigue limit me throughout the day
✓ How many days per month I would likely miss work
✓ How much time I would be "off-task" during a workday

Please be SPECIFIC with numbers and measurements:
- Instead of "limited sitting": "Can sit 15 minutes before needing to stand/move"
- Instead of "limited lifting": "Can lift maximum 5 pounds occasionally, 2 pounds frequently"
- Instead of "pain": "Pain level 7/10 daily, requiring rest periods every 2 hours"

The more detailed and specific you are, the better chance I have of approval.

Thank you for taking the time to complete this thoroughly.`;
    }

    // Generate medical records request template
    generateMedicalRecordsRequestTemplate() {
        return `[Date]

[Provider Name]
Medical Records Department
[Address]
[City, State ZIP]

RE: Request for Medical Records
Patient: [Your Name]
Date of Birth: [Your DOB]
Patient ID/Account Number: [If known]

Dear Medical Records Department:

I am requesting a complete copy of my medical records for the purpose of applying for disability benefits.

Please send me complete copies of:
☐ All office visit notes
☐ All test results (lab work, X-rays, MRIs, CT scans, etc.)
☐ All hospital records (if applicable)
☐ All consultation reports
☐ All treatment records
☐ Medication lists and prescriptions

Records needed from: [start date] to present

Please send records to:
[Your Name]
[Your Address]
[City, State ZIP]

I understand there may be a fee for copying records. Please contact me if the fee exceeds $[amount] before processing this request.

I have attached a signed HIPAA Authorization form.

Please process this request as soon as possible as it is needed for my disability application.

Thank you,

[Your Signature]
[Your Printed Name]
[Your Phone Number]

Enclosed: HIPAA Authorization Form`;
    }

    // Generate filled template with user data
    fillTemplate(templateId, userData) {
        let template = this.templates[templateId];
        
        if (!template) {
            return null;
        }

        // If userData is not provided, try to load from UserDataManager
        if (!userData || Object.keys(userData).length === 0) {
            if (typeof UserDataManager !== 'undefined') {
                const userDataManager = new UserDataManager();
                if (userDataManager.hasProfile()) {
                    userData = userDataManager.getDocumentData();
                    console.log('Auto-filling from saved intake data');
                }
            }
        }

        // If still no userData, use empty defaults
        userData = userData || {};

        // Replace placeholders with user data
        const replacements = {
            '[Your Name]': userData.name || userData.firstName || '[Your Name]',
            '[Your Address]': userData.address || '[Your Address]',
            '[City, State ZIP]': userData.cityStateZip || (userData.state ? `[City], ${userData.state} [ZIP]` : '[City, State ZIP]'),
            '[Phone Number]': userData.phone || '[Phone Number]',
            '[Email]': userData.email || '[Email]',
            '[Date]': new Date().toLocaleDateString(),
            '[Your SSN]': userData.ssn || '[Your SSN]',
            '[Your DOB]': userData.dob || '[Your DOB]',
            '[Your Claim Number]': userData.claimNumber || '[Your Claim Number]',
            '[Doctor\'s Name]': userData.doctorName || userData.specialistTypes || '[Doctor\'s Name]',
            '[denial date]': userData.denialDate || '[denial date]',
            '[list conditions]': userData.conditions || userData.primaryCondition || '[list conditions]',
            '[describe what was missed - e.g., severity of symptoms, combination of conditions, medication side effects, etc.]': this.generateWhatWasMissed(userData),
            '[List new medical records, test results, doctor statements, etc.]': userData.newEvidence || '[List new medical records, test results, doctor statements, etc.]',
            '[Describe physical limitations]': this.formatPhysicalLimitations(userData),
            '[Describe mental/cognitive limitations]': this.formatCognitiveLimitations(userData),
            '[Describe symptoms: pain, fatigue, side effects]': this.formatSymptoms(userData),
            '[Describe unpredictability of symptoms]': this.formatUnpredictability(userData),
            '[explain]': this.generateCannotWorkExplanation(userData)
        };

        for (const [placeholder, value] of Object.entries(replacements)) {
            template = template.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        }

        return template;
    }

    // Helper methods for generating content from intake data
    generateWhatWasMissed(userData) {
        const missed = [];
        
        if (userData.conditionProgression && userData.conditionProgression.includes('worse')) {
            missed.push('the progressive worsening of my condition');
        }
        if (userData.medicationSideEffects && userData.medicationSideEffects.includes('severe')) {
            missed.push('severe medication side effects that impair functioning');
        }
        if (userData.badDaysPerWeek && (userData.badDaysPerWeek === 'Every day' || userData.badDaysPerWeek === '5-6 days')) {
            missed.push('the frequency and severity of bad days');
        }
        if (userData.cognitiveProblems && userData.cognitiveProblems !== 'No cognitive problems') {
            missed.push('significant cognitive and mental limitations');
        }
        
        return missed.length > 0 ? missed.join(', ') : 'severity of symptoms and their impact on daily functioning';
    }

    formatPhysicalLimitations(userData) {
        if (!userData.physicalLimitations || userData.physicalLimitations.length === 0) {
            return 'Significant physical limitations affecting daily activities';
        }
        
        const limitations = Array.isArray(userData.physicalLimitations) ? userData.physicalLimitations : [userData.physicalLimitations];
        return '- ' + limitations.join('\n- ');
    }

    formatCognitiveLimitations(userData) {
        const limitations = [];
        
        if (userData.cognitiveProblems && userData.cognitiveProblems !== 'No cognitive problems') {
            limitations.push(userData.cognitiveProblems);
        }
        if (userData.concentrationTime) {
            limitations.push(`Can only concentrate for ${userData.concentrationTime}`);
        }
        
        return limitations.length > 0 ? '- ' + limitations.join('\n- ') : 'Cognitive difficulties affecting work capacity';
    }

    formatSymptoms(userData) {
        const symptoms = [];
        
        if (userData.primaryCondition) {
            symptoms.push(`Primary condition: ${userData.primaryCondition}`);
        }
        if (userData.medicationSideEffects && userData.medicationSideEffects !== 'No major side effects') {
            symptoms.push(`Medication side effects: ${userData.medicationSideEffects}`);
        }
        if (userData.restFrequency && userData.restFrequency !== 'Rarely need to rest') {
            symptoms.push(`Need to rest: ${userData.restFrequency}`);
        }
        
        return symptoms.length > 0 ? '- ' + symptoms.join('\n- ') : 'Chronic symptoms affecting daily function';
    }

    formatUnpredictability(userData) {
        if (userData.badDaysPerWeek) {
            return `I experience ${userData.badDaysPerWeek.toLowerCase()} where symptoms are severe and unpredictable, making consistent work impossible.`;
        }
        return 'My symptoms vary significantly day to day, making it impossible to maintain consistent work attendance.';
    }

    generateCannotWorkExplanation(userData) {
        const reasons = [];
        
        if (userData.badDaysPerWeek && (userData.badDaysPerWeek === 'Every day' || userData.badDaysPerWeek === '5-6 days')) {
            reasons.push('I have frequent bad days where I can barely function');
        }
        if (userData.restFrequency && userData.restFrequency === 'Multiple times every day') {
            reasons.push('I need to lie down and rest multiple times daily');
        }
        if (userData.concentrationTime && (userData.concentrationTime === 'Less than 5 minutes' || userData.concentrationTime === '5-15 minutes')) {
            reasons.push('my concentration is severely limited');
        }
        if (userData.physicalLimitations && userData.physicalLimitations.length > 3) {
            reasons.push('I have multiple significant physical limitations');
        }
        
        if (reasons.length > 0) {
            return reasons.join(', ') + '.';
        }
        return 'my medical condition and resulting limitations prevent consistent, reliable work performance.';
    }

    // Download document (simulate download)
    downloadDocument(documentId, format = 'pdf') {
        // In production, would generate actual PDF or provide real download
        return {
            success: true,
            message: `Document ${documentId} would be downloaded as ${format}`,
            filename: `${documentId}.${format}`
        };
    }

    // Get document package for situation
    getDocumentPackage(situation) {
        const documents = this.getDocumentsForSituation(situation);
        
        return {
            packageName: this.getPackageName(situation),
            totalDocuments: documents.length,
            documents: documents,
            instructions: this.getPackageInstructions(situation)
        };
    }

    getPackageName(situation) {
        if (situation.applyingForDisability) {
            return 'Complete Disability Application Package';
        } else if (situation.appealing) {
            return 'Disability Appeal Package';
        } else if (situation.needsInsurance) {
            return 'Insurance Application Package';
        }
        return 'Medical Assistance Documents';
    }

    getPackageInstructions(situation) {
        const instructions = [];
        
        instructions.push('1. Print all documents');
        instructions.push('2. Fill out forms completely and honestly');
        instructions.push('3. Sign and date all required forms');
        instructions.push('4. Make copies of everything before submitting');
        
        if (situation.applyingForDisability) {
            instructions.push('5. Submit online at ssa.gov or at local Social Security office');
            instructions.push('6. Keep receipt/confirmation number');
        }
        
        return instructions;
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocumentLibrary;
}
