const CACHE_VERSION = 'v2';
const APP_CACHE = `rover-atlas-app-${CACHE_VERSION}`;
const CDN_CACHE = `rover-atlas-cdn-${CACHE_VERSION}`;
const OFFLINE_PAGE = './kids-game.html';

const APP_SHELL = [
  './kids-game.html',
  './kids-auth.js',
  './kids-strings.js',
  './audio.js',
  './manifest.webmanifest',
  './icons/rover-icon.svg',
  './icons/rover-maskable.svg'
];

// Third-party origins the atlas needs: Three.js and the Inter web font.
const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Chrome can serve these from its memory cache without ever reaching the fetch
// handler, so the globe only survives offline if install stores them up front.
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(APP_CACHE).then((cache) => cache.addAll(APP_SHELL)),
      caches.open(CDN_CACHE).then((cache) => Promise.allSettled(
        CDN_ASSETS.map((asset) => cache.add(asset))
      ))
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== APP_CACHE && key !== CDN_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then((cache) => cache.match(request).then((cached) => {
    const network = fetch(request)
      .then((response) => {
        if (response && (response.ok || response.type === 'opaque')) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => cached);

    return cached || network;
  }));
}

function networkFirst(request) {
  return caches.open(APP_CACHE).then((cache) => fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cache.match(request).then((cached) => cached || cache.match(OFFLINE_PAGE))));
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, APP_CACHE));
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, CDN_CACHE));
  }
});
