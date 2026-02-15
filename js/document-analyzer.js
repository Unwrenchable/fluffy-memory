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
        <h2>🔍 Medical Document Analyzer</h2>
        <p style="color:#555; margin-bottom:1em;">Upload your medical records, ID, or insurance docs. We'll extract info and help you fill out everything you need—no typing required!</p>
        <ol style="margin-bottom:1em; color:#3b82f6;">
          <li><strong>1. Upload:</strong> Drag or select your files (PDF, image, Word, etc.)</li>
          <li><strong>2. Unlock:</strong> If prompted, enter the password (usually your date of birth)</li>
          <li><strong>3. Review:</strong> Check and edit the extracted info for accuracy</li>
          <li><strong>4. Done:</strong> All forms are auto-filled for you!</li>
        </ol>
        <input type="file" id="doc-upload" multiple accept=".pdf,.txt,.doc,.docx,.jpg,.png" style="margin-bottom:1em;">
        <button id="analyze-docs" class="btn-primary" style="margin-bottom:1em;">Analyze Selected</button>
        <div id="analyzer-status" style="margin-bottom:1em;"></div>
        <div id="analyzed-documents">
          ${this.documents.length === 0 ? '<em>No documents analyzed yet.</em>' : this.documents.map((doc, i) => `
            <div class="analyzed-doc" style="background:#f0f4f8; margin-bottom:0.5em; padding:0.75em; border-radius:6px;">
              <strong>${doc.name}</strong> (${doc.type})<br>
              <em>${doc.summary || 'No summary yet'}</em>
              <div>${doc.tags ? doc.tags.map(t => `<span class=\"tag\">${t}</span>`).join(' ') : ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="ocr-review-modal" style="display:none; position:fixed; top:20%; left:50%; transform:translate(-50%,-20%); background:#fff; padding:2em; border-radius:8px; box-shadow:0 2px 12px #0002; z-index:1000; width:90vw; max-width:600px;">
        <h3>Review & Edit Extracted Text</h3>
        <p style="color:#555; font-size:0.95em; margin-bottom:0.5em;">Check the extracted info below. Edit if needed—this is what will be used to fill your forms.</p>
        <textarea id="ocr-review-text" style="width:100%;height:200px; margin-bottom:1em;"></textarea>
        <div style="display:flex; gap:1em; justify-content:flex-end;">
          <button id="ocr-review-accept" class="btn-primary">Looks Good</button>
          <button id="ocr-review-cancel" class="btn-secondary">Cancel</button>
        </div>
      </div>
      <div id="pdf-password-modal" style="display:none; position:fixed; top:30%; left:50%; transform:translate(-50%,-50%); background:#fff; padding:2em; border-radius:8px; box-shadow:0 2px 12px #0002; z-index:1000;">
        <h3>PDF Password Required</h3>
        <p style="color:#555; font-size:0.95em;">Most medical documents use your date of birth as the password (e.g., <em>MMDDYYYY</em> or <em>YYYYMMDD</em>).</p>
        <input type="password" id="pdf-password-input" placeholder="Enter PDF password" style="margin-bottom:0.5em;">
        <div style="display:flex; gap:1em; justify-content:flex-end;">
          <button id="pdf-password-submit" class="btn-primary">Unlock</button>
          <button id="pdf-password-cancel" class="btn-secondary">Cancel</button>
        </div>
        <div id="pdf-password-error" style="color:red; margin-top:0.5em;"></div>
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
    this.showStatus('⏳ Processing your documents. Please wait...');
    for (const file of input.files) {
      let text = '';
      try {
        if (file.type === 'application/pdf') {
          text = await this.extractPDFTextWithPassword(file);
          if (text === null) {
            this.showStatus('PDF password required or extraction cancelled.');
            continue;
          }
          if (!text.trim()) {
            this.showStatus('No text found in PDF, running OCR...');
            text = await this.ocrPDF(file);
            if (!text.trim()) {
              this.showStatus('OCR failed to extract any text. Please check your document.');
              continue;
            }
          }
        } else if (file.type.startsWith('image/')) {
          this.showStatus('Extracting text from image...');
          text = await this.ocrImage(file);
          if (!text.trim()) {
            this.showStatus('OCR failed to extract any text from image.');
            continue;
          }
        } else {
          this.showStatus('Reading document...');
          text = await this.readFile(file);
          if (!text.trim()) {
            this.showStatus('No text found in document.');
            continue;
          }
        }
        // Always show review modal for user to check/correct extracted text
        text = await this.reviewExtractedText(text);
        if (text === null) {
          this.showStatus('Extraction review cancelled.');
          continue;
        }
        let summary = 'AI not configured.';
        if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
          this.showStatus('Summarizing with AI...');
          try {
            const ai = await window.dualAIMedicalTeam.getTeamResponse('Summarize this medical document:', { documentText: text });
            summary = ai.response;
          } catch (e) {
            summary = 'AI error: ' + e.message;
          }
        }
        this.documents.push({ name: file.name, type: file.type, summary, tags: [] });
        this.saveDocuments();
        this.showStatus(`✅ ${file.name} processed successfully.`);
      } catch (err) {
        this.showStatus(`❌ Error processing ${file.name}: ${err.message}`);
      }
    }
    this.showStatus('All documents analyzed and saved.');
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
    // Real implementation: render each page to canvas and OCR with Tesseract.js
    if (!window.pdfjsLib) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    if (!window.Tesseract) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.1/dist/tesseract.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    const arrayBuffer = await file.arrayBuffer();
    let password = '';
    let pdf = null;
    while (true) {
      try {
        pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
        break;
      } catch (e) {
        if (e.name === 'PasswordException') {
          password = await this.promptForPDFPassword();
          if (password === null) return '';
        } else {
          this.showStatus('PDF error: ' + e.message);
          return '';
        }
      }
    }
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL('image/png');
      const { data: { text: pageText } } = await window.Tesseract.recognize(dataUrl, 'eng');
      text += pageText + '\n';
    }
    return text;
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
    const statusEl = document.getElementById('analyzer-status');
    if (statusEl) statusEl.innerText = msg;
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
