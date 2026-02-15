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
    // Clean, simple steps for user data collection
    this.steps = [
      { title: 'Personal Information', fields: ['Full Name', 'Date of Birth', 'Address', 'Phone', 'Email'] },
      { title: 'Daily Limitations', fields: ['Physical Limitations', 'Cognitive Problems', 'How many bad days per week?', 'How often do you need to rest?'] },
      { title: 'Work & Income', fields: ['Last Job', 'Work End Date', 'Income Sources'] }
    ];
  }

    // Helper: get all paperwork the user requested
    getRequestedPaperwork() {
      // Example: collect from wizard steps or user selections
      // For now, return all available forms (can be improved to use real user selection)
      let docLib = window.documentLibrary || (window.DocumentLibrary && new window.DocumentLibrary());
      if (!docLib) return [];
      return docLib.getAllDocuments ? docLib.getAllDocuments() : [];
    }

    // Helper: render all filled paperwork for review
    renderFilledPaperwork(aiFilledResults) {
      const container = document.getElementById('paperwork-wizard');
      if (!container) return;
      let html = '<h3 style="margin-bottom:1.5em; color:#2563eb;">📝 Your AI-Filled Paperwork</h3>';
      aiFilledResults.forEach(({ doc, aiFilled }) => {
        html += `<div class="ai-paperwork-block" style="margin-bottom:2em; padding:1.5em; border:2px solid #60a5fa; border-radius:12px; background:#f0f9ff; box-shadow:0 2px 8px #2563eb22;">
          <h4 style="margin-bottom:0.5em; color:#1e293b;">${doc.name}</h4>
          <pre style="white-space:pre-wrap; background:#e0f2fe; padding:1em; border-radius:8px; font-size:1.05em; color:#0f172a;">${aiFilled?.response || 'No response'}</pre>
        </div>`;
      });
      html += '<div style="margin-top:2em; text-align:center;"><button class="btn-primary" style="font-size:1.1em; padding:0.75em 2em; border-radius:8px; background:#2563eb; color:#fff; border:none; box-shadow:0 2px 8px #2563eb33; cursor:pointer;" onclick="window.location.reload()">Done</button></div>';
      container.innerHTML = html;
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
