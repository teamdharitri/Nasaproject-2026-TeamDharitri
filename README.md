# Rover Buddies
[Rover Buddies](https://nasaproject-2026-team-dharitri.vercel.app/)
"Every rover has a story."

A scroll-based digital story about Mars rovers, inspired by the style of *A Solar Tale* and by real NASA data.

A new detective, a little robot named Bolt (BOLT-7), and Commander Nova uncover the mysteries hidden in the damaged Archive X-17.

## What's included
[Rover Buddies](https://nasaproject-2026-team-dharitri.vercel.app/)
| Section | Codename | Mission |
|---|---|---|
| Prologue | Archive X-17 | Meet Nova and Bolt at headquarters |
| Case M-1 | Little Wheel | Sojourner and Mars Pathfinder |
| Case M-2 | Backwards Wheel | Spirit |
| Case M-3 | Little Blueberry | Opportunity |


Each case follows the rover's case file, landing, missing pieces, investigation, deduction board, identity file, final message, and Bolt's unlocked file.

## Run the project

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # creates a production build in dist/
```

Use this link to access the PWA (Progressive Web App) for this project-

[Rover Buddies](https://nasaproject-2026-team-dharitri.vercel.app/)

## Publish on GitHub Pages

All asset paths are relative (`base: "./"` in `vite.config.js`), so the site works
from a repository subfolder such as `https://<user>.github.io/rover-buddies/`.

1. Push this project to the `main` branch of a GitHub repository.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds the site and publishes `dist/` on every push to `main`.

Images and voice clips live in `public/` and must be committed. Keep image paths in
code relative (`"m1/yogi.webp"`, not `"/m1/yogi.webp"`), or they break on GitHub Pages.

## Project structure

- `src/data/story.js`: chapter text, images, dialogue, and NASA data.
- `src/data/characters.js`: Nova, Bolt, and rover signal labels.
- `src/components/Story.jsx`: scrolling, background images, chapter labels, and the NASA button.
- `src/components/Dialogue.jsx`: speaker dialogue bubbles.
- `src/components/Overlay.jsx`: title, deduction board, identity file, Bolt's file, and ending.
- `public/`: WebP images.
- `scripts/optimize-images.mjs`: image optimization (`npm run images`).

## AI character voices (Kokoro)

Voices are generated offline with the free, open-source Kokoro-82M model. No
account, API key, or credits are needed, and nothing is sent to an online service.

```bash
npm run voices              # generate every missing clip (first run downloads ~90 MB)
npm run voices -- --limit 3 # generate only the first few lines as a preview
npm run build               # include the audio in the deployment
```

Saved clips are skipped on reruns. Changed text, voices, or effects produce new
files. Generated MP3s and their manifest live in `public/voices/`. Only character
dialogue and its quoted text are spoken, never narration or hidden mission data.

Voices and effects are set in `scripts/voice-effects.mjs` and baked into each clip:

- Nova (`af_heart`): a natural female voice with light cleanup.
- Bolt (`am_puck`): pitched up for a small robot, with ring modulation and a metallic echo.
- Rover (`am_onyx`): pitched down, mechanical modulation, radio filter, and light
  bit-crushing. Weaker signal bars add more static.

Playback starts when the corresponding chat step becomes active. Scrolling to
another step stops the previous line instead of queuing it. Opening the case
menu or NASA modal, hiding the tab, or leaving the story stops playback.
Use **Voices on/off** and **Replay** to control it or retry browser autoplay.

Run `npm test` for voice mapping, text splitting, effect, and playback checks.

## Add a story step

```js
{ img: "/m1/yogi.webp", speaker: "bolt", text: "Bolt's line" }
```

- `speaker`: `nova`, `bolt`, or `rover`. Omit it for narration.
- For `rover`, set `signal` from 1 to 5. A value of 1 means a broken signal; 5 means clear.
- Set `fictional: true` to show the note "Fictional voice created for the story."
- Add `nasa: { src, title, caption, credit }` to open NASA data for that step. Other mission steps can open the mission's NASA image gallery.
- From `reveal: true`, the chapter chip shows the real mission name instead of the codename.

## Images and credits

- Story illustrations were created for this project.
- NASA data popups use images from the NASA Image and Video Library (`images.nasa.gov`); each image includes its credit.
- This project is not endorsed by NASA.
