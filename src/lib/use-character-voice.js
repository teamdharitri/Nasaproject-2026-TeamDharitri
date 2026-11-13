import { useEffect, useState } from "react";
import { createCharacterAudio } from "./character-audio.js";
import { getVoiceKey } from "./voice-lines.js";

export function useCharacterVoice(step, suspended) {
  const [clips, setClips] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [status, setStatus] = useState("loading");
  const [replay, setReplay] = useState(0);
  const [hidden, setHidden] = useState(document.hidden);
  const key = getVoiceKey(step);
  const clip = clips?.[key];

  useEffect(() => {
    const controller = new AbortController();
    fetch("/voices/manifest.json", { signal: controller.signal, cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Voice manifest unavailable");
        return response.json();
      })
      .then((manifest) => {
        if (manifest.version !== 1 || !manifest.clips) throw new Error("Invalid voice manifest");
        setClips(manifest.clips);
      })
      .catch(() => {
        if (!controller.signal.aborted) setClips({});
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!enabled || suspended || hidden || !clip) {
      setStatus(!clips ? "loading" : !Object.keys(clips).length ? "missing" : "ready");
      return undefined;
    }
    // Only locally generated clips are allowed, never arbitrary manifest URLs.
    if (!/^\/voices\/[a-z]+-[a-f0-9]{24}\.mp3$/.test(clip.src) || clip.speaker !== step.speaker) {
      setStatus("error");
      return undefined;
    }
    const player = createCharacterAudio(clip.src);
    let disposed = false;
    const finish = () => {
      if (!disposed) {
        setStatus("ready");
        player.stop();
      }
    };
    const fail = () => {
      if (!disposed) {
        setStatus("error");
        player.stop();
      }
    };
    player.audio.onended = finish;
    player.audio.onerror = fail;
    player.audio.onplaying = () => { if (!disposed) setStatus("playing"); };
    setStatus("starting");
    player.play().catch((error) => {
      if (!disposed) {
        setStatus(error.name === "NotAllowedError" ? "blocked" : "error");
        player.stop();
      }
    });
    return () => {
      disposed = true;
      player.audio.onended = null;
      player.audio.onerror = null;
      player.audio.onplaying = null;
      player.stop();
    };
  }, [clip, clips, key, step.speaker, enabled, suspended, hidden, replay]);

  return {
    enabled, status,
    available: Boolean(clip),
    toggle: () => setEnabled((value) => !value),
    replay: () => setReplay((value) => value + 1),
  };
}
