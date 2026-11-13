import { useEffect, useState } from "react";
import { characters } from "../data/characters";
import { playTypingBlip } from "../lib/typing-sound";

function SignalBars({ level }) {
  return (
    <span className="signal__bars" aria-label={`Signal ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={n <= level ? "on" : ""} />
      ))}
    </span>
  );
}

// Rover voices arrive over a weak radio link, so their words type out letter by letter.
export function TypewriterText({ text, active, level = 3 }) {
  const perTick = Math.max(1, Math.ceil(text.length / 60)); // finishes in about three seconds
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return undefined;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i = Math.min(text.length, i + perTick);
      setShown(i);
      playTypingBlip(level);
      if (i >= text.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [active, text, perTick, level]);

  const done = shown >= text.length;
  return (
    <p>
      {text.slice(0, shown)}
      {!done && <span className="signal__cursor" aria-hidden="true" />}
    </p>
  );
}

export default function Dialogue({ step, active = false }) {
  const { speaker, text, quote } = step;
  const Quote = quote ? (
    <blockquote className="quote">
      <p>{quote.text}</p>
      <cite>{quote.source}</cite>
    </blockquote>
  ) : null;

  if (!speaker) {
    if (!text && !quote) return null;
    return (
      <div className="bubble bubble--narration">
        {text && <p>{text}</p>}
        {Quote}
      </div>
    );
  }

  const c = characters[speaker];

  if (c.style === "signal") {
    return (
      <div className={`bubble bubble--signal signal--${step.signal}`}>
        <div className="signal__head">
          <SignalBars level={step.signal} />
          <span>{step.roverName ?? c.name}</span>
        </div>
        <TypewriterText text={text} active={active} level={step.signal} />
        {step.fictional && <small className="fiction-note">Fictional voice created for the story</small>}
      </div>
    );
  }

  return (
    <div className={`bubble bubble--${c.style}`}>
      <img className="bubble__avatar" src={c.avatar} alt={c.name} />
      <div className="bubble__body">
        <span className="bubble__name">{c.name}</span>
        <p>{text}</p>
        {Quote}
      </div>
    </div>
  );
}
