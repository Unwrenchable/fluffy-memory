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
    const uploadedDocs = getUserUploadedDocuments();
    const hasDocuments = uploadedDocs.length > 0;
    
    return `
        <h2>💬 Virtual Health Assistant</h2>
        
        ${hasDocuments ? `
        <div class="message message-success" style="margin-bottom: 1rem;">
            <strong>📄 ${uploadedDocs.length} Medical Document(s) Available</strong>
            <p style="margin-top: 0.5rem;">I can reference your uploaded documents to provide personalized assistance!</p>
        </div>
        ` : ''}
        
        <div id="chat-messages" style="border: 2px solid #e2e8f0; border-radius: 8px; padding: 1rem; height: 400px; overflow-y: auto; margin-bottom: 1rem; background: #f7fafc;">
            <div class="chat-message assistant">
                <strong>🤖 Assistant:</strong> Hello! I'm your virtual health assistant. I can help you with:
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li>Finding insurance programs</li>
                    <li>Understanding disability benefits</li>
                    <li>Navigating paperwork requirements</li>
                    <li>Locating doctors and specialists</li>
                    <li>Answering questions about medical assistance</li>
                    ${hasDocuments ? '<li><strong>Analyzing your uploaded medical documents</strong> 📄</li>' : ''}
                </ul>
                ${hasDocuments ? '<p style="margin-top: 1rem; padding: 1rem; background: #fff; border-radius: 4px; border-left: 3px solid #48bb78;"><strong>💡 Tip:</strong> Try asking me: "What conditions are in my medical records?" or "Summarize my uploaded documents"</p>' : ''}
                How can I help you today?
            </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="chat-input" placeholder="Type your question..." style="flex: 1;" onkeypress="if(event.key==='Enter') sendChatMessage()">
            <button class="btn-primary" onclick="sendChatMessage()">Send</button>
        </div>
        
        <div style="margin-top: 1rem;">
            <strong>Quick Questions:</strong>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('medicare')">What is Medicare?</button>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('disability')">How do I apply for disability?</button>
            <button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem;" onclick="askQuestion('appeal')">My claim was denied</button>
            ${hasDocuments ? '<button class="btn-secondary" style="margin: 0.25rem; padding: 0.5rem 1rem; background: #48bb78;" onclick="askQuestion(\'documents\')">📄 Review my documents</button>' : ''}
        </div>
    `;
}

function generateDocumentAnalyzerTool() {
    // Get uploaded documents if user is logged in
    const uploadedDocs = getUserUploadedDocuments();
    const hasDocuments = uploadedDocs.length > 0;
    
    return `
        <h2>🔎 AI Document Analyzer</h2>
        <p>Upload medical documents, bills, or insurance letters for AI analysis and recommendations.</p>
        
        ${hasDocuments ? `
        <div class="message message-success" style="margin-bottom: 1rem;">
            <strong>✓ ${uploadedDocs.length} document(s) uploaded</strong>
            <p style="margin-top: 0.5rem;">These documents are now available to the AI assistant for analysis and reference.</p>
        </div>
        ` : ''}
        
        <div class="wizard-step">
            <h4>Upload Documents</h4>
            <div class="upload-zone" id="doc-upload-zone" 
                 ondrop="handleDocumentDrop(event)" 
                 ondragover="handleDragOver(event)"
                 onclick="document.getElementById('document-file-input').click()">
                <div class="upload-icon">📄</div>
                <h3>Drop files here or click to upload</h3>
                <p style="color: #718096; font-size: 0.9rem; margin-top: 0.5rem;">
                    Supported formats: PDF, Word, Images (JPG, PNG)
                </p>
            </div>
            <input type="file" id="document-file-input" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                   style="display: none;" onchange="handleDocumentUpload(event)">
        </div>
        
        <div id="upload-progress" style="display: none; margin-top: 1rem;"></div>
        <div id="analysis-results" style="margin-top: 1rem;"></div>
        
        ${hasDocuments ? `
        <div style="margin-top: 2rem;">
            <h4>📋 Uploaded Documents</h4>
            <div id="uploaded-documents-list">
                ${uploadedDocs.map(doc => `
                    <div class="document-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f7fafc; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>${doc.name}</strong>
                            <p style="color: #718096; font-size: 0.85rem; margin-top: 0.25rem;">
                                ${doc.type} • ${formatFileSize(doc.size)} • ${new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                            ${doc.analyzed ? `<p style="color: #48bb78; font-size: 0.85rem; margin-top: 0.25rem;">✓ Analyzed</p>` : ''}
                        </div>
                        <div>
                            <button class="btn-secondary" style="margin-right: 0.5rem;" onclick="viewDocumentAnalysis('${doc.id}')">View</button>
                            <button class="btn-secondary" onclick="deleteUploadedDocument('${doc.id}')">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="message message-info" style="margin-top: 1rem;">
            <strong>What we can analyze:</strong>
            <ul style="margin-left: 20px;">
                <li>Medical bills - identify covered vs. uncovered charges</li>
                <li>Insurance denials - suggest appeal strategies</li>
                <li>Medical records - extract key information</li>
                <li>EOB statements - explain benefits and costs</li>
                <li>Lab results - interpret findings</li>
                <li>Prescription information - track medications</li>
            </ul>
            <p style="margin-top: 1rem;"><strong>💬 Tip:</strong> After uploading, ask the AI assistant about your documents in the chat!</p>
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
    const messagesDiv = document.getElementById('chat-messages');
    
    if (!input || !input.value.trim()) return;
    
    const userMessage = input.value.trim();
    input.value = '';
    
    // Add user message to chat
    if (messagesDiv) {
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-message user';
        userMsgDiv.innerHTML = `<strong>You:</strong> ${escapeHtml(userMessage)}`;
        userMsgDiv.style.cssText = 'margin-top: 1rem; padding: 0.75rem; background: white; border-radius: 8px; border-left: 3px solid #8b5cf6;';
        messagesDiv.appendChild(userMsgDiv);
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-message assistant';
        typingDiv.innerHTML = '<strong>🤖 Assistant:</strong> <em>Typing...</em>';
        typingDiv.style.cssText = 'margin-top: 1rem; padding: 0.75rem; background: #f0f0f0; border-radius: 8px;';
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Generate AI response with document context
        setTimeout(() => {
            const response = generateAIResponse(userMessage);
            
            // Remove typing indicator
            const typing = document.getElementById('typing-indicator');
            if (typing) typing.remove();
            
            // Add AI response
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.className = 'chat-message assistant';
            aiMsgDiv.innerHTML = `<strong>🤖 Assistant:</strong> ${response}`;
            aiMsgDiv.style.cssText = 'margin-top: 1rem; padding: 0.75rem; background: #e6f7ff; border-radius: 8px; border-left: 3px solid #48bb78;';
            messagesDiv.appendChild(aiMsgDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 1000);
    }
}

function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    const uploadedDocs = getUserUploadedDocuments();
    const hasDocuments = uploadedDocs.length > 0;
    
    // Check if asking about uploaded documents
    if (hasDocuments && (msg.includes('document') || msg.includes('record') || msg.includes('upload') || msg.includes('medical'))) {
        let response = `I can see you have ${uploadedDocs.length} document(s) uploaded. Here's what I found:<br/><br/>`;
        
        uploadedDocs.forEach((doc, index) => {
            response += `<strong>${index + 1}. ${escapeHtml(doc.name)}</strong><br/>`;
            response += `<span style="color: #718096;">${escapeHtml(doc.extractedContent)}</span><br/><br/>`;
        });
        
        response += `Would you like me to help you with anything specific related to these documents?`;
        return response;
    }
    
    // Check for specific medical queries with document context
    if (hasDocuments && (msg.includes('condition') || msg.includes('diagnos') || msg.includes('what') && msg.includes('wrong'))) {
        const conditions = [];
        uploadedDocs.forEach(doc => {
            if (doc.extractedContent.toLowerCase().includes('diabetes')) conditions.push('Type 2 Diabetes');
            if (doc.extractedContent.toLowerCase().includes('hypertension')) conditions.push('Hypertension');
            if (doc.extractedContent.toLowerCase().includes('cholesterol')) conditions.push('High Cholesterol');
        });
        
        if (conditions.length > 0) {
            return `Based on your uploaded documents, I can see the following conditions mentioned:<br/><br/>` +
                   conditions.map(c => `• ${c}`).join('<br/>') +
                   `<br/><br/>Would you like help finding programs or resources for any of these conditions?`;
        }
    }
    
    if (hasDocuments && (msg.includes('medication') || msg.includes('prescription') || msg.includes('drug'))) {
        const meds = [];
        uploadedDocs.forEach(doc => {
            if (doc.extractedContent.toLowerCase().includes('lisinopril')) meds.push('Lisinopril 10mg');
            if (doc.extractedContent.toLowerCase().includes('metformin')) meds.push('Metformin 500mg');
        });
        
        if (meds.length > 0) {
            return `According to your documents, you're taking:<br/><br/>` +
                   meds.map(m => `• ${m}`).join('<br/>') +
                   `<br/><br/>Would you like information about medication assistance programs?`;
        }
    }
    
    // Default responses
    if (msg.includes('insurance') || msg.includes('coverage')) {
        return `I can help you understand insurance coverage options! ${hasDocuments ? 'Based on your uploaded documents, ' : ''}Are you looking for:<br/>• Medicare or Medicaid information<br/>• Private insurance options<br/>• Coverage for specific treatments<br/>• How to appeal a denial`;
    }
    
    if (msg.includes('disability') || msg.includes('ssdi') || msg.includes('ssi')) {
        return `Disability benefits can be complex. ${hasDocuments ? 'I see you have medical documents uploaded which will be helpful! ' : ''}I can help you with:<br/>• SSDI vs SSI eligibility<br/>• Application process<br/>• Required documentation<br/>• Appeal process if denied<br/><br/>What would you like to know?`;
    }
    
    if (msg.includes('appeal') || msg.includes('denied') || msg.includes('reject')) {
        return `I'm sorry to hear about a denial. ${hasDocuments ? 'Your uploaded documents will be valuable for the appeal. ' : ''}Important steps:<br/>1. Review the denial letter carefully<br/>2. Gather supporting medical evidence<br/>3. File within the deadline (usually 60 days)<br/>4. Consider getting professional help<br/><br/>Would you like help generating an appeal letter?`;
    }
    
    // General response
    return `I understand you're asking about "${escapeHtml(userMessage)}". ${hasDocuments ? 'I have access to your ' + uploadedDocs.length + ' uploaded document(s). ' : ''}I'm here to help! Can you provide more details about what you need assistance with?`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function askQuestion(topic) {
    const responses = {
        'medicare': 'Medicare is federal health insurance for people 65+, younger people with disabilities, and people with End-Stage Renal Disease. It has Parts A, B, C, and D covering different services.',
        'disability': 'To apply for disability: 1) Gather medical records, 2) Complete application at ssa.gov or local office, 3) Provide detailed work history, 4) Wait for evaluation (3-5 months), 5) Consider appeal if denied.',
        'appeal': 'If your claim was denied: 1) Review the denial letter carefully, 2) Gather additional supporting documentation, 3) Write a formal appeal within the deadline, 4) Consider getting help from an advocate or attorney.',
        'documents': generateDocumentsSummary()
    };
    
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv && responses[topic]) {
        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.className = 'chat-message assistant';
        aiMsgDiv.innerHTML = `<strong>🤖 Assistant:</strong> ${responses[topic]}`;
        aiMsgDiv.style.cssText = 'margin-top: 1rem; padding: 0.75rem; background: #e6f7ff; border-radius: 8px; border-left: 3px solid #48bb78;';
        messagesDiv.appendChild(aiMsgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } else {
        alert(responses[topic] || 'Question received');
    }
}

function generateDocumentsSummary() {
    const uploadedDocs = getUserUploadedDocuments();
    if (uploadedDocs.length === 0) {
        return 'You haven\'t uploaded any documents yet. Would you like to upload some medical records so I can help analyze them?';
    }
    
    let summary = `You have ${uploadedDocs.length} document(s) uploaded:<br/><br/>`;
    uploadedDocs.forEach((doc, index) => {
        summary += `<strong>${index + 1}. ${escapeHtml(doc.name)}</strong><br/>`;
        summary += `<span style="color: #718096; font-size: 0.9rem;">Uploaded ${new Date(doc.uploadedAt).toLocaleDateString()}</span><br/>`;
        summary += `<span style="color: #4a5568;">${escapeHtml(doc.extractedContent.slice(0, 100))}${doc.extractedContent.length > 100 ? '...' : ''}</span><br/><br/>`;
    });
    
    summary += `Would you like me to analyze specific information from these documents?`;
    return summary;
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

// Document Upload Management
function getUserUploadedDocuments() {
    if (!window.localStorage) return [];
    const docs = localStorage.getItem('medhelper_uploaded_documents');
    return docs ? JSON.parse(docs) : [];
}

function saveUserUploadedDocuments(docs) {
    if (!window.localStorage) return;
    localStorage.setItem('medhelper_uploaded_documents', JSON.stringify(docs));
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
}

function handleDocumentDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processDocumentFiles(files);
    }
}

function handleDocumentUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        processDocumentFiles(files);
    }
}

async function processDocumentFiles(files) {
    const progressDiv = document.getElementById('upload-progress');
    const resultsDiv = document.getElementById('analysis-results');
    
    if (progressDiv) {
        progressDiv.style.display = 'block';
        progressDiv.innerHTML = `
            <div class="message message-info">
                <strong>📤 Uploading and analyzing ${files.length} document(s)...</strong>
                <p>Please wait while we process your files.</p>
            </div>
        `;
    }
    
    // Process each file
    const uploadedDocs = getUserUploadedDocuments();
    const newDocs = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        try {
            // Read file for storage (in production, would upload to backend)
            const fileData = await readFileAsDataURL(file);
            
            // Extract text content simulation (in production, would use OCR/AI)
            const extractedContent = await simulateTextExtraction(file);
            
            // Generate unique ID with fallback for older browsers
            const docId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
                ? crypto.randomUUID() 
                : 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
            
            const docMetadata = {
                id: docId,
                name: file.name,
                type: file.type || getFileTypeFromName(file.name),
                size: file.size,
                uploadedAt: new Date().toISOString(),
                analyzed: true,
                extractedContent: extractedContent,
                // Note: fileData not stored in demo - would be stored on backend in production
                filePreview: fileData.slice(0, 50) // Store minimal preview for demo only
            };
            
            newDocs.push(docMetadata);
            uploadedDocs.push(docMetadata);
        } catch (error) {
            console.error('Error processing file:', file.name, error);
        }
    }
    
    // Save to localStorage
    saveUserUploadedDocuments(uploadedDocs);
    
    // Also save to user's account if logged in
    if (window.authSystem && window.authSystem.isLoggedIn()) {
        newDocs.forEach(doc => {
            window.authSystem.saveDocument({
                type: 'medical_upload',
                name: doc.name,
                metadata: doc
            });
        });
    }
    
    // Show results
    if (progressDiv) {
        progressDiv.innerHTML = `
            <div class="message message-success">
                <strong>✓ Upload Complete!</strong>
                <p>${files.length} document(s) have been uploaded and analyzed.</p>
            </div>
        `;
    }
    
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="message message-success">
                <strong>🤖 AI Analysis Results:</strong>
                <ul style="margin-left: 20px; margin-top: 0.5rem;">
                    <li><strong>Documents processed:</strong> ${files.length}</li>
                    <li><strong>Information extracted:</strong> Medical records, conditions, medications</li>
                    <li><strong>AI Status:</strong> Ready to answer questions about your documents</li>
                </ul>
                <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <strong>💡 Next Steps:</strong> Open the AI Chat Assistant and ask questions like:<br/>
                    • "What medical conditions are mentioned in my documents?"<br/>
                    • "Summarize my medical history"<br/>
                    • "What medications am I taking according to my records?"
                </p>
            </div>
        `;
    }
    
    // Refresh the document list
    setTimeout(() => {
        // Re-render the tool to show uploaded documents
        if (document.getElementById('ai-tool-container')) {
            document.getElementById('ai-tool-container').innerHTML = generateDocumentAnalyzerTool();
        }
    }, 1500);
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

async function simulateTextExtraction(file) {
    // Simulate AI text extraction
    await new Promise(r => setTimeout(r, 500));
    
    // Demo extracted content based on file name
    const fileName = file.name.toLowerCase();
    if (fileName.includes('lab') || fileName.includes('test')) {
        return 'Lab Results: Blood test results showing normal values. Cholesterol: 180 mg/dL, Glucose: 95 mg/dL.';
    } else if (fileName.includes('prescription') || fileName.includes('rx')) {
        return 'Prescription: Lisinopril 10mg, once daily. Metformin 500mg, twice daily with meals.';
    } else if (fileName.includes('bill') || fileName.includes('invoice')) {
        return 'Medical Bill: Office visit $150, Lab work $200. Insurance paid $280, Patient responsibility $70.';
    } else if (fileName.includes('record') || fileName.includes('history')) {
        return 'Medical Record: Patient presents with hypertension and type 2 diabetes. Current medications effective. Follow-up in 3 months.';
    } else {
        return 'Medical document containing patient information, diagnoses, and treatment plans.';
    }
}

function getFileTypeFromName(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const types = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png'
    };
    return types[ext] || 'application/octet-stream';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function viewDocumentAnalysis(docId) {
    const docs = getUserUploadedDocuments();
    const doc = docs.find(d => d.id === docId);
    
    if (!doc) {
        alert('Document not found');
        return;
    }
    
    const resultsDiv = document.getElementById('analysis-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="message message-info">
                <h4>📄 ${doc.name}</h4>
                <p><strong>File Type:</strong> ${doc.type}</p>
                <p><strong>Uploaded:</strong> ${new Date(doc.uploadedAt).toLocaleString()}</p>
                <p><strong>Size:</strong> ${formatFileSize(doc.size)}</p>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e2e8f0;">
                <p><strong>Extracted Content:</strong></p>
                <p style="background: #f7fafc; padding: 1rem; border-radius: 4px; margin-top: 0.5rem;">
                    ${doc.extractedContent || 'No content extracted'}
                </p>
            </div>
        `;
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteUploadedDocument(docId) {
    if (!confirm('Are you sure you want to delete this document?')) {
        return;
    }
    
    let docs = getUserUploadedDocuments();
    docs = docs.filter(d => d.id !== docId);
    saveUserUploadedDocuments(docs);
    
    // Also delete from user's account if logged in
    if (window.authSystem && window.authSystem.isLoggedIn()) {
        window.authSystem.deleteDocument(docId);
    }
    
    // Refresh the document list
    if (document.getElementById('ai-tool-container')) {
        document.getElementById('ai-tool-container').innerHTML = generateDocumentAnalyzerTool();
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
        // Get user data if logged in
        const user = window.authSystem && window.authSystem.isLoggedIn() ? window.authSystem.getCurrentUser() : null;
        
        previewDiv.innerHTML = `
            <div style="background: white; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 5px;">
                <h4>Preview of Generated Appeal Letter:</h4>
                <p style="color: #718096; margin-top: 1rem;">
                    [Your generated professional appeal letter would appear here with proper formatting, 
                    medical justification, and supporting arguments based on your input]
                </p>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="downloadLetter()">💾 Download Letter</button>
                    <button class="btn-secondary" onclick="editLetter()">✏️ Edit Letter</button>
                    ${user ? '<button class="btn-secondary" onclick="saveAndEmailLetter()">📧 Save & Email</button>' : ''}
                </div>
            </div>
        `;
    }
}

function saveAndEmailLetter() {
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        if (confirm('You need to be logged in to save and email documents. Would you like to login now?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    const document = {
        name: 'Disability Appeal Letter',
        description: 'Professional appeal letter for disability denial',
        category: 'Appeals',
        content: 'Your generated appeal letter content...',
        type: 'appeal-letter'
    };
    
    // Save to user's library
    const result = window.authSystem.saveDocument(document);
    
    if (result.success) {
        alert('✓ Letter saved to your account!');
        
        // Show email dialog
        const user = window.authSystem.getCurrentUser();
        if (window.emailSystem && confirm('Would you like to email this letter to yourself now?')) {
            window.emailSystem.showEmailDialog(result.document, user);
        }
    } else {
        alert('Failed to save: ' + result.error);
    }
}

function saveProgress() {
    if (window.authSystem && window.authSystem.isLoggedIn()) {
        const progressData = {
            lastSave: new Date().toISOString(),
            currentPage: window.location.pathname
        };
        
        const result = window.authSystem.saveProgress(progressData);
        
        if (result.success) {
            alert('✓ Progress saved! You can return later to complete this form.');
        } else {
            alert('Failed to save progress: ' + result.error);
        }
    } else {
        alert('⚠️ You are not logged in. Your progress will be lost if you leave this page. Please login to save your progress.');
    }
}

function saveAppointment() {
    if (window.authSystem && window.authSystem.isLoggedIn()) {
        alert('✓ Appointment saved! In production, this would sync with your calendar and send reminders.');
    } else {
        alert('⚠️ Login to save appointments to your account.');
    }
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

    // Initialize AI Assistant, Condition Categorizer, and Intake System
    if (typeof MedicalAIAssistant !== 'undefined') {
        window.aiAssistant = new MedicalAIAssistant();
    }
    if (typeof MedicalConditionCategorizer !== 'undefined') {
        window.conditionCategorizer = new MedicalConditionCategorizer();
    }
    if (typeof ComprehensiveIntakeSystem !== 'undefined') {
        window.intakeSystem = new ComprehensiveIntakeSystem();
    }
    if (typeof DisabilityDoctorFinder !== 'undefined') {
        window.doctorFinder = new DisabilityDoctorFinder();
    }
    if (typeof DailyLimitationDocumentor !== 'undefined') {
        window.limitationDocumentor = new DailyLimitationDocumentor();
    }
    if (typeof LocationBasedServices !== 'undefined') {
        window.locationServices = new LocationBasedServices();
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
    
    // Show typing indicator
    addTypingIndicator();
    
    try {
        let response;
        
        // Try dual AI system first if configured
        if (window.aiTeam && window.appConfig) {
            const status = window.appConfig.getStatus();
            if (status.anyConfigured) {
                response = await window.aiTeam.getTeamResponse(userMessage);
                
                // Add source indicator
                if (response.source && response.source !== 'system') {
                    addAIMessage(`💡 Answered by: ${response.source}`, 'system-info');
                }
            }
        }
        
        // Fallback to rule-based AI assistant if dual AI not configured
        if (!response && window.aiAssistant) {
            response = await window.aiAssistant.getIntelligentGuidance(userMessage);
        }
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response
        if (response) {
            addAIMessage(response.response, 'assistant');
            
            // Add suggestion buttons if available
            if (response.suggestions && response.suggestions.length > 0) {
                addAISuggestions(response.suggestions);
            }
        } else {
            addAIMessage('I apologize, but I encountered an issue. Please try again or configure your AI settings.', 'assistant');
        }
    } catch (error) {
        console.error('AI Error:', error);
        removeTypingIndicator();
        addAIMessage('I apologize for the error. Please check your AI configuration or try again.', 'assistant');
    }
}

function addTypingIndicator() {
    const messagesDiv = document.getElementById('ai-messages');
    const indicator = document.createElement('div');
    indicator.className = 'ai-message assistant typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.setAttribute('aria-label', 'AI is typing');
    indicator.innerHTML = '<span>●</span><span>●</span><span>●</span>';
    messagesDiv.appendChild(indicator);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
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

// ========================================
// COMPREHENSIVE INTAKE SYSTEM
// ========================================

let currentIntakeData = {};

async function startAIGuidedJourney() {
    // First, start comprehensive intake
    if (window.intakeSystem) {
        startComprehensiveIntake();
    } else {
        toggleAIAssistant();
    }
}

function startComprehensiveIntake() {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    if (!window.intakeSystem) {
        alert('Intake system not loaded');
        return;
    }
    
    const sectionData = window.intakeSystem.startIntake();
    renderIntakeSection(sectionData);
    
    modal.style.display = 'block';
}

function renderIntakeSection(sectionData) {
    const container = document.getElementById('ai-tool-container');
    
    if (sectionData.complete) {
        renderIntakeComplete(sectionData);
        return;
    }
    
    const section = sectionData.section;
    const progress = sectionData.progress;
    
    let html = '<div class="intake-container">';
    
    // Progress bar
    html += '<div class="progress-bar-container">';
    html += `<div class="progress-bar" style="width: ${progress.percentage}%"></div>`;
    html += `<div class="progress-text">Step ${progress.current} of ${progress.total}</div>`;
    html += '</div>';
    
    // Section header
    html += `<h2>${section.title}</h2>`;
    html += `<p class="section-description">${section.description}</p>`;
    
    // Questions
    html += '<form id="intake-form" onsubmit="submitIntakeSection(event)">';
    
    section.questions.forEach((q, index) => {
        html += '<div class="form-field intake-question">';
        html += `<label><strong>${q.question}</strong> ${q.required ? '<span class="required">*</span>' : ''}</label>`;
        
        if (q.helper) {
            html += `<p class="helper-text">${q.helper}</p>`;
        }
        
        if (q.type === 'text') {
            html += `<input type="text" name="${q.id}" ${q.required ? 'required' : ''} placeholder="${q.placeholder || ''}">`;
        } else if (q.type === 'textarea') {
            html += `<textarea name="${q.id}" rows="4" ${q.required ? 'required' : ''} placeholder="${q.placeholder || ''}"></textarea>`;
        } else if (q.type === 'select') {
            html += `<select name="${q.id}" ${q.required ? 'required' : ''}>`;
            html += '<option value="">Select an option...</option>';
            q.options.forEach(opt => {
                html += `<option value="${opt}">${opt}</option>`;
            });
            html += '</select>';
        } else if (q.type === 'checkboxes') {
            q.options.forEach(opt => {
                html += `<label class="checkbox-label">`;
                html += `<input type="checkbox" name="${q.id}" value="${opt}"> ${opt}`;
                html += `</label>`;
            });
        }
        
        html += '</div>';
    });
    
    html += '<div class="intake-navigation">';
    html += '<button type="submit" class="btn-primary btn-large">Continue →</button>';
    html += '</div>';
    
    html += '</form>';
    html += '</div>';
    
    container.innerHTML = html;
}

function submitIntakeSection(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const answers = {};
    
    // Process form data
    for (const [key, value] of formData.entries()) {
        if (answers[key]) {
            // Multiple values (checkboxes)
            if (Array.isArray(answers[key])) {
                answers[key].push(value);
            } else {
                answers[key] = [answers[key], value];
            }
        } else {
            answers[key] = value;
        }
    }
    
    // Store current section data
    currentIntakeData = { ...currentIntakeData, ...answers };
    
    // Get next section
    const nextSection = window.intakeSystem.processSection(answers);
    renderIntakeSection(nextSection);
}

function renderIntakeComplete(data) {
    const container = document.getElementById('ai-tool-container');
    const analysis = data.analysis;
    const recommendations = data.recommendations;
    
    let html = '<div class="intake-complete">';
    html += '<div class="success-header">';
    html += '<h2>✅ We Now Understand Your Situation</h2>';
    html += '<p>Based on everything you told us, here\'s your personalized plan:</p>';
    html += '</div>';
    
    // Urgency alert
    if (analysis.urgencyLevel === 'CRITICAL' || analysis.urgencyLevel === 'HIGH') {
        html += `<div class="alert alert-${analysis.urgencyLevel.toLowerCase()}">`;
        html += `<strong>⚠️ ${analysis.urgencyLevel} PRIORITY</strong><br>`;
        html += 'Your situation requires immediate action. Follow the steps below carefully.';
        html += '</div>';
    }
    
    // Priority 1 Actions
    if (recommendations.priority1.length > 0) {
        html += '<div class="recommendations-section priority-1">';
        html += '<h3>🚨 DO THESE FIRST (Most Important)</h3>';
        recommendations.priority1.forEach(rec => {
            html += '<div class="recommendation-card urgent">';
            html += `<h4>${rec.action}</h4>`;
            html += `<p><strong>Why:</strong> ${rec.why}</p>`;
            html += `<p><strong>How:</strong> ${rec.how}</p>`;
            html += '</div>';
        });
        html += '</div>';
    }
    
    // Special Instructions
    if (recommendations.specialInstructions.length > 0) {
        html += '<div class="special-instructions">';
        html += '<h3>📌 Important Things to Know:</h3>';
        html += '<ul>';
        recommendations.specialInstructions.forEach(instruction => {
            html += `<li>${instruction}</li>`;
        });
        html += '</ul>';
        html += '</div>';
    }
    
    // Next Steps
    html += '<div class="next-steps-section">';
    html += '<h3>📋 Your Step-by-Step Action Plan:</h3>';
    recommendations.nextSteps.forEach(step => {
        html += `<div class="step-card ${step.urgent ? 'urgent' : ''}">`;
        html += `<div class="step-number">${step.number}</div>`;
        html += '<div class="step-content">';
        html += `<h4>${step.action}</h4>`;
        html += `<p>${step.description}</p>`;
        html += `<p class="how-to"><strong>How to do this:</strong> ${step.howTo}</p>`;
        html += '</div>';
        html += '</div>';
    });
    html += '</div>';
    
    // Action buttons
    html += '<div class="action-buttons">';
    
    if (analysis.needsDoctorHelp) {
        html += '<button onclick="startDoctorFinderTool()" class="btn-primary btn-large">Find Disability-Supportive Doctors</button>';
    }
    
    if (analysis.wasDenied) {
        html += '<button onclick="openAITool(\'appeal-generator\')" class="btn-primary btn-large">Help Me Write an Appeal</button>';
    }
    
    html += '<button onclick="openAITool(\'document-autofill\')" class="btn-secondary">Upload Documents & Auto-Fill Forms</button>';
    html += '<button onclick="closeAITool()" class="btn-secondary">Start Using Tools</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
}

// ========================================
// DOCTOR FINDER & LIMITATION DOCUMENTOR
// ========================================

function startDoctorFinderTool() {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    if (!window.doctorFinder) {
        alert('Doctor finder not loaded');
        return;
    }
    
    // Get user's condition from intake if available
    const condition = currentIntakeData.primary_condition || 'your condition';
    const doctorInfo = window.doctorFinder.findDoctorsForCondition(condition);
    
    let html = '<div class="doctor-finder-tool">';
    html += '<h2>🩺 Finding Disability-Supportive Doctors</h2>';
    html += '<div class="alert alert-info">';
    html += '<strong>The Problem:</strong> Many doctors don\'t understand disability requirements or won\'t fill out forms. You need doctors who will PROPERLY document your limitations.';
    html += '</div>';
    
    // Recommended specialists
    html += '<div class="section-box">';
    html += '<h3>👨‍⚕️ Doctors You Should See:</h3>';
    html += '<ul class="specialist-list">';
    doctorInfo.specialties.forEach(spec => {
        html += `<li><strong>${spec}</strong></li>`;
    });
    html += '</ul>';
    html += '</div>';
    
    // How to find them
    html += '<div class="section-box">';
    html += '<h3>📍 How to Find These Doctors:</h3>';
    html += '<ol>';
    doctorInfo.howToFind.forEach(method => {
        html += `<li>${method}</li>`;
    });
    html += '</ol>';
    html += '</div>';
    
    // What to ask
    html += '<div class="section-box">';
    html += '<h3>❓ What to Ask When Calling:</h3>';
    html += '<div style="white-space: pre-line;">';
    doctorInfo.whatToAsk.forEach(question => {
        html += question + '\n';
    });
    html += '</div>';
    html += '</div>';
    
    // Red and green flags
    html += '<div class="flags-container">';
    html += '<div class="red-flags">';
    html += '<h4>🚩 RED FLAGS (Avoid These Doctors):</h4>';
    html += '<ul>';
    doctorInfo.redFlags.forEach(flag => {
        html += `<li>${flag}</li>`;
    });
    html += '</ul>';
    html += '</div>';
    
    html += '<div class="green-flags">';
    html += '<h4>✅ GREEN FLAGS (Good Signs):</h4>';
    html += '<ul>';
    doctorInfo.greenFlags.forEach(flag => {
        html += `<li>${flag}</li>`;
    });
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    
    // Action buttons
    html += '<div style="margin-top: 2rem;">';
    html += '<button onclick="generateDoctorLetter()" class="btn-primary">Generate Letter for My Doctor</button>';
    html += '<button onclick="startLimitationDocumentor()" class="btn-secondary">Document My Limitations (No Words Needed)</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
    modal.style.display = 'block';
}

function startLimitationDocumentor() {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    if (!window.limitationDocumentor) {
        alert('Limitation documentor not loaded');
        return;
    }
    
    const questionnaire = window.limitationDocumentor.generateQuestionnaire();
    
    let html = '<div class="limitation-documentor">';
    html += `<h2>${questionnaire.title}</h2>`;
    html += `<p class="subtitle">${questionnaire.subtitle}</p>`;
    html += `<div class="alert alert-success">${questionnaire.instructions}</div>`;
    
    html += '<p><strong>This tool helps if you struggle to "put into words" how your condition affects you.</strong></p>';
    html += '<p>Just select options that match your situation - AI will convert it to proper medical documentation.</p>';
    
    html += '<form id="limitation-form" onsubmit="submitLimitations(event)">';
    
    // Render each category
    for (const [key, category] of Object.entries(questionnaire.categories)) {
        html += `<div class="limitation-category">`;
        html += `<h3>${category.icon} ${category.title}</h3>`;
        
        category.activities.forEach(activity => {
            html += `<div class="limitation-question">`;
            html += `<label><strong>${activity.activity}</strong></label>`;
            html += `<select name="${key}_${activity.id}" required>`;
            html += '<option value="">Select...</option>';
            activity.options.forEach(opt => {
                html += `<option value="${opt}">${opt}</option>`;
            });
            html += `</select>`;
            html += `</div>`;
        });
        
        html += `</div>`;
    }
    
    html += '<button type="submit" class="btn-primary btn-large">Generate My Documentation</button>';
    html += '</form>';
    html += '</div>';
    
    container.innerHTML = html;
    modal.style.display = 'block';
}

function submitLimitations(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const responses = {};
    
    // Organize responses by category
    for (const [key, value] of formData.entries()) {
        const parts = key.split('_');
        const category = parts[0];
        const activityId = parts.slice(1).join('_');
        
        if (!responses[category]) {
            responses[category] = {};
        }
        responses[category][activityId] = value;
    }
    
    // Process with limitation documentor
    if (window.limitationDocumentor) {
        const documentation = window.limitationDocumentor.processResponses(responses);
        displayLimitationDocumentation(documentation);
    }
}

function displayLimitationDocumentation(documentation) {
    const container = document.getElementById('ai-tool-container');
    
    let html = '<div class="limitation-results">';
    html += '<h2>✅ Your Limitations Documented!</h2>';
    html += '<p><strong>You did it! Your limitations are now in proper medical language.</strong></p>';
    
    html += '<div class="documentation-box">';
    html += '<h3>📄 Generated Documentation:</h3>';
    html += '<div class="narrative-summary">';
    html += '<pre>' + documentation.narrativeSummary + '</pre>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="rfc-recommendations">';
    html += '<h3>RFC (Residual Functional Capacity) Recommendations:</h3>';
    html += '<p>Give this to your doctor - it shows what you CAN and CANNOT do:</p>';
    html += '<ul>';
    html += `<li><strong>Physical Capacity:</strong> ${documentation.rfcRecommendations.physicalCapacity}</li>`;
    html += `<li><strong>Standing/Walking:</strong> ${documentation.rfcRecommendations.standingWalking}</li>`;
    html += `<li><strong>Concentration:</strong> ${documentation.rfcRecommendations.mentalCapacity.concentration}</li>`;
    html += `<li><strong>Off-Task Time:</strong> ${documentation.rfcRecommendations.offTaskTime}</li>`;
    html += `<li><strong>Expected Absences:</strong> ${documentation.rfcRecommendations.absences}</li>`;
    html += '</ul>';
    html += '</div>';
    
    html += '<div class="action-buttons">';
    html += '<button onclick="downloadLimitationDoc()" class="btn-primary">📥 Download Documentation</button>';
    html += '<button onclick="generateDoctorLetter()" class="btn-secondary">Generate Letter for Doctor</button>';
    html += '<button onclick="emailForms()" class="btn-secondary">Email to Me</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
}

function generateDoctorLetter() {
    if (!window.limitationDocumentor) {
        alert('System not loaded');
        return;
    }
    
    const patientName = currentIntakeData.first_name || 'Patient';
    const condition = currentIntakeData.primary_condition || 'my medical condition';
    const letter = window.limitationDocumentor.generateDoctorLetter(patientName, condition, {});
    
    alert('Doctor letter generated! In production, this would create a downloadable PDF letter to give your doctor.\n\nThe letter explains exactly what you need documented for your disability application.');
}

function downloadLimitationDoc() {
    alert('✅ Your limitation documentation would be downloaded as a PDF. In production, this creates a professional document to give your doctor.');
}

// ========================================
// UNIVERSAL HELP & LOCATION SERVICES
// ========================================

// Show pathway for uninsured people
function showUninsuredPathway() {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    if (!window.locationServices) {
        alert('Location services not loaded');
        return;
    }
    
    const pathway = window.locationServices.generateUninsuredPathway({ general: true });
    
    let html = '<div class="pathway-container">';
    html += `<h2>${pathway.title}</h2>`;
    html += `<p class="subtitle">${pathway.subtitle}</p>`;
    
    html += '<div class="alert alert-success">';
    html += '<strong>✅ YOU CAN GET CARE - Even with NO Insurance!</strong><br>';
    html += 'These programs exist specifically to help people without insurance. You have a RIGHT to healthcare.';
    html += '</div>';
    
    // Urgent care section
    html += '<div class="pathway-section">';
    html += '<h3>🚨 If You Need Care RIGHT NOW:</h3>';
    pathway.urgentCare.forEach(step => {
        html += `<div class="pathway-step">`;
        html += `<div class="step-number">${step.step}</div>`;
        html += '<div class="step-content">';
        html += `<h4>${step.action}</h4>`;
        html += `<p>${step.details}</p>`;
        html += `<p><strong>Cost:</strong> ${step.cost}</p>`;
        if (step.services) html += `<p><strong>Services:</strong> ${step.services}</p>`;
        html += '</div></div>';
    });
    html += '</div>';
    
    // Ongoing care
    html += '<div class="pathway-section">';
    html += '<h3>🏥 For Ongoing Medical Care:</h3>';
    pathway.ongoingCare.forEach(step => {
        html += `<div class="pathway-step">`;
        html += `<div class="step-number">${step.step}</div>`;
        html += '<div class="step-content">';
        html += `<h4>${step.action}</h4>`;
        html += `<p><strong>Why:</strong> ${step.why}</p>`;
        if (step.howTo) html += `<p><strong>How:</strong> ${step.howTo}</p>`;
        html += `<p><strong>Cost:</strong> ${step.cost}</p>`;
        html += '</div></div>';
    });
    html += '</div>';
    
    // Prescriptions
    html += '<div class="pathway-section">';
    html += '<h3>💊 Getting Prescriptions Without Insurance:</h3>';
    pathway.prescriptions.forEach(program => {
        html += `<div class="program-card">`;
        html += `<h4>${program.name}</h4>`;
        html += `<p>${program.description}</p>`;
        html += `<p><strong>Who qualifies:</strong> ${program.eligibility}</p>`;
        html += `<p><strong>How to apply:</strong> ${program.howToApply}</p>`;
        if (program.noQuestionsAsked) {
            html += `<span class="badge badge-success">✅ No questions asked!</span>`;
        }
        html += `</div>`;
    });
    html += '</div>';
    
    html += '<div class="action-buttons">';
    html += '<button onclick="requestLocation()" class="btn-primary">Find Care Near Me</button>';
    html += '<button onclick="startComprehensiveIntake()" class="btn-secondary">Get Personalized Help</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
    modal.style.display = 'block';
}

// Show dental care pathway
function showDentalPathway() {
    const modal = document.getElementById('ai-tool-modal');
    const container = document.getElementById('ai-tool-container');
    
    if (!window.locationServices) {
        alert('Location services not loaded');
        return;
    }
    
    const pathway = window.locationServices.generateDentalPathway('general');
    
    let html = '<div class="pathway-container">';
    html += `<h2>${pathway.title}</h2>`;
    html += `<p class="subtitle">${pathway.subtitle}</p>`;
    
    html += '<div class="alert alert-success">';
    html += '<strong>🦷 FREE DENTAL CARE EXISTS!</strong><br>';
    html += 'Many programs give COMPLETELY FREE dental care - even dentures. Some ask NO questions at all.';
    html += '</div>';
    
    // Immediate options
    html += '<div class="pathway-section">';
    html += '<h3>🚨 Get Dental Care THIS WEEK:</h3>';
    pathway.immediate.forEach(option => {
        html += `<div class="dental-option priority-${option.priority.toLowerCase()}">`;
        html += `<div class="priority-badge">${option.priority} PRIORITY</div>`;
        html += `<h4>${option.option}</h4>`;
        html += `<p>${option.description}</p>`;
        html += `<p><strong>Who can go:</strong> ${option.eligibility}</p>`;
        html += `<p><strong>Cost:</strong> ${option.cost}</p>`;
        html += '<div class="how-to-box">';
        html += '<h5>How to do this:</h5>';
        html += '<ol>';
        option.howTo.forEach(step => {
            html += `<li>${step}</li>`;
        });
        html += '</ol>';
        html += '</div>';
        if (option.websites) {
            html += '<p><strong>Websites:</strong> ';
            option.websites.forEach(site => {
                html += `<a href="https://${site}" target="_blank">${site}</a> `;
            });
            html += '</p>';
        }
        html += `</div>`;
    });
    html += '</div>';
    
    // Comprehensive care
    html += '<div class="pathway-section">';
    html += '<h3>🏥 For Complete Dental Restoration (FREE):</h3>';
    pathway.comprehensive.forEach(option => {
        html += `<div class="program-card comprehensive">`;
        html += `<h4>${option.option}</h4>`;
        html += `<p>${option.description}</p>`;
        html += `<p><strong>Who qualifies:</strong> ${option.eligibility}</p>`;
        html += `<p><strong>What's covered:</strong> ${option.coverage}</p>`;
        html += `<p class="cost-free"><strong>Cost: ${option.cost}</strong></p>`;
        html += '<div class="how-to-box">';
        html += '<h5>How to apply:</h5>';
        html += '<ol>';
        option.howTo.forEach(step => {
            html += `<li>${step}</li>`;
        });
        html += '</ol>';
        html += '</div>';
        if (option.website) {
            html += `<p><strong>Apply at:</strong> <a href="https://${option.website}" target="_blank">${option.website}</a></p>`;
        }
        html += `</div>`;
    });
    html += '</div>';
    
    html += '<div class="action-buttons">';
    html += '<button onclick="findDentalNearMe()" class="btn-primary">Find Dental Care Near Me</button>';
    html += '<button onclick="startComprehensiveIntake()" class="btn-secondary">Get Full Help</button>';
    html += '</div>';
    
    html += '</div>';
    
    container.innerHTML = html;
    modal.style.display = 'block';
}

// Show help for denials
function startDenialHelp() {
    if (window.intakeSystem) {
        // Start intake but pre-fill that they were denied
        startComprehensiveIntake();
        setTimeout(() => {
            addAIMessage("I see you were denied. Don't give up! Most successful applicants are denied first. Let me help you appeal and WIN.", 'assistant');
        }, 1000);
    } else {
        openAITool('appeal-generator');
    }
}

// Location services
async function requestLocation() {
    if (!window.locationServices) {
        alert('Location services not loaded');
        return;
    }
    
    const resultsDiv = document.getElementById('location-results');
    const facilitiesDiv = document.getElementById('nearest-facilities');
    
    resultsDiv.style.display = 'block';
    facilitiesDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>Getting your location...</p></div>';
    
    try {
        const location = await window.locationServices.getUserLocation();
        displayNearestFacilities(location);
    } catch (error) {
        facilitiesDiv.innerHTML = '<div class="message message-error">Could not get your location. Please enter it manually below.</div>';
    }
}

function setManualLocation() {
    const input = document.getElementById('manual-location');
    const location = input.value.trim();
    
    if (!location) {
        alert('Please enter your ZIP code or city');
        return;
    }
    
    if (window.locationServices) {
        const loc = window.locationServices.setLocationManually(location);
        displayNearestFacilities(loc);
    }
}

function displayNearestFacilities(location) {
    const resultsDiv = document.getElementById('location-results');
    const facilitiesDiv = document.getElementById('nearest-facilities');
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Determine user needs (could be from intake data)
    const userNeeds = {
        uninsured: true,
        dental: false,
        prescriptions: true
    };
    
    const recommendations = window.locationServices.generateLocationRecommendations(userNeeds, location);
    
    let html = '<div class="nearest-facilities-container">';
    
    recommendations.closestFacilities.forEach(facility => {
        html += '<div class="facility-recommendation">';
        html += `<h4>${facility.type}</h4>`;
        html += `<p><strong>Why:</strong> ${facility.why}</p>`;
        
        const findInfo = facility.find;
        html += '<div class="find-instructions">';
        html += '<h5>How to find near you:</h5>';
        html += `<pre style="white-space: pre-wrap; font-family: inherit;">${findInfo.searchInstructions}</pre>`;
        
        if (findInfo.nationalResources.length > 0) {
            html += '<p><strong>National Resources:</strong></p>';
            html += '<ul>';
            findInfo.nationalResources.forEach(resource => {
                html += `<li>${resource}</li>`;
            });
            html += '</ul>';
        }
        html += '</div>';
        html += '</div>';
    });
    
    if (recommendations.callToday.length > 0) {
        html += '<div class="call-today-section">';
        html += '<h4>📞 Call or Search Today:</h4>';
        recommendations.callToday.forEach(action => {
            html += `<div class="call-action">`;
            html += `<strong>${action.action}</strong><br>`;
            html += `${action.why}<br>`;
            html += `<em>${action.how}</em>`;
            html += `</div>`;
        });
        html += '</div>';
    }
    
    html += '</div>';
    
    facilitiesDiv.innerHTML = html;
}

function findDentalNearMe() {
    closeAITool();
    document.getElementById('location-services').scrollIntoView({ behavior: 'smooth' });
    
    // Show message to use location
    setTimeout(() => {
        alert('Enter your location above to find free dental care near you!');
    }, 500);
}

// Document Checklist Function
function showDocumentChecklist() {
    const checklist = `
📋 COMPLETE DISABILITY APPLICATION CHECKLIST

Before you submit your application, make sure you have:

✅ PERSONAL INFORMATION
□ Social Security Number
□ Birth Certificate or proof of age
□ Proof of citizenship or lawful alien status
□ Military discharge papers (DD-214) if applicable

✅ MEDICAL INFORMATION
□ Names, addresses, and phone numbers of ALL doctors
□ Names and addresses of ALL hospitals/clinics
□ Dates of all medical appointments
□ List of ALL medications (names and dosages)
□ List of ALL medical tests (MRIs, X-rays, blood work, etc.)
□ Dates of all hospitalizations

✅ WORK INFORMATION
□ Last 15 years of work history (jobs, dates, duties)
□ W-2 forms or tax returns
□ Pay stubs if still working

✅ OTHER IMPORTANT DOCUMENTS
□ SSA-827 forms completed for EACH doctor/hospital
□ RFC forms from treating physicians
□ Letters from doctors describing your limitations
□ Your own written statement about how your condition affects daily life

⚠️ CRITICAL: The more documentation you provide, the better your chances!

Don't let missing documents delay your case. Request medical records NOW.
    `;
    
    showInfoModal(checklist);
}

// Common Mistakes Function
function showCommonMistakes() {
    const mistakes = `
⚠️ TOP 10 MISTAKES THAT LEAD TO DENIAL

1. ❌ NOT FILLING OUT SSA-827 FORMS FOR ALL PROVIDERS
   → Fill out one for EVERY doctor, hospital, clinic you've visited

2. ❌ INCOMPLETE WORK HISTORY
   → List ALL jobs from last 15 years, even part-time or cash jobs

3. ❌ NOT BEING SPECIFIC ABOUT LIMITATIONS
   → Don't say "I have pain" - say "I can only sit for 15 minutes before severe pain"

4. ❌ MISSING DOCTOR APPOINTMENTS
   → Regular treatment shows your condition is serious and ongoing

5. ❌ NOT FOLLOWING TREATMENT PLANS
   → If you don't take prescribed medications, SSA assumes you're not that sick

6. ❌ SAYING YOU CAN DO MORE THAN YOU ACTUALLY CAN
   → Be honest about your WORST days, not your best days

7. ❌ NOT GETTING RFC FORMS FROM YOUR DOCTOR
   → These are CRITICAL evidence that many applicants forget

8. ❌ WAITING TOO LONG TO APPLY
   → Apply as soon as you become disabled - benefits only go back 12 months

9. ❌ NOT APPEALING A DENIAL
   → Most people are denied first time - you MUST appeal to win!

10. ❌ NOT DOCUMENTING MENTAL HEALTH CONDITIONS
    → Depression, anxiety, PTSD count! Don't leave them out

💡 TIP: Use this app to avoid these mistakes! We guide you through each step correctly.
    `;
    
    showInfoModal(mistakes);
}

// Show info modal
function showInfoModal(content) {
    const modal = document.getElementById('info-modal');
    const modalContent = document.getElementById('info-modal-content');
    if (modal && modalContent) {
        modalContent.textContent = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close info modal
function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize document library on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document library features loaded');
});
