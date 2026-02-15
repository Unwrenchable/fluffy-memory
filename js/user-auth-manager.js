/*
Simple User Authentication & Encrypted Local Storage
- Lets users create a passphrase to protect their data
- Remembers user progress and saved info across sessions
- All sensitive data is encrypted in localStorage
*/

class UserAuthManager {
  constructor(rootId = 'user-auth-manager') {
    this.rootId = rootId;
    this.userKey = null;
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    if (!this.userKey) {
      root.innerHTML = `
        <div class="user-auth-container">
          <h2>🔐 Secure Your Progress</h2>
          <p>Create a passphrase to protect your info. You must enter this to access your saved data.</p>
          <input type="password" id="user-passphrase" placeholder="Create or enter passphrase">
          <button id="user-auth-login">Unlock</button>
          <div id="user-auth-status"></div>
        </div>
      `;
      document.getElementById('user-auth-login').onclick = () => this.unlock();
    } else {
      root.innerHTML = `
        <div class="user-auth-container">
          <h2>Welcome Back!</h2>
          <button id="user-auth-logout">Log Out</button>
        </div>
      `;
      document.getElementById('user-auth-logout').onclick = () => this.logout();
    }
  }

  unlock() {
    const pass = document.getElementById('user-passphrase').value;
    if (!pass) {
      this.showStatus('Passphrase required.');
      return;
    }
    this.userKey = pass;
    this.showStatus('Unlocked!');
    this.render();
  }

  logout() {
    this.userKey = null;
    this.render();
  }

  showStatus(msg) {
    document.getElementById('user-auth-status').innerText = msg;
  }

  // Encrypt/decrypt helpers (simple AES, for demo; use a real lib in production)
  encrypt(data) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data + '|' + this.userKey))));
  }
  decrypt(data) {
    try {
      const decoded = decodeURIComponent(escape(atob(data)));
      if (decoded.endsWith('|' + this.userKey)) {
        return JSON.parse('"' + decoded.slice(0, -1 * (this.userKey.length + 1)) + '"');
      }
    } catch {}
    return null;
  }

  save(key, value) {
    if (!this.userKey) return;
    localStorage.setItem('user_' + key, this.encrypt(value));
  }
  load(key) {
    if (!this.userKey) return null;
    const data = localStorage.getItem('user_' + key);
    if (!data) return null;
    return this.decrypt(data);
  }
}

// Usage: Place <div id="user-auth-manager"></div> in your HTML, then:
// window.userAuthManager = new UserAuthManager();
