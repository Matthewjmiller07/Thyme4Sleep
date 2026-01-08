(function () {
  function $(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  
  // Re-query buttons on load in case of dynamic content or just to be safe
  const buttons = $('.js-checkout');
  const addonOnlyButtons = $('.js-addon-only-checkout');
  const addonSelects = $('.js-addon-select');

  const addonState = {};
  const groupMap = addonSelects.reduce((acc, select) => {
    const group = select.dataset.addonGroup;
    if (!group) return acc;
    if (!acc[group]) acc[group] = [];
    acc[group].push(select);
    addonState[group] = select.value || '';
    return acc;
  }, {});

  // Function to update dynamic add-on buttons
  function updateDynamicButtons(group, value) {
    const buttons = document.querySelectorAll(`.js-addon-dynamic-button[data-addon-group="${group}"]`);
    if (!buttons.length) return;
    
    let buttonText = 'Select weeks above';
    let addonId = '';
    
    if (value) {
      const option = document.querySelector(`option[value="${value}"]`);
      if (option) {
        const text = option.textContent;
        const match = text.match(/(\d+) Weeks? Additional Support — \$(\d+)/);
        if (match) {
          const weeks = match[1];
          const price = match[2];
          buttonText = `Purchase ${weeks} Week${weeks > 1 ? 's' : ''} Add-On <strong>Only</strong> — $${price}`;
          addonId = value;
        }
      }
    }
    
    buttons.forEach(button => {
      button.innerHTML = buttonText;
      if (addonId) {
        button.setAttribute('data-addon', addonId);
      } else {
        button.removeAttribute('data-addon');
      }
    });
  }

  Object.entries(groupMap).forEach(([group, selects]) => {
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        console.log(`Addon changed for group ${group}:`, select.value);
        addonState[group] = select.value;
        selects.forEach((other) => {
          if (other !== select) {
            other.value = select.value;
          }
        });
        console.log('Updated addonState:', addonState);
        // Update dynamic buttons for this group
        updateDynamicButtons(group, select.value);
      });
    });
    
    // Initialize dynamic buttons
    updateDynamicButtons(group, addonState[group]);
  });

  async function createCheckoutSession(packageId, addOnId) {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ packageId, addOnId: addOnId || undefined })
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || 'Failed to create checkout session');
    }
    return res.json();
  }

  function resolveAddonForButton(btn) {
    const scopeEl = btn.closest('[data-addon-scope]');
    if (!scopeEl) {
      console.log('No scope element found for button');
      return '';
    }
    const group = scopeEl.getAttribute('data-addon-scope');
    console.log('Found group:', group, 'addonState:', addonState);
    if (!group) return '';
    if (addonState[group] !== undefined) {
      return addonState[group] || '';
    }
    const select = scopeEl.querySelector('[data-addon-group]');
    return select ? select.value : '';
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const packageId = btn.getAttribute('data-package');
      const addOnId = resolveAddonForButton(btn);
      console.log('Checkout clicked - packageId:', packageId, 'addOnId:', addOnId);
      btn.setAttribute('aria-busy', 'true');
      btn.classList.add('opacity-75', 'pointer-events-none');
      try {
        const data = await createCheckoutSession(packageId, addOnId);
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          alert('Unexpected response from server.');
        }
      } catch (err) {
        console.error(err);
        alert('Sorry, we could not start checkout. Please try again or contact support.');
      } finally {
        btn.removeAttribute('aria-busy');
        btn.classList.remove('opacity-75', 'pointer-events-none');
      }
    });
  });

  // Handle add-on-only purchases
  addonOnlyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const addOnId = btn.getAttribute('data-addon');
      if (!addOnId) {
        alert('Please select the number of weeks you want to purchase above.');
        return;
      }
      btn.setAttribute('aria-busy', 'true');
      btn.classList.add('opacity-75', 'pointer-events-none');
      try {
        const data = await createCheckoutSession(null, addOnId);
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          alert('Unexpected response from server.');
        }
      } catch (err) {
        console.error(err);
        alert('Sorry, we could not start checkout. Please try again or contact support.');
      } finally {
        btn.removeAttribute('aria-busy');
        btn.classList.remove('opacity-75', 'pointer-events-none');
      }
    });
  });
})();
