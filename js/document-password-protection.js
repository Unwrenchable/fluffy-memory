/**
 * Document Password Protection Module
 * Allows users to password-protect their medical documents
 */

class DocumentPasswordProtection {
    constructor() {
        this.passwordEnabled = false;
        this.documentPassword = null;
        this.initPasswordModal();
    }

    /**
     * Initialize the password modal UI
     */
    initPasswordModal() {
        // Modal will be created in HTML
        console.log('Document Password Protection initialized');
    }

    /**
     * Show password setup modal before document generation
     */
    showPasswordModal(documentType, callback) {
        const modal = document.getElementById('password-modal');
        const modalTitle = document.getElementById('password-modal-title');
        const passwordInput = document.getElementById('document-password');
        const confirmPasswordInput = document.getElementById('confirm-document-password');
        const skipPasswordBtn = document.getElementById('skip-password-btn');
        const setPasswordBtn = document.getElementById('set-password-btn');
        
        if (!modal) {
            console.error('Password modal not found');
            callback(null);
            return;
        }

        // Reset inputs
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        
        // Set title
        modalTitle.textContent = `Secure Your ${documentType || 'Document'}`;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Handle skip password
        skipPasswordBtn.onclick = () => {
            this.closePasswordModal();
            callback(null); // No password
        };

        // Handle set password
        setPasswordBtn.onclick = () => {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (!password) {
                alert('Please enter a password');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            this.closePasswordModal();
            callback(password);
        };
    }

    /**
     * Close the password modal
     */
    closePasswordModal() {
        const modal = document.getElementById('password-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Encrypt document content with password
     * Simple XOR-based encryption for demonstration
     * For production, use a proper encryption library
     */
    encryptContent(content, password) {
        if (!password) return content;
        
        let encrypted = '';
        for (let i = 0; i < content.length; i++) {
            const charCode = content.charCodeAt(i);
            const keyChar = password.charCodeAt(i % password.length);
            encrypted += String.fromCharCode(charCode ^ keyChar);
        }
        return btoa(encrypted); // Base64 encode
    }

    /**
     * Generate password-protected document
     */
    generateProtectedDocument(content, password, documentName) {
        if (!password) {
            // No password protection - return as-is
            return this.downloadPlainDocument(content, documentName);
        }

        // Create a password-protected wrapper
        const protectedContent = this.createPasswordProtectedWrapper(content, password, documentName);
        return protectedContent;
    }

    /**
     * Create a self-contained password-protected HTML document
     */
    createPasswordProtectedWrapper(content, password, documentName) {
        const encryptedContent = this.encryptContent(content, password);
        
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentName} - Password Protected</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .password-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 90%;
        }
        .password-container h1 {
            margin: 0 0 1rem 0;
            color: #333;
            font-size: 1.5rem;
        }
        .password-container p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        .password-input-group {
            margin-bottom: 1rem;
        }
        .password-input-group input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        .password-input-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        .unlock-btn {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .unlock-btn:hover {
            transform: translateY(-2px);
        }
        .error-message {
            color: #e53e3e;
            margin-top: 0.5rem;
            display: none;
        }
        .document-content {
            display: none;
            padding: 2rem;
            background: white;
            max-width: 800px;
            margin: 2rem auto;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .document-content pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: inherit;
        }
        .lock-icon {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="password-container" id="password-container">
        <div class="lock-icon">🔒</div>
        <h1>Protected Medical Document</h1>
        <p>This document is password protected. Enter your password to view the contents.</p>
        <div class="password-input-group">
            <input type="password" id="password-input" placeholder="Enter password" autofocus>
        </div>
        <button onclick="unlockDocument()" class="unlock-btn">🔓 Unlock Document</button>
        <div class="error-message" id="error-message">Incorrect password. Please try again.</div>
    </div>
    
    <div class="document-content" id="document-content"></div>
    
    <script>
        const encryptedData = '${encryptedContent}';
        const passwordHash = '${this.simpleHash(password)}';
        
        function simpleHash(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString();
        }
        
        function decrypt(encrypted, password) {
            try {
                const decoded = atob(encrypted);
                let decrypted = '';
                for (let i = 0; i < decoded.length; i++) {
                    const charCode = decoded.charCodeAt(i);
                    const keyChar = password.charCodeAt(i % password.length);
                    decrypted += String.fromCharCode(charCode ^ keyChar);
                }
                return decrypted;
            } catch (e) {
                return null;
            }
        }
        
        function unlockDocument() {
            const passwordInput = document.getElementById('password-input');
            const password = passwordInput.value;
            const errorMessage = document.getElementById('error-message');
            
            if (simpleHash(password) !== passwordHash) {
                errorMessage.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
                return;
            }
            
            const decrypted = decrypt(encryptedData, password);
            if (!decrypted) {
                errorMessage.style.display = 'block';
                return;
            }
            
            document.getElementById('password-container').style.display = 'none';
            const contentDiv = document.getElementById('document-content');
            contentDiv.innerHTML = '<pre>' + decrypted + '</pre>';
            contentDiv.style.display = 'block';
            document.body.style.background = '#f8f9fa';
        }
        
        document.getElementById('password-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockDocument();
            }
        });
    </script>
</body>
</html>`;
        
        return html;
    }

    /**
     * Simple hash function for password verification
     */
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    /**
     * Download plain document without password
     */
    downloadPlainDocument(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Download password-protected document
     */
    downloadProtectedDocument(htmlContent, filename) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace(/\.(txt|pdf)$/, '.html');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Global instance
const documentPasswordProtection = new DocumentPasswordProtection();
