import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename, stat } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve, join } from "node:path";
import { chapters } from "../src/data/story.js";
import { getSpeechText, getVoiceKey } from "../src/lib/voice-lines.js";
import { applyCharacterEffect, characterVoices } from "./voice-effects.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "public", "voices");
const model = "onnx-community/Kokoro-82M-v1.0-ONNX";
// Bump when effect code changes so existing clips are regenerated.
const EFFECT_VERSION = 1;

export function buildPlan(story) {
  const unique = new Map();
  for (const chapter of story) {
    for (const step of chapter.steps) {
      const key = getVoiceKey(step);
      if (!key || unique.has(key)) continue;
      const text = getSpeechText(step);
      const signal = step.speaker === "rover" ? step.signal ?? 3 : null;
      const hash = createHash("sha256")
        .update(JSON.stringify({ text, model, signal, EFFECT_VERSION, voice: characterVoices[step.speaker] }))
        .digest("hex").slice(0, 24);
      unique.set(key, { key, text, signal, speaker: step.speaker, filename: `${step.speaker}-${hash}.mp3` });
    }
  }
  return [...unique.values()];
}

// Kokoro handles about 500 phoneme tokens per call, so long lines are spoken sentence by sentence.
export function splitText(text, max = 220) {
  const parts = text.match(/[^.!?]+[.!?…]*\s*/g) ?? [text];
  const chunks = [];
  for (const part of parts) {
    const last = chunks.length - 1;
    if (last >= 0 && chunks[last].length + part.length <= max) chunks[last] += part;
    else chunks.push(part);
  }
  return chunks.map((c) => c.trim()).filter(Boolean);
}

function encodeMp3(Mp3Encoder, samples, rate) {
  const pcm = Int16Array.from(samples, (x) => Math.max(-32768, Math.min(32767, Math.round(x * 32767))));
  const encoder = new Mp3Encoder(1, rate, 64);
  const parts = [];
  for (let i = 0; i < pcm.length; i += 1152) parts.push(encoder.encodeBuffer(pcm.subarray(i, i + 1152)));
  parts.push(encoder.flush());
  return Buffer.concat(parts.map((p) => Buffer.from(p.buffer, p.byteOffset, p.byteLength)));
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(join(output, "manifest.json"), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { version: 1, clips: {} };
    throw error;
  }
}

async function saveManifest(manifest) {
  const temp = join(output, "manifest.json.tmp");
  await writeFile(temp, JSON.stringify(manifest, null, 2));
  await rename(temp, join(output, "manifest.json"));
}

async function main() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== "--limit") throw new Error(`Unknown argument: ${args[i]}`);
    if (!/^[1-9]\d*$/.test(args[++i] ?? "")) throw new Error("--limit must be a positive integer.");
  }
  let plan = buildPlan(chapters);
  const limitIndex = args.indexOf("--limit");
  if (limitIndex !== -1) plan = plan.slice(0, Number(args[limitIndex + 1]));

  await mkdir(output, { recursive: true });
  const manifest = await readManifest();
  if (manifest.version !== 1 || !manifest.clips || typeof manifest.clips !== "object") {
    throw new Error("Unsupported voice manifest. Back it up and inspect it before generating.");
  }
  const { KokoroTTS } = await import("kokoro-js");
  const { Mp3Encoder } = await import("@breezystack/lamejs");
  console.log("Loading the Kokoro voice model (downloads about 90 MB on first run)...");
  const tts = await KokoroTTS.from_pretrained(model, { dtype: "q8", device: "cpu" });

  for (const [index, item] of plan.entries()) {
    const src = `/voices/${item.filename}`;
    if (manifest.clips[item.key]?.src === src && (await stat(join(output, item.filename)).catch(() => null))?.size > 0) {
      console.log(`${index + 1}/${plan.length}: ${item.speaker}, already generated.`);
      continue;
    }
    const { voice, speed } = characterVoices[item.speaker];
    let rate = 24000;
    const pieces = [];
    for (const chunk of splitText(item.text)) {
      const audio = await tts.generate(chunk, { voice, speed });
      rate = audio.sampling_rate;
      pieces.push(audio.audio, new Float32Array(Math.round(rate * 0.12)));
    }
    const raw = new Float32Array(pieces.reduce((n, p) => n + p.length, 0));
    pieces.reduce((offset, p) => (raw.set(p, offset), offset + p.length), 0);
    const mp3 = encodeMp3(Mp3Encoder, applyCharacterEffect(raw, rate, item.speaker, item.signal ?? 3), rate);
    const temp = join(output, `${item.filename}.tmp`);
    await writeFile(temp, mp3);
    await rename(temp, join(output, item.filename));
    manifest.clips[item.key] = { src, speaker: item.speaker };
    await saveManifest(manifest);
    console.log(`${index + 1}/${plan.length}: ${item.speaker}, saved.`);
  }
  // Drop entries for lines that no longer exist in the story.
  const live = new Set(buildPlan(chapters).map((item) => item.key));
  for (const key of Object.keys(manifest.clips)) if (!live.has(key)) delete manifest.clips[key];
  await saveManifest(manifest);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
