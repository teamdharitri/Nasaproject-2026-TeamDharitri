(function createKidsStrings(global) {
  const LANGUAGE_KEY = 'rover-atlas-kids-language';
  const READING_KEY = 'rover-atlas-kids-reading-level';
  const THEME_KEY = 'rover-atlas-kids-theme';

  const DICTIONARY = {
    us: {
      color: 'Color',
      meter: 'meter',
      settings: 'Settings',
      language: 'English',
      readingLevel: 'Reading level',
      theme: 'Theme',
      classicSpace: 'Classic space',
      brightDay: 'Bright day',
      nightMode: 'Night mode',
      younger: 'Younger (ages 6–9)',
      older: 'Older (ages 10–14)',
      soundOn: '🔊 Sound on',
      soundOff: '🔇 Sound off',
      volume: 'Volume',
      save: 'Done',
      languageUS: 'English (US)',
      languageUK: 'English (UK)',
      languageCA: 'English (Canada)',
      marsDescription: 'The red planet, full of rover tracks.',
      moonDescription: 'A silver world with stories from Apollo and robotic explorers.',
      focusMars: 'The Mars atlas is waking up. Get ready to explore.',
      focusMoon: 'The Moon atlas is waking up. Get ready to explore.',
      meet: 'Meet',
      where: 'Where',
      arrived: 'Arrived',
      mission: 'Mission',
      stillExploring: 'Still exploring',
      finished: 'Finished its amazing job and went to sleep',
      coordinates: 'Coordinates',
      launch: 'Launch',
      landing: 'Landing',
      end: 'End',
      duration: 'Duration',
      unknown: 'TODO: verify',
      km: 'km',
      miles: 'miles'
    },
    uk: {
      color: 'Colour',
      meter: 'metre',
      settings: 'Settings',
      language: 'English',
      readingLevel: 'Reading level',
      theme: 'Theme',
      classicSpace: 'Classic space',
      brightDay: 'Bright day',
      nightMode: 'Night mode',
      younger: 'Younger (ages 6–9)',
      older: 'Older (ages 10–14)',
      soundOn: '🔊 Sound on',
      soundOff: '🔇 Sound off',
      volume: 'Volume',
      save: 'Done',
      languageUS: 'English (US)',
      languageUK: 'English (UK)',
      languageCA: 'English (Canada)',
      marsDescription: 'The red planet, full of rover tracks.',
      moonDescription: 'A silvery world with stories from Apollo and robotic explorers.',
      focusMars: 'The Mars atlas is waking up. Get ready to explore.',
      focusMoon: 'The Moon atlas is waking up. Get ready to explore.',
      meet: 'Meet',
      where: 'Where',
      arrived: 'Arrived',
      mission: 'Mission',
      stillExploring: 'Still exploring',
      finished: 'Finished its amazing job and went to sleep',
      coordinates: 'Coordinates',
      launch: 'Launch',
      landing: 'Landing',
      end: 'End',
      duration: 'Duration',
      unknown: 'TODO: verify',
      km: 'km',
      miles: 'miles'
    },
    ca: {
      color: 'Colour',
      meter: 'metre',
      settings: 'Settings',
      language: 'English',
      readingLevel: 'Reading level',
      theme: 'Theme',
      classicSpace: 'Classic space',
      brightDay: 'Bright day',
      nightMode: 'Night mode',
      younger: 'Younger (ages 6–9)',
      older: 'Older (ages 10–14)',
      soundOn: '🔊 Sound on',
      soundOff: '🔇 Sound off',
      volume: 'Volume',
      save: 'Done',
      languageUS: 'English (US)',
      languageUK: 'English (UK)',
      languageCA: 'English (Canada)',
      marsDescription: 'The red planet, full of rover tracks.',
      moonDescription: 'A silvery world with stories from Apollo and robotic explorers.',
      focusMars: 'The Mars atlas is waking up. Get ready to explore.',
      focusMoon: 'The Moon atlas is waking up. Get ready to explore.',
      meet: 'Meet',
      where: 'Where',
      arrived: 'Arrived',
      mission: 'Mission',
      stillExploring: 'Still exploring',
      finished: 'Finished its amazing job and went to sleep',
      coordinates: 'Coordinates',
      launch: 'Launch',
      landing: 'Landing',
      end: 'End',
      duration: 'Duration',
      unknown: 'TODO: verify',
      km: 'km',
      miles: 'miles'
    }
  };

  // Each entry only rephrases the description already stored with that mission.
  // Missions whose facts are still unverified keep their own TODO text instead.
  const READING_FACTS = {
    Curiosity: {
      younger: 'Curiosity is climbing Mount Sharp and studying clues that Mars once had places where life could live.',
      older: 'Curiosity climbs Mount Sharp while studying evidence of ancient habitable environments.'
    },
    Perseverance: {
      younger: 'Perseverance looks for signs that life may have existed long ago, and it collects rock samples.',
      older: 'Perseverance searches for potential signs of ancient life and collects samples from Mars.'
    },
    Spirit: {
      younger: 'Spirit was built to work for 90 days, but it kept going for almost 6 years.',
      older: 'Spirit was designed for a 90-day mission but operated for nearly 6 years, with final contact in 2010.'
    },
    Opportunity: {
      younger: 'Opportunity was built to work for 90 days, but it explored for almost 14 years and found clues that water was once there.',
      older: 'Opportunity was designed for a 90-day mission, operated for nearly 14 years, and found important evidence of ancient water activity.'
    }
  };

  function get(key) {
    const language = global.localStorage.getItem(LANGUAGE_KEY) || 'us';
    return DICTIONARY[language]?.[key] || DICTIONARY.us[key] || key;
  }

  function setLanguage(language) {
    const next = DICTIONARY[language] ? language : 'us';
    global.localStorage.setItem(LANGUAGE_KEY, next);
    return next;
  }

  function getLanguage() {
    return global.localStorage.getItem(LANGUAGE_KEY) || 'us';
  }

  function setReadingLevel(level) {
    const next = level === 'older' ? 'older' : 'younger';
    global.localStorage.setItem(READING_KEY, next);
    return next;
  }

  function getReadingLevel() {
    return global.localStorage.getItem(READING_KEY) || 'younger';
  }

  const THEME_COLORS = {
    'classic-space': '#05060b',
    'bright-day': '#eef4fb',
    'night-mode': '#02030a'
  };

  function setTheme(theme) {
    const next = THEME_COLORS[theme] ? theme : 'classic-space';
    global.localStorage.setItem(THEME_KEY, next);
    document.body.dataset.theme = next;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', THEME_COLORS[next]);
    }

    return next;
  }

  function getTheme() {
    return global.localStorage.getItem(THEME_KEY) || 'classic-space';
  }

  function formatDistance(kilometres) {
    if (!Number.isFinite(kilometres)) {
      return get('unknown');
    }
    const miles = kilometres * .621371;
    return `${kilometres.toLocaleString()} ${get('km')} / ${miles.toLocaleString(undefined, {maximumFractionDigits: 1})} ${get('miles')}`;
  }

  function missionDescription(mission) {
    return READING_FACTS[mission.n]?.[getReadingLevel()] || mission.d;
  }

  global.KidsStrings = {
    formatDistance,
    get,
    getLanguage,
    getReadingLevel,
    getTheme,
    missionDescription,
    setLanguage,
    setReadingLevel,
    setTheme
  };
}(window));
