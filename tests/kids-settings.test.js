import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const stringsSource = await readFile(new URL('kids-strings.js', root), 'utf8');
const audioSource = await readFile(new URL('audio.js', root), 'utf8');
const workerSource = await readFile(new URL('service-worker.js', root), 'utf8');
const kidsGame = await readFile(new URL('kids-game.html', root), 'utf8');
const manifest = JSON.parse(await readFile(new URL('manifest.webmanifest', root), 'utf8'));

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key)
  };
}

function createStrings() {
  const themeColor = {
    content: '',
    setAttribute(name, value) {
      this.content = value;
    }
  };
  const context = {
    window: { localStorage: createStorage() },
    document: {
      body: { dataset: {} },
      querySelector: (selector) => (
        selector === 'meta[name="theme-color"]' ? themeColor : null
      )
    }
  };
  vm.runInNewContext(stringsSource, context);
  return { strings: context.window.KidsStrings, document: context.document, themeColor };
}

function createAudio() {
  const storage = createStorage();
  const muteButton = {
    textContent: '',
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener() {}
  };
  const documentEvents = [];
  const context = {
    window: {
      localStorage: storage,
      setInterval: () => 1,
      clearInterval: () => {}
    },
    document: {
      querySelector: (selector) => (selector === '#muteButton' ? muteButton : null),
      addEventListener: (type) => documentEvents.push(type)
    }
  };
  vm.runInNewContext(audioSource, context);
  return { audio: context.window.KidsAudio, storage, muteButton, documentEvents };
}

test('regional settings switch spelling without losing fallbacks', () => {
  const { strings } = createStrings();

  assert.equal(strings.get('color'), 'Color');

  strings.setLanguage('uk');
  assert.equal(strings.getLanguage(), 'uk');
  assert.equal(strings.get('color'), 'Colour');
  assert.equal(strings.get('meter'), 'metre');

  strings.setLanguage('ca');
  assert.equal(strings.get('color'), 'Colour');

  strings.setLanguage('not-a-language');
  assert.equal(strings.getLanguage(), 'us');
  assert.equal(strings.get('color'), 'Color');
});

test('reading level picks age-appropriate mission wording', () => {
  const { strings } = createStrings();
  const curiosity = { n: 'Curiosity', d: 'Fallback description.' };
  const unknownMission = { n: 'Lunokhod 1', d: 'TODO: verify the kid-friendly mission description.' };

  assert.equal(strings.getReadingLevel(), 'younger');
  const younger = strings.missionDescription(curiosity);

  strings.setReadingLevel('older');
  assert.equal(strings.getReadingLevel(), 'older');
  const older = strings.missionDescription(curiosity);

  assert.notEqual(younger, older);
  assert.equal(strings.missionDescription(unknownMission), unknownMission.d);

  strings.setReadingLevel('nonsense');
  assert.equal(strings.getReadingLevel(), 'younger');
});

test('themes persist and keep the installed app colour in sync', () => {
  const { strings, document, themeColor } = createStrings();

  assert.equal(strings.getTheme(), 'classic-space');

  strings.setTheme('bright-day');
  assert.equal(strings.getTheme(), 'bright-day');
  assert.equal(document.body.dataset.theme, 'bright-day');
  assert.equal(themeColor.content, '#eef4fb');

  strings.setTheme('night-mode');
  assert.equal(themeColor.content, '#02030a');

  strings.setTheme('rainbow');
  assert.equal(strings.getTheme(), 'classic-space');
  assert.equal(document.body.dataset.theme, 'classic-space');
});

test('distances report both units and flag unverified values', () => {
  const { strings } = createStrings();
  const formatted = strings.formatDistance(100);

  assert.match(formatted, /km/);
  assert.match(formatted, /miles/);
  assert.match(strings.formatDistance(null), /TODO/);
});

test('audio starts muted-safe, stays quiet, and survives a missing AudioContext', () => {
  const { audio, storage, muteButton, documentEvents } = createAudio();

  assert.deepEqual(
    Object.keys(audio).sort(),
    ['chime', 'mount', 'refresh', 'setMood', 'setMuted', 'setVolume', 'tap']
  );

  audio.setVolume(5);
  assert.equal(JSON.parse(storage.getItem('rover-atlas-kids-audio')).volume, 0.2);

  audio.setVolume(-1);
  assert.equal(JSON.parse(storage.getItem('rover-atlas-kids-audio')).volume, 0);

  audio.setMuted(true);
  assert.equal(JSON.parse(storage.getItem('rover-atlas-kids-audio')).muted, true);
  assert.equal(muteButton.attributes['aria-pressed'], 'true');
  assert.match(muteButton.textContent, /Sound off/);

  audio.mount();
  assert.ok(documentEvents.includes('visibilitychange'));
  assert.ok(documentEvents.includes('pointerdown'));

  assert.doesNotThrow(() => {
    audio.tap();
    audio.chime();
    audio.setMood('atlas');
  });
});

test('offline support ships a versioned worker and installable manifest', async () => {
  assert.match(workerSource, /CACHE_VERSION/);
  assert.match(workerSource, /kids-game\.html/);
  assert.match(workerSource, /caches\.delete/);

  // The globe cannot start offline unless both Three.js bundles are precached.
  for (const cdnAsset of [/cdnjs\.cloudflare\.com.+three\.min\.js/, /cdn\.jsdelivr\.net.+OrbitControls\.js/]) {
    assert.match(workerSource, cdnAsset);
  }

  assert.ok(manifest.name);
  assert.ok(manifest.start_url.includes('kids-game.html'));
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.some((icon) => icon.purpose === 'maskable'));

  for (const icon of manifest.icons) {
    await access(new URL(icon.src, root));
  }

  assert.match(kidsGame, /rel="manifest"/);
  assert.match(kidsGame, /serviceWorker\.register/);
});

test('moon missions load without inventing unverified facts', () => {
  for (const moonMission of ['Apollo 11', 'Lunokhod 1', 'Yutu-2', 'Pragyan']) {
    assert.ok(kidsGame.includes(moonMission), `Moon atlas is missing ${moonMission}`);
  }

  const lunokhod = kidsGame.slice(kidsGame.indexOf("n:'Lunokhod 1'"));
  const record = lunokhod.slice(0, lunokhod.indexOf('}'));

  assert.match(record, /la:null, lo:null/);
  assert.match(record, /TODO: verify/);
});
