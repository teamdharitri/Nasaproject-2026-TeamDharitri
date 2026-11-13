// Offline character effects, baked into each clip so every browser hears the same voice.

// factor > 1 raises pitch and shortens the clip; generation speed compensates for tempo.
export function resample(input, factor) {
  const out = new Float32Array(Math.floor(input.length / factor));
  for (let i = 0; i < out.length; i++) {
    const pos = i * factor;
    const j = Math.floor(pos);
    const frac = pos - j;
    out[i] = input[j] * (1 - frac) + (input[j + 1] ?? 0) * frac;
  }
  return out;
}

export function ringModulate(input, rate, freq, mix) {
  const out = new Float32Array(input.length);
  for (let i = 0; i < input.length; i++) {
    out[i] = input[i] * (1 - mix + mix * Math.sin((2 * Math.PI * freq * i) / rate));
  }
  return out;
}

// Short feedback delay gives the hollow, metallic ring of a speaker inside a machine body.
export function metallic(input, rate, delayMs, feedback) {
  const d = Math.max(1, Math.round((delayMs / 1000) * rate));
  const out = new Float32Array(input.length);
  for (let i = 0; i < input.length; i++) out[i] = input[i] + (i >= d ? feedback * out[i - d] : 0);
  return out;
}

function biquad(input, rate, type, freq, q) {
  const w = (2 * Math.PI * freq) / rate;
  const alpha = Math.sin(w) / (2 * q);
  const cos = Math.cos(w);
  const [b0, b1, b2] = type === "highpass"
    ? [(1 + cos) / 2, -(1 + cos), (1 + cos) / 2]
    : [(1 - cos) / 2, 1 - cos, (1 - cos) / 2];
  const a0 = 1 + alpha, a1 = -2 * cos, a2 = 1 - alpha;
  const out = new Float32Array(input.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    out[i] = y;
  }
  return out;
}

export const highpass = (input, rate, freq) => biquad(input, rate, "highpass", freq, 0.707);
export const lowpass = (input, rate, freq) => biquad(input, rate, "lowpass", freq, 0.707);

export function bitcrush(input, bits, mix) {
  const steps = 2 ** (bits - 1);
  return input.map((x) => x * (1 - mix) + (Math.round(x * steps) / steps) * mix);
}

// Seeded so regenerating the same line produces identical static.
export function addStatic(input, amount, seed = 1) {
  let s = seed;
  return input.map((x) => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return x + ((s / 2 ** 32) * 2 - 1) * amount;
  });
}

export function normalize(input, peak = 0.89) {
  let max = 0;
  for (const x of input) max = Math.max(max, Math.abs(x));
  return max ? input.map((x) => (x / max) * peak) : input;
}

// Soft saturation lifts average loudness while the peak stays fixed by normalize().
export function drive(input, amount) {
  const scale = Math.tanh(amount);
  return input.map((x) => Math.tanh(x * amount) / scale);
}

export const characterVoices = {
  // A natural female commander, only lightly cleaned up.
  nova: { voice: "af_heart", speed: 0.95, pitch: 1 },
  // Generated slow, then sped up: higher, smaller voice at a normal talking pace.
  bolt: { voice: "am_puck", speed: 0.86, pitch: 1.2 },
  // Generated fast, then slowed: a lower, heavier machine voice. The radio filters make it
  // sound quieter than the others at the same peak, so it gets extra drive.
  rover: { voice: "am_onyx", speed: 1.05, pitch: 0.9, drive: 1.8 },
};

export function applyCharacterEffect(samples, rate, speaker, signal = 3) {
  const { pitch } = characterVoices[speaker];
  let x = pitch === 1 ? samples : resample(samples, pitch);
  if (speaker === "nova") {
    x = highpass(x, rate, 90);
  } else if (speaker === "bolt") {
    x = ringModulate(x, rate, 60, 0.35);
    x = metallic(x, rate, 4, 0.35);
    x = highpass(x, rate, 220);
  } else {
    x = ringModulate(x, rate, 32, 0.45);
    x = metallic(x, rate, 9, 0.45);
    x = highpass(x, rate, 300);
    x = lowpass(x, rate, 3400);
    x = bitcrush(normalize(x), 8, 0.35);
    // Weaker signal bars mean more radio static.
    x = addStatic(x, 0.006 * (6 - Math.max(1, Math.min(5, signal))), x.length);
    x = drive(normalize(x), characterVoices.rover.drive);
  }
  return normalize(x);
}
