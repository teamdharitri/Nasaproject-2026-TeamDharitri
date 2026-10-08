(function createKidsAuth(global) {
  const PROFILE_KEY = 'rover-atlas-kids-profile';
  const SESSION_KEY = 'rover-atlas-kids-session';

  function read(key) {
    try {
      const value = global.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  function write(key, value) {
    global.localStorage.setItem(key, JSON.stringify(value));
  }

  function hashPin(pin) {
    let hash = 2166136261;
    for (const character of pin) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  function getProfile() {
    return read(PROFILE_KEY);
  }

  function createProfile(profile, pin) {
    const savedProfile = {
      nickname: profile.nickname,
      character: profile.character,
      planet: profile.planet || null,
      pinHash: pin ? hashPin(pin) : null,
      createdAt: new Date().toISOString()
    };
    write(PROFILE_KEY, savedProfile);
    write(SESSION_KEY, { nickname: savedProfile.nickname });
    return savedProfile;
  }

  function playAsGuest(nickname = 'hangy buddy') {
    return createProfile({
      nickname,
      character: {
        base: 'Explorer',
        skin: '#9b6a4e',
        helmet: 'Clear helmet',
        suit: '#ef9b68',
        buddy: 'Sojourner'
      }
    });
  }

  function login(pin) {
    const profile = getProfile();
    if (!profile || !profile.pinHash || hashPin(pin) !== profile.pinHash) {
      return null;
    }
    write(SESSION_KEY, { nickname: profile.nickname });
    return profile;
  }

  function updateProfile(changes) {
    const profile = getProfile() || {};
    const nextProfile = { ...profile, ...changes };
    write(PROFILE_KEY, nextProfile);
    return nextProfile;
  }

  function logout() {
    global.localStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    return Boolean(read(SESSION_KEY));
  }

  global.KidsAuth = {
    createProfile,
    getProfile,
    isLoggedIn,
    login,
    logout,
    playAsGuest,
    updateProfile
  };
}(window));
