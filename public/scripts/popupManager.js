// Show popup on first visit or after a certain time, but only on the pricing page
function showPopup() {
  // Only show on pricing page
  if (!window.location.pathname.includes('/pricing')) return;
  
  // Check if user has seen the popup before
  const hasSeenPopup = localStorage.getItem('hasSeenPricingPopup');
  const popup = document.getElementById('info-popup');
  
  if (!popup) return;
  
  // Only show if they haven't seen it in the last 7 days
  if (!hasSeenPopup || (Date.now() - parseInt(hasSeenPopup)) > 7 * 24 * 60 * 60 * 1000) {
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  }
}

// Close popup and set a cookie to remember
function closePopup() {
  const popup = document.getElementById('info-popup');
  popup.classList.add('hidden');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
  
  // Remember for 7 days
  localStorage.setItem('hasSeenPricingPopup', Date.now().toString());
}

// Close when clicking outside content
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('info-popup');
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  }
  
  // Show popup after page loads
  setTimeout(showPopup, 2000);
});

// Make functions available globally
window.closePopup = closePopup;
