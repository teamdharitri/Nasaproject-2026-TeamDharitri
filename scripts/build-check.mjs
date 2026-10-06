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
  'kids-auth.js'
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
  'function initGlobe()'
]) {
  if (!kidsGame.includes(requiredKidsMarker)) {
    throw new Error(`Kids game is missing ${requiredKidsMarker}`);
  }
}

console.log('Build check passed. Static entry points, routes, and kids flow are present.');
