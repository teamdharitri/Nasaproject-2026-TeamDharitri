// Character effects are baked into the generated clips, so playback stays plain.
export function createCharacterAudio(src) {
  const audio = new Audio(src);
  audio.preload = "auto";
  let stopped = false;
  return {
    audio,
    async play() {
      if (!stopped) await audio.play();
    },
    stop() {
      if (stopped) return;
      stopped = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    },
  };
}
