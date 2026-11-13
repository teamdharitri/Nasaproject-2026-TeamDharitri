// Tiny synthesized blips for the rover's typewriter effect — no audio files needed.
// The Web Audio context is created lazily on the first keystroke, after the user
// has already clicked into the story, so browsers never block it as autoplay.

let ctx = null;

function getCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

// level = signal strength 1-5: a stronger link sounds a little higher and clearer.
export function playTypingBlip(level = 3) {
  const ac = getCtx();
  if (!ac || ac.state !== "running") return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "square";
  osc.frequency.value = 440 + level * 36 + (Math.random() * 24 - 12);
  gain.gain.setValueAtTime(0.06 + level * 0.01, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.045);
}
