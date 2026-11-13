import test from "node:test";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { buildPlan, splitText } from "./generate-voices.mjs";
import { applyCharacterEffect, drive, resample } from "./voice-effects.mjs";
import { getSpeechText, getVoiceKey } from "../src/lib/voice-lines.js";
import { createCharacterAudio } from "../src/lib/character-audio.js";
import { chapters, MOON_CASES } from "../src/data/story.js";

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

test("Moon Case L-1 reveals Apollo 11 only after its final deduction", () => {
  const chapter = chapters.find((item) => item.id === "l1");
  assert.ok(chapter, "Apollo 11 chapter exists");
  assert.equal(chapter.code, "Case L-1");
  assert.equal(chapter.realName, "Apollo 11");
  assert.deepEqual(MOON_CASES.map((item) => item.code), ["L-2", "L-3"]);
  const solvedAt = chapter.steps.findIndex((step) => step.overlay?.solved === "Apollo 11");
  const identityAt = chapter.steps.findIndex((step) => step.overlay?.type === "identity");
  assert.ok(solvedAt >= 0, "final deduction identifies Apollo 11");
  assert.ok(identityAt > solvedAt, "identity reveal follows the deduction");
  assert.equal(chapter.steps[identityAt].reveal, true);
  assert.ok(chapter.nasaSections.some((section) => section.revealOnly));
  const spoilers = /Apollo|Armstrong|Aldrin|Collins|Eagle|Columbia/;
  for (const step of chapter.steps.filter((item) => !item.reveal && item.speaker)) {
    assert.doesNotMatch(`${step.text} ${step.quote?.text ?? ""} ${step.roverName ?? ""}`, spoilers);
  }
  for (const section of chapter.nasaSections.filter((item) => !item.revealOnly)) {
    assert.doesNotMatch(section.items.join(" "), /Apollo 11|Armstrong|Aldrin|Collins|Eagle|Columbia/, section.title);
  }
});

test("every NASA data section has a real image and a summary", () => {
  const spoilers = { m1: /Sojourner|Sagan/, m2: /Spirit|Columbia/, m3: /Opportunity|Oppy|Challenger/, l1: /Apollo|Armstrong|Aldrin|Collins|Eagle|Columbia/ };
  for (const chapter of chapters.filter((item) => item.nasaSections)) {
    for (const section of chapter.nasaSections) {
      assert.ok(existsSync(new URL(`../public/${section.img}`, import.meta.url)), `${chapter.id}: ${section.title} image`);
      assert.ok(section.summary?.length > 40, `${chapter.id}: ${section.title} summary`);
      assert.match(section.credit, /NASA/);
      if (!section.revealOnly) assert.doesNotMatch(section.summary, spoilers[chapter.id], `${chapter.id}: ${section.title}`);
    }
  }
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
  const rms = (x) => Math.sqrt(x.reduce((sum, v) => sum + v * v, 0) / x.length);
  const quiet = tone.map((x) => x * 0.5);
  const driven = drive(quiet, 1.8);
  assert.ok(rms(driven) > rms(quiet) * 1.5, "drive raises loudness");
  assert.ok(driven.every((x) => Math.abs(x) <= 1));
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
