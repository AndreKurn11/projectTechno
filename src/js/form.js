/**
 * form.js — Reservation form validation
 */

/**
 * Validates an email address against the pattern local@domain.tld
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a phone number: 8–15 digits only
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  return /^\d{8,15}$/.test(phone);
}

/**
 * Initialises the reservation form with validation and submission handling.
 */
export function initForm() {
  try {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    // Clear error state for a field when the user corrects it
    const clearError = (input) => {
      input.classList.remove('field-error');
      const next = input.nextElementSibling;
      if (next && next.getAttribute('role') === 'alert') {
        next.remove();
      }
    };

    // Show an error on a field
    const showError = (input, message) => {
      input.classList.add('field-error');
      // Remove any existing alert first
      const existing = input.nextElementSibling;
      if (existing && existing.getAttribute('role') === 'alert') {
        existing.remove();
      }
      const p = document.createElement('p');
      p.setAttribute('role', 'alert');
      p.className = 'text-red-500 text-sm mt-1';
      p.textContent = message;
      input.insertAdjacentElement('afterend', p);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = [
        { name: 'fullName',      label: 'Full name' },
        { name: 'email',         label: 'Email' },
        { name: 'phone',         label: 'Phone' },
        { name: 'preferredDate', label: 'Preferred date' },
        { name: 'preferredTime', label: 'Preferred time' },
        { name: 'guests',        label: 'Number of guests' },
      ];

      let isValid = true;

      fields.forEach(({ name, label }) => {
        const input = form.elements[name];
        if (!input) return;

        const value = input.value.trim();

        if (!value) {
          showError(input, `${label} is required.`);
          isValid = false;
          return;
        }

        if (name === 'email' && !validateEmail(value)) {
          showError(input, 'Please enter a valid email address.');
          isValid = false;
          return;
        }

        if (name === 'phone' && !validatePhone(value)) {
          showError(input, 'Phone must be 8–15 digits with no spaces or symbols.');
          isValid = false;
          return;
        }

        // Field is valid — clear any previous error
        clearError(input);
      });

      if (isValid) {
        setTimeout(() => {
          const successDiv = document.createElement('div');
          successDiv.className = 'success-message';
          successDiv.innerHTML = '<h3>Reservation Confirmed!</h3><p>We\'ll see you soon at Brew &amp; Co.</p>';
          form.replaceWith(successDiv);
        }, 1000);
      }
    });

    // Clear errors as the user corrects each field
    const requiredFields = ['fullName', 'email', 'phone', 'preferredDate', 'preferredTime', 'guests'];
    requiredFields.forEach((name) => {
      const input = form.elements[name];
      if (input) {
        input.addEventListener('input', () => clearError(input));
      }
    });
  } catch (err) {
    console.error('form.js: failed to initialise', err);
  }
}
