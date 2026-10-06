import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const requiredFiles = [
  'index.html',
  '404.html',
  'styles.css',
  'app.js',
  'auth-service.js',
  'landing-animation.js',
  'rover-data.js',
  'route-guard.js',
  'kids-game.html',
  'kids-auth.js',
  'kids-strings.js',
  'audio.js',
  'service-worker.js',
  'manifest.webmanifest',
  'icons/rover-icon.svg',
  'icons/rover-maskable.svg'
];

for (const file of requiredFiles) {
  await access(join(root, file));
}

const index = await readFile(join(root, 'index.html'), 'utf8');
const app = await readFile(join(root, 'app.js'), 'utf8');
const kidsGame = await readFile(join(root, 'kids-game.html'), 'utf8');

if (!index.includes('src="./app.js"')) {
  throw new Error('index.html does not load app.js');
}

for (const requiredRoute of ['/login', '/missions']) {
  if (!app.includes(requiredRoute)) {
    throw new Error(`Application is missing route ${requiredRoute}`);
  }
}

for (const requiredKidsMarker of [
  'id="loginScreen"',
  'id="characterScreen"',
  'id="planetScreen"',
  'id="inspectPanel"',
  'id="characterPreview"',
  'id="roverPreview"',
  'HOOK: Watch landing button goes here',
  'function initGlobe()',
  'id="settingsPanel"',
  'id="audioControls"',
  'rel="manifest"',
  'serviceWorker'
]) {
  if (!kidsGame.includes(requiredKidsMarker)) {
    throw new Error(`Kids game is missing ${requiredKidsMarker}`);
  }
}

const manifest = JSON.parse(await readFile(join(root, 'manifest.webmanifest'), 'utf8'));

for (const requiredManifestField of ['name', 'short_name', 'start_url', 'display', 'icons']) {
  if (!manifest[requiredManifestField]) {
    throw new Error(`Manifest is missing ${requiredManifestField}`);
  }
}

if (!manifest.icons.some((icon) => icon.purpose === 'maskable')) {
  throw new Error('Manifest is missing a maskable icon');
}

for (const icon of manifest.icons) {
  await access(join(root, icon.src));
}

const serviceWorker = await readFile(join(root, 'service-worker.js'), 'utf8');

for (const requiredWorkerMarker of ['CACHE_VERSION', 'kids-game.html', 'cdn.jsdelivr.net']) {
  if (!serviceWorker.includes(requiredWorkerMarker)) {
    throw new Error(`Service worker is missing ${requiredWorkerMarker}`);
  }
}

console.log('Build check passed. Static entry points, routes, kids flow, and PWA assets are present.');
