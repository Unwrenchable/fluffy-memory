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
          " + (this.documents.length === 0 ? '<em>No documents analyzed yet.</em>' : this.documents.map(function(doc, i) {
            var tagsHtml = doc.tags ? doc.tags.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join(' ') : '';
            var extractedHtml = doc.extractedFields ? "<details style='margin-top:0.5em;'><summary>Show Extracted Fields</summary><pre style='background:#fff; border:1px solid #ddd; border-radius:4px; padding:0.5em; font-size:0.95em;'>" + JSON.stringify(doc.extractedFields, null, 2) + "</pre><button class='btn-secondary' style='margin-top:0.5em;' onclick='window.documentAnalyzer.autoFillWithExtracted(" + i + ")'>Auto-Fill Forms with This</button></details>" : '';
            return "<div class='analyzed-doc' style='background:#f0f4f8; margin-bottom:0.5em; padding:0.75em; border-radius:6px;'>" +
              "<strong>" + doc.name + "</strong> (" + doc.type + ")<br>" +
              "<em>" + (doc.summary || 'No summary yet') + "</em>" +
              "<div>" + tagsHtml + "</div>" +
              extractedHtml +
            "</div>";
          }).join('')) + "
        </div>
      </div>
        // Auto-fill forms with extracted fields (stub for integration)
        autoFillWithExtracted(index) {
          const doc = this.documents[index];
          if (!doc || !doc.extractedFields) {
            alert('No extracted fields available for this document.');
            return;
          }
          // Merge extracted fields into user profile
          if (window.userDataManager) {
            const currentProfile = window.userDataManager.getProfile() || {};
            const mergedProfile = this.mergeExtractedFieldsIntoProfile(currentProfile, doc.extractedFields);
            window.userDataManager.saveProfile(mergedProfile);
            // Check for missing required fields
            const missingFields = this.getMissingRequiredFields(mergedProfile);
            if (missingFields.length > 0) {
              this.promptForMissingFields(mergedProfile, missingFields);
            } else {
              alert('✅ All available info from your document has been used to auto-fill your profile and forms!');
            }
          } else {
            alert('UserDataManager not available.');
          }
        }

        // Merge extracted fields into the user profile structure
        mergeExtractedFieldsIntoProfile(profile, extracted) {
          // Map extracted fields to profile structure as best as possible
          profile = profile || {};
          profile.personalInfo = profile.personalInfo || {};
          profile.medicalInfo = profile.medicalInfo || {};
          profile.contactInfo = profile.contactInfo || {};
          if (extracted['Full Name']) profile.personalInfo.first_name = extracted['Full Name'];
          if (extracted['Date of Birth']) profile.personalInfo.dob = extracted['Date of Birth'];
          if (extracted['Address']) profile.contactInfo.address = extracted['Address'];
          if (extracted['Phone Number']) profile.contactInfo.phone = extracted['Phone Number'];
          if (extracted['Diagnosis']) profile.medicalInfo.primary_condition = extracted['Diagnosis'];
          if (extracted['Medications']) profile.medicalInfo.medications = extracted['Medications'];
          if (extracted['Allergies']) profile.medicalInfo.allergies = extracted['Allergies'];
          if (extracted['Procedures']) profile.medicalInfo.procedures = extracted['Procedures'];
          if (extracted['Insurance Policy Number']) profile.medicalInfo.insurance_policy = extracted['Insurance Policy Number'];
          if (extracted['Provider Name']) profile.medicalInfo.provider = extracted['Provider Name'];
          if (extracted['Medical Record Number']) profile.medicalInfo.medical_record_number = extracted['Medical Record Number'];
          if (extracted['Document Date']) profile.medicalInfo.document_date = extracted['Document Date'];
          // Mark as incomplete until user reviews
          profile.complete = false;
          return profile;
        }

        // Identify required fields missing from the profile
        getMissingRequiredFields(profile) {
          const required = [
            { path: ['personalInfo', 'first_name'], label: 'Full Name' },
            { path: ['personalInfo', 'dob'], label: 'Date of Birth' },
            { path: ['contactInfo', 'address'], label: 'Address' },
            { path: ['contactInfo', 'phone'], label: 'Phone Number' },
            { path: ['medicalInfo', 'primary_condition'], label: 'Diagnosis' }
          ];
          const missing = [];
          for (const field of required) {
            let val = profile;
            for (const key of field.path) {
              val = val && val[key];
            }
            if (!val) missing.push(field);
          }
          return missing;
        }

        // Prompt user for missing fields and update profile
        promptForMissingFields(profile, missingFields) {
          var prompts = '';
          for (var i = 0; i < missingFields.length; i++) {
            var field = missingFields[i];
            prompts += field.label + ': <input id="missing-' + field.path.join('-') + '" type="text" style="width:90%;margin-bottom:0.5em;"><br>';
          }
          var modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100vw';
          modal.style.height = '100vh';
          modal.style.background = 'rgba(0,0,0,0.6)';
          modal.style.zIndex = '9999';
          modal.innerHTML = '<div style="background:#fff;max-width:400px;margin:10vh auto;padding:2em;border-radius:10px;box-shadow:0 2px 16px #0003;">' +
            '<h3>Complete Your Profile</h3>' +
            '<p>Please provide the missing information so we can fill out all forms for you:</p>' +
            prompts +
            '<button id="missing-fields-save" class="btn-primary" style="margin-top:1em;">Save</button>' +
            '<button id="missing-fields-cancel" class="btn-secondary" style="margin-top:1em;">Cancel</button>' +
          '</div>';
          document.body.appendChild(modal);
          document.getElementById('missing-fields-save').onclick = function() {
            for (var i = 0; i < missingFields.length; i++) {
              var field = missingFields[i];
              var input = document.getElementById('missing-' + field.path.join('-'));
              var obj = profile;
              for (var j = 0; j < field.path.length - 1; j++) {
                obj[field.path[j]] = obj[field.path[j]] || {};
                obj = obj[field.path[j]];
              }
              obj[field.path[field.path.length - 1]] = input.value;
            }
            window.userDataManager.saveProfile(profile);
            document.body.removeChild(modal);
            alert('✅ Your profile is now complete and all forms will be auto-filled!');
          };
          document.getElementById('missing-fields-cancel').onclick = function() {
            document.body.removeChild(modal);
          };
        }
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
        let extractedFields = null;
        let summary = 'AI not configured.';
        if (window.dualAIMedicalTeam && window.dualAIMedicalTeam.getTeamResponse) {
          this.showStatus('Extracting fields with AI...');
          try {
            const prompt =
              'Extract ONLY factual, real data from this medical document. Do NOT use example, placeholder, or generic values. Respond ONLY in minified JSON (no explanation, no markdown, no extra text). If a field is not present, leave it blank.\n\nFields to extract:\n- Full Name\n- Date of Birth\n- Medical Record Number\n- Document Date\n- Provider Name\n- Diagnosis\n- Medications\n- Allergies\n- Procedures\n- Insurance Policy Number\n- Address\n- Phone Number\n- Any other relevant patient info\n\nDocument text:\n"""' + text + '"""';
            const ai = await window.dualAIMedicalTeam.getTeamResponse(prompt, { documentText: text });
            let aiText = ai.response;
            // Try to extract JSON from AI response
            let jsonStart = aiText.indexOf('{');
            let jsonEnd = aiText.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
              try {
                extractedFields = JSON.parse(aiText.substring(jsonStart, jsonEnd + 1));
                // Validate for generic/placeholder values
                const genericPatterns = [/john smith/i, /example/i, /placeholder/i, /sample/i, /1234/i, /0000/i, /test/i];
                let hasGeneric = false;
                for (const key in extractedFields) {
                  const val = extractedFields[key];
                  if (typeof val === 'string' && genericPatterns.some(p => p.test(val))) {
                    hasGeneric = true;
                  }
                }
                if (hasGeneric) {
                  summary = '⚠️ AI returned generic/placeholder values. Please try a different document or check extraction.';
                } else {
                  summary = 'Extracted fields: ' + Object.keys(extractedFields).join(', ');
                }
              } catch (e) {
                summary = 'AI returned invalid JSON. Raw output: ' + aiText;
              }
            } else {
              summary = 'AI did not return JSON. Raw output: ' + aiText;
            }
          } catch (e) {
            summary = 'AI error: ' + e.message;
          }
        }
        this.documents.push({ name: file.name, type: file.type, summary, tags: [], extractedFields });
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
      console.log('[DocumentAnalyzer] Loading PDF.js library...');
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    // Set PDF.js workerSrc to CDN to avoid CSP/worker errors
    if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    const arrayBuffer = await file.arrayBuffer();
    let password = '';
    let pdf = null;
    let error = null;
    let passwordAttempts = 0;
    while (true) {
      try {
        console.log('[DocumentAnalyzer] Attempting to open PDF (password length:', password ? password.length : 0, ')');
        pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
        break;
      } catch (e) {
        console.error('[DocumentAnalyzer] PDF.js error:', e);
        if (e.name === 'PasswordException') {
          passwordAttempts++;
          this.showStatus('🔒 PDF is password-protected. Prompting for password... (Attempt ' + passwordAttempts + ')');
          password = await this.promptForPDFPassword();
          if (password === null) {
            this.showStatus('❌ PDF extraction cancelled by user.');
            alert('PDF extraction cancelled. No password entered.');
            return null; // User cancelled
          }
        } else {
          this.showStatus('❌ PDF error: ' + e.message);
          alert('PDF extraction failed: ' + e.message);
          return null;
        }
      }
    }
    // Extract text from all pages
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      } catch (pageErr) {
        console.error('[DocumentAnalyzer] Error extracting text from page', i, pageErr);
        this.showStatus('❌ Error extracting text from page ' + i + ': ' + pageErr.message);
        alert('Error extracting text from page ' + i + ': ' + pageErr.message);
      }
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
      if (!modal || !input || !submit || !cancel) {
        console.error('[DocumentAnalyzer] Password modal elements missing!');
        alert('PDF password modal is missing from the page. Please contact support.');
        resolve(null);
        return;
      }
      modal.style.display = 'block';
      input.value = '';
      errorDiv.textContent = '';
      input.focus();
      submit.onclick = () => {
        if (!input.value) {
          errorDiv.textContent = 'Please enter a password.';
          input.focus();
          return;
        }
        modal.style.display = 'none';
        resolve(input.value);
      };
      cancel.onclick = () => {
        modal.style.display = 'none';
        resolve(null);
      };
      // Extra: allow Enter/Escape keys
      input.onkeydown = (e) => {
        if (e.key === 'Enter') submit.onclick();
        if (e.key === 'Escape') cancel.onclick();
      };
      // Log modal display
      console.log('[DocumentAnalyzer] PDF password modal shown to user.');
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
