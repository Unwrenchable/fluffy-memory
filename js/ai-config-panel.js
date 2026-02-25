/*
AI Configuration Panel UI
- Allows user to enter X.AI and HuggingFace API keys
- Select team mode (Auto, X.AI Only, HuggingFace Only, Both)
- Test connections and show status
- Keys are stored in memory only (not persisted)
*/

const AI_CONFIG_DEFAULTS = {
  xaiKey: '',
  huggingFaceKey: '',
  teamMode: 'auto',
  status: {
    xai: null,
    huggingface: null
  }
};

class AIConfigPanel {
  constructor(rootId = 'ai-config-panel') {
    this.rootId = rootId;
    this.state = { ...AI_CONFIG_DEFAULTS };
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    root.innerHTML = `
      <div class="ai-config-container">
        <h2>⚙️ AI Configuration</h2>
        <label>X.AI API Key <input type="password" id="xai-key" value="${this.state.xaiKey}" autocomplete="off"></label>
        <label>HuggingFace API Key <input type="password" id="hf-key" value="${this.state.huggingFaceKey}" autocomplete="off"></label>
        <label>Team Mode
          <select id="team-mode">
            <option value="auto">Auto (Smart Routing)</option>
            <option value="xai-only">X.AI Only</option>
            <option value="huggingface-only">HuggingFace Only</option>
            <option value="both">Both (Dual Response)</option>
          </select>
        </label>
        <button id="save-ai-config">Save Configuration</button>
        <button id="test-ai-connection">🧪 Test AI Connection</button>
        <div id="ai-config-status"></div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('save-ai-config').onclick = () => this.saveConfig();
    document.getElementById('test-ai-connection').onclick = () => this.testConnection();
    document.getElementById('team-mode').value = this.state.teamMode;
  }

  saveConfig() {
    this.state.xaiKey = document.getElementById('xai-key').value.trim();
    this.state.huggingFaceKey = document.getElementById('hf-key').value.trim();
    this.state.teamMode = document.getElementById('team-mode').value;
    // Sync keys into the unified config store so anyConfigured() returns true
    if (window.appConfig) {
      window.appConfig.setApiKeys(this.state.xaiKey, this.state.huggingFaceKey);
      window.appConfig.setTeamMode(this.state.teamMode);
    }
    // Also push keys to the AI executor
    if (window.dualAIMedicalTeam) {
      window.dualAIMedicalTeam.setApiKeys(this.state.xaiKey, this.state.huggingFaceKey);
      window.dualAIMedicalTeam.setTeamMode(this.state.teamMode);
    }
    // Sync to MedicalAIAssistant as well
    if (window.aiAssistant && this.state.huggingFaceKey) {
      window.aiAssistant.setApiKey(this.state.huggingFaceKey);
    }
    this.showStatus('✅ Configuration saved.');
  }

  async testConnection() {
    this.showStatus('Testing connections…');
    // Persist current form values before testing
    this.saveConfig();
    let xaiStatus = 'Not tested', hfStatus = 'Not tested';
    if (window.dualAIMedicalTeam) {
      try {
        // setApiKeys / setTeamMode are synchronous — no await needed
        window.dualAIMedicalTeam.setApiKeys(this.state.xaiKey, this.state.huggingFaceKey);
        window.dualAIMedicalTeam.setTeamMode(this.state.teamMode);
        // Test X.AI
        if (this.state.xaiKey) {
          const res = await window.dualAIMedicalTeam.getXAIResponse('Test connection');
          xaiStatus = res && res.response ? '✅ Connected' : '❌ Failed';
        } else {
          xaiStatus = 'No key';
        }
        // Test HuggingFace
        if (this.state.huggingFaceKey) {
          const res = await window.dualAIMedicalTeam.getHuggingFaceResponse('Test connection');
          hfStatus = res && res.response ? '✅ Connected' : '❌ Failed';
        } else {
          hfStatus = 'No key';
        }
      } catch (e) {
        this.showStatus('Error testing connection: ' + e.message);
        return;
      }
    }
    this.showStatus(`X.AI: ${xaiStatus} | HuggingFace: ${hfStatus}`);
  }

  showStatus(msg) {
    document.getElementById('ai-config-status').innerText = msg;
  }
}

// Usage: Place <div id="ai-config-panel"></div> in your HTML, then:
// window.aiConfigPanel = new AIConfigPanel();
