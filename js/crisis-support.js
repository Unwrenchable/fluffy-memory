// Crisis Support Module — MedHelper
// Provides immediate safety resources and emotional support for users in crisis.
// This module is always-on and runs BEFORE any other AI processing.

class CrisisSupport {
    constructor() {
        this.crisisKeywords = [
            'suicide', 'suicidal', 'kill myself', 'end my life', "don't want to live",
            'want to die', 'no reason to live', 'better off dead', "can't go on",
            'take my own life', 'ending it all', 'self harm', 'self-harm', 'hurt myself',
            'cutting myself', 'overdose', 'harm myself', 'not worth living',
            'no point in living', 'want to end', 'give up on life', 'disappear forever',
            'i want to die', 'thinking about suicide', 'plan to kill', 'nothing to live for'
        ];

        this.warningKeywords = [
            'hopeless', 'worthless', 'burden to everyone', "can't take it anymore",
            'nothing will help', 'nobody cares', 'all alone', 'completely alone',
            'no hope', 'given up', 'too tired to fight', 'exhausted from fighting'
        ];

        // Track crisis detections per session for follow-up
        this.crisisDetectedInSession = false;
    }

    // Check if a message contains crisis signals
    detectCrisis(text) {
        const lower = text.toLowerCase();
        const isActiveCrisis = this.crisisKeywords.some(kw => lower.includes(kw));
        const isWarningSign = this.warningKeywords.some(kw => lower.includes(kw));

        return {
            isActiveCrisis,
            isWarningSign,
            level: isActiveCrisis ? 'crisis' : isWarningSign ? 'warning' : 'none'
        };
    }

    // Get crisis response HTML (for display in chat)
    getCrisisResponseHtml() {
        this.crisisDetectedInSession = true;
        return `<div class="crisis-alert" style="background:#fee2e2;border:2px solid #ef4444;border-radius:12px;padding:1.25rem;margin:0.5rem 0;">
<p style="font-size:1.1rem;font-weight:700;color:#991b1b;margin:0 0 0.75rem 0;">🆘 You are not alone — help is available right now</p>
<p style="margin:0 0 0.75rem 0;color:#7f1d1d;">I hear you, and what you're going through sounds incredibly hard. Please reach out to a crisis counselor — it's free, confidential, and available right now.</p>
<div style="background:white;border-radius:8px;padding:1rem;margin-bottom:0.75rem;">
  <p style="margin:0 0 0.5rem 0;font-weight:600;">📞 <strong>988 Suicide &amp; Crisis Lifeline</strong></p>
  <p style="margin:0 0 0.25rem 0;">Call or text <strong>988</strong> (US — free, 24/7)</p>
  <p style="margin:0 0 0.75rem 0;font-size:0.9rem;color:#6b7280;">Online chat: <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener noreferrer" style="color:#3b82f6;">988lifeline.org/chat</a></p>
  <p style="margin:0 0 0.5rem 0;font-weight:600;">📱 <strong>Crisis Text Line</strong></p>
  <p style="margin:0 0 0.75rem 0;">Text <strong>HOME</strong> to <strong>741741</strong> (free, 24/7)</p>
  <p style="margin:0 0 0.5rem 0;font-weight:600;">🚨 <strong>Immediate Danger</strong></p>
  <p style="margin:0 0 0.75rem 0;">Call <strong>911</strong> or go to your nearest emergency room</p>
  <p style="margin:0 0 0.25rem 0;font-weight:600;">🎖️ <strong>Veterans</strong></p>
  <p style="margin:0;">Dial <strong>988</strong> then press <strong>1</strong>, or text <strong>838255</strong></p>
</div>
<p style="margin:0;color:#7f1d1d;font-style:italic;">You reached out here, which means part of you is looking for a way through. You matter. Please call or text 988 right now. 💙</p>
</div>`;
    }

    // Get warning-level response (encouraging but not full crisis)
    getWarningResponseHtml() {
        return `<div class="crisis-warning" style="background:#fef3c7;border:2px solid #f59e0b;border-radius:12px;padding:1rem;margin:0.5rem 0;">
<p style="font-weight:700;color:#92400e;margin:0 0 0.5rem 0;">💙 I want to check in with you</p>
<p style="margin:0 0 0.75rem 0;color:#78350f;">It sounds like you're going through a really difficult time. That's completely understandable — navigating this system while dealing with health challenges is exhausting.</p>
<p style="margin:0 0 0.5rem 0;color:#78350f;">If you ever feel overwhelmed or need to talk to someone:</p>
<ul style="margin:0 0 0.5rem 1.25rem;color:#78350f;">
  <li>Call or text <strong>988</strong> — Suicide &amp; Crisis Lifeline (free, 24/7)</li>
  <li>Text <strong>HOME</strong> to <strong>741741</strong> — Crisis Text Line</li>
  <li>Call <strong>211</strong> for local support services</li>
</ul>
<p style="margin:0;color:#78350f;">I'm here to help you every step of the way with your benefits and healthcare questions. You don't have to do this alone. 💙</p>
</div>`;
    }

    // Show a persistent crisis banner on the page (called when crisis detected)
    showCrisisBanner() {
        if (document.getElementById('crisis-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'crisis-banner';
        banner.setAttribute('role', 'alert');
        banner.setAttribute('aria-live', 'assertive');
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 99999;
            background: #ef4444;
            color: white;
            text-align: center;
            padding: 0.75rem 1rem;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        banner.innerHTML = `
            🆘 <strong>If you're in crisis: Call or text 988</strong> &nbsp;|&nbsp;
            Text HOME to 741741 &nbsp;|&nbsp;
            <strong>911</strong> for emergencies
            <button onclick="this.parentElement.remove()" aria-label="Close crisis banner"
                style="background:transparent;border:1px solid rgba(255,255,255,0.5);color:white;
                       padding:0.15rem 0.6rem;margin-left:1rem;cursor:pointer;border-radius:4px;font-size:0.85rem;">
                ✕ Close
            </button>
        `;
        document.body.prepend(banner);

        // Auto-remove after 30 seconds
        setTimeout(() => {
            const el = document.getElementById('crisis-banner');
            if (el) el.remove();
        }, 30000);
    }

    // Get a full crisis resources page section (for the Resources section)
    getCrisisResourcesSection() {
        return `
<div class="crisis-resources-section" style="background:linear-gradient(135deg,#fee2e2,#fef3c7);border-radius:16px;padding:1.5rem;margin:1rem 0;">
  <h3 style="color:#991b1b;margin:0 0 1rem 0;font-size:1.2rem;">🆘 Crisis &amp; Mental Health Resources</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;">
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #ef4444;">
      <strong>988 Suicide &amp; Crisis Lifeline</strong><br>
      Call or text <a href="tel:988" style="color:#ef4444;font-weight:700;">988</a><br>
      <small>Free, 24/7 — US nationwide</small><br>
      <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener noreferrer" style="font-size:0.85rem;color:#3b82f6;">Online chat available</a>
    </div>
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #3b82f6;">
      <strong>Crisis Text Line</strong><br>
      Text <strong>HOME</strong> to <a href="sms:741741&body=HOME" style="color:#3b82f6;font-weight:700;">741741</a><br>
      <small>Free, 24/7 — confidential</small>
    </div>
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #8b5cf6;">
      <strong>Veterans Crisis Line</strong><br>
      Dial <a href="tel:988" style="color:#8b5cf6;font-weight:700;">988</a> → press 1<br>
      Text <a href="sms:838255" style="color:#8b5cf6;font-weight:700;">838255</a><br>
      <small>For veterans, service members &amp; families</small>
    </div>
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #10b981;">
      <strong>SAMHSA Helpline</strong><br>
      <a href="tel:18006624357" style="color:#10b981;font-weight:700;">1-800-662-4357</a><br>
      <small>Mental health &amp; substance use, 24/7 free</small>
    </div>
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #f59e0b;">
      <strong>NAMI Helpline</strong><br>
      <a href="tel:18009506264" style="color:#f59e0b;font-weight:700;">1-800-950-6264</a><br>
      Text NAMI to 741741<br>
      <small>Mental health support &amp; resources</small>
    </div>
    <div style="background:white;border-radius:8px;padding:1rem;border-left:4px solid #ef4444;">
      <strong>Emergency</strong><br>
      Call <a href="tel:911" style="color:#ef4444;font-weight:700;">911</a> or go to your nearest ER<br>
      <small>For immediate danger to life</small>
    </div>
  </div>
</div>`;
    }
}

// Initialize and export
window.crisisSupport = new CrisisSupport();

// Intercept all chat sends to check for crisis FIRST
// This function is called by the chat handlers in script.js
window.checkCrisisBeforeChat = function(userMessage) {
    if (!window.crisisSupport) return null;
    const detection = window.crisisSupport.detectCrisis(userMessage);
    if (detection.isActiveCrisis) {
        window.crisisSupport.showCrisisBanner();
        return { html: window.crisisSupport.getCrisisResponseHtml(), isCrisis: true };
    }
    if (detection.isWarningSign) {
        return { html: window.crisisSupport.getWarningResponseHtml(), isWarning: true };
    }
    return null;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CrisisSupport;
}
