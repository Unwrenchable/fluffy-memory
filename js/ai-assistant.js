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

        // ── SSDI vs SSI ──────────────────────────────────────────────────────
        if (input.includes('ssdi vs ssi') || input.includes('difference between ssdi') || input.includes('which one') || (input.includes('ssdi') && input.includes('ssi'))) {
            response = `**SSDI vs SSI — Key Differences**

**SSDI (Social Security Disability Insurance)**
- For workers who have paid Social Security taxes
- You need enough "work credits" (generally 40 credits, 20 earned in the last 10 years)
- Benefit amount is based on your lifetime earnings record
- After 24 months on SSDI, you automatically get Medicare

**SSI (Supplemental Security Income)**
- For people with limited income and resources — regardless of work history
- No work credits required (good for young adults or those with little work history)
- Maximum 2026 benefit: $967/month (individual)
- You may qualify for Medicaid immediately

**Can you get both?** Yes — called "concurrent benefits" — if you have low income and enough work credits.

**To check your work credits:** Call SSA at **1-800-772-1213** or log into your My Social Security account at ssa.gov.`;
            suggestions = [
                { action: 'start_questionnaire', text: 'Check My Eligibility', icon: '✅', description: 'Find out which program fits your situation' },
                { action: 'disability_strategy', text: 'How to Apply', icon: '📝', description: 'Step-by-step application guide' }
            ];

        // ── HOW TO APPLY / JUST STARTING ─────────────────────────────────────
        } else if (input.includes('how do i apply') || input.includes('just starting') || input.includes('first step') || input.includes('where do i start') || input.includes('where to begin') || (input.includes('apply') && input.includes('ssdi'))) {
            response = `**How to Apply for SSDI — Step by Step**

**3 Ways to Apply:**
- **Online:** ssa.gov/apply (fastest, available 24/7)
- **By phone:** Call **1-800-772-1213** (Mon–Fri 8am–7pm)
- **In person:** Visit your local Social Security office

**Before you apply, gather these:**
- Social Security number and birth certificate
- Medical records from all doctors treating your condition
- Names, addresses, and phone numbers of your doctors
- List of all medications with dosages
- Work history for the past 15 years
- Most recent W-2 or tax return

**The 5-Step Evaluation SSA Uses:**
1. Are you working? (earning over $1,550/month in 2026 = not disabled)
2. Is your condition "severe"? (must significantly limit work activities)
3. Does your condition meet a Blue Book listing?
4. Can you do your past work?
5. Can you do any other work given your age, education, and skills?

**Important tip:** Describe your WORST days, not your best. Be specific about what you cannot do.

Apply at ssa.gov or call **1-800-772-1213**.`;
            suggestions = [
                { action: 'document_review', text: 'Document Checklist', icon: '📋', description: 'See exactly what you need' },
                { action: 'disability_strategy', text: 'Blue Book Listings', icon: '📖', description: 'See if your condition qualifies automatically' }
            ];

        // ── DENIED ───────────────────────────────────────────────────────────
        } else if (input.includes('denied') || input.includes('rejected') || input.includes('turned down') || input.includes('was denied')) {
            this.userContext.denialCount++;
            response = `**Don't Give Up — Being Denied Is Very Common**

About **67% of initial SSDI applications are denied.** But here's the important part: **most people who persist eventually win.** Approval rates improve significantly at each appeal level.

**Your 4-Level Appeals Process:**

**Level 1 — Reconsideration** *(file within 60 days of denial)*
- A different SSA reviewer re-examines your case
- Approval rate: ~10-15%
- File online at ssa.gov or call **1-800-772-1213**

**Level 2 — ALJ Hearing** *(most important level)*
- You appear before an Administrative Law Judge
- Approval rate: ~45-55%
- **This is where most people win — get an attorney before this step**

**Level 3 — Appeals Council**
- Reviews the ALJ's decision
- Approval rate: ~10%

**Level 4 — Federal Court**
- Sue in U.S. District Court
- Rarely needed but available

**⚠️ Critical:** You have **60 days from your denial letter** to file each appeal. Don't miss this deadline!

**Best move right now:** Request a disability attorney. They work on contingency — **no upfront cost, they only get paid if you win** (capped at 25% of back pay, max $7,200).`;
            suggestions = [
                { action: 'appeal_help', text: 'Start My Appeal', icon: '⚖️', description: 'File within 60 days of denial' },
                { action: 'find_advocate', text: 'Find a Disability Attorney', icon: '👨‍⚖️', description: 'No upfront cost — paid only if you win' },
                { action: 'document_review', text: 'Strengthen My Evidence', icon: '📄', description: 'What additional proof do I need?' }
            ];

        // ── APPEAL PROCESS ────────────────────────────────────────────────────
        } else if (input.includes('appeal') || input.includes('reconsideration') || input.includes('alj') || input.includes('hearing')) {
            response = `**The SSDI Appeals Process — 4 Levels**

**Level 1: Reconsideration** *(file within 60 days)*
- Request a fresh review by a different SSA examiner
- Submit any new medical evidence you have
- File at ssa.gov or call **1-800-772-1213**
- Approval rate: ~10-15%

**Level 2: ALJ Hearing** *(most critical step)*
- You present your case to an Administrative Law Judge in person or by video
- You can bring an attorney, witnesses, and new evidence
- Average wait: 12–18 months after request
- Approval rate: ~45-55% — **this is where most people win**
- **Get a disability attorney before this level**

**Level 3: Appeals Council**
- Council reviews whether the ALJ made legal errors
- Approval rate: ~10%
- Takes 12–18 months

**Level 4: Federal Court**
- File a civil lawsuit in U.S. District Court
- Rarely needed; consult an attorney

**Tips to strengthen your appeal:**
- Get a detailed RFC (Residual Functional Capacity) form from your doctor
- Include statements about your worst days, not your best
- Document how your condition prevents you from working full-time
- List ALL conditions — multiple conditions together can qualify even if each alone doesn't

To file: ssa.gov or **1-800-772-1213**`;
            suggestions = [
                { action: 'appeal_help', text: 'Generate Appeal Letter', icon: '✍️', description: 'Professional template for your appeal' },
                { action: 'find_advocate', text: 'Find Disability Attorney', icon: '👨‍⚖️', description: 'Contingency fee — no win, no fee' }
            ];

        // ── TIMELINE / HOW LONG ───────────────────────────────────────────────
        } else if (input.includes('how long') || input.includes('timeline') || input.includes('how much time') || input.includes('when will')) {
            response = `**SSDI Timeline — What to Expect**

**Initial Application**
- Processing time: 3–6 months
- Many cases take longer depending on your state and complexity

**If Denied — Appeals Timeline:**
- Reconsideration: +3–5 months
- ALJ Hearing: +12–18 months after requesting
- Appeals Council: +12–18 months

**Total if you go through all levels: 2–4 years** (this is why starting right and not giving up matters)

**Ways to Speed Things Up:**

⚡ **Compassionate Allowances (CAL)** — If you have a severe condition on SSA's list (like many cancers, ALS, early-onset Alzheimer's), you can get approved in **weeks, not months**. Check the full list at ssa.gov/compassionateallowances.

⚡ **TERI (Terminal Illness)** — If your condition is terminal, SSA flags it for priority processing.

⚡ **Dire Need** — If you're facing eviction, shutoff notices, or have no food/medicine, SSA can expedite your case.

**While you wait:**
- Apply for your state's Medicaid program (income-based, immediate)
- Check local food banks, utility assistance, and community health centers
- Some states offer general assistance programs

Call **1-800-772-1213** to ask about expediting your case.`;
            suggestions = [
                { action: 'disability_strategy', text: 'Compassionate Allowances List', icon: '⚡', description: 'Is your condition on the fast-track list?' },
                { action: 'financial_programs', text: 'Help While I Wait', icon: '🆘', description: 'Programs for immediate financial relief' }
            ];

        // ── DOCUMENTS / EVIDENCE ──────────────────────────────────────────────
        } else if (input.includes('document') || input.includes('records') || input.includes('evidence') || input.includes('what do i need')) {
            response = `**Documents You Need for SSDI**

**Personal Documents:**
- Social Security card or number
- Birth certificate (or proof of age)
- Proof of U.S. citizenship or lawful alien status
- W-2 forms or self-employment tax returns (last year)

**Medical Records (most important):**
- Records from ALL treating doctors for the past 12 months
- Hospital records, lab results, imaging (MRIs, X-rays, CT scans)
- Mental health treatment records if applicable
- All current medications with dosages
- Names, addresses, and phone numbers of all providers

**Work History:**
- Jobs held in the last 15 years
- Job duties and how your condition prevents you from doing them

**Key forms your doctor should complete:**
- **RFC (Residual Functional Capacity)** form — This is critical. It documents exactly what you CAN and CANNOT do (sit, stand, walk, lift, concentrate). SSA uses this heavily.
- **Medical Source Statement** — Your doctor's opinion on your limitations

**Pro tips:**
- Get records going back at least 12 months (SSA wants to see a history)
- Ask your doctor to write detailed notes — brief notes hurt your case
- Describe your WORST days in your own written statement
- Include a "Function Report" (SSA Form SSA-787) describing your daily limitations

Request your records from ssa.gov or call **1-800-772-1213**.`;
            suggestions = [
                { action: 'document_review', text: 'Analyze My Documents', icon: '🔍', description: 'Upload documents for AI review' },
                { action: 'paperwork_helper', text: 'RFC Explanation', icon: '📋', description: 'What an RFC is and how to get one' }
            ];

        // ── ATTORNEY / LAWYER ─────────────────────────────────────────────────
        } else if (input.includes('attorney') || input.includes('lawyer') || input.includes('legal help') || input.includes('representative')) {
            response = `**Should You Get a Disability Attorney?**

**Short answer: Yes — especially if you've been denied.**

**How disability attorneys work:**
- They work on **contingency** — you pay nothing upfront
- They only get paid if you WIN
- Fee is capped by law: 25% of your back pay, maximum $7,200
- Back pay is the money SSA owes you from when you first applied

**What a good disability attorney does:**
- Reviews your case for weaknesses
- Gathers additional medical evidence
- Prepares you for your ALJ hearing
- Cross-examines vocational experts at your hearing
- Knows which arguments work for which judges

**Where to find one:**
- **NOSSCR** (National Organization of Social Security Claimants' Representatives): nosscr.org
- **Disability Help Group**: 1-800-800-3332
- **Your state bar's lawyer referral service**
- Many disability law firms offer free consultations

**Non-attorney representatives** (also allowed by SSA) can be equally good and often cheaper — they're also capped at 25% / $7,200.

**Important:** Get representation **before your ALJ hearing** — that's when it matters most. You can represent yourself at reconsideration level.`;
            suggestions = [
                { action: 'find_advocate', text: 'Find a Disability Attorney', icon: '👨‍⚖️', description: 'Connect with a representative' },
                { action: 'appeal_help', text: 'Prepare My Case', icon: '📂', description: 'What to bring to your hearing' }
            ];

        // ── COMPASSIONATE ALLOWANCES / FAST TRACK ────────────────────────────
        } else if (input.includes('compassionate') || input.includes('fast track') || input.includes('terminal') || input.includes('teri') || input.includes('expedite')) {
            response = `**Compassionate Allowances — Fast-Track Approval**

SSA's Compassionate Allowances (CAL) program identifies conditions so severe that a quick review is sufficient for approval. These cases are approved in **weeks instead of months**.

**Over 250 qualifying conditions include:**
- Many cancers (especially late-stage or aggressive)
- ALS (Lou Gehrig's Disease)
- Early-onset Alzheimer's disease
- Parkinson's disease (advanced)
- Rare pediatric disorders
- Many rare diseases and cancers

**Check the full list at:** ssa.gov/compassionateallowances

**TERI (Terminal Illness) Cases:**
If your doctor has indicated your condition may be terminal, SSA flags your file for priority review — even if your condition isn't on the CAL list.

**How to flag your case:**
- On your application, clearly state if your condition is terminal or life-threatening
- Call SSA directly at **1-800-772-1213** and ask them to flag your case as TERI or CAL
- Have your doctor provide a letter confirming the severity

**Dire Need Expediting:**
Even outside of CAL/TERI, if you are:
- Facing eviction or homelessness
- Have no food or medicine
- Have a terminal condition
...SSA can expedite processing. Call **1-800-772-1213** and ask to speak with a supervisor.`;
            suggestions = [
                { action: 'disability_strategy', text: 'Check CAL List', icon: '⚡', description: 'Is my condition on the fast-track list?' },
                { action: 'start_questionnaire', text: 'Flag My Case as Urgent', icon: '🚨', description: 'Steps to expedite review' }
            ];

        // ── RFC ───────────────────────────────────────────────────────────────
        } else if (input.includes('rfc') || input.includes('residual functional') || input.includes('functional capacity')) {
            response = `**Residual Functional Capacity (RFC) — Why It's Critical**

The RFC is SSA's assessment of the most you can do despite your disability. It's often the deciding factor in disability cases.

**What RFC covers:**
- How long you can sit, stand, or walk in an 8-hour workday
- How much weight you can lift and carry
- Whether you can use your hands/fingers for fine motor tasks
- Your ability to concentrate, stay on task, and handle stress
- How often you'd miss work due to your condition ("off-task" time)
- Whether you need to lie down during the day

**Two types of RFC:**
- **Physical RFC** — for physical limitations
- **Mental RFC** — for psychological/cognitive limitations (depression, anxiety, PTSD, ADHD, etc.)

**How to get a strong RFC:**
1. Ask your treating physician to complete an RFC form (SSA Form SSA-4734 or a private version)
2. Make sure the form is **specific** — avoid vague statements like "patient has limitations"
3. Include: exact hours of sitting/standing, exact weights, frequency of bad days, need for breaks
4. A specialist's RFC carries more weight than a general practitioner's

**Key insight:** If your RFC shows you can't perform even sedentary (sit-down) work 8 hours/day 5 days/week, SSA should find you disabled.

Download RFC forms from ssa.gov or ask your doctor's office.`;
            suggestions = [
                { action: 'find_specialist', text: 'Find a Supportive Doctor', icon: '👨‍⚕️', description: 'Doctors familiar with disability documentation' },
                { action: 'document_review', text: 'Review My Medical Evidence', icon: '📄', description: 'Check what your records say' }
            ];

        // ── BLUE BOOK / CONDITIONS ────────────────────────────────────────────
        } else if (input.includes('blue book') || input.includes('listing') || input.includes('what conditions') || input.includes('qualify') || input.includes('conditions qualify')) {
            response = `**SSA Blue Book — Qualifying Conditions**

SSA's "Blue Book" (official name: Listing of Impairments) lists conditions that automatically qualify as disabling if you meet the specific criteria.

**Major categories:**
- **Musculoskeletal** (back problems, arthritis, amputation)
- **Cardiovascular** (heart failure, coronary artery disease)
- **Respiratory** (COPD, asthma, cystic fibrosis)
- **Neurological** (epilepsy, MS, Parkinson's, ALS)
- **Mental health** (depression, schizophrenia, PTSD, anxiety, autism)
- **Cancer** (many types and stages)
- **Immune system** (lupus, HIV/AIDS, inflammatory arthritis)
- **Digestive** (liver disease, IBD, short bowel syndrome)
- **Endocrine** (acromegaly — evaluated under multiple body systems)

**Important:** If your condition is NOT in the Blue Book, you can still qualify through:
- **Medical-Vocational Guidelines (Grid Rules)** — based on age, education, and RFC
- **Step 5 analysis** — SSA determines you can't do any jobs in the national economy

**Rare diseases tip:** Many rare conditions aren't in the Blue Book. Build your case on **functional limitations** (what you can't do), not just the diagnosis. Hire an attorney familiar with rare disease claims.

**View the full Blue Book:** ssa.gov/disability/professionals/bluebook/`;
            suggestions = [
                { action: 'disability_strategy', text: 'Check My Condition', icon: '🔍', description: 'See if my condition is listed' },
                { action: 'start_questionnaire', text: 'Assess My Eligibility', icon: '✅', description: 'Quick eligibility check' }
            ];

        // ── HOW MUCH MONEY ────────────────────────────────────────────────────
        } else if (input.includes('how much') || input.includes('benefit amount') || input.includes('monthly payment') || input.includes('how much will i')) {
            response = `**How Much Will I Receive from SSDI?**

**SSDI benefit amount** is based on your lifetime earnings history — specifically your Average Indexed Monthly Earnings (AIME).

- **Average SSDI benefit (2026):** ~$1,580/month
- **Maximum SSDI benefit (2026):** ~$4,018/month
- **Minimum:** Varies, but typically $300–$600/month for those with limited work history

**To find YOUR estimated benefit:**
- Log in to My Social Security at ssa.gov/myaccount
- Your Social Security Statement shows your estimated disability benefit
- Or call SSA at **1-800-772-1213**

**SSI amounts (2026):**
- Individual: $967/month maximum
- Couple (both disabled): $1,450/month maximum
- State supplements may add more (varies by state)

**Back pay:**
If approved, SSA pays you back to your "onset date" (when disability began), minus a 5-month waiting period for SSDI. This can mean thousands of dollars in a lump sum.

**Working while receiving SSDI — Trial Work Period:**
- You can test your ability to work for up to 9 months
- Earning over $1,110/month in 2026 counts as a trial work month
- Consult SSA before working to avoid overpayments

**Medicare:** SSDI recipients get Medicare after 24 months on benefits.`;
            suggestions = [
                { action: 'check_eligibility', text: 'Check My Estimated Benefit', icon: '💰', description: 'Log in to ssa.gov to see your amount' },
                { action: 'start_questionnaire', text: 'Start My Application', icon: '📝', description: 'Apply online now' }
            ];

        // ── FRUSTRATION / CONFUSION ───────────────────────────────────────────
        } else if (input.includes('confused') || input.includes('overwhelm') || input.includes('don\'t understand') || input.includes('complicated') || input.includes('give up') || input.includes('frustrated')) {
            this.userContext.frustrationLevel++;
            response = `**I completely understand — this process is genuinely confusing.**

The SSDI system was not designed with everyday people in mind. It's okay to feel lost. Here's the simplest possible overview:

**The big picture — 3 things that matter most:**

**1. You need enough work history (for SSDI)**
Most people need 40 "credits" — roughly 10 years of working and paying Social Security taxes. (SSI has no work requirement.)

**2. Your medical evidence has to be strong**
SSA needs to see that your condition prevents you from working full-time. This comes from your doctors' records and a form called an RFC.

**3. Persistence wins**
Most people are denied the first time. The people who succeed keep going through the appeals process — especially the ALJ hearing, where approval rates are much higher (~45-55%).

**The simplest first step: Call SSA**
📞 **1-800-772-1213** (Mon–Fri 8am–7pm)
Tell them you want to apply for disability benefits. They will walk you through it.

**Or apply online at ssa.gov** — it takes about 1–2 hours and you can save your progress.

**What would be most helpful right now?** Tell me your specific situation and I'll give you a clear, personal plan.`;
            suggestions = [
                { action: 'start_questionnaire', text: 'Start Simple Assessment', icon: '📝', description: 'Answer a few questions for a personal plan' },
                { action: 'disability_strategy', text: 'Show Me the Process', icon: '🗺️', description: 'Step-by-step roadmap' }
            ];

        // ── INSURANCE / MEDICARE / MEDICAID ───────────────────────────────────
        } else if (input.includes('insurance') || input.includes('medicare') || input.includes('medicaid') || input.includes('coverage')) {
            response = `**Health Coverage Options While You Wait for SSDI**

**Medicaid (immediate option):**
- State-run program for low-income individuals
- Apply at healthcare.gov or your state's Medicaid office
- Many states have expanded Medicaid (available if your income is under ~138% of poverty level)
- No waiting period — can start immediately

**Medicare (after SSDI approval):**
- You get Medicare Part A & B automatically after **24 months on SSDI**
- This is a federal health insurance program (not income-based)
- If you have ALS, you qualify for Medicare immediately

**Marketplace / ACA Plans:**
- healthcare.gov for subsidized private insurance
- If your income is very low, you may qualify for $0 premium plans
- Open enrollment: November 1–January 15 each year
- Special enrollment if you lose other coverage

**Community Health Centers (no insurance required):**
- Federally Qualified Health Centers (FQHCs) charge on a sliding fee scale
- Find one at findahealthcenter.hrsa.gov
- Care available regardless of ability to pay or immigration status

**Prescription help:**
- NeedyMeds.org — patient assistance programs for medications
- RxAssist.org — pharma company free drug programs
- GoodRx.com — discount cards for prescriptions

Call **1-800-772-1213** to ask about Medicare Savings Programs that can reduce your premiums.`;
            suggestions = [
                { action: 'insurance_wizard', text: 'Find My Coverage Options', icon: '🏥', description: 'Check what insurance programs I qualify for' },
                { action: 'financial_programs', text: 'Financial Help Programs', icon: '💰', description: 'Help while waiting for SSDI' }
            ];

        // ── GENERAL FALLBACK ──────────────────────────────────────────────────
        } else {
            response = `**I'm here to help you with Social Security disability benefits.**

Here are the most common questions I can answer:

- **Am I eligible for SSDI or SSI?**
- **How do I apply for disability benefits?**
- **My application was denied — what do I do?**
- **How long does the SSDI process take?**
- **What documents and medical records do I need?**
- **How do I appeal an SSDI denial?**
- **What is an RFC and why does it matter?**
- **What conditions qualify for SSDI?**
- **How much money will I receive?**
- **Do I need a disability attorney?**

You can also tap one of the quick-action buttons below, or type your question in your own words — I'll do my best to help.

📞 **SSA Direct Line: 1-800-772-1213** (Mon–Fri 8am–7pm)
🌐 **Online:** ssa.gov`;
            suggestions = this.generateGeneralSuggestions();
        }

        return {
            response: response.trim(),
            suggestions: suggestions,
            confidence: 0.85,
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
