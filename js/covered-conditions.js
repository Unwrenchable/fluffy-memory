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

        // Build and expose the rare conditions database
        this.rareConditions = this.buildRareConditionsDatabase();
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

    // ── Rare Disease Database ─────────────────────────────────────────────
    // Conditions that are real, disabling, and covered by SSA — but often
    // denied because examiners are unfamiliar with them. Each entry includes:
    //   keywords      — terms to match against extracted diagnosis text
    //   ssaStrategy   — how SSA evaluates this condition
    //   listing       — closest Blue Book listing (or 'MED-VOC' for grid rules)
    //   coverageAlert — the specific challenge for this condition
    //   doctorTalkingPoints — what the doctor MUST document for SSA
    //   ssaTalkingPoints    — what the patient/advocate must tell the SSA examiner
    //   docs          — required evidence items
    //   specialists   — who to see

    buildRareConditionsDatabase() {
        return [
            {
                key: 'acromegaly',
                label: 'Acromegaly (Growth Hormone Excess)',
                keywords: ['acromegaly', 'growth hormone excess', 'gigantism', 'pituitary adenoma', 'igf-1 elevated'],
                ssaStrategy: 'Evaluated under Listing 9.00 (Endocrine) combined with affected body systems — joints (1.00), cardiovascular (4.00), neurological (11.00), or visual (2.00). SSA examiners often do not recognise acromegaly by name; the claim must be framed around its systemic effects.',
                listing: '9.00 + affected system listing',
                coverageAlert: '⚠️ HIGH DENIAL RISK — SSA examiners frequently unfamiliar with acromegaly. Must document each body system affected, not just the hormone level. Frame claim around arthropathy, carpal tunnel, cardiomegaly, sleep apnea, or visual field defects caused by the adenoma.',
                doctorTalkingPoints: [
                    'Document IGF-1 levels and GH levels (elevated baseline AND failure to suppress on oral glucose tolerance test)',
                    'List every organ system affected: joints, heart, colon, airway, vision, nerves',
                    'Measure and document carpal tunnel severity (nerve conduction study)',
                    'Note sleep apnea severity (sleep study results)',
                    'Document any visual field defects from pituitary adenoma pressing on optic chiasm (formal perimetry)',
                    'Describe arthropathy limitations with specific range-of-motion measurements',
                    'Note cardiovascular complications (cardiomegaly, hypertension, arrhythmia)',
                    'Complete Physical RFC: how many hours can patient sit/stand/walk, lifting capacity, hand/finger limitations',
                    'State explicitly: "This patient cannot sustain an 8-hour workday due to [specific limitations]"'
                ],
                ssaTalkingPoints: [
                    'Tell SSA: "Acromegaly is evaluated under Section 9.00 of the Blue Book as an endocrine disorder, PLUS the specific body system listings it affects"',
                    'Emphasize: the condition causes permanent joint damage, cardiovascular damage, and neurological damage even when hormone levels are controlled',
                    'If denied: cite SSA POMS DI 24505.015 — multiple impairments evaluated in combination',
                    'Request a Medical Expert (ME) who has endocrinology experience if examiner is unfamiliar'
                ],
                docs: [
                    'Endocrinologist records (minimum 12 months)',
                    'IGF-1 and GH lab results with reference ranges',
                    'Oral glucose tolerance test (GH suppression test) results',
                    'MRI of pituitary with measurements of adenoma',
                    'Formal visual field perimetry test results',
                    'Sleep study (polysomnography) if sleep apnea present',
                    'Nerve conduction study for carpal tunnel',
                    'Echocardiogram if cardiomegaly suspected',
                    'Joint X-rays showing arthropathy',
                    'RFC questionnaire completed by endocrinologist AND primary care physician'
                ],
                specialists: ['Endocrinologist', 'Neurosurgeon (pituitary)', 'Ophthalmologist', 'Cardiologist', 'Rheumatologist']
            },
            {
                key: 'ehlers_danlos',
                label: 'Ehlers-Danlos Syndrome (EDS)',
                keywords: ['ehlers-danlos', 'ehlers danlos', 'eds', 'hypermobile eds', 'connective tissue disorder', 'joint hypermobility syndrome'],
                ssaStrategy: 'Evaluated under Musculoskeletal (1.00) and/or cardiovascular (4.00 for vascular EDS). Hypermobile EDS has no genetic marker — SSA must rely on clinical criteria and RFC. Vascular EDS with documented vessel involvement is stronger.',
                listing: '1.00 / 4.00 (vascular EDS)',
                coverageAlert: '⚠️ HIGH DENIAL RISK — EDS is frequently dismissed as "just flexible joints." The claim must be built on functional limitations: dislocations frequency, chronic pain level, POTS co-occurrence, fatigue, and inability to sustain any posture. Lack of a genetic test (for hEDS) makes documentation from clinicians critical.',
                doctorTalkingPoints: [
                    'Document Beighton Score and Brighton Criteria in detail',
                    'List frequency of joint dislocations/subluxations per week and which joints',
                    'Describe pain levels and documentation of chronic pain treatment',
                    'Note any co-occurring POTS (tilt table test results)',
                    'Document fatigue severity using a validated scale (e.g., Fatigue Severity Scale)',
                    'If vascular EDS: genetic test result (COL3A1), imaging of vessels',
                    'Complete Physical RFC: sitting/standing tolerance in minutes, ability to grip/handle',
                    'Note inability to maintain a static position due to joint instability',
                    'State: "Patient cannot perform sustained work activity due to unpredictable dislocations, chronic pain, and autonomic dysfunction"'
                ],
                ssaTalkingPoints: [
                    'EDS is evaluated under Section 1.00 (Musculoskeletal) — document each joint affected',
                    'If POTS is co-occurring, it\'s also evaluated under 4.00 (Cardiovascular) — cite both',
                    'Hypermobile EDS has no genetic marker — SSA must use clinical diagnosis per EDNF and Malfait 2017 criteria',
                    'Request that all impairments be evaluated in combination under POMS DI 24505.015',
                    'If denied: obtain RFC from rheumatologist or EDS specialist explicitly stating work limitations'
                ],
                docs: [
                    'Rheumatologist or geneticist diagnosis letter',
                    'Beighton Score documentation from physical examination',
                    'Dislocation log (dates, joints, treatment)',
                    'Pain management records',
                    'Tilt table test results if POTS is present',
                    'Genetic test results (for vascular, classical, kyphoscoliotic EDS)',
                    'Physical therapy evaluation with functional assessment',
                    'RFC questionnaire from treating physician',
                    'Echocardiogram if cardiac involvement'
                ],
                specialists: ['Rheumatologist', 'Medical Geneticist', 'Cardiologist (for vascular EDS)', 'Physical Medicine & Rehabilitation']
            },
            {
                key: 'pots',
                label: 'POTS (Postural Orthostatic Tachycardia Syndrome)',
                keywords: ['pots', 'postural orthostatic tachycardia', 'postural tachycardia syndrome', 'dysautonomia', 'orthostatic intolerance'],
                ssaStrategy: 'Evaluated under Cardiovascular (4.00) for dysrhythmia and functional limitation, and/or under other affected systems. The key is documenting that upright posture triggers heart rate spikes that prevent sustained standing or walking.',
                listing: '4.05 / MED-VOC grid',
                coverageAlert: '⚠️ HIGH DENIAL RISK — POTS is invisible, often affects young women, and is frequently dismissed. SSA examiners may not be familiar. Document the tilt table test result and the specific functional impact: cannot stand for more than X minutes without symptoms.',
                doctorTalkingPoints: [
                    'Document tilt table test: baseline vs. upright heart rate (must show ≥30 bpm increase within 10 minutes, or ≥40 bpm in patients under 19)',
                    'Note symptoms triggered by upright posture: palpitations, lightheadedness, near-syncope, syncope',
                    'Document how long patient can stand/walk before symptoms appear',
                    'Note impact on cognitive function ("brain fog") — cognitive testing if available',
                    'List all medications tried and response',
                    'Document co-occurring conditions (EDS, MCAS, small fiber neuropathy)',
                    'RFC: standing/walking limited to X minutes at a time; patient must be able to lie down during the day',
                    'State: "Patient is unable to maintain upright posture for prolonged periods required for most work"'
                ],
                ssaTalkingPoints: [
                    'POTS is evaluated under Section 4.05 for recurrent arrhythmias',
                    'Inability to stand = inability to perform most jobs — frame around functional capacity',
                    'If SSA denies under cardiovascular, argue under neurological (autonomic neuropathy, 11.00)',
                    'Combine with any co-occurring condition (EDS, fibromyalgia, MCAS) for combined impairment argument'
                ],
                docs: [
                    'Tilt table test results from cardiologist or autonomic specialist',
                    'Holter monitor or event monitor showing orthostatic tachycardia',
                    'Cardiologist or autonomic neurologist records',
                    'Symptom diary showing daily functional impact',
                    'Medication list and response to treatment',
                    'RFC from treating cardiologist or autonomic specialist',
                    'Any neuropsychological testing documenting cognitive impairment'
                ],
                specialists: ['Autonomic Neurologist', 'Cardiologist (electrophysiology)', 'Dysautonomia specialist']
            },
            {
                key: 'mast_cell',
                label: 'Mast Cell Activation Syndrome (MCAS)',
                keywords: ['mast cell activation', 'mcas', 'mast cell disorder', 'mastocytosis', 'systemic mastocytosis'],
                ssaStrategy: 'No direct Blue Book listing. Evaluated under affected body systems: skin (8.00), cardiovascular (4.00 — anaphylaxis/syncope), gastrointestinal (5.00), respiratory (3.00). The unpredictability of reactions and anaphylaxis risk is key.',
                listing: 'Multiple systems — MED-VOC grid',
                coverageAlert: '⚠️ VERY HIGH DENIAL RISK — MCAS lacks a single recognisable listing. Must document every system affected and the life-threatening unpredictability of reactions. Anaphylaxis history is powerful evidence. Environmental triggers limiting work settings are critical.',
                doctorTalkingPoints: [
                    'Document diagnosis criteria: elevated tryptase during episode AND response to antihistamine/mast cell stabilizer treatment',
                    'List all documented anaphylactic episodes with dates, triggers, and ER records',
                    'Document all organ systems involved (skin, GI, cardiac, respiratory, neurological)',
                    'List all environmental and food triggers that would occur in a normal workplace',
                    'Describe impact on ability to leave home, exposure to chemicals, temperature changes',
                    'RFC: work environment restrictions (no fragrances, chemicals, temperature extremes, physical exertion)',
                    'State: "Patient cannot safely work in any standard workplace environment due to anaphylaxis risk"'
                ],
                ssaTalkingPoints: [
                    'Argue under multiple listings simultaneously (multi-system impairment)',
                    'Emergency room records for anaphylaxis episodes are powerful — obtain all of them',
                    'Environmental restrictions that rule out all jobs are critical for the vocational argument',
                    'If denied: the vocational expert at hearing must address whether any job exists without fragrance, chemical, or temperature exposure'
                ],
                docs: [
                    'Allergist or immunologist diagnosis records',
                    'Serum tryptase levels (basal and during episode)',
                    'Urine histamine metabolites',
                    'All ER records for anaphylaxis episodes',
                    'List of documented triggers',
                    'Treatment response records (antihistamines, epinephrine use)',
                    'RFC with specific environmental restrictions from treating physician'
                ],
                specialists: ['Allergist/Immunologist', 'Hematologist (for systemic mastocytosis)', 'Gastroenterologist']
            },
            {
                key: 'sarcoidosis',
                label: 'Sarcoidosis',
                keywords: ['sarcoidosis', 'sarcoid', 'pulmonary sarcoidosis', 'cardiac sarcoidosis', 'neurosarcoidosis'],
                ssaStrategy: 'Evaluated under affected organ system: pulmonary (3.00), cardiac (4.00), neurological (11.00), or visual (2.00). Pulmonary sarcoidosis is most common claim — must meet FEV1/DLCO thresholds or demonstrate sustained functional limitation.',
                listing: '3.02 / 4.00 / 11.00',
                coverageAlert: '⚠️ SSA often undervalues sarcoidosis because it can be stable or remit. Document the progressive or treatment-resistant nature, all organ systems affected, and medication side effects (especially corticosteroid side effects which are themselves disabling).',
                doctorTalkingPoints: [
                    'Document all organs affected with biopsy or imaging confirmation',
                    'For pulmonary: spirometry (FEV1, FVC, DLCO) with interpretation',
                    'For cardiac: Holter monitor, echocardiogram, cardiac MRI showing granulomas',
                    'For neuro: MRI of brain/spine, CSF analysis, neurology records',
                    'Document steroid and immunosuppressant side effects that independently limit function',
                    'Note fatigue severity — sarcoidosis fatigue is often the most disabling symptom',
                    'RFC with specific limitations on exertion, exposure to dust/fumes, standing/walking'
                ],
                ssaTalkingPoints: [
                    'Each affected organ system has its own Blue Book listing — argue under all relevant ones',
                    'Long-term corticosteroid use itself causes osteoporosis, diabetes, weight gain — document these secondary conditions',
                    'Fatigue alone, if severe enough, may meet Listing 3.09 (chronic pulmonary hypertension) if that develops'
                ],
                docs: [
                    'Biopsy report confirming non-caseating granulomas',
                    'Pulmonary function tests (PFT) with DLCO',
                    'Chest CT scan',
                    'Pulmonologist records',
                    'Cardiac MRI if cardiac involvement',
                    'Brain/spine MRI if neurosarcoidosis',
                    'Medication list with duration and side effects',
                    'RFC from pulmonologist or treating specialist'
                ],
                specialists: ['Pulmonologist', 'Cardiologist', 'Neurologist', 'Ophthalmologist', 'Rheumatologist']
            },
            {
                key: 'marfan',
                label: 'Marfan Syndrome',
                keywords: ['marfan syndrome', "marfan's syndrome", 'marfan', 'fbn1 mutation', 'connective tissue marfan'],
                ssaStrategy: 'Evaluated under cardiovascular (4.00 — aortic root dilation, mitral valve prolapse), musculoskeletal (1.00 — scoliosis, joint laxity), or visual (2.00 — lens dislocation). Aortic aneurysm history is strongly weighted.',
                listing: '4.00 / 1.00 / 2.00',
                coverageAlert: '⚠️ Risk of sudden death from aortic dissection is itself a documented limitation — SSA must consider safety restrictions on physical exertion that rule out most physical work.',
                doctorTalkingPoints: [
                    'Document FBN1 genetic test result',
                    'Echocardiogram with aortic root measurements (serial measurements showing progression)',
                    'Document aortic aneurysm size and surgical history if applicable',
                    'Mitral valve regurgitation severity',
                    'Ophthalmology exam (ectopia lentis)',
                    'Scoliosis Cobb angle from spine X-ray',
                    'Restriction on physical exertion — document maximum safe activity level',
                    'RFC: no heavy lifting, no Valsalva maneuver, restricted from strenuous activity'
                ],
                ssaTalkingPoints: [
                    'Physical exertion restrictions that prevent even sedentary work (repeated Valsalva) are key',
                    'Aortic root dilation ≥4.5 cm or prior dissection repair significantly strengthens claim',
                    'Vision impairment from ectopia lentis evaluated under Listing 2.02'
                ],
                docs: [
                    'Genetic testing (FBN1 gene mutation)',
                    'Serial echocardiograms with aortic measurements',
                    'Cardiothoracic surgery records if applicable',
                    'Ophthalmology exam records',
                    'Spine X-rays with Cobb angle measurements',
                    'Cardiologist RFC with specific exertion restrictions',
                    'Medical records from cardiology (ongoing management)'
                ],
                specialists: ['Cardiologist (Marfan specialist)', 'Medical Geneticist', 'Ophthalmologist', 'Orthopedic Surgeon']
            },
            {
                key: 'pans_pandas',
                label: 'PANS / PANDAS',
                keywords: ['pans', 'pandas', 'pediatric acute-onset neuropsychiatric', 'strep-triggered ocd', 'autoimmune encephalitis ocd'],
                ssaStrategy: 'Evaluated under mental health listings (12.00) — OCD (12.06), anxiety (12.06), or neurodevelopmental (12.11). The autoimmune encephalitis angle may also be evaluated under neurological (11.00). SSA examiners frequently unfamiliar.',
                listing: '12.06 / 11.00',
                coverageAlert: '⚠️ VERY HIGH DENIAL RISK — PANS/PANDAS is controversial in SSA and insurance contexts. Must build the case on documented functional limitations, not just the diagnosis. Psychiatric records, school/work records showing sudden deterioration, and treating physician statements are essential.',
                doctorTalkingPoints: [
                    'Document onset — sudden, acute behavioral change following infection',
                    'PANDAS: positive strep culture or anti-strep titers (ASO, anti-DNase B) at time of flare',
                    'PANS: rule-out workup for other causes in medical records',
                    'Neuropsychiatric evaluation documenting OCD severity, tic severity (YBOCS scale, YGTSS scale)',
                    'Document cognitive regression: school records, neuropsychological testing',
                    'List all treatments tried (IVIG, plasmapheresis, antibiotics, immunomodulators) and response',
                    'RFC: mental limitations — concentration, social interaction, ability to handle changes in routine',
                    'State: "Patient\'s symptoms fluctuate unpredictably and prevent sustained work activity"'
                ],
                ssaTalkingPoints: [
                    'Frame under 12.06 (OCD/anxiety) with marked limitations in at least 2 areas of mental functioning',
                    'The unpredictability and episodic nature of flares supports inability to maintain regular work attendance',
                    'If seeking adult benefits: document history since childhood to establish the chronic nature of the condition'
                ],
                docs: [
                    'Pediatric (or adult) neuropsychiatric specialist records',
                    'Strep culture results or anti-strep titers during flares (for PANDAS)',
                    'YBOCS (OCD scale) and YGTSS (tic scale) scores',
                    'Neuropsychological testing results',
                    'School records showing functional decline',
                    'IVIG or plasmapheresis treatment records',
                    'Mental health RFC from treating psychiatrist or neurologist',
                    'Documentation of all medication trials and response'
                ],
                specialists: ['Pediatric Neuropsychiatrist', 'Immunologist', 'Neurologist (PANS specialist)']
            },
            {
                key: 'mold_illness',
                label: 'Chronic Inflammatory Response Syndrome (CIRS / Mold Illness)',
                keywords: ['cirs', 'mold illness', 'toxic mold', 'chronic inflammatory response syndrome', 'biotoxin illness', 'ertl 11', 'mold toxicity'],
                ssaStrategy: 'No direct listing. Evaluate under affected systems: neurological, respiratory, immune. Must use functional approach — what the patient cannot do, not just diagnosis. Extremely difficult to prove to SSA without specialist support.',
                listing: 'MED-VOC grid (functional approach)',
                coverageAlert: '⚠️ EXTREMELY HIGH DENIAL RISK — SSA and most insurance companies do not formally recognize CIRS. Claim must be built entirely on documented symptoms and functional limitations — cognitive impairment (neuropsychological testing), respiratory limitation (PFT), and inability to tolerate normal environments.',
                doctorTalkingPoints: [
                    'Document ERMI/HERTSMI-2 test of home showing mold contamination (if possible)',
                    'Visual Contrast Sensitivity (VCS) test results',
                    'HLA-DR genotyping (shows mold susceptibility)',
                    'Inflammatory markers: TGF-beta1, C4a, MMP-9, VEGF levels',
                    'Neuropsychological testing documenting cognitive deficits',
                    'Pulmonary function tests',
                    'Brain MRI (NeuroQuant volumetric analysis if available)',
                    'RFC focused on functional limitations — not on the diagnosis label',
                    'List all environments that trigger symptoms, ruling out standard workplace settings'
                ],
                ssaTalkingPoints: [
                    'Do NOT lead with the CIRS diagnosis — SSA will immediately be skeptical',
                    'Lead with the documented symptoms: cognitive impairment (neuropsych scores), respiratory limitation, fatigue',
                    'Frame as "multiple overlapping impairments" — each documented, each contributing to functional limitation',
                    'An experienced disability attorney is strongly recommended for CIRS claims'
                ],
                docs: [
                    'CIRS specialist records (Shoemaker protocol preferred)',
                    'Neuropsychological testing results',
                    'Visual Contrast Sensitivity test printout',
                    'HLA-DR test result',
                    'Inflammatory biomarker lab panel',
                    'Pulmonary function tests',
                    'Brain MRI (with NeuroQuant if available)',
                    'RFC from treating physician focusing on functional limitations'
                ],
                specialists: ['CIRS/Shoemaker Protocol Physician', 'Neuropsychologist', 'Pulmonologist', 'Immunologist']
            },
            {
                key: 'small_fiber_neuropathy',
                label: 'Small Fiber Neuropathy (SFN)',
                keywords: ['small fiber neuropathy', 'sfn', 'small fiber polyneuropathy', 'intraepidermal nerve fiber density'],
                ssaStrategy: 'Evaluated under Neurological (11.00) — specifically peripheral neuropathy (11.14). The key diagnostic test is skin punch biopsy showing reduced intraepidermal nerve fiber density (IENFD).',
                listing: '11.14',
                coverageAlert: '⚠️ HIGH DENIAL RISK — SSA examiners may not be familiar with SFN as it does not appear on standard nerve conduction studies (which only test large fibers). Must document that nerve conduction study can be NORMAL in SFN and that punch biopsy is the gold-standard test.',
                doctorTalkingPoints: [
                    'Explicitly state in records: "EMG/NCS is normal in small fiber neuropathy — this is expected and does NOT rule out the diagnosis"',
                    'Skin punch biopsy result: IENFD measurement vs. age/sex-matched normal values',
                    'Quantitative sensory testing (QST) results',
                    'Document pain severity: burning, tingling, allodynia — use validated pain scale (NRS, BPI)',
                    'Note autonomic features: POTS, gastroparesis, bladder dysfunction',
                    'Document impact on sleep, concentration, and activity tolerance',
                    'RFC: limitations from chronic neuropathic pain on standing, walking, handling, fingering'
                ],
                ssaTalkingPoints: [
                    'Listing 11.14 covers peripheral neuropathy — SFN qualifies',
                    'A normal EMG/NCS does NOT mean the patient is fine — tell SSA this explicitly',
                    'The punch biopsy is peer-reviewed and accepted by neurology — submit supporting literature if examiner challenges it'
                ],
                docs: [
                    'Skin punch biopsy report with IENFD measurements and laboratory reference ranges',
                    'Neurologist records',
                    'Quantitative sensory testing (QST)',
                    'EMG/NCS report (even if normal — note the normal is expected)',
                    'Pain diary or validated pain questionnaire',
                    'Autonomic testing if POTS or other autonomic features present',
                    'RFC from neurologist'
                ],
                specialists: ['Neurologist (peripheral nerve specialist)', 'Autonomic Neurologist', 'Pain Management']
            },
            {
                key: 'chronic_lyme',
                label: 'Chronic Lyme Disease / Post-Treatment Lyme Disease Syndrome (PTLDS)',
                keywords: ['chronic lyme', 'post-lyme', 'post treatment lyme', 'ptlds', 'lyme disease chronic', 'lyme encephalopathy'],
                ssaStrategy: 'No direct listing. Evaluated under affected body systems: neurological (11.00 — encephalopathy), musculoskeletal (1.00 — arthritis), cardiac (4.00). The controversy around "chronic Lyme" means SSA will scrutinize heavily — must document objective findings.',
                listing: 'MED-VOC grid + 11.00/1.00/4.00',
                coverageAlert: '⚠️ VERY HIGH DENIAL RISK — "Chronic Lyme disease" is medically controversial. Build claim on objective documented findings — neuropsychological testing results, MRI lesions, cardiac records — NOT on the Lyme diagnosis label alone.',
                doctorTalkingPoints: [
                    'Document positive Lyme serology (Western blot) and initial diagnosis',
                    'Neuropsychological testing showing cognitive impairment',
                    'MRI showing white matter changes if present',
                    'Cardiac records if Lyme carditis present',
                    'Joint X-rays if Lyme arthritis present',
                    'Sleep study if fatigue/sleep disorder present',
                    'RFC: cognitive limitations, physical limitations from fatigue and joint pain',
                    'Frame as "post-infectious autoimmune syndrome" rather than "chronic Lyme" in RFC language'
                ],
                ssaTalkingPoints: [
                    'Lead with objective test findings — neuropsych scores, MRI, cardiac records',
                    'Avoid the phrase "chronic Lyme" with SSA — use "post-infectious neurological syndrome" or "post-treatment Lyme disease syndrome"',
                    'Combine all documented impairments for combined-impairment argument'
                ],
                docs: [
                    'Original positive Lyme test (ELISA + Western Blot)',
                    'Treatment records (antibiotic course)',
                    'Neuropsychological evaluation',
                    'Brain MRI',
                    'Rheumatologist or infectious disease specialist records',
                    'Cardiac monitoring records if cardiac involvement',
                    'RFC from treating neurologist or internist'
                ],
                specialists: ['Infectious Disease Specialist', 'Neurologist', 'Rheumatologist', 'Cardiologist']
            },
            {
                key: 'myalgic_encephalomyelitis',
                label: 'Myalgic Encephalomyelitis / Chronic Fatigue Syndrome (ME/CFS)',
                keywords: ['me/cfs', 'mecfs', 'myalgic encephalomyelitis', 'chronic fatigue syndrome', 'cfs', 'post-exertional malaise', 'systemic exertion intolerance'],
                ssaStrategy: 'SSA published SSR 14-1p specifically for ME/CFS. Evaluated under the listing that best matches functional limitations: fatigue with neurological symptoms (11.00), immune dysfunction, or MED-VOC grid. Post-exertional malaise (PEM) is the hallmark symptom.',
                listing: 'SSR 14-1p / MED-VOC grid',
                coverageAlert: '⚠️ HIGH DENIAL RISK — ME/CFS is frequently dismissed as psychological. SSA ruling SSR 14-1p mandates that ME/CFS be taken seriously. Document PEM with 2-day CPET (cardiopulmonary exercise testing) — the hallmark objective test. Cite SSR 14-1p in every submission.',
                doctorTalkingPoints: [
                    'Document that patient meets International Consensus Criteria (ICC) or Institute of Medicine criteria for ME/CFS',
                    'Document post-exertional malaise (PEM): worsening of all symptoms after even minor activity',
                    'Two-day CPET (cardiopulmonary exercise testing done on consecutive days): shows drop in VO2max on day 2 — this is objective proof of PEM',
                    'Cognitive testing documenting processing speed and memory deficits',
                    'Tilt table test if POTS is co-occurring',
                    'Sleep study (non-restorative sleep)',
                    'RFC: very limited activity tolerance, must lie down during day, cannot sustain any consistent work schedule',
                    'State: "Any increase in activity beyond minimal exertion causes 24-72 hour relapse"'
                ],
                ssaTalkingPoints: [
                    'Cite SSA Social Security Ruling SSR 14-1p — SSA\'s own ruling on ME/CFS — in every submission',
                    'The 2-day CPET is peer-reviewed objective evidence — if SSA questions ME/CFS, this is the response',
                    'PEM means that a good day cannot be used to infer work capacity — explain "boom-bust" cycle to SSA',
                    'ME/CFS patients often appear well at a single appointment — explain that examinations do not capture day-to-day variability'
                ],
                docs: [
                    'Physician diagnosis letter explicitly citing ICC or IOM criteria for ME/CFS',
                    'Two-day cardiopulmonary exercise test (CPET) results',
                    'Neuropsychological testing',
                    'Tilt table test if POTS present',
                    'Sleep study',
                    'Symptom diary / activity log showing PEM episodes',
                    'RFC from treating physician with very specific functional limitations',
                    'Copy of SSR 14-1p to include with submission'
                ],
                specialists: ['ME/CFS Specialist Internist', 'Autonomic Neurologist', 'Neuropsychologist', 'Sleep Medicine']
            },
            {
                key: 'interstitial_cystitis',
                label: 'Interstitial Cystitis (IC) / Bladder Pain Syndrome',
                keywords: ['interstitial cystitis', 'bladder pain syndrome', 'ic/bps', 'painful bladder', 'hunner lesion'],
                ssaStrategy: 'No direct listing. Evaluated under genitourinary dysfunction (6.00) or chronic pain framework. The need for frequent bathroom breaks (often every 15-30 minutes) is an objective functional limitation that most jobs cannot accommodate.',
                listing: '6.00 / MED-VOC grid',
                coverageAlert: '⚠️ HIGH DENIAL RISK — IC is underrecognized. The vocational argument (frequent unscheduled bathroom breaks employers won\'t accommodate) is often stronger than the medical listing argument.',
                doctorTalkingPoints: [
                    'Document cystoscopy findings (Hunner lesions, glomerulations) if present',
                    'Document urinary frequency: how many times per hour, including at night',
                    'Pain severity with validated scale (O\'Leary-Sant questionnaire scores)',
                    'List all treatments tried and failed',
                    'RFC: must have immediate bathroom access, frequency of breaks, impact of pain on concentration and sustained sitting'
                ],
                ssaTalkingPoints: [
                    'The vocational argument is key: if patient must use the restroom every 15-30 minutes, a VE (vocational expert) must testify whether any job tolerates that',
                    'Combine with pain and sleep disturbance for combined impairment argument'
                ],
                docs: [
                    'Urologist or urogynecologist records',
                    'Cystoscopy report',
                    'Bladder diary (days of frequency logged)',
                    'O\'Leary-Sant IC questionnaire scores',
                    'Treatment records (hydrodistension, Elmiron, intravesical therapy)',
                    'RFC from urologist specifically noting bathroom frequency requirements'
                ],
                specialists: ['Urologist', 'Urogynecologist', 'Pelvic Pain Specialist']
            },
            {
                key: 'autoimmune_encephalitis',
                label: 'Autoimmune Encephalitis (Anti-NMDA, LGI1, CASPR2, etc.)',
                keywords: ['autoimmune encephalitis', 'anti-nmda receptor encephalitis', 'lgi1 encephalitis', 'caspr2', 'limbic encephalitis', 'autoimmune brain'],
                ssaStrategy: 'Evaluated under Neurological Listing 11.02 (epilepsy if seizures present), 12.02 (neurocognitive disorders), or 12.03 (schizophrenia spectrum if psychosis is primary). Antibody-confirmed autoimmune encephalitis is strong evidence.',
                listing: '11.02 / 12.02 / 12.03',
                coverageAlert: '⚠️ HIGH DENIAL RISK — autoimmune encephalitis is often confused with psychiatric illness and dismissed. Antibody test results are the critical differentiator. Document the autoimmune basis explicitly to prevent SSA from evaluating it as a psychiatric claim only.',
                doctorTalkingPoints: [
                    'Document specific antibody: anti-NMDAR, LGI1, CASPR2, GABA-B, AMPAR, etc.',
                    'CSF analysis results',
                    'MRI showing limbic or cortical changes',
                    'EEG results',
                    'Neuropsychological evaluation post-treatment',
                    'Residual deficits after treatment: cognitive, psychiatric, seizures',
                    'RFC for cognitive and behavioral limitations'
                ],
                ssaTalkingPoints: [
                    'Anti-NMDAR encephalitis is recognized by SSA — present the antibody result prominently',
                    'Frame residual deficits under neurocognitive disorder listing (12.02) if cognitive impairment persists',
                    'Combine cognitive, psychiatric, and neurological arguments'
                ],
                docs: [
                    'Antibody panel results (serum and CSF)',
                    'CSF analysis',
                    'Brain MRI',
                    'EEG results',
                    'Neurologist records',
                    'Neuropsychological testing (post-treatment)',
                    'Psychiatric evaluation records',
                    'RFC from neurologist'
                ],
                specialists: ['Neurologist (autoimmune/neuroimmunology)', 'Neuropsychologist', 'Psychiatrist']
            }
        ];
    }

    // Check extracted text for rare condition matches
    checkRareCondition(text) {
        if (!text) return [];
        const t = text.toLowerCase();
        return this.rareConditions.filter(c => c.keywords.some(kw => t.includes(kw)));
    }

    // Generate an AI-powered rare condition advocacy packet
    async generateRareConditionPacket(matches, userData) {
        const ai = window.dualAIMedicalTeam;
        if (!ai || !ai.getTeamResponse) return null;

        const names = matches.map(c => c.label).join(', ');
        const allDoctorPoints = matches.flatMap(c => c.doctorTalkingPoints.map(p => `[${c.label}] ${p}`));
        const allSSAPoints = matches.flatMap(c => c.ssaTalkingPoints.map(p => `[${c.label}] ${p}`));
        const allDocs = [...new Set(matches.flatMap(c => c.docs))];
        const alerts = matches.map(c => c.coverageAlert).join('\n');

        const prompt = `You are a disability documentation specialist with deep expertise in rare diseases and SSA disability claims.

Patient: ${userData.name || '[Patient Name]'}
Rare Condition(s) Identified: ${names}

COVERAGE CHALLENGE ALERTS:
${alerts}

KEY POINTS FOR THE TREATING DOCTOR TO DOCUMENT:
${allDoctorPoints.join('\n')}

KEY POINTS FOR THE SSA EXAMINER:
${allSSAPoints.join('\n')}

Write a comprehensive two-part letter:

PART 1 — LETTER TO TREATING PHYSICIAN (addressed "To the Treating Physician"):
Explain that this patient has a rare condition that SSA examiners may be unfamiliar with. Provide a clear, professional summary of:
- What the condition is and why it causes disability
- Exactly what objective findings must be documented
- Specific measurements and test results SSA requires
- How to complete the RFC questionnaire to maximize the claim
- Precise language to use (and avoid) in documentation

PART 2 — PATIENT ADVOCACY STATEMENT (for patient to submit to SSA):
A clear, factual statement the patient can submit that:
- Names the SSA listings that apply
- Explains why the condition meets or medically equals a listing
- Addresses common SSA examiner misconceptions about this condition
- References relevant SSA rulings or POMS provisions
- Lists all evidence being submitted

Use professional, precise medical and legal language. Be thorough — this patient's disability income depends on this documentation.`;

        try {
            const result = await ai.getTeamResponse(prompt, userData);
            if (!result || result.error) return null;
            return result.response || null;
        } catch (e) {
            console.error('[CoveredConditions] Rare condition AI error:', e);
            return null;
        }
    }
}

// Expose globally
window.coveredConditionsHelper = new CoveredConditionsHelper();
