const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const ART_BY_TYPE = {
  airbag: `
    <g class="animation-parachute" aria-hidden="true">
      <path d="M60 40 Q160 8 260 40" />
      <path d="M60 40 L102 154 M260 40 L218 154" />
    </g>
    <g class="animation-airbags" aria-hidden="true">
      <circle cx="120" cy="178" r="34" />
      <circle cx="200" cy="178" r="34" />
      <circle cx="160" cy="194" r="38" />
    </g>
  `,
  parachute: `
    <g class="animation-parachute" aria-hidden="true">
      <path d="M44 56 Q160 2 276 56 Q160 88 44 56Z" />
      <path d="M74 56 L128 156 M246 56 L192 156 M160 76 L160 156" />
    </g>
    <g class="animation-thrusters" aria-hidden="true">
      <path d="M126 195 L136 236 L146 195Z" />
      <path d="M174 195 L184 236 L194 195Z" />
    </g>
  `,
  'sky-crane': `
    <g class="animation-parachute" aria-hidden="true">
      <path d="M45 48 Q160 0 275 48 Q160 80 45 48Z" />
      <path d="M74 48 L160 150 M246 48 L160 150" />
    </g>
    <g class="animation-crane" aria-hidden="true">
      <path d="M98 130 L222 130 L202 161 L118 161Z" />
      <path d="M112 130 L112 84 L208 84 L208 130" />
      <path d="M112 84 L94 60 M208 84 L226 60" />
      <path d="M94 60 L226 60" />
      <path d="M128 161 L128 195 M192 161 L192 195" />
    </g>
  `,
  'lunar-ramp': `
    <g class="animation-lander" aria-hidden="true">
      <path d="M98 96 L222 96 L236 172 L84 172Z" />
      <path d="M116 96 L116 56 L204 56 L204 96" />
      <circle cx="130" cy="70" r="9" />
      <circle cx="190" cy="70" r="9" />
    </g>
    <path class="animation-ramp" d="M100 170 L220 170 L272 204 L48 204Z" aria-hidden="true" />
  `
};

function animationArt(type, label) {
  return `
    <svg class="animation-art" viewBox="0 0 320 250" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="animation-sky-${type}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#121525" />
          <stop offset="100%" stop-color="#24191b" />
        </linearGradient>
      </defs>
      <rect width="320" height="250" fill="url(#animation-sky-${type})" />
      <g class="animation-stars" aria-hidden="true">
        <circle cx="28" cy="30" r="1.2" /><circle cx="286" cy="24" r="1" />
        <circle cx="42" cy="108" r=".8" /><circle cx="280" cy="124" r="1.3" />
        <circle cx="240" cy="34" r=".7" /><circle cx="84" cy="74" r=".9" />
      </g>
      <circle class="animation-body" cx="160" cy="238" r="100" />
      <path class="animation-horizon" d="M0 198 Q80 178 160 198 T320 198 V250 H0Z" />
      ${ART_BY_TYPE[type] || ART_BY_TYPE['lunar-ramp']}
      <g class="animation-rover" aria-hidden="true">
        <rect x="113" y="158" width="94" height="40" rx="8" />
        <rect x="130" y="142" width="60" height="24" rx="4" />
        <path d="M145 142 L145 126 L175 126 L175 142" />
        <circle cx="128" cy="201" r="12" /><circle cx="192" cy="201" r="12" />
        <circle class="animation-wheel-hub" cx="128" cy="201" r="4" />
        <circle class="animation-wheel-hub" cx="192" cy="201" r="4" />
      </g>
    </svg>
  `;
}

export function createLandingAnimation(root, config) {
  const duration = 7600;
  const stages = config.stages || [];
  const prefersReducedMotion = window.matchMedia?.(REDUCED_MOTION_QUERY).matches;

  root.innerHTML = `
    <section
      class="landing-animation landing-animation--${config.type}"
      style="--animation-accent: ${config.accent}"
      data-state="${prefersReducedMotion ? 'static' : 'playing'}"
      aria-labelledby="animation-title"
    >
      <div class="animation-heading">
        <div>
          <p class="card-kicker">LANDING SEQUENCE</p>
          <h2 id="animation-title">${config.label}</h2>
        </div>
        <p class="animation-stage-label" data-stage-label>${prefersReducedMotion ? 'Reduced-motion view' : stages[0]}</p>
      </div>
      <div class="animation-viewport">
        ${animationArt(config.type, `${config.label} landing sequence`)}
        <div class="animation-scanline" aria-hidden="true"></div>
      </div>
      <div class="animation-controls" role="group" aria-label="Landing animation controls">
        <button type="button" class="control-button" data-action="replay">Replay</button>
        <button type="button" class="control-button" data-action="pause" aria-pressed="false">${prefersReducedMotion ? 'Static view' : 'Pause'}</button>
        <button type="button" class="control-button control-button--quiet" data-action="skip">Skip</button>
      </div>
    </section>
  `;

  const animation = root.firstElementChild;
  const stageLabel = animation.querySelector('[data-stage-label]');
  const pauseButton = animation.querySelector('[data-action="pause"]');
  let stageTimers = [];

  function clearStageTimers() {
    stageTimers.forEach((timer) => window.clearTimeout(timer));
    stageTimers = [];
  }

  function setState(state) {
    animation.dataset.state = state;
    const isPaused = state === 'paused';
    pauseButton.setAttribute('aria-pressed', String(isPaused));
    pauseButton.textContent = prefersReducedMotion ? 'Static view' : isPaused ? 'Resume' : 'Pause';
  }

  function scheduleStages() {
    clearStageTimers();
    if (prefersReducedMotion || stages.length < 2) {
      return;
    }

    const interval = duration / stages.length;
    stages.slice(1).forEach((stage, index) => {
      stageTimers.push(window.setTimeout(() => {
        if (animation.dataset.state === 'playing') {
          stageLabel.textContent = stage;
        }
      }, interval * (index + 1)));
    });
  }

  function replay() {
    setState('paused');
    animation.classList.remove('animation-restart');
    void animation.offsetWidth;
    animation.classList.add('animation-restart');
    setState(prefersReducedMotion ? 'static' : 'playing');
    stageLabel.textContent = prefersReducedMotion ? 'Reduced-motion view' : stages[0];
    scheduleStages();
  }

  animation.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (!action) {
      return;
    }

    if (action === 'replay') {
      replay();
    } else if (action === 'pause' && !prefersReducedMotion) {
      const isPaused = animation.dataset.state === 'paused';
      setState(isPaused ? 'playing' : 'paused');
    } else if (action === 'skip') {
      clearStageTimers();
      setState('skipped');
      stageLabel.textContent = stages.at(-1) || 'Touchdown';
    }
  });

  scheduleStages();
  return {
    replay,
    destroy: clearStageTimers
  };
}
