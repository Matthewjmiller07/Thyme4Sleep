// Theme switcher functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved user preference, if any, on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    // Update the toggle based on the current theme
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    
    // Toggle theme when the switch is clicked
    themeToggle.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
});
