// Medical Assistance Helper - JavaScript Functions

// Sample data for demonstration purposes
const insurancePrograms = [
    {
        name: "Medicare Part A & B",
        type: "Federal Insurance",
        coverage: "Hospital and Medical Insurance",
        eligibility: "65+ or disabled",
        website: "medicare.gov"
    },
    {
        name: "Medicaid",
        type: "State/Federal Insurance",
        coverage: "Comprehensive health coverage",
        eligibility: "Low-income individuals and families",
        website: "medicaid.gov"
    },
    {
        name: "CHIP (Children's Health Insurance)",
        type: "State/Federal Insurance",
        coverage: "Children's health coverage",
        eligibility: "Families with children",
        website: "insurekidsnow.gov"
    },
    {
        name: "Healthcare Marketplace Plans",
        type: "Private Insurance",
        coverage: "Comprehensive health plans",
        eligibility: "All individuals",
        website: "healthcare.gov"
    }
];

const disabilityResources = [
    {
        name: "Social Security Disability Insurance (SSDI)",
        description: "Monthly benefits for disabled workers",
        type: "Federal Program",
        requirements: "Work credits and disability determination"
    },
    {
        name: "Supplemental Security Income (SSI)",
        description: "Cash assistance for disabled individuals with limited income",
        type: "Federal Program",
        requirements: "Disability and financial need"
    },
    {
        name: "State Disability Programs",
        description: "Short-term disability benefits (varies by state)",
        type: "State Program",
        requirements: "Employment and state residency"
    },
    {
        name: "NORD Patient Assistance Programs",
        description: "Financial assistance for rare disease treatments",
        type: "Non-Profit Organization",
        requirements: "Rare disease diagnosis"
    }
];

const doctorSpecialties = [
    "Primary Care Physician",
    "Internal Medicine",
    "Family Medicine",
    "Disability Evaluation Specialist",
    "Rare Disease Specialist",
    "Neurologist",
    "Rheumatologist",
    "Geneticist",
    "Pain Management Specialist",
    "Occupational Medicine"
];

// Insurance Search Function
function searchPrograms() {
    const insuranceInput = document.getElementById('insurance-input').value;
    const conditionInput = document.getElementById('condition-input').value;
    const locationInput = document.getElementById('location-input').value;
    const resultsContainer = document.getElementById('insurance-results');

    if (!insuranceInput && !conditionInput && !locationInput) {
        showMessage(resultsContainer, 'Please enter at least one search criterion', 'error');
        return;
    }

    // Show loading
    resultsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>Searching programs...</p></div>';

    // Simulate API call
    setTimeout(() => {
        let html = '<h3>Found Programs & Resources:</h3>';
        
        insurancePrograms.forEach(program => {
            html += `
                <div class="result-item">
                    <h4>${program.name}</h4>
                    <p><strong>Type:</strong> ${program.type}</p>
                    <p><strong>Coverage:</strong> ${program.coverage}</p>
                    <p><strong>Eligibility:</strong> ${program.eligibility}</p>
                    <p><strong>Website:</strong> <a href="https://${program.website}" target="_blank">${program.website}</a></p>
                    <div class="tags">
                        <span class="tag">${program.type}</span>
                        ${insuranceInput ? '<span class="tag">Matches Your Insurance</span>' : ''}
                    </div>
                </div>
            `;
        });

        html += `
            <div class="message message-info">
                <strong>Next Steps:</strong> 
                <ol style="margin-left: 20px; margin-top: 10px;">
                    <li>Review eligibility requirements for each program</li>
                    <li>Visit program websites for detailed information</li>
                    <li>Use our Paperwork Guide to help with applications</li>
                    <li>Contact programs directly for personalized assistance</li>
                </ol>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }, 1500);
}

// Paperwork Wizard Function
function startPaperwork(type) {
    const wizardContainer = document.getElementById('paperwork-wizard');
    wizardContainer.style.display = 'block';
    
    let wizardContent = '';
    
    switch(type) {
        case 'insurance':
            wizardContent = generateInsuranceWizard();
            break;
        case 'records':
            wizardContent = generateRecordsWizard();
            break;
        case 'financial':
            wizardContent = generateFinancialWizard();
            break;
        case 'authorization':
            wizardContent = generateAuthorizationWizard();
            break;
    }
    
    wizardContainer.innerHTML = wizardContent;
    wizardContainer.scrollIntoView({ behavior: 'smooth' });
}

function generateInsuranceWizard() {
    return `
        <h3>Insurance Application Guide</h3>
        <div class="wizard-step">
            <h4>Step 1: Personal Information</h4>
            <input type="text" placeholder="Full Legal Name">
            <input type="date" placeholder="Date of Birth">
            <input type="text" placeholder="Social Security Number">
            <input type="text" placeholder="Current Address">
            <input type="tel" placeholder="Phone Number">
            <input type="email" placeholder="Email Address">
        </div>
        <div class="wizard-step">
            <h4>Step 2: Employment & Income</h4>
            <input type="text" placeholder="Employer Name">
            <input type="text" placeholder="Annual Income">
            <select>
                <option value="">Employment Status</option>
                <option value="employed">Employed Full-Time</option>
                <option value="part-time">Employed Part-Time</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="disabled">Disabled</option>
            </select>
        </div>
        <div class="wizard-step">
            <h4>Step 3: Household Information</h4>
            <input type="number" placeholder="Number of People in Household">
            <textarea placeholder="List household members (name, age, relationship)"></textarea>
        </div>
        <div class="message message-info">
            <strong>Tips:</strong> Have your Social Security card, proof of income, and identification ready. 
            Applications typically take 2-4 weeks to process.
        </div>
        <div class="wizard-navigation">
            <button class="btn-secondary" onclick="saveProgress()">Save Progress</button>
            <button class="btn-primary" onclick="submitForm('insurance')">Submit Application</button>
        </div>
    `;
}

function generateRecordsWizard() {
    return `
        <h3>Medical Records Request Guide</h3>
        <div class="wizard-step">
            <h4>Step 1: Patient Information</h4>
            <input type="text" placeholder="Patient Name">
            <input type="date" placeholder="Date of Birth">
            <input type="text" placeholder="Patient ID Number (if known)">
        </div>
        <div class="wizard-step">
            <h4>Step 2: Healthcare Provider</h4>
            <input type="text" placeholder="Provider/Hospital Name">
            <input type="text" placeholder="Provider Address">
            <input type="tel" placeholder="Provider Phone Number">
        </div>
        <div class="wizard-step">
            <h4>Step 3: Records Requested</h4>
            <input type="date" placeholder="From Date">
            <input type="date" placeholder="To Date">
            <textarea placeholder="Specific records needed (e.g., lab results, imaging, visit notes)"></textarea>
            <select>
                <option value="">Delivery Method</option>
                <option value="mail">Mail</option>
                <option value="email">Email</option>
                <option value="pickup">Pick Up</option>
                <option value="fax">Fax</option>
            </select>
        </div>
        <div class="message message-info">
            <strong>Important:</strong> Under HIPAA, you have the right to your medical records. 
            Most providers must respond within 30 days. There may be a reasonable fee for copies.
        </div>
        <div class="wizard-navigation">
            <button class="btn-secondary" onclick="saveProgress()">Save Progress</button>
            <button class="btn-primary" onclick="submitForm('records')">Generate Request Letter</button>
        </div>
    `;
}

function generateFinancialWizard() {
    return `
        <h3>Financial Assistance Application Guide</h3>
        <div class="wizard-step">
            <h4>Step 1: Patient & Contact Information</h4>
            <input type="text" placeholder="Patient Name">
            <input type="text" placeholder="Contact Phone">
            <input type="email" placeholder="Email Address">
        </div>
        <div class="wizard-step">
            <h4>Step 2: Financial Information</h4>
            <input type="text" placeholder="Total Monthly Income">
            <input type="text" placeholder="Total Monthly Expenses">
            <input type="number" placeholder="Number of Dependents">
            <textarea placeholder="Describe financial hardship"></textarea>
        </div>
        <div class="wizard-step">
            <h4>Step 3: Medical Information</h4>
            <textarea placeholder="Diagnosis/Condition requiring treatment"></textarea>
            <input type="text" placeholder="Estimated Treatment Cost">
            <textarea placeholder="Insurance coverage (if any)"></textarea>
        </div>
        <div class="message message-info">
            <strong>Documents Needed:</strong> Recent pay stubs, tax returns, bank statements, 
            medical bills, and insurance information (if applicable).
        </div>
        <div class="wizard-navigation">
            <button class="btn-secondary" onclick="saveProgress()">Save Progress</button>
            <button class="btn-primary" onclick="submitForm('financial')">Submit Application</button>
        </div>
    `;
}

function generateAuthorizationWizard() {
    return `
        <h3>Treatment Authorization Request Guide</h3>
        <div class="wizard-step">
            <h4>Step 1: Patient Information</h4>
            <input type="text" placeholder="Patient Name">
            <input type="text" placeholder="Policy/Member ID">
            <input type="text" placeholder="Group Number">
        </div>
        <div class="wizard-step">
            <h4>Step 2: Treatment Information</h4>
            <input type="text" placeholder="Procedure/Treatment Name">
            <input type="text" placeholder="CPT/Procedure Code (if known)">
            <input type="date" placeholder="Requested Treatment Date">
            <textarea placeholder="Medical justification/reason for treatment"></textarea>
        </div>
        <div class="wizard-step">
            <h4>Step 3: Provider Information</h4>
            <input type="text" placeholder="Provider Name">
            <input type="text" placeholder="Provider NPI Number">
            <input type="text" placeholder="Facility Name">
        </div>
        <div class="message message-info">
            <strong>Note:</strong> Your doctor's office can help obtain prior authorization. 
            This process typically takes 3-7 business days. Some urgent requests may be expedited.
        </div>
        <div class="wizard-navigation">
            <button class="btn-secondary" onclick="saveProgress()">Save Progress</button>
            <button class="btn-primary" onclick="submitForm('authorization')">Submit Request</button>
        </div>
    `;
}

// Disability Support Search
function searchDisabilitySupport() {
    const conditionInput = document.getElementById('rare-condition-input').value;
    const disabilityType = document.getElementById('disability-type').value;
    const resultsContainer = document.getElementById('disability-results');

    if (!conditionInput && !disabilityType) {
        showMessage(resultsContainer, 'Please enter a condition or select a disability type', 'error');
        return;
    }

    resultsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>Finding resources...</p></div>';

    setTimeout(() => {
        let html = '<h3>Disability Support Resources:</h3>';
        
        disabilityResources.forEach(resource => {
            if (!disabilityType || resource.type.toLowerCase().includes(disabilityType.toLowerCase())) {
                html += `
                    <div class="result-item">
                        <h4>${resource.name}</h4>
                        <p>${resource.description}</p>
                        <p><strong>Type:</strong> ${resource.type}</p>
                        <p><strong>Requirements:</strong> ${resource.requirements}</p>
                        <div class="tags">
                            <span class="tag">${resource.type}</span>
                            ${conditionInput ? '<span class="tag">Relevant for Your Condition</span>' : ''}
                        </div>
                    </div>
                `;
            }
        });

        html += `
            <div class="message message-success">
                <strong>Application Strategy:</strong>
                <ol style="margin-left: 20px; margin-top: 10px;">
                    <li>Gather all medical documentation and test results</li>
                    <li>Get supporting statements from your doctors</li>
                    <li>Document how your condition affects daily activities</li>
                    <li>Consider working with a disability advocate or attorney</li>
                    <li>Be prepared for initial denial - many applications require appeals</li>
                </ol>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }, 1500);
}

// Doctor Search Function
function searchDoctors() {
    const specialtyInput = document.getElementById('specialty-input').value;
    const locationInput = document.getElementById('doctor-location-input').value;
    const acceptsInsurance = document.getElementById('accepts-insurance').checked;
    const disabilityExpert = document.getElementById('disability-expert').checked;
    const rareConditionExpert = document.getElementById('rare-condition-expert').checked;
    const resultsContainer = document.getElementById('doctor-results');

    if (!specialtyInput && !locationInput) {
        showMessage(resultsContainer, 'Please enter a specialty or location', 'error');
        return;
    }

    resultsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>Searching for doctors...</p></div>';

    setTimeout(() => {
        let html = '<h3>Doctors & Specialists:</h3>';
        
        // Generate sample doctor results
        for (let i = 1; i <= 5; i++) {
            const specialty = specialtyInput || doctorSpecialties[Math.floor(Math.random() * doctorSpecialties.length)];
            html += `
                <div class="result-item">
                    <h4>Dr. ${generateDoctorName()} - ${specialty}</h4>
                    <p><strong>Location:</strong> ${locationInput || 'Your Area'}</p>
                    <p><strong>Years of Experience:</strong> ${10 + i * 2} years</p>
                    <p><strong>Specializations:</strong> ${specialty}${rareConditionExpert ? ', Rare Diseases' : ''}${disabilityExpert ? ', Disability Evaluations' : ''}</p>
                    ${acceptsInsurance ? '<p><strong>Insurance:</strong> <span class="tag">Accepts Your Insurance</span></p>' : ''}
                    <p><strong>Patient Rating:</strong> ⭐ ${(4 + Math.random()).toFixed(1)}/5.0</p>
                    <div class="tags">
                        ${disabilityExpert ? '<span class="tag">Disability Expert</span>' : ''}
                        ${rareConditionExpert ? '<span class="tag">Rare Condition Specialist</span>' : ''}
                        ${acceptsInsurance ? '<span class="tag">Accepts Insurance</span>' : ''}
                        <span class="tag">Accepting New Patients</span>
                    </div>
                </div>
            `;
        }

        html += `
            <div class="message message-info">
                <strong>Before Your Appointment:</strong>
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li>Verify the doctor accepts your insurance</li>
                    <li>Bring all relevant medical records</li>
                    <li>List your current medications and symptoms</li>
                    <li>Prepare questions about your condition and treatment options</li>
                    <li>Ask about their experience with disability evaluations if needed</li>
                </ul>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }, 1500);
}

function generateDoctorName() {
    const firstNames = ['Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'James', 'Maria', 'Robert'];
    const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + 
           lastNames[Math.floor(Math.random() * lastNames.length)];
}

// AI Tool Functions
function openAITool(toolType) {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    let content = '';
    
    switch(toolType) {
        case 'form-filler':
            content = generateFormFillerTool();
            break;
        case 'chat-assistant':
            content = generateChatAssistantTool();
            break;
        case 'document-analyzer':
            content = generateDocumentAnalyzerTool();
            break;
        case 'coverage-predictor':
            content = generateCoveragePredictorTool();
            break;
        case 'appeal-generator':
            content = generateAppealGeneratorTool();
            break;
        case 'appointment-coordinator':
            content = generateAppointmentCoordinatorTool();
            break;
    }
    
    container.innerHTML = content;
    modal.style.display = 'block';
}

function closeAITool() {
    document.getElementById('ai-tool-modal').style.display = 'none';
}

function generateFormFillerTool() {
    return `
        <h2>🤖 AI Smart Form Filler</h2>
        <p>Upload your information once, and AI will help you complete multiple forms automatically.</p>
        
        <div class="wizard-step">
            <h4>Upload Your Information Profile</h4>
            <input type="file" accept=".pdf,.doc,.docx,.txt">
            <p style="color: #718096; font-size: 0.9rem; margin-top: 0.5rem;">
                Or manually enter your information below:
            </p>
        </div>
        
        <div class="wizard-step">
            <h4>Personal Information</h4>
            <input type="text" placeholder="Full Name">
            <input type="date" placeholder="Date of Birth">
            <input type="text" placeholder="SSN">
            <textarea placeholder="Address"></textarea>
        </div>
        
        <button class="btn-primary" onclick="processAIForm()">Analyze & Fill Forms</button>
        
        <div class="message message-info" style="margin-top: 1rem;">
            <strong>How it works:</strong> Our AI securely stores your information and automatically 
            populates forms while ensuring accuracy and compliance with regulations.
        </div>
    `;
}

function generateChatAssistantTool() {
    return `
        <h2>💬 Virtual Health Assistant</h2>
        <div style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 1rem; height: 400px; overflow-y: auto; margin-bottom: 1rem; background: #f7fafc;">
            <div class="chat-message assistant">
                <strong>Assistant:</strong> Hello! I'm your virtual health assistant. I can help you with:
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li>Finding insurance programs</li>
                    <li>Understanding disability benefits</li>
                    <li>Navigating paperwork requirements</li>
                    <li>Locating doctors and specialists</li>
                    <li>Answering questions about medical assistance</li>
                </ul>
                How can I help you today?
            </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="chat-input" placeholder="Type your question..." style="flex: 1;">
            <button class="btn-primary" onclick="sendChatMessage()">Send</button>
        </div>
        
        <div style="margin-top: 1rem;">
            <strong>Quick Questions:</strong>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('medicare')">What is Medicare?</button>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('disability')">How do I apply for disability?</button>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('appeal')">My claim was denied</button>
        </div>
    `;
}

function generateDocumentAnalyzerTool() {
    return `
        <h2>🔎 AI Document Analyzer</h2>
        <p>Upload medical documents, bills, or insurance letters for AI analysis and recommendations.</p>
        
        <div class="wizard-step">
            <h4>Upload Documents</h4>
            <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png">
            <p style="color: #718096; font-size: 0.9rem; margin-top: 0.5rem;">
                Supported formats: PDF, Word, Images
            </p>
        </div>
        
        <button class="btn-primary" onclick="analyzeDocuments()">Analyze Documents</button>
        
        <div id="analysis-results" style="margin-top: 1rem;"></div>
        
        <div class="message message-info" style="margin-top: 1rem;">
            <strong>What we can analyze:</strong>
            <ul style="margin-left: 20px;">
                <li>Medical bills - identify covered vs. uncovered charges</li>
                <li>Insurance denials - suggest appeal strategies</li>
                <li>Medical records - extract key information</li>
                <li>EOB statements - explain benefits and costs</li>
            </ul>
        </div>
    `;
}

function generateCoveragePredictorTool() {
    return `
        <h2>📊 Coverage Predictor</h2>
        <p>Get AI-powered predictions about coverage likelihood and cost estimates.</p>
        
        <div class="wizard-step">
            <h4>Treatment Information</h4>
            <input type="text" placeholder="Procedure or Treatment Name">
            <select>
                <option value="">Select Category</option>
                <option value="surgery">Surgery</option>
                <option value="medication">Medication</option>
                <option value="therapy">Therapy</option>
                <option value="diagnostic">Diagnostic Test</option>
                <option value="equipment">Medical Equipment</option>
            </select>
            <input type="text" placeholder="Estimated Cost (if known)">
        </div>
        
        <div class="wizard-step">
            <h4>Insurance Information</h4>
            <input type="text" placeholder="Insurance Provider">
            <input type="text" placeholder="Plan Type">
            <input type="text" placeholder="Deductible Remaining">
        </div>
        
        <button class="btn-primary" onclick="predictCoverage()">Predict Coverage</button>
        
        <div id="prediction-results" style="margin-top: 1rem;"></div>
    `;
}

function generateAppealGeneratorTool() {
    return `
        <h2>✍️ Appeal Letter Generator</h2>
        <p>Create professional, persuasive appeal letters for denied claims or applications.</p>
        
        <div class="wizard-step">
            <h4>Denial Information</h4>
            <select>
                <option value="">What was denied?</option>
                <option value="insurance-claim">Insurance Claim</option>
                <option value="disability">Disability Application</option>
                <option value="prior-auth">Prior Authorization</option>
                <option value="coverage">Coverage Request</option>
            </select>
            <textarea placeholder="Reason given for denial"></textarea>
            <input type="date" placeholder="Date of Denial">
        </div>
        
        <div class="wizard-step">
            <h4>Supporting Information</h4>
            <textarea placeholder="Medical justification and additional information"></textarea>
            <textarea placeholder="List supporting documents you're including"></textarea>
        </div>
        
        <button class="btn-primary" onclick="generateAppealLetter()">Generate Appeal Letter</button>
        
        <div id="letter-preview" style="margin-top: 1rem;"></div>
    `;
}

function generateAppointmentCoordinatorTool() {
    return `
        <h2>📅 Appointment Coordinator</h2>
        <p>Manage and coordinate all your medical appointments in one place.</p>
        
        <div class="wizard-step">
            <h4>Add New Appointment</h4>
            <input type="text" placeholder="Doctor/Provider Name">
            <input type="date" placeholder="Appointment Date">
            <input type="time" placeholder="Appointment Time">
            <select>
                <option value="">Appointment Type</option>
                <option value="initial">Initial Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="procedure">Procedure</option>
                <option value="test">Diagnostic Test</option>
                <option value="therapy">Therapy Session</option>
            </select>
            <textarea placeholder="Notes or preparation needed"></textarea>
        </div>
        
        <button class="btn-primary" onclick="saveAppointment()">Save Appointment</button>
        
        <div style="margin-top: 2rem;">
            <h4>Upcoming Appointments</h4>
            <div class="message message-info">
                No appointments scheduled yet. Add your first appointment above!
            </div>
        </div>
    `;
}

// Helper Functions for AI Tools
function processAIForm() {
    alert('AI is analyzing your information and will help fill out your forms. This is a demo - in production, this would use real AI processing.');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (input && input.value.trim()) {
        alert('Chat functionality is a demo. In production, this would connect to a real AI assistant. Your question: ' + input.value);
        input.value = '';
    }
}

function askQuestion(topic) {
    const responses = {
        'medicare': 'Medicare is federal health insurance for people 65+, younger people with disabilities, and people with End-Stage Renal Disease. It has Parts A, B, C, and D covering different services.',
        'disability': 'To apply for disability: 1) Gather medical records, 2) Complete application at ssa.gov or local office, 3) Provide detailed work history, 4) Wait for evaluation (3-5 months), 5) Consider appeal if denied.',
        'appeal': 'If your claim was denied: 1) Review the denial letter carefully, 2) Gather additional supporting documentation, 3) Write a formal appeal within the deadline, 4) Consider getting help from an advocate or attorney.'
    };
    alert(responses[topic] || 'Question received');
}

function analyzeDocuments() {
    const resultsDiv = document.getElementById('analysis-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="message message-success">
                <strong>Analysis Complete:</strong>
                <p>This is a demo. In production, AI would analyze your documents and provide:</p>
                <ul style="margin-left: 20px;">
                    <li>Key information extraction</li>
                    <li>Coverage analysis</li>
                    <li>Cost breakdowns</li>
                    <li>Recommended actions</li>
                </ul>
            </div>
        `;
    }
}

function predictCoverage() {
    const resultsDiv = document.getElementById('prediction-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="message message-success">
                <h4>Coverage Prediction Results:</h4>
                <p><strong>Estimated Coverage:</strong> 70-80% likely to be covered</p>
                <p><strong>Estimated Out-of-Pocket:</strong> $500-$1,200</p>
                <p><strong>Confidence Level:</strong> High</p>
                <p><strong>Recommendation:</strong> Prior authorization recommended to maximize coverage</p>
            </div>
        `;
    }
}

function generateAppealLetter() {
    const previewDiv = document.getElementById('letter-preview');
    if (previewDiv) {
        previewDiv.innerHTML = `
            <div style="background: white; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 5px;">
                <h4>Preview of Generated Appeal Letter:</h4>
                <p style="color: #718096; margin-top: 1rem;">
                    [Your generated professional appeal letter would appear here with proper formatting, 
                    medical justification, and supporting arguments based on your input]
                </p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="downloadLetter()">Download Letter</button>
                <button class="btn-secondary" style="margin-top: 1rem; margin-left: 0.5rem;" onclick="editLetter()">Edit Letter</button>
            </div>
        `;
    }
}

function saveAppointment() {
    alert('Appointment saved! In production, this would sync with your calendar and send reminders.');
}

function downloadLetter() {
    alert('Letter would be downloaded as a Word or PDF document.');
}

function editLetter() {
    alert('You would be able to edit the letter before finalizing.');
}

// Form Submission Functions
function submitForm(formType) {
    alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} form submitted successfully! In a production environment, this would process your application.`);
}

function saveProgress() {
    alert('Progress saved! You can return later to complete this form.');
}

// External Link Handler
function externalLink(site) {
    const urls = {
        'healthcare.gov': 'https://www.healthcare.gov',
        'ssa.gov': 'https://www.ssa.gov',
        'medicaid.gov': 'https://www.medicaid.gov',
        'medicare.gov': 'https://www.medicare.gov'
    };
    
    if (urls[site]) {
        alert(`This would open ${urls[site]} in a new window. Click OK to continue.`);
        // In production: window.open(urls[site], '_blank');
    }
    return false;
}

// Message Helper Function
function showMessage(container, message, type) {
    const messageClass = type === 'error' ? 'message-error' : 
                        type === 'success' ? 'message-success' : 'message-info';
    container.innerHTML = `<div class="message ${messageClass}">${message}</div>`;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Close modal when clicking outside of it
    const modal = document.getElementById('ai-tool-modal');
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Initialize AI Assistant and Condition Categorizer
    if (typeof MedicalAIAssistant !== 'undefined') {
        window.aiAssistant = new MedicalAIAssistant();
    }
    if (typeof MedicalConditionCategorizer !== 'undefined') {
        window.conditionCategorizer = new MedicalConditionCategorizer();
    }
});

// ========================================
// AI ASSISTANT WIDGET FUNCTIONS
// ========================================

function toggleAIAssistant() {
    const panel = document.getElementById('ai-assistant-panel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
    } else {
        panel.style.display = 'none';
    }
}

function handleAIEnter(event) {
    if (event.key === 'Enter') {
        sendToAI();
    }
}

async function sendToAI() {
    const input = document.getElementById('ai-user-input');
    const messagesDiv = document.getElementById('ai-messages');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Add user message to chat
    addAIMessage(userMessage, 'user');
    input.value = '';
    
    // Get AI response
    if (window.aiAssistant) {
        const response = await window.aiAssistant.getIntelligentGuidance(userMessage);
        
        // Add AI response
        addAIMessage(response.response, 'assistant');
        
        // Add suggestion buttons if available
        if (response.suggestions && response.suggestions.length > 0) {
            addAISuggestions(response.suggestions);
        }
    }
}

function addAIMessage(text, sender) {
    const messagesDiv = document.getElementById('ai-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addAISuggestions(suggestions) {
    const messagesDiv = document.getElementById('ai-messages');
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'ai-suggestions';
    
    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'ai-suggestion-btn';
        btn.innerHTML = `${suggestion.icon} <strong>${suggestion.text}</strong><br><small>${suggestion.description}</small>`;
        btn.onclick = () => handleSuggestionClick(suggestion.action);
        suggestionsDiv.appendChild(btn);
    });
    
    messagesDiv.appendChild(suggestionsDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleQuickAction(action) {
    const messages = {
        'confused': "I'm feeling confused and overwhelmed by all of this. Where do I even start?",
        'denied': "My application was denied and I don't know what to do next.",
        'start': "I need help but don't know where to begin. What should I do first?",
        'appeal': "I need to appeal a denial. How do I make my appeal successful?"
    };
    
    const input = document.getElementById('ai-user-input');
    input.value = messages[action];
    sendToAI();
}

function handleSuggestionClick(action) {
    // Route to appropriate tool or section
    const actions = {
        'insurance_wizard': () => document.getElementById('insurance').scrollIntoView({ behavior: 'smooth' }),
        'disability_strategy': () => document.getElementById('disability').scrollIntoView({ behavior: 'smooth' }),
        'paperwork_helper': () => document.getElementById('paperwork').scrollIntoView({ behavior: 'smooth' }),
        'find_specialist': () => document.getElementById('doctors').scrollIntoView({ behavior: 'smooth' }),
        'appeal_help': () => openAITool('appeal-generator'),
        'document_review': () => openAITool('document-analyzer'),
        'start_questionnaire': () => startAIAssessment()
    };
    
    if (actions[action]) {
        actions[action]();
    }
}

// ========================================
// AI GUIDED JOURNEY FUNCTIONS
// ========================================

async function startAIGuidedJourney() {
    toggleAIAssistant();
    setTimeout(() => {
        addAIMessage("Hi! I'm here to help you get the medical assistance you need. Let's start by understanding your situation.", 'assistant');
        setTimeout(() => {
            addAIMessage("What brings you here today? Are you looking for insurance, disability benefits, or help with something else?", 'assistant');
        }, 1000);
    }, 500);
}

async function startAIAssessment() {
    const container = document.getElementById('ai-assessment-container');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
    
    if (window.aiAssistant) {
        const questionnaire = await window.aiAssistant.conductIntakeQuestionnaire();
        renderQuestionnaire(questionnaire);
    }
}

function renderQuestionnaire(questionnaire) {
    const container = document.getElementById('ai-assessment-container');
    let html = '<div class="questionnaire-box">';
    html += `<h3>Quick Assessment</h3>`;
    html += `<p>${questionnaire.purpose}</p>`;
    html += '<form id="assessment-form" onsubmit="submitAssessment(event)">';
    
    questionnaire.questions.forEach((q, index) => {
        html += `<div class="form-field">`;
        html += `<label><strong>Question ${index + 1}:</strong> ${q.question}</label>`;
        
        if (q.type === 'multiple-choice') {
            html += `<select name="${q.id}" required>`;
            html += `<option value="">Select an option...</option>`;
            q.options.forEach(option => {
                html += `<option value="${option}">${option}</option>`;
            });
            html += `</select>`;
        }
        
        html += `</div>`;
    });
    
    html += '<button type="submit" class="btn-primary btn-large">Get My Personalized Plan</button>';
    html += '</form>';
    html += '</div>';
    
    container.innerHTML = html;
}

async function submitAssessment(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const answers = {};
    
    for (const [key, value] of formData.entries()) {
        answers[key] = value;
    }
    
    // Generate roadmap
    if (window.aiAssistant) {
        const roadmap = window.aiAssistant.createPersonalizedRoadmap(answers);
        displayRoadmap(roadmap);
    }
}

function displayRoadmap(roadmap) {
    const container = document.getElementById('ai-roadmap-container');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
    
    let html = '<div class="roadmap-box">';
    html += `<h2>🎯 ${roadmap.title}</h2>`;
    
    // Urgent actions
    if (roadmap.urgentActions && roadmap.urgentActions.length > 0) {
        html += '<div class="urgent-section">';
        html += '<h3>⚠️ URGENT ACTIONS</h3>';
        roadmap.urgentActions.forEach(action => {
            html += `<div class="urgent-action ${action.priority.toLowerCase()}">`;
            html += `<strong>${action.action}</strong> - ${action.deadline}<br>`;
            html += `<small>${action.description}</small>`;
            html += `</div>`;
        });
        html += '</div>';
    }
    
    // Steps
    html += '<div class="roadmap-steps">';
    html += '<h3>📋 Your Step-by-Step Plan</h3>';
    roadmap.steps.forEach(step => {
        html += `<div class="roadmap-step">`;
        html += `<h4>Step ${step.number}: ${step.title}</h4>`;
        html += `<p>${step.description}</p>`;
        html += `<ul>`;
        step.actions.forEach(action => {
            html += `<li>${action}</li>`;
        });
        html += `</ul>`;
        html += `<p class="timeframe"><strong>Estimated Time:</strong> ${step.timeframe}</p>`;
        html += `</div>`;
    });
    html += '</div>';
    
    html += '<button onclick="startProcessNavigation()" class="btn-primary btn-large">Start Process with AI Guidance →</button>';
    html += '</div>';
    
    container.innerHTML = html;
}

function startProcessNavigation() {
    alert('AI will now guide you step-by-step through the process. Each form and action will have AI assistance.');
    document.getElementById('ai-tools').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// DOCUMENT UPLOAD & AUTO-FILL FUNCTIONS
// ========================================

function openAITool(toolType) {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    let content = '';
    
    switch(toolType) {
        case 'document-autofill':
            content = generateDocumentAutoFillTool();
            break;
        case 'form-filler':
            content = generateFormFillerTool();
            break;
        case 'chat-assistant':
            content = generateChatAssistantTool();
            break;
        case 'document-analyzer':
            content = generateDocumentAnalyzerTool();
            break;
        case 'coverage-predictor':
            content = generateCoveragePredictorTool();
            break;
        case 'appeal-generator':
            content = generateAppealGeneratorTool();
            break;
        case 'appointment-coordinator':
            content = generateAppointmentCoordinatorTool();
            break;
    }
    
    container.innerHTML = content;
    modal.style.display = 'block';
}

function generateDocumentAutoFillTool() {
    return `
        <h2>📄 AI Document Upload & Auto-Fill</h2>
        <p class="section-description">Upload your documents and let AI automatically extract information and fill out forms for you!</p>
        
        <div class="process-navigation">
            <div class="process-steps">
                <div class="process-step active">
                    <div class="step-circle">1</div>
                    <div class="step-label">Upload</div>
                </div>
                <div class="process-step">
                    <div class="step-circle">2</div>
                    <div class="step-label">AI Extract</div>
                </div>
                <div class="process-step">
                    <div class="step-circle">3</div>
                    <div class="step-label">Categorize</div>
                </div>
                <div class="process-step">
                    <div class="step-circle">4</div>
                    <div class="step-label">Auto-Fill</div>
                </div>
                <div class="process-step">
                    <div class="step-circle">5</div>
                    <div class="step-label">Review</div>
                </div>
            </div>
        </div>
        
        <div class="upload-zone" id="upload-zone" onclick="document.getElementById('file-upload').click()">
            <div class="upload-icon">📁</div>
            <h3>Drop your documents here or click to upload</h3>
            <p>Supported: Medical records, ID cards, insurance cards, diagnosis letters, test results</p>
            <p><small>PDF, JPG, PNG, Word documents accepted</small></p>
            <input type="file" id="file-upload" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style="display: none;" onchange="handleFileUpload(event)">
        </div>
        
        <div id="upload-status" style="display: none;">
            <div class="message message-info">
                <strong>🤖 AI is analyzing your documents...</strong>
                <p>Extracting personal information, medical conditions, and relevant details</p>
            </div>
        </div>
        
        <div id="extracted-info" style="display: none;"></div>
        <div id="condition-categorization" style="display: none;"></div>
        <div id="auto-filled-forms" style="display: none;"></div>
        
        <div class="message message-success" style="margin-top: 2rem;">
            <strong>How This Works:</strong>
            <ol style="margin-left: 20px; margin-top: 10px;">
                <li><strong>Upload:</strong> Add any documents (ID, medical records, diagnosis letters)</li>
                <li><strong>AI Extract:</strong> AI reads and extracts your information</li>
                <li><strong>Categorize:</strong> AI identifies your conditions and categorizes you</li>
                <li><strong>Auto-Fill:</strong> AI fills out all relevant forms with your information</li>
                <li><strong>Review:</strong> You review and submit - no manual typing needed!</li>
            </ol>
        </div>
    `;
}

// Handle file upload and process with AI
async function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    
    // Show processing status
    const statusDiv = document.getElementById('upload-status');
    statusDiv.style.display = 'block';
    
    // Update process navigation
    updateProcessStep(2);
    
    // Simulate AI processing (in production, would send to backend/HuggingFace API)
    setTimeout(() => {
        processUploadedDocuments(files);
    }, 2000);
}

function processUploadedDocuments(files) {
    // Simulate extracted information from documents
    const extractedData = simulateDocumentExtraction(files);
    
    // Display extracted information
    displayExtractedInfo(extractedData);
    
    // Update process step
    updateProcessStep(3);
    
    // Categorize patient based on conditions
    setTimeout(() => {
        if (window.conditionCategorizer) {
            const report = window.conditionCategorizer.generatePatientReport(extractedData.medicalText);
            displayConditionCategorization(report);
            
            // Update process step
            updateProcessStep(4);
            
            // Auto-fill forms
            setTimeout(() => {
                autoFillForms(extractedData, report);
                updateProcessStep(5);
            }, 1500);
        }
    }, 1500);
}

function simulateDocumentExtraction(files) {
    // In production, this would use OCR and AI to extract actual data
    // For demo, we'll simulate extracted data
    const fileNames = Array.from(files).map(f => f.name).join(', ');
    
    return {
        personalInfo: {
            fullName: 'John Smith',
            dateOfBirth: '1975-06-15',
            ssn: 'XXX-XX-6789',
            address: '123 Main St, Anytown, CA 90210',
            phone: '(555) 123-4567',
            email: 'john.smith@email.com'
        },
        medicalText: 'Patient diagnosed with rheumatoid arthritis and major depression. Multiple sclerosis with persistent mobility limitations. Chronic COPD requiring daily oxygen therapy.',
        filesProcessed: fileNames
    };
}

function displayExtractedInfo(data) {
    const container = document.getElementById('extracted-info');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    let html = '<div class="extracted-data">';
    html += '<h4>✅ Information Successfully Extracted</h4>';
    html += '<p><strong>Files Processed:</strong> ' + data.filesProcessed + '</p>';
    html += '<div class="data-fields">';
    
    for (const [key, value] of Object.entries(data.personalInfo)) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="data-field">`;
        html += `<span class="data-label">${label}:</span>`;
        html += `<span class="data-value">${value}</span>`;
        html += `</div>`;
    }
    
    html += '</div>';
    html += '<p><small>✓ AI extracted this information with high confidence</small></p>';
    html += '</div>';
    
    container.innerHTML = html;
}

function displayConditionCategorization(report) {
    if (!report.success) {
        return;
    }
    
    const container = document.getElementById('condition-categorization');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    let html = '<div class="extracted-data" style="background: #fff5f5; border-color: #f56565;">';
    html += '<h4>🎯 AI Condition Analysis & Categorization</h4>';
    html += report.summary.replace(/\n/g, '<br>');
    
    html += '<h4 style="margin-top: 1.5rem;">📋 Required Documentation:</h4>';
    html += '<ul>';
    report.recommendations.documentation.slice(0, 5).forEach(doc => {
        html += `<li>${doc}</li>`;
    });
    html += '</ul>';
    
    html += '<h4 style="margin-top: 1.5rem;">📝 Forms You Need:</h4>';
    html += '<ul>';
    report.requiredForms.forEach(form => {
        html += `<li><strong>${form.name}</strong> - ${form.type}</li>`;
    });
    html += '</ul>';
    
    html += '</div>';
    
    container.innerHTML = html;
}

function autoFillForms(extractedData, report) {
    const container = document.getElementById('auto-filled-forms');
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    let html = '<div class="form-preview">';
    html += '<h3>🎉 Forms Automatically Filled by AI!</h3>';
    html += '<p>Review the auto-filled information below. Green fields were filled with high confidence.</p>';
    
    // Sample SSDI Application Form
    html += '<h4 style="margin-top: 2rem;">Social Security Disability Application (Form SSA-16)</h4>';
    html += '<div class="form-field">';
    html += '<label>Full Legal Name <span class="confidence-indicator confidence-high">High Confidence</span></label>';
    html += `<input type="text" class="auto-filled" value="${extractedData.personalInfo.fullName}" readonly>`;
    html += '</div>';
    
    html += '<div class="form-field">';
    html += '<label>Social Security Number <span class="confidence-indicator confidence-high">High Confidence</span></label>';
    html += `<input type="text" class="auto-filled" value="${extractedData.personalInfo.ssn}" readonly>`;
    html += '</div>';
    
    html += '<div class="form-field">';
    html += '<label>Date of Birth <span class="confidence-indicator confidence-high">High Confidence</span></label>';
    html += `<input type="date" class="auto-filled" value="${extractedData.personalInfo.dateOfBirth}" readonly>`;
    html += '</div>';
    
    html += '<div class="form-field">';
    html += '<label>Mailing Address <span class="confidence-indicator confidence-high">High Confidence</span></label>';
    html += `<input type="text" class="auto-filled" value="${extractedData.personalInfo.address}" readonly>`;
    html += '</div>';
    
    if (report && report.success) {
        html += '<div class="form-field">';
        html += '<label>Primary Disabling Conditions <span class="confidence-indicator confidence-high">AI Identified</span></label>';
        const conditions = report.profile.conditions.map(c => c.name).join(', ');
        html += `<textarea class="auto-filled" readonly>${conditions}</textarea>`;
        html += '</div>';
        
        html += '<div class="form-field">';
        html += '<label>How do your conditions limit your ability to work? <span class="confidence-indicator confidence-medium">AI Suggested</span></label>';
        html += `<textarea class="auto-filled" rows="4" readonly>My ${report.profile.conditions[0]?.category || 'medical'} condition(s) significantly limit my ability to perform work activities. I experience persistent symptoms that prevent me from maintaining regular employment and completing tasks consistently over an 8-hour workday.</textarea>`;
        html += '</div>';
    }
    
    html += '<div class="message message-success" style="margin-top: 2rem;">';
    html += '<strong>✨ All forms filled automatically!</strong><br>';
    html += 'AI has filled out your disability application, medical records requests, and other required forms based on your uploaded documents.';
    html += '</div>';
    
    html += '<div style="margin-top: 2rem; display: flex; gap: 1rem;">';
    html += '<button class="btn-primary" onclick="downloadFilledForms()">📥 Download All Forms</button>';
    html += '<button class="btn-secondary" onclick="emailForms()">📧 Email Forms to Me</button>';
    html += '<button class="btn-secondary" onclick="editForms()">✏️ Edit Before Submitting</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
}

function updateProcessStep(stepNumber) {
    const steps = document.querySelectorAll('.process-step');
    steps.forEach((step, index) => {
        if (index < stepNumber - 1) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === stepNumber - 1) {
            step.classList.add('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function downloadFilledForms() {
    alert('✅ All filled forms would be downloaded as a PDF package. In production, this generates actual form PDFs with your information.');
}

function emailForms() {
    alert('✅ Forms would be emailed to your registered email address. In production, this sends the completed forms.');
}

function editForms() {
    alert('Opening form editor... You can review and edit any field before final submission.');
}
