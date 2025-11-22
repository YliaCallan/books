let deferredPrompt;
const installButton = document.getElementById('installButton');
const iosPrompt = document.getElementById('iosPrompt');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installButton) installButton.style.display = 'block';
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed!');
      }
      deferredPrompt = null;
      if (installButton) installButton.style.display = 'none';
    });
  }
}

// iOS Detection
function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
}

if (isIOS() && !window.navigator.standalone) {
  setTimeout(() => {
    if (iosPrompt) iosPrompt.style.display = 'flex';
  }, 3000);
}

function hideIosPrompt() {
  if (iosPrompt) iosPrompt.style.display = 'none';
}

// Show button on load (non-iOS)
window.addEventListener('load', () => {
  if (!isIOS() && installButton) {
    installButton.style.display = 'block';
  }
});
