(function createKidsAudio(global) {
  const SETTINGS_KEY = 'rover-atlas-kids-audio';
  const MOODS = {
    login: [261.63, 329.63],
    character: [329.63, 392],
    planet: [293.66, 369.99],
    focus: [220, 293.66],
    atlas: [196, 246.94],
    inspect: [392, 493.88]
  };

  let context = null;
  let master = null;
  let moodTimer = null;
  let moodName = 'login';
  let mounted = false;
  let settings = {
    muted: false,
    volume: .12
  };

  try {
    settings = {
      ...settings,
      ...JSON.parse(global.localStorage.getItem(SETTINGS_KEY) || '{}')
    };
  } catch {
    // Audio preferences are optional and can be recreated.
  }

  function persist() {
    try {
      global.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Continue without persistence if storage is unavailable.
    }
  }

  function updateButton() {
    const button = document.querySelector('#muteButton');
    if (!button) {
      return;
    }
    button.textContent = settings.muted ? '🔇 Sound off' : '🔊 Sound on';
    button.setAttribute('aria-pressed', String(settings.muted));
  }

  function ensureStarted() {
    if (!context) {
      const AudioContext = global.AudioContext || global.webkitAudioContext;
      if (!AudioContext) {
        return false;
      }
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = settings.muted ? 0 : settings.volume;
      master.connect(context.destination);
    }

    if (context.state === 'suspended') {
      context.resume();
    }

    return true;
  }

  function tone(frequency, duration = .12, type = 'sine', delay = 0) {
    if (!ensureStarted() || settings.muted) {
      return;
    }

    const start = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(.18, start + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  }

  function playMood() {
    if (settings.muted) {
      return;
    }
    const notes = MOODS[moodName] || MOODS.login;
    tone(notes[0], .55, 'sine');
    tone(notes[1], .7, 'triangle', .13);
  }

  function setMood(nextMood) {
    moodName = nextMood;
    if (!context) {
      return;
    }
    global.clearInterval(moodTimer);
    playMood();
    moodTimer = global.setInterval(playMood, 4200);
  }

  function tap() {
    tone(660, .08, 'triangle');
  }

  function chime() {
    tone(523.25, .1, 'triangle');
    tone(783.99, .16, 'sine', .08);
  }

  function setMuted(muted) {
    settings.muted = Boolean(muted);
    if (master) {
      master.gain.setTargetAtTime(
        settings.muted ? 0 : settings.volume,
        context.currentTime,
        .03
      );
    }
    persist();
    updateButton();
  }

  function setVolume(volume) {
    settings.volume = Math.max(0, Math.min(.2, Number(volume)));
    if (master && !settings.muted) {
      master.gain.setTargetAtTime(settings.volume, context.currentTime, .03);
    }
    persist();
  }

  function mount() {
    if (mounted) {
      return;
    }
    mounted = true;
    updateButton();
    const volumeControl = document.querySelector('#volumeControl');
    if (volumeControl) {
      volumeControl.value = String(settings.volume);
    }

    document.addEventListener('pointerdown', () => {
      if (ensureStarted()) {
        setMood(moodName);
      }
    }, {
      once: true,
      passive: true
    });

    document.querySelector('#muteButton')?.addEventListener('click', () => {
      setMuted(!settings.muted);
    });

    document.querySelector('#volumeControl')?.addEventListener('input', (event) => {
      setVolume(event.target.value);
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-audio-tap]')) {
        tap();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (!context) {
        return;
      }
      if (document.hidden) {
        context.suspend();
      } else {
        context.resume();
      }
    });
  }

  global.KidsAudio = {
    chime,
    mount,
    setMood,
    setMuted,
    setVolume,
    tap
  };
}(window));
