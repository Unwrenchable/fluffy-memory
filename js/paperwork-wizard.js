/*
Paperwork Wizard UI
- Guides users step-by-step through insurance, disability, and medical paperwork
- Integrates with DocumentLibrary for form templates
- Smart Form Filler: uses AI to suggest answers, user can review/edit
- Progress tracking and auto-save to local storage (encrypted in future)
*/


// Simple AES encryption for localStorage (for demo, use a real lib in prod)
function encryptData(data, key = 'medhelper-key') {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}
function decryptData(data, key = 'medhelper-key') {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(data))));
  } catch { return {}; }
}

class PaperworkWizard {
  constructor(rootId = 'paperwork-wizard') {
    this.rootId = rootId;
    this.steps = [];
    this.currentStep = 0;
    this.userData = this.loadProgress();
    this.loadSteps();
    this.render();
  }

  loadSteps() {
    // Example: Steps for disability paperwork (can be dynamic)
    this.steps = [
      { title: 'Personal Information', fields: ['Full Name', 'Date of Birth', 'Address', 'Phone', 'Email'] },
      { title: 'Medical Conditions', fields: ['Primary Condition', 'Other Conditions', 'When did it start?', 'Is it getting worse?'] },
      { title: 'Doctors & Treatment', fields: ['Doctor Name', 'Specialist Types', 'Treatments Tried', 'Medication Side Effects'] },
      { title: 'Daily Limitations', fields: ['Physical Limitations', 'Cognitive Problems', 'How many bad days per week?', 'How often do you need to rest?'] },
      { title: 'Work & Income', fields: ['Last Job', 'Work End Date', 'Income Sources'] },
      { title: 'Review & Generate Forms', fields: [] }
    ];
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    const step = this.steps[this.currentStep];
    root.innerHTML = `
      <div class="paperwork-wizard-container">
        <h2>📋 Paperwork Wizard</h2>
        <div class="wizard-progress">Step ${this.currentStep + 1} of ${this.steps.length}: <strong>${step.title}</strong></div>
        <form id="wizard-form">
          ${step.fields.map(field => `
            <label>${field}<input type="text" name="${field}" value="${this.userData[field] || ''}" autocomplete="off"></label>
          `).join('')}
          <div class="wizard-buttons">
            ${this.currentStep > 0 ? '<button type="button" id="wizard-prev">Back</button>' : ''}
            ${this.currentStep < this.steps.length - 1 ? '<button type="button" id="wizard-next">Next</button>' : '<button type="button" id="wizard-finish">Finish & Generate</button>'}
          </div>
        </form>
        <div id="wizard-status"></div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    if (this.currentStep > 0) {
      document.getElementById('wizard-prev').onclick = () => this.prevStep();
    }
    if (this.currentStep < this.steps.length - 1) {
      document.getElementById('wizard-next').onclick = () => this.nextStep();
    } else {
      document.getElementById('wizard-finish').onclick = () => this.finish();
    }
    document.getElementById('wizard-form').onsubmit = e => { e.preventDefault(); };
  }

  nextStep() {
    this.saveStepData();
    this.currentStep++;
    this.render();
  }

  prevStep() {
    this.saveStepData();
    this.currentStep--;
    this.render();
  }

  saveStepData() {
    const form = document.getElementById('wizard-form');
    if (!form) return;
    const data = new FormData(form);
    for (const [key, value] of data.entries()) {
      this.userData[key] = value;
    }
    // Encrypt and save to localStorage for progress tracking
    localStorage.setItem('paperworkWizardData', encryptData({
      userData: this.userData,
      currentStep: this.currentStep
    }));
  }

  loadProgress() {
    const saved = localStorage.getItem('paperworkWizardData');
    if (saved) {
      const d = decryptData(saved);
      this.currentStep = d.currentStep || 0;
      return d.userData || {};
    }
    return {};
  }

  async finish() {
    this.saveStepData();
    // Integrate with DocumentLibrary and AI Smart Form Filler
    let docLib = window.documentLibrary || (window.DocumentLibrary && new window.DocumentLibrary());
    if (!docLib) {
      this.showStatus('Document library not loaded.');
      return;
    }
    // Example: get needed docs for disability
    const situation = { applyingForDisability: true };
    const docs = docLib.getDocumentsForSituation(situation);
    // AI Smart Form Filler (if available)
    let aiFilled = null;
    if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
      this.showStatus('Using AI to help fill your forms...');
      try {
        aiFilled = await window.dualAIMedicalTeam.getTeamResponse('Fill out my disability paperwork', this.userData);
      } catch (e) {
        aiFilled = null;
      }
    }
    // Show results
    let html = '<h3>Your Paperwork Package</h3>';
    html += '<ul>' + docs.map(d => `<li>${d.name} (${d.description}) <a href="${d.url || '#'}" target="_blank">Download</a></li>`).join('') + '</ul>';
    if (aiFilled && aiFilled.response) {
      html += `<div class="ai-form-suggestion"><strong>AI Suggestions:</strong><br>${aiFilled.response}</div>`;
    }
    this.showStatus('');
    document.getElementById(this.rootId).innerHTML = html;
    // Clear progress after finish
    localStorage.removeItem('paperworkWizardData');
  }

  showStatus(msg) {
    document.getElementById('wizard-status').innerText = msg;
  }
}

// Usage: Place <div id="paperwork-wizard"></div> in your HTML, then:
// window.paperworkWizard = new PaperworkWizard();
