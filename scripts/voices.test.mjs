import test from "node:test";
import assert from "node:assert/strict";
import { buildPlan, splitText } from "./generate-voices.mjs";
import { applyCharacterEffect, resample } from "./voice-effects.mjs";
import { getSpeechText, getVoiceKey } from "../src/lib/voice-lines.js";
import { createCharacterAudio } from "../src/lib/character-audio.js";
import { chapters } from "../src/data/story.js";

test("only spoken dialogue gets a voice, with exact text and quotes", () => {
  assert.equal(getVoiceKey({ text: "Narration" }), null);
  assert.equal(getVoiceKey({ speaker: "unknown", text: "No voice" }), null);
  const step = { speaker: "rover", text: "…still here…", quote: { text: "A real quote", source: "NASA" } };
  assert.equal(getSpeechText(step), "…still here… A real quote");
  assert.equal(getVoiceKey(step), "rover:…still here… A real quote");
});

test("generation deduplicates identical lines and keys files by content", () => {
  const line = { speaker: "nova", text: "Welcome." };
  const plan = buildPlan([{ steps: [line, line, { text: "Narration" }] }]);
  assert.equal(plan.length, 1);
  assert.match(plan[0].filename, /^nova-[a-f0-9]{24}\.mp3$/);
  const weak = buildPlan([{ steps: [{ speaker: "rover", text: "Hi", signal: 1 }] }]);
  const strong = buildPlan([{ steps: [{ speaker: "rover", text: "Hi", signal: 5 }] }]);
  assert.notEqual(weak[0].filename, strong[0].filename, "signal strength changes the static");
});

test("every character line in all cases has a unique playable entry", () => {
  const expected = new Set(chapters.flatMap((chapter) => chapter.steps.map(getVoiceKey)).filter(Boolean));
  const plan = buildPlan(chapters);
  assert.deepEqual(new Set(plan.map((item) => item.key)), expected);
  assert.deepEqual(new Set(plan.map((item) => item.speaker)), new Set(["nova", "bolt", "rover"]));
});

test("long lines are split without losing words", () => {
  const text = "One sentence here. ".repeat(30).trim();
  const chunks = splitText(text, 100);
  assert.ok(chunks.every((c) => c.length <= 100));
  assert.equal(chunks.join(" "), text);
});

test("effects keep audio in range; Bolt is pitched up and the rover down", () => {
  const rate = 24000;
  const tone = Float32Array.from({ length: rate }, (_, i) => Math.sin((2 * Math.PI * 200 * i) / rate));
  assert.equal(resample(tone, 2).length, rate / 2);
  for (const speaker of ["nova", "bolt", "rover"]) {
    const out = applyCharacterEffect(tone, rate, speaker, 1);
    assert.ok(out.every((x) => Number.isFinite(x) && Math.abs(x) <= 0.9), speaker);
  }
  assert.ok(applyCharacterEffect(tone, rate, "bolt").length < rate);
  assert.ok(applyCharacterEffect(tone, rate, "rover").length > rate);
  assert.equal(applyCharacterEffect(tone, rate, "nova").length, rate);
});

test("a stopped clip cannot restart", async () => {
  const originalAudio = globalThis.Audio;
  globalThis.Audio = class {
    async play() { this.played = true; }
    pause() { this.paused = true; }
    removeAttribute() {}
    load() {}
  };
  try {
    const player = createCharacterAudio("/test.mp3");
    await player.play();
    assert.equal(player.audio.played, true);
    player.stop();
    player.stop();
    assert.equal(player.audio.paused, true);
    player.audio.played = false;
    await player.play();
    assert.equal(player.audio.played, false);
  } finally {
    globalThis.Audio = originalAudio;
  }
});
