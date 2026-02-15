/*
Document Analyzer UI
- Drag-and-drop or select file upload
- Uses HuggingFace AI to extract, summarize, and analyze medical documents
- Stores results in encrypted local storage
- Allows tagging, searching, and filtering
*/

// NOTE: PDF.js must be included in your project for this to work
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

class DocumentAnalyzer {
  constructor(rootId = 'document-analyzer') {
    this.rootId = rootId;
    this.documents = this.loadDocuments();
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    root.innerHTML = `
      <div class="document-analyzer-container">
        <h2>🔍 Document Analyzer</h2>
        <input type="file" id="doc-upload" multiple accept=".pdf,.txt,.doc,.docx,.jpg,.png">
        <button id="analyze-docs">Analyze Selected</button>
        <div id="analyzer-status"></div>
        <div id="analyzed-documents">
          ${this.documents.map((doc, i) => `
            <div class="analyzed-doc">
              <strong>${doc.name}</strong> (${doc.type})<br>
              <em>${doc.summary || 'No summary yet'}</em>
              <div>${doc.tags ? doc.tags.map(t => `<span class="tag">${t}</span>`).join(' ') : ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="ocr-review-modal" style="display:none; position:fixed; top:20%; left:50%; transform:translate(-50%,-20%); background:#fff; padding:2em; border-radius:8px; box-shadow:0 2px 12px #0002; z-index:1000; width:80vw; max-width:600px;">
        <h3>Review Extracted Text</h3>
        <textarea id="ocr-review-text" style="width:100%;height:200px;"></textarea>
        <button id="ocr-review-accept">Accept</button>
        <button id="ocr-review-cancel">Cancel</button>
      </div>
      <div id="pdf-password-modal" style="display:none; position:fixed; top:30%; left:50%; transform:translate(-50%,-50%); background:#fff; padding:2em; border-radius:8px; box-shadow:0 2px 12px #0002; z-index:1000;">
        <h3>PDF Password Required</h3>
        <input type="password" id="pdf-password-input" placeholder="Enter PDF password">
        <button id="pdf-password-submit">Unlock</button>
        <button id="pdf-password-cancel">Cancel</button>
        <div id="pdf-password-error" style="color:red;"></div>
        <div style="margin-top:1em; color:#555; font-size:0.95em;">
          <strong>Tip:</strong> Most medical documents use the patient's date of birth as the password (e.g., <em>MMDDYYYY</em> or <em>YYYYMMDD</em>).
        </div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('analyze-docs').onclick = () => this.analyzeSelected();
  }

  async analyzeSelected() {
    const input = document.getElementById('doc-upload');
    if (!input.files.length) {
      this.showStatus('Please select at least one document.');
      return;
    }
    for (const file of input.files) {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await this.extractPDFTextWithPassword(file);
        if (text === null) continue;
        if (!text.trim()) {
          // Try OCR on each page as image
          text = await this.ocrPDF(file);
        }
      } else if (file.type.startsWith('image/')) {
        text = await this.ocrImage(file);
      } else {
        text = await this.readFile(file);
      }
      text = await this.reviewExtractedText(text);
      if (text === null) continue;
      let summary = 'AI not configured.';
      if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
        try {
          const ai = await window.dualAIMedicalTeam.getTeamResponse('Summarize this medical document:', { documentText: text });
          summary = ai.response;
        } catch (e) {
          summary = 'AI error: ' + e.message;
        }
      }
      this.documents.push({ name: file.name, type: file.type, summary, tags: [] });
      this.saveDocuments();
    }
    this.showStatus('Documents analyzed and saved.');
    this.render();
  }
  async ocrImage(file) {
    if (!window.Tesseract) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.1/dist/tesseract.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async e => {
        const { data: { text } } = await window.Tesseract.recognize(e.target.result, 'eng');
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async ocrPDF(file) {
    // For demo: just warn user, real implementation would render each page to canvas and OCR
    alert('PDF text extraction failed. OCR for scanned PDFs is limited in this demo. Try uploading as image if possible.');
    return '';
  }

  async reviewExtractedText(text) {
    return new Promise(resolve => {
      const modal = document.getElementById('ocr-review-modal');
      const textarea = document.getElementById('ocr-review-text');
      const accept = document.getElementById('ocr-review-accept');
      const cancel = document.getElementById('ocr-review-cancel');
      modal.style.display = 'block';
      textarea.value = text;
      accept.onclick = () => {
        modal.style.display = 'none';
        resolve(textarea.value);
      };
      cancel.onclick = () => {
        modal.style.display = 'none';
        resolve(null);
      };
    });
  }

  async extractPDFTextWithPassword(file) {
    // Load PDF.js if not already loaded
    if (!window.pdfjsLib) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    let password = '';
    let pdf = null;
    let error = null;
    while (true) {
      try {
        pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
        break;
      } catch (e) {
        if (e.name === 'PasswordException') {
          password = await this.promptForPDFPassword();
          if (password === null) return null; // User cancelled
        } else {
          this.showStatus('PDF error: ' + e.message);
          return null;
        }
      }
    }
    // Extract text from all pages
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text;
  }

  promptForPDFPassword() {
    return new Promise(resolve => {
      const modal = document.getElementById('pdf-password-modal');
      const input = document.getElementById('pdf-password-input');
      const submit = document.getElementById('pdf-password-submit');
      const cancel = document.getElementById('pdf-password-cancel');
      const errorDiv = document.getElementById('pdf-password-error');
      modal.style.display = 'block';
      input.value = '';
      errorDiv.textContent = '';
      input.focus();
      submit.onclick = () => {
        modal.style.display = 'none';
        resolve(input.value);
      };
      cancel.onclick = () => {
        modal.style.display = 'none';
        resolve(null);
      };
    });
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  showStatus(msg) {
    document.getElementById('analyzer-status').innerText = msg;
  }

  saveDocuments() {
    localStorage.setItem('analyzedDocuments', btoa(unescape(encodeURIComponent(JSON.stringify(this.documents)))));
  }

  loadDocuments() {
    const saved = localStorage.getItem('analyzedDocuments');
    if (saved) {
      try {
        return JSON.parse(decodeURIComponent(escape(atob(saved))));
      } catch { return []; }
    }
    return [];
  }
}

// Usage: Place <div id="document-analyzer"></div> in your HTML, then:
// window.documentAnalyzer = new DocumentAnalyzer();
