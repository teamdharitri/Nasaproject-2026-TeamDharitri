import test from 'node:test';
import assert from 'node:assert/strict';
import { isAuthenticated, signIn, signOut } from '../auth-service.js';
import { redirectForAuth } from '../route-guard.js';
import { validateLoginForm } from '../validation.js';

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key)
  };
}

test('login validation reports required and malformed fields', () => {
  const result = validateLoginForm({ email: 'not-an-email', password: '123' });

  assert.equal(result.valid, false);
  assert.equal(result.errors.email, 'Enter a valid email address.');
  assert.equal(result.errors.password, 'Password must be at least 6 characters.');
});

test('login validation accepts a valid email and password', () => {
  assert.deepEqual(
    validateLoginForm({ email: 'pilot@example.com', password: 'orbital-pass' }),
    { valid: true, errors: {} }
  );
});

test('mission routes redirect unauthenticated visitors', () => {
  assert.equal(redirectForAuth('/missions', false), '/login');
  assert.equal(redirectForAuth('/missions/perseverance', false), '/login');
  assert.equal(redirectForAuth('/missions', true), null);
  assert.equal(redirectForAuth('/login', false), null);
});

test('mock auth stores, reads, and clears a session', () => {
  const storage = createStorage();

  assert.equal(isAuthenticated(storage), false);
  signIn(' Pilot@Example.com ', storage);
  assert.equal(isAuthenticated(storage), true);
  assert.equal(JSON.parse(storage.getItem('rover-atlas-session')).email, 'pilot@example.com');

  signOut(storage);
  assert.equal(isAuthenticated(storage), false);
});
