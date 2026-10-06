import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const authSource = await readFile(new URL('../kids-auth.js', import.meta.url), 'utf8');

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key)
  };
}

function createAuth() {
  const context = {
    window: {
      localStorage: createStorage()
    }
  };
  vm.runInNewContext(authSource, context);
  return context.window.KidsAuth;
}

test('kids auth stores a minimal local profile and session', () => {
  const auth = createAuth();
  const profile = auth.createProfile({
    nickname: 'Brave Comet',
    character: { base: 'Explorer', buddy: 'Sojourner' },
    planet: 'Mars'
  }, '1234');

  assert.deepEqual(
    {
      nickname: profile.nickname,
      planet: profile.planet,
      character: profile.character
    },
    {
      nickname: 'Brave Comet',
      planet: 'Mars',
      character: { base: 'Explorer', buddy: 'Sojourner' }
    }
  );
  assert.equal(auth.isLoggedIn(), true);
  assert.equal(auth.getProfile().pinHash.includes('1234'), false);
});

test('kids auth rejects a wrong PIN and accepts the saved PIN', () => {
  const auth = createAuth();
  auth.createProfile({
    nickname: 'Space Fox',
    character: { base: 'Explorer' }
  }, '2468');
  auth.logout();

  assert.equal(auth.login('0000'), null);
  assert.equal(auth.isLoggedIn(), false);
  assert.equal(auth.login('2468').nickname, 'Space Fox');
  assert.equal(auth.isLoggedIn(), true);
});

test('guest mode creates a profile without a PIN', () => {
  const auth = createAuth();
  const profile = auth.playAsGuest('Moon Walker');

  assert.equal(profile.nickname, 'Moon Walker');
  assert.equal(profile.pinHash, null);
  assert.equal(auth.isLoggedIn(), true);
});
