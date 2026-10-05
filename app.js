import { getSession, isAuthenticated, signIn, signOut } from './auth-service.js';
import { createLandingAnimation } from './landing-animation.js';
import { getRover, ROVERS } from './rover-data.js';
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

function pathName() {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path || '/';
}

function navigate(path) {
  window.history.pushState({}, '', path);
  renderRoute();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setPage(title, content) {
  document.title = `${title} · Rover Mission Atlas`;
  app.innerHTML = content;
}

function renderLogin() {
  setPage('Sign in', `
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
  `);

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
      window.setTimeout(() => navigate('/missions'), 250);
    } catch (error) {
      status.textContent = error.message;
    }
  });
}

function renderHeader() {
  const session = getSession();
  return `
    <header class="site-header">
      <a class="brand" href="/missions" data-route>
        <span class="brand-mark" aria-hidden="true">✦</span>
        <span>ROVER MISSION ATLAS</span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="/missions" data-route>Missions</a>
        <a href="./mars-map.html">Mars map</a>
        <a href="./moon-map.html">Moon map</a>
        <button class="nav-button" type="button" data-sign-out>
          Sign out${session?.email ? ` <span class="nav-email">${escapeHtml(session.email)}</span>` : ''}
        </button>
      </nav>
    </header>
  `;
}

function bindShellEvents() {
  document.querySelector('[data-sign-out]')?.addEventListener('click', () => {
    signOut();
    navigate('/login');
  });

  document.querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigate(link.getAttribute('href'));
    });
  });
}

function renderMissions() {
  const roverCards = ROVERS.map((rover) => `
    <article class="rover-card rover-card--${rover.body.toLowerCase()}" data-rover-card data-body="${rover.body}">
      <a class="rover-card__link" href="/missions/${rover.id}" data-route aria-label="Open ${escapeHtml(rover.name)} mission">
        <div class="rover-card__topline">
          <span class="planet-tag">${escapeHtml(rover.body)}</span>
          <span class="rover-card__arrow" aria-hidden="true">↗</span>
        </div>
        <h2>${escapeHtml(rover.name)}</h2>
        <p>${escapeHtml(rover.description)}</p>
        <div class="rover-card__meta">
          <span>${escapeHtml(rover.agency)}</span>
          <span>${escapeHtml(rover.landingDate)}</span>
        </div>
      </a>
    </article>
  `).join('');

  setPage('Missions', `
    <div class="atlas-shell">
      ${renderHeader()}
      <main>
        <section class="missions-hero page-width" aria-labelledby="missions-title">
          <div>
            <p class="eyebrow">FIELD GUIDE · ${ROVERS.length} ROVERS</p>
            <h1 id="missions-title">Landing stories from two worlds.</h1>
            <p class="hero-copy">
              Choose a rover to explore its mission record and replay an original,
              code-built landing sequence.
            </p>
          </div>
          <div class="hero-orbit" aria-hidden="true">
            <span class="orbit orbit--one"></span>
            <span class="orbit orbit--two"></span>
            <span class="orbit-planet orbit-planet--mars"></span>
            <span class="orbit-planet orbit-planet--moon"></span>
          </div>
        </section>
        <section class="missions-section page-width" aria-labelledby="rover-list-title">
          <div class="section-heading">
            <div>
              <p class="card-kicker">MISSION INDEX</p>
              <h2 id="rover-list-title">Select a rover</h2>
            </div>
            <div class="filter-controls" role="group" aria-label="Filter missions">
              <button type="button" class="filter-button is-active" data-filter="all" aria-pressed="true">All</button>
              <button type="button" class="filter-button" data-filter="Mars" aria-pressed="false">Mars</button>
              <button type="button" class="filter-button" data-filter="Moon" aria-pressed="false">Moon</button>
            </div>
          </div>
          <div class="rover-grid">${roverCards}</div>
        </section>
      </main>
    </div>
  `);

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((control) => {
        const isActive = control === button;
        control.classList.toggle('is-active', isActive);
        control.setAttribute('aria-pressed', String(isActive));
      });
      document.querySelectorAll('[data-rover-card]').forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.body !== filter;
      });
    });
  });

  bindShellEvents();
}

function renderNotFound() {
  setPage('Mission not found', `
    <div class="atlas-shell">
      ${renderHeader()}
      <main class="empty-state page-width">
        <p class="eyebrow">SIGNAL LOST</p>
        <h1>That mission could not be found.</h1>
        <p>Return to the mission index and choose a rover from the atlas.</p>
        <a class="primary-button primary-button--inline" href="/missions" data-route>Return to missions <span aria-hidden="true">↗</span></a>
      </main>
    </div>
  `);
  bindShellEvents();
}

function renderMissionDetail(rover) {
  setPage(rover.name, `
    <div class="atlas-shell">
      ${renderHeader()}
      <main class="mission-page page-width">
        <a class="back-link" href="/missions" data-route>← Back to missions</a>
        <section class="mission-hero">
          <div class="mission-copy">
            <p class="eyebrow">${escapeHtml(rover.body)} · ${escapeHtml(rover.agency)}</p>
            <h1>${escapeHtml(rover.name)}</h1>
            <p class="mission-description">${escapeHtml(rover.description)}</p>
            <div class="mission-facts" aria-label="${escapeHtml(rover.name)} mission facts">
              <div><span>Launch date</span><strong>${escapeHtml(rover.launchDate)}</strong></div>
              <div><span>Landing date</span><strong>${escapeHtml(rover.landingDate)}</strong></div>
              <div><span>Landing site</span><strong>${escapeHtml(rover.landingSite)}</strong></div>
              <div><span>Landing method</span><strong>${escapeHtml(rover.landingMethod)}</strong></div>
            </div>
            ${rover.verificationNote ? `<p class="verification-note">${escapeHtml(rover.verificationNote)}</p>` : ''}
          </div>
          <div class="mission-badge mission-badge--${rover.body.toLowerCase()}" aria-hidden="true">
            <span>${rover.body === 'Mars' ? 'MARS' : 'MOON'}</span>
            <strong>${rover.name.split(' ')[0]}</strong>
          </div>
        </section>
        <div class="animation-root" data-animation-root></div>
      </main>
    </div>
  `);

  createLandingAnimation(document.querySelector('[data-animation-root]'), {
    ...rover.animation,
    label: rover.name
  });
  bindShellEvents();
}

function renderRoute() {
  const currentPath = pathName();
  const authenticated = isAuthenticated();

  if (currentPath === '/login' || currentPath === '/') {
    if (authenticated && currentPath === '/') {
      navigate('/missions');
      return;
    }
    renderLogin();
    return;
  }

  if (currentPath === '/missions' && !authenticated) {
    window.history.replaceState({}, '', '/login');
    renderLogin();
    return;
  }

  if (currentPath === '/missions') {
    renderMissions();
    return;
  }

  const missionMatch = currentPath.match(/^\/missions\/([^/]+)$/);
  if (missionMatch && authenticated) {
    const rover = getRover(missionMatch[1]);
    rover ? renderMissionDetail(rover) : renderNotFound();
    return;
  }

  if (missionMatch && !authenticated) {
    window.history.replaceState({}, '', '/login');
    renderLogin();
    return;
  }

  renderNotFound();
}

window.addEventListener('popstate', renderRoute);
renderRoute();
