# Rover Mission Atlas

An interactive field guide to Mars and Moon rover missions. The existing Three.js
maps remain available through the Mars map and Moon map links.

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

The one-page children’s flow is `kids-game.html`. It uses the original Mars globe
without an iframe and initializes the main renderer only after Mars is selected:

```text
#login → #character → #planet → #atlas → #inspect=curiosity
```

Open `http://localhost:4173/kids-game.html` after starting the local server. Moon is
shown as a coming-soon option because the repository does not contain Moon globe code.

The local profile stores only a filtered nickname, character choices, selected planet,
a one-way PIN hash, and a creation timestamp. The active session stores only the
nickname. No analytics, ads, trackers, chat, outside links, or parent credentials are
used. The `// HOOK: Watch landing button goes here` comment in `kids-game.html` is the
reserved landing-animation hook.