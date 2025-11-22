let deferredPrompt;
let isInstalled = false;

const installButton = document.getElementById('installButton');
const iosPrompt = document.getElementById('iosPrompt');

// Check if already installed (PWA or iOS standalone)
function checkIfInstalled() {
  const isStandalone = window.navigator.standalone || 
                       window.matchMedia('(display-mode: standalone)').matches;
  if (isStandalone || isInstalled) {
    installButton.style.display = 'none';
  }
}

// Android/Chrome/Edge/Firefox install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';
});

// Button click → Android installs, iOS shows instructions
function showInstallPrompt() {
  if (!installButton) return;

  // iOS: show custom instructions
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream) {
    iosPrompt.style.display = 'flex';
  } 
  // Android/Desktop: trigger native install
  else if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        isInstalled = true;
        installButton.style.display = 'none';
      }
      deferredPrompt = null;
    });
  }
}

// Close iOS popup
function hideIosPrompt() {
  iosPrompt.style.display = 'none';
}

// Run on load
window.addEventListener('load', () => {
  checkIfInstalled();
  if (!isInstalled) {
    installButton.style.display = 'block';  // Always show button unless already installed
  }
});

// Also hide button when app is launched in installed mode
window.addEventListener('appinstalled', () => {
  isInstalled = true;
  installButton.style.display = 'none';
});
