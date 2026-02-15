/*
Coverage Predictor & Appeal Letter Generator
- Uses AI to predict insurance/disability coverage likelihood
- Generates appeal letters using user data and DocumentLibrary templates
*/

class CoverageAndAppealHelper {
  constructor(rootId = 'coverage-appeal-helper') {
    this.rootId = rootId;
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    root.innerHTML = `
      <div class="coverage-appeal-container">
        <h2>🛡️ Coverage Predictor & Appeal Letter Generator</h2>
        <button id="predict-coverage">Predict My Coverage</button>
        <button id="generate-appeal">Generate Appeal Letter</button>
        <div id="coverage-appeal-status"></div>
        <div id="coverage-appeal-result"></div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('predict-coverage').onclick = () => this.predictCoverage();
    document.getElementById('generate-appeal').onclick = () => this.generateAppeal();
  }

  async predictCoverage() {
    this.showStatus('Predicting coverage...');
    let result = 'AI not configured.';
    if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
      try {
        const userData = window.paperworkWizard ? window.paperworkWizard.userData : {};
        const ai = await window.dualAIMedicalTeam.getTeamResponse('Based on this info, what is my likelihood of insurance/disability coverage? Give a percent and a short explanation.', userData);
        result = ai.response;
      } catch (e) {
        result = 'AI error: ' + e.message;
      }
    }
    this.showResult(result);
    this.showStatus('');
  }

  async generateAppeal() {
    this.showStatus('Generating appeal letter...');
    let letter = 'DocumentLibrary or AI not configured.';
    const userData = window.paperworkWizard ? window.paperworkWizard.userData : {};
    let docLib = window.documentLibrary || (window.DocumentLibrary && new window.DocumentLibrary());
    if (docLib && docLib.fillTemplate) {
      letter = docLib.fillTemplate('appeal-letter', userData);
    }
    // Optionally, let AI review/improve the letter
    if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
      try {
        const ai = await window.dualAIMedicalTeam.getTeamResponse('Improve this appeal letter for my case:', { ...userData, letter });
        letter = ai.response;
      } catch (e) {}
    }
    this.showResult(`<pre style="white-space: pre-wrap;">${letter}</pre>`);
    this.showStatus('');
  }

  showStatus(msg) {
    document.getElementById('coverage-appeal-status').innerText = msg;
  }

  showResult(msg) {
    document.getElementById('coverage-appeal-result').innerHTML = msg;
  }
}

// Usage: Place <div id="coverage-appeal-helper"></div> in your HTML, then:
// window.coverageAndAppealHelper = new CoverageAndAppealHelper();
