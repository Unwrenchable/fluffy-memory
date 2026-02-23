/*
 * CoveredConditionsHelper
 *
 * Checks user conditions against:
 *   1. SSA Compassionate Allowances (CAL) — fast-tracked, decided in days/weeks
 *   2. SSA Blue Book listed conditions — strong automatic approval criteria
 *
 * Uses the DualAIMedicalTeam (window.dualAIMedicalTeam) to generate a
 * condition-specific medical documentation support packet.
 */

class CoveredConditionsHelper {
    constructor() {
        // ── Compassionate Allowances (CAL) ────────────────────────────────
        // Source: SSA Compassionate Allowances program (ssa.gov/compassionateallowances)
        // These conditions are typically approved within days to weeks.
        this.compassionateAllowances = [
            { key: 'als', label: 'ALS (Amyotrophic Lateral Sclerosis / Lou Gehrig\'s Disease)', keywords: ['als', 'amyotrophic lateral sclerosis', 'lou gehrig'], docs: ['Neurologist diagnosis letter', 'EMG (electromyography) results', 'Nerve conduction studies', 'Clinical examination notes documenting progressive weakness'], listing: '11.10' },
            { key: 'acute_leukemia', label: 'Acute Leukemia (ALL / AML)', keywords: ['acute leukemia', 'acute lymphoblastic', 'acute myeloid', 'all', 'aml'], docs: ['Bone marrow biopsy report', 'Pathology report with cell type', 'Oncologist treatment notes', 'CBC and blood work'], listing: '13.06' },
            { key: 'glioblastoma', label: 'Glioblastoma Multiforme (Brain Tumor)', keywords: ['glioblastoma', 'gbm', 'grade iv glioma', 'glioblastoma multiforme'], docs: ['MRI of brain with contrast', 'Pathology/biopsy report confirming GBM', 'Neurosurgeon or neuro-oncologist records', 'Treatment plan'], listing: '13.13' },
            { key: 'pancreatic_cancer', label: 'Pancreatic Cancer', keywords: ['pancreatic cancer', 'cancer of the pancreas', 'adenocarcinoma of pancreas'], docs: ['CT scan or MRI of abdomen', 'Pathology/biopsy report', 'Oncologist records', 'CA 19-9 tumor marker levels'], listing: '13.19' },
            { key: 'mesothelioma', label: 'Mesothelioma', keywords: ['mesothelioma', 'malignant mesothelioma', 'pleural mesothelioma'], docs: ['Pathology/biopsy report', 'CT scan of chest', 'Pulmonologist or oncologist notes', 'Asbestos exposure history'], listing: '13.15' },
            { key: 'esophageal_cancer', label: 'Esophageal Cancer', keywords: ['esophageal cancer', 'cancer of the esophagus', 'esophagus carcinoma'], docs: ['Endoscopy report', 'Pathology/biopsy report', 'CT staging scan', 'Oncologist records'], listing: '13.16' },
            { key: 'small_cell_lung', label: 'Small Cell Lung Cancer', keywords: ['small cell lung cancer', 'sclc', 'small cell carcinoma of the lung'], docs: ['Chest CT or PET scan', 'Pathology/biopsy confirming SCLC', 'Oncologist records and staging', 'Pulmonary function tests'], listing: '13.15' },
            { key: 'early_onset_alzheimers', label: 'Early-Onset Alzheimer\'s Disease (before age 65)', keywords: ['early onset alzheimer', 'early-onset alzheimer', 'alzheimer disease', 'alzheimers'], docs: ['Neuropsychological evaluation', 'MRI or PET scan of brain', 'Neurologist diagnosis', 'Mini-Mental State Examination (MMSE) scores'], listing: '12.02' },
            { key: 'huntingtons', label: 'Huntington\'s Disease', keywords: ['huntington', "huntington's disease", 'huntington disease'], docs: ['Genetic test confirming HTT gene mutation', 'Neurologist evaluation', 'Documentation of functional decline'], listing: '11.17' },
            { key: 'cjd', label: 'Creutzfeldt-Jakob Disease (CJD)', keywords: ['creutzfeldt-jakob', 'cjd', 'creutzfeldt jakob'], docs: ['Neurologist or specialist diagnosis', 'MRI brain results', 'EEG results', 'Spinal fluid analysis (14-3-3 protein test)'], listing: '11.02' },
            { key: 'peritoneal_cancer', label: 'Primary Peritoneal Carcinoma', keywords: ['peritoneal carcinoma', 'primary peritoneal', 'peritoneal cancer'], docs: ['Pathology/biopsy report', 'CT scan of abdomen and pelvis', 'Oncologist records', 'CA-125 levels'], listing: '13.23' },
            { key: 'liver_cancer', label: 'Hepatocellular Carcinoma (Liver Cancer)', keywords: ['hepatocellular carcinoma', 'liver cancer', 'hcc', 'hepatocellular'], docs: ['CT or MRI of liver', 'Pathology/biopsy report', 'Alpha-fetoprotein (AFP) levels', 'Hepatologist records'], listing: '13.19' },
            { key: 'multiple_system_atrophy', label: 'Multiple System Atrophy (MSA)', keywords: ['multiple system atrophy', 'msa', 'olivopontocerebellar', 'shy-drager'], docs: ['Neurologist diagnosis', 'MRI of brain', 'Autonomic testing results', 'Documentation of multiple system involvement'], listing: '11.17' },
            { key: 'sma', label: 'Spinal Muscular Atrophy (SMA)', keywords: ['spinal muscular atrophy', 'sma', 'sma type i', 'sma type ii', 'werdnig-hoffmann'], docs: ['Genetic testing confirming SMN1 gene deletion', 'Neurologist evaluation', 'EMG results', 'Functional assessment'], listing: '11.10' },
            { key: 'lewy_body', label: 'Lewy Body Dementia', keywords: ['lewy body', "lewy body dementia", 'dementia with lewy bodies', 'dlb'], docs: ['Neurologist diagnosis', 'Neuropsychological testing', 'DaTscan imaging if available', 'Documentation of cognitive fluctuations and motor symptoms'], listing: '12.02' },
            { key: 'stage4_cancer', label: 'Stage IV (Metastatic) Cancer — Any Type', keywords: ['stage iv', 'stage 4', 'stage four', 'metastatic cancer', 'metastatic', 'widely metastatic'], docs: ['Pathology/biopsy report', 'Staging CT or PET scan confirming Stage IV', 'Oncologist records', 'Treatment plan'], listing: '13.xx' },
            { key: 'gallbladder_cancer', label: 'Gallbladder Cancer', keywords: ['gallbladder cancer', 'carcinoma of the gallbladder', 'cholangiocarcinoma'], docs: ['CT or ultrasound imaging', 'Pathology/biopsy report', 'Oncologist records'], listing: '13.19' },
            { key: 'salivary_cancer', label: 'Salivary Gland Cancer (with distant metastasis)', keywords: ['salivary gland cancer', 'parotid cancer', 'salivary carcinoma'], docs: ['Pathology report', 'CT scan', 'Oncologist records showing metastasis'], listing: '13.16' },
            { key: 'inflammatory_breast', label: 'Inflammatory Breast Cancer', keywords: ['inflammatory breast cancer', 'ibc'], docs: ['Clinical diagnosis by oncologist', 'Biopsy report', 'CT/PET scan', 'Dermatology or oncology records'], listing: '13.10' },
        ];

        // ── Blue Book Listed Conditions ───────────────────────────────────
        // These have specific SSA listing criteria — meeting them means automatic approval.
        this.blueBookListings = [
            { key: 'ms', label: 'Multiple Sclerosis (MS)', keywords: ['multiple sclerosis', ' ms ', 'ms,', 'ms.'], listing: '11.09', criteria: 'Disorganization of motor function in two extremities, OR vision problems, OR marked limitation in physical OR mental functioning', docs: ['MRI of brain and/or spine with contrast', 'Neurologist records (at least 3 months)', 'Documentation of relapses/progression', 'Visual field tests if applicable', 'Expanded Disability Status Scale (EDSS) score from neurologist'] },
            { key: 'parkinsons', label: 'Parkinson\'s Disease', keywords: ['parkinson', "parkinson's", 'parkinson disease', 'pd'], listing: '11.06', criteria: 'Motor dysfunction with significant rigidity, bradykinesia, or tremor — must affect the ability to ambulate, handle/finger objects, or communicate', docs: ['Neurologist diagnosis and treatment records', 'Unified Parkinson\'s Disease Rating Scale (UPDRS) assessment', 'Documentation of medication response', 'RFC questionnaire completed by neurologist'] },
            { key: 'epilepsy', label: 'Epilepsy / Seizure Disorder', keywords: ['epilepsy', 'seizure disorder', 'seizures', 'convulsions'], listing: '11.02', criteria: 'Generalized tonic-clonic seizures at least once monthly despite 3+ months of treatment, OR absence/focal seizures 3+ times/month', docs: ['EEG results', 'Seizure diary (3+ months)', 'Neurologist records', 'Medication list and dosages', 'Documentation of post-ictal effects'] },
            { key: 'chronic_heart_failure', label: 'Chronic Heart Failure', keywords: ['heart failure', 'chf', 'congestive heart failure', 'systolic dysfunction', 'ejection fraction'], listing: '4.02', criteria: 'Ejection fraction ≤30%, OR hospitalization for CHF in past 12 months, OR inability to perform activities requiring 3 METs', docs: ['Echocardiogram with ejection fraction', 'Cardiac catheterization results', 'Hospitalization records for CHF', 'Cardiologist records', 'BNP or NT-proBNP levels'] },
            { key: 'chronic_kidney', label: 'Chronic Kidney Disease (Stage 4–5 / Dialysis)', keywords: ['chronic kidney disease', 'ckd', 'end stage renal', 'esrd', 'dialysis', 'kidney failure', 'renal failure'], listing: '6.03', criteria: 'CKD with GFR ≤15, OR on dialysis, OR kidney transplant recipient', docs: ['Lab results showing GFR levels', 'Nephrology records', 'Dialysis records if applicable', 'Kidney biopsy if performed', 'Creatinine/BUN history'] },
            { key: 'lupus', label: 'Systemic Lupus Erythematosus (SLE)', keywords: ['lupus', 'sle', 'systemic lupus'], listing: '14.02', criteria: 'Involvement of two or more organs/body systems with marked limitation in activities, OR repeated manifestations with constitutional symptoms', docs: ['Rheumatologist diagnosis and records', 'ANA, anti-dsDNA, complement levels', 'Documentation of organ involvement (renal, cardiac, CNS, etc.)', 'Records of flares and hospitalizations'] },
            { key: 'hiv', label: 'HIV/AIDS', keywords: ['hiv', 'aids', 'human immunodeficiency', 'hiv positive', 'hiv/aids'], listing: '14.11', criteria: 'CD4 count <200, OR AIDS-defining illness, OR significant functional limitation', docs: ['CD4 count history and viral load results', 'HIV specialist records', 'Records of opportunistic infections or AIDS-defining illnesses', 'Documentation of functional limitations'] },
            { key: 'copd', label: 'COPD / Chronic Respiratory Failure', keywords: ['copd', 'chronic obstructive pulmonary', 'emphysema', 'chronic bronchitis', 'respiratory failure'], listing: '3.02', criteria: 'FEV1 at or below specific threshold based on height, OR chronic impairment of gas exchange, OR need for supplemental oxygen', docs: ['Spirometry/pulmonary function tests (FEV1, FVC results)', 'Chest X-ray or CT scan', 'Arterial blood gas results', 'Pulmonologist records', 'Prescription for supplemental oxygen if applicable'] },
            { key: 'bipolar', label: 'Bipolar Disorder (Severe)', keywords: ['bipolar', 'bipolar disorder', 'manic depression', 'bipolar i', 'bipolar ii'], listing: '12.04', criteria: 'Marked limitation in at least two areas of mental functioning, OR history of chronic mental disorder with serious episodes despite treatment', docs: ['Psychiatrist records (at least 2 years)', 'Psychiatric evaluations', 'Hospitalization records', 'Medication history', 'Global Assessment of Functioning (GAF) scores', 'RFC for mental health completed by psychiatrist'] },
            { key: 'schizophrenia', label: 'Schizophrenia / Schizoaffective Disorder', keywords: ['schizophrenia', 'schizoaffective', 'psychosis', 'psychotic disorder'], listing: '12.03', criteria: 'Marked limitation in mental functioning, with delusions, hallucinations, or disorganized thinking documented', docs: ['Psychiatrist records', 'Psychiatric evaluations', 'Hospitalization records', 'Medication list', 'Functional assessment from treating psychiatrist'] },
            { key: 'ptsd_anxiety', label: 'PTSD / Severe Anxiety Disorder', keywords: ['ptsd', 'post traumatic', 'post-traumatic', 'severe anxiety', 'panic disorder', 'ocd'], listing: '12.06', criteria: 'Marked limitation in mental functioning despite treatment, OR documented extreme limitation in one area', docs: ['Psychologist or psychiatrist records', 'PTSD assessment (PCL-5 scores)', 'Documentation of triggers and functional impact', 'Medication and treatment history'] },
            { key: 'diabetes_complications', label: 'Diabetes Mellitus with Complications', keywords: ['diabetic neuropathy', 'diabetic nephropathy', 'diabetic retinopathy', 'diabetes with', 'type 1 diabetes complications', 'type 2 diabetes complications'], listing: '9.00', criteria: 'Must have a complication affecting another body system — neuropathy, nephropathy, retinopathy, or vascular disease at listing level', docs: ['Endocrinologist records', 'A1C history', 'Documentation of complication (EMG for neuropathy, renal labs, eye exam reports)', 'Medication list'] },
            { key: 'fibromyalgia', label: 'Fibromyalgia', keywords: ['fibromyalgia', 'fibromyositis', 'chronic widespread pain'], listing: 'SSR 12-2p', criteria: 'At least 11 positive tender points OR widespread pain with 6+ other symptoms, PLUS marked limitation in functioning', docs: ['Rheumatologist diagnosis (primary treating physician must diagnose)', 'Tender point examination records', 'Documentation of fibro symptoms (fatigue, cognitive problems, sleep disturbance)', 'RFC questionnaire from rheumatologist', 'Records showing repeated medical visits (6+ months)'] },
        ];
    }

    // ── Public API ────────────────────────────────────────────────────────

    /**
     * Match a free-text condition description against all known conditions.
     * Returns { cal: [...matches], blueBook: [...matches] }
     */
    checkCondition(text) {
        if (!text) return { cal: [], blueBook: [] };
        const t = text.toLowerCase();
        const cal = this.compassionateAllowances.filter(c => c.keywords.some(kw => t.includes(kw)));
        const blueBook = this.blueBookListings.filter(c => c.keywords.some(kw => t.includes(kw)));
        return { cal, blueBook };
    }

    /**
     * Build a plain-text documentation checklist for display.
     */
    buildDocumentationChecklist(matches) {
        const lines = [];
        for (const c of matches.cal) {
            lines.push(`⚡ COMPASSIONATE ALLOWANCE — ${c.label} (Listing ${c.listing})`);
            lines.push('   Required documentation:');
            c.docs.forEach(d => lines.push(`   • ${d}`));
            lines.push('');
        }
        for (const c of matches.blueBook) {
            lines.push(`✅ BLUE BOOK LISTING — ${c.label} (Listing ${c.listing})`);
            lines.push(`   Approval criteria: ${c.criteria}`);
            lines.push('   Required documentation:');
            c.docs.forEach(d => lines.push(`   • ${d}`));
            lines.push('');
        }
        return lines.join('\n');
    }

    /**
     * Use the DualAIMedicalTeam to generate a detailed medical documentation
     * support letter for the matched conditions.
     *
     * Returns the AI response text (or null if AI not available).
     */
    async generateAIDocumentationPacket(matches, userData) {
        const ai = window.dualAIMedicalTeam;
        if (!ai || !ai.getTeamResponse) return null;

        const conditionNames = [
            ...matches.cal.map(c => c.label),
            ...matches.blueBook.map(c => c.label)
        ].join(', ');

        const allDocs = [
            ...matches.cal.flatMap(c => c.docs),
            ...matches.blueBook.flatMap(c => c.docs)
        ];
        const uniqueDocs = [...new Set(allDocs)];

        const criteria = [
            ...matches.cal.map(c => `${c.label}: SSA Compassionate Allowance — automatically fast-tracked`),
            ...matches.blueBook.map(c => `${c.label}: SSA Blue Book Listing ${c.listing} — approval criteria: ${c.criteria}`)
        ].join('\n');

        const prompt = `You are a disability documentation specialist. Write a professional medical documentation support letter that a patient can give to their doctor to help gather the right evidence for an SSDI claim.

Patient name: ${userData.name || '[Patient Name]'}
Date of Birth: ${userData.dob || '[DOB]'}
Conditions identified: ${conditionNames}

SSA listing criteria that must be documented:
${criteria}

Required documentation items:
${uniqueDocs.map(d => `- ${d}`).join('\n')}

Write the letter addressed "To the Treating Physician" explaining:
1. That this patient is applying for SSDI disability benefits
2. Which specific SSA listing(s) their condition(s) fall under
3. EXACTLY what the doctor needs to document to meet the SSA criteria
4. A numbered checklist of every document and test result needed
5. How to complete the RFC (Residual Functional Capacity) questionnaire to support this claim
6. Any specific measurements or scores SSA looks for (e.g., ejection fraction, FEV1, CD4 count, seizure frequency)

Be specific, professional, and thorough. Format clearly with headers. This letter will directly help the patient qualify for benefits.`;

        try {
            const result = await ai.getTeamResponse(prompt, userData);
            return result.response || null;
        } catch (e) {
            console.error('[CoveredConditions] AI error:', e);
            return null;
        }
    }
}

// Expose globally
window.coveredConditionsHelper = new CoveredConditionsHelper();
