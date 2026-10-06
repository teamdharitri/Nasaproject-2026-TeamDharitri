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

  const READING_FACTS = {
    Curiosity: {
      younger: 'Curiosity is a car-sized rover that studies rocks and soil on Mars.',
      older: 'Curiosity studies Mount Sharp and the evidence of ancient habitable environments.'
    },
    Perseverance: {
      younger: 'Perseverance looks for clues about ancient life and collects rock samples.',
      older: 'Perseverance searches Jezero Crater for signs of ancient life and collects samples.'
    },
    Spirit: {
      younger: 'Spirit explored Mars for years and studied rocks that tell a water story.',
      older: 'Spirit explored Gusev Crater far beyond its planned mission and studied evidence of past water.'
    },
    Opportunity: {
      younger: 'Opportunity found rocks shaped by water long ago.',
      older: 'Opportunity found important evidence that water once changed rocks on Mars.'
    },
    'Yutu-2': {
      younger: 'Yutu-2 was the first rover to explore the far side of the Moon.',
      older: 'Yutu-2 explores the far side of the Moon as part of Chang’e 4.'
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

  function setTheme(theme) {
    const next = ['classic-space', 'bright-day', 'night-mode'].includes(theme)
      ? theme
      : 'classic-space';
    global.localStorage.setItem(THEME_KEY, next);
    document.body.dataset.theme = next;
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
