export default function VoiceControls({ voice }) {
  const message = !voice.enabled ? "Voices off"
    : voice.status === "missing" ? "Audio not generated"
    : voice.status === "loading" ? "Loading voices"
    : voice.status === "blocked" ? "Press replay to listen"
    : voice.status === "error" ? "Audio unavailable"
    : voice.status === "playing" ? "Speaking"
    : voice.available ? "Ready" : "No voice on this step";

  return (
    <div className="voice-controls" aria-label="Character voices">
      <button onClick={voice.toggle} aria-pressed={voice.enabled} title="Toggle AI character voices">
        Voices {voice.enabled ? "on" : "off"}
      </button>
      <button onClick={voice.replay} disabled={!voice.enabled || !voice.available} aria-label="Replay character voice">
        Replay
      </button>
      <span role="status" aria-live="polite">{message}</span>
    </div>
  );
}
