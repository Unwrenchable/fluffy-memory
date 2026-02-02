// PWA Installation and Service Worker Registration

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Handle PWA install prompt
let deferredPrompt;
const installButton = document.getElementById('install-pwa-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default mini-infobar
  e.preventDefault();
  // Save the event for later use
  deferredPrompt = e;
  // Show install button
  if (installButton) {
    installButton.style.display = 'block';
  }
});

// Install button click handler
if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    // Clear the deferred prompt
    deferredPrompt = null;
    installButton.style.display = 'none';
  });
}

// Handle successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully');
  if (installButton) {
    installButton.style.display = 'none';
  }
  
  // Show success message
  showNotification('App installed successfully! You can now use it offline.', 'success');
});

// Check if app is running in standalone mode
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

// Show appropriate UI based on installation status
document.addEventListener('DOMContentLoaded', () => {
  if (isStandalone()) {
    console.log('App is running in standalone mode');
    // Hide install button if already installed
    if (installButton) {
      installButton.style.display = 'none';
    }
  }
});

// Offline/Online status handling
window.addEventListener('online', () => {
  showNotification('You are back online!', 'success');
});

window.addEventListener('offline', () => {
  showNotification('You are offline. Some features may be limited.', 'warning');
});

// Helper function for notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `pwa-notification pwa-notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
