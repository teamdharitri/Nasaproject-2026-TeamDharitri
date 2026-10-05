const SESSION_KEY = 'rover-atlas-session';

function browserStorage() {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

export function getSession(storage = browserStorage()) {
  if (!storage) {
    return null;
  }

  try {
    const rawSession = storage.getItem(SESSION_KEY);
    return rawSession ? JSON.parse(rawSession) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(storage = browserStorage()) {
  return Boolean(getSession(storage)?.email);
}

/**
 * Mock authentication for the static prototype.
 * Replace this module's implementation with a real provider before production use.
 */
export function signIn(email, storage = browserStorage()) {
  if (!storage) {
    throw new Error('Session storage is unavailable in this browser.');
  }

  const session = {
    email: email.trim().toLowerCase(),
    signedInAt: new Date().toISOString()
  };

  storage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOut(storage = browserStorage()) {
  storage?.removeItem(SESSION_KEY);
}

export { SESSION_KEY };
