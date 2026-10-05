import { signIn } from './auth-service.js';
import { validateLoginForm } from './validation.js';

const app = document.querySelector('#app');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderLogin() {
  app.innerHTML = `
    <div class="space-shell">
      <div class="planet planet--mars" aria-hidden="true"></div>
      <div class="planet planet--moon" aria-hidden="true"></div>
      <div class="star-field" aria-hidden="true"></div>
      <section class="auth-layout" aria-labelledby="login-title">
        <div class="auth-intro">
          <p class="eyebrow">ROVER MISSION ATLAS</p>
          <h1 id="login-title">Follow the trail beyond Earth.</h1>
          <p class="auth-intro__copy">
            Explore the engineering, science, and landing stories behind the vehicles
            that reached the Moon and Mars.
          </p>
          <div class="mission-line" aria-hidden="true">
            <span></span><i></i><span></span>
          </div>
        </div>
        <div class="glass-card auth-card">
          <p class="card-kicker">MISSION CONTROL</p>
          <h2>Sign in to continue</h2>
          <p class="card-copy">Use any valid email and a password with at least six characters for this demo.</p>
          <form id="login-form" novalidate>
            <div class="field">
              <label for="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                inputmode="email"
                required
                aria-describedby="email-error"
              >
              <p class="field-error" id="email-error" role="alert"></p>
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                minlength="6"
                required
                aria-describedby="password-error"
              >
              <p class="field-error" id="password-error" role="alert"></p>
            </div>
            <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
            <button class="primary-button" type="submit">
              Enter mission control <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p class="auth-note">Prototype auth · no credentials are stored on a server</p>
        </div>
      </section>
    </div>
  `;

  const form = document.querySelector('#login-form');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const status = document.querySelector('#form-status');

  function showErrors(errors) {
    for (const fieldName of ['email', 'password']) {
      const input = document.querySelector(`#${fieldName}`);
      const error = document.querySelector(`#${fieldName}-error`);
      const message = errors[fieldName] || '';
      error.textContent = message;
      input.setAttribute('aria-invalid', String(Boolean(message)));
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    const result = validateLoginForm({
      email: emailInput.value,
      password: passwordInput.value
    });
    showErrors(result.errors);

    if (!result.valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    try {
      signIn(emailInput.value);
      status.textContent = 'Login successful. Opening mission control…';
      window.history.pushState({}, '', '/missions');
      renderLogin();
    } catch (error) {
      status.textContent = escapeHtml(error.message);
    }
  });
}

renderLogin();
