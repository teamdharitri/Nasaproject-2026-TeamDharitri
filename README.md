# Rover Mission Atlas

An interactive field guide to Mars and Moon rover missions. The existing Three.js
maps remain available through the Mars map and Moon map links, and `kids-game.html`
adds an installable, offline-capable children’s version of both worlds.

## Stack

- Static HTML, CSS, and vanilla JavaScript
- Three.js `r128` via the existing CDN imports in `mars-map.html` and `moon-map.html`
- Inter via Google Fonts
- Native CSS/SVG landing animations, with no additional runtime dependency

## Run locally

The app uses client-side routes, so serve the repository from a local HTTP server
instead of opening `index.html` directly:

```powershell
py -m http.server 4173 --directory .
```

Open `http://localhost:4173/`. The root route opens the login page for signed-out
visitors and the missions page for an existing demo session.

The Python server does not rewrite clean URLs. Use the app links for local testing,
or configure the host to serve `404.html` as the SPA fallback. GitHub Pages uses
`404.html` automatically.

## Authentication

The current prototype uses mock authentication. Any valid email and a password of
at least six characters will create a browser session. The auth implementation is
isolated in `auth-service.js` so it can be replaced with Firebase, Supabase, or a
backend later.

No credentials are sent to a server. Review `.env.example` before connecting a real
provider, and never commit real secrets.

## Checks

```powershell
npm test
npm run lint
npm run build
```

The checks use Node's built-in test runner and static checks because this repository
does not use a framework or package-based build tool.

## Mission data

Shared rover records live in `rover-data.js`. The Apollo Lunar Roving Vehicle entry
contains a `TODO` note because its launch and landing dates are vehicle-level data
that should be verified against the team's preferred NASA source.

## Kids rover game

The one-page children’s flow is `kids-game.html`. Mars and Moon share one Three.js
renderer, scene, and camera, and the renderer starts only after a planet is chosen:

```text
#login → #character → #planet → #focus → #atlas → #inspect=curiosity
```

Open `http://localhost:4173/kids-game.html` after starting the local server. Choosing
the other planet disposes the active globe’s geometries, materials, textures, markers,
and labels before building the new one, so switching never leaks GPU resources.

Moon records come from the data already in `moon-map.html`. Missions whose
coordinates, dates, sites, or status are not available in this repository keep a
`TODO: verify` marker instead of an invented value, and those entries appear as
selectable chips without a globe marker.

### Settings

The settings panel (⚙ in the bottom-right bar) stores four preferences locally:

- **Language / spelling** — English (US), English (UK), or English (Canada). UK and
  Canadian spelling switch words such as "colour" and "metre".
- **Reading level** — Younger (ages 6–9) or Older (ages 10–14). Mission descriptions
  rewrite themselves immediately, including an open inspection panel.
- **Theme** — Classic space, Bright day, or Night mode. Every theme keeps text at or
  above a 7:1 contrast ratio, and the installed app’s colour follows the choice.
- **Volume and mute** — audio is generated with the Web Audio API in `audio.js`, so
  the repository ships no audio files. Sound starts only after the first tap, stays
  at a low default volume, changes mood per screen, and suspends on a hidden tab.

### Offline and install

`manifest.webmanifest`, `icons/`, and `service-worker.js` make the game installable
and usable without a connection. The worker precaches the app shell plus the Three.js
and font CDN files, because Chrome can serve those from its memory cache without ever
reaching the worker. Bump `CACHE_VERSION` in `service-worker.js` when shipping new
assets; activation deletes every cache from older versions.

### Data storage

The local profile stores only a filtered nickname, character choices, selected planet,
a one-way PIN hash, and a creation timestamp. The active session stores only the
nickname. Settings live in their own keys: `rover-atlas-kids-language`,
`rover-atlas-kids-reading-level`, `rover-atlas-kids-theme`, and
`rover-atlas-kids-audio`. Everything stays in `localStorage` on the device.

No analytics, ads, trackers, chat, outside links, or parent credentials are used. The
`// HOOK: Watch landing button goes here` comment in `kids-game.html` is the reserved
landing-animation hook.