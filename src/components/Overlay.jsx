import { useState } from "react";
import { SUSPECT_IMG } from "../data/story";

function Title({ o }) {
  return (
    <div className="ov-title">
      <span className="ov-title__kicker">{o.kicker}</span>
      <h2>{o.title}</h2>
      <span className="ov-title__sub">{o.subtitle}</span>
      <span className="ov-title__scroll">Scroll down ↓</span>
    </div>
  );
}

function Deduction({ o }) {
  const [selected, setSelected] = useState(null);
  const isWrong = selected && o.out.includes(selected);
  const isCorrect = selected && o.solved === selected;
  const isPossible = selected && !isWrong && !isCorrect;
  const feedback = !selected
    ? "Use Bolt's clues and click the matching rover."
    : isCorrect
      ? `Correct match! ${selected} fits the mission clues.`
      : isWrong
        ? o.reasons?.[selected] ?? `${selected} does not match these clues.`
        : `${selected} fits this clue. Look for more evidence before making your final choice.`;
  const feedbackState = isCorrect ? "correct" : isWrong ? "wrong" : isPossible ? "possible" : "prompt";

  return (
    <div className="ov-card ov-deduction">
      <h3>Deduction Board</h3>
      <div className="suspects">
        {o.suspects.map((name) => {
          const isSelected = selected === name;
          const state = isSelected ? `is-${feedbackState}` : "";
          const img = SUSPECT_IMG[name];
          return (
            <div key={name} className={`suspect ${state}`}>
              <button
                type="button"
                className="suspect__choice"
                onClick={() => setSelected(name)}
                aria-pressed={isSelected}
                aria-label={`Select ${name}`}
              >
              <div className="suspect__pic">
                <img src={img} alt="" />
                {isSelected && isWrong && <i className="suspect__cross" aria-hidden="true" />}
                {isSelected && isCorrect && <i className="suspect__mark" aria-hidden="true">✓</i>}
              </div>
              <span className="suspect__name">{name}</span>
              </button>
            </div>
          );
        })}
      </div>
      <p className={`ov-deduction__feedback is-${feedbackState}`} role="status" aria-live="polite">{feedback}</p>
    </div>
  );
}

function Identity({ o }) {
  return (
    <div className="ov-card ov-identity">
      <span className="ov-identity__stamp">Identity confirmed</span>
      <h3>{o.name}</h3>
      <dl>
        {o.facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BoltLearns({ o }) {
  return (
    <div className="ov-card ov-bolt">
      <img src="chars/bolt.webp" alt="Bolt" />
      <span className="ov-bolt__label">🔓 Bolt's locked file has been unlocked</span>
      <p>"{o.text}"</p>
      <span className="ov-bolt__src">Source: {o.source}</span>
    </div>
  );
}

function ChapterBreak({ o }) {
  return (
    <div className="ov-break">
      <span>✦</span>
      <h2>{o.title}</h2>
      <span>✦</span>
    </div>
  );
}

function End({ onRestart }) {
  return (
    <div className="ov-end">
      <h2>To be continued...</h2>
      <p>Apollo 11 is restored. Moon Cases L-2 and L-3 are upcoming—new clues are on their way!</p>
      <p className="ov-end__next">
        <span className="ov-end__badge">🚀 Upcoming</span> Next file: Moon Case L-2
      </p>
      <button className="btn-start" onClick={onRestart}>Restart from the beginning ↑</button>
      <p className="ov-end__credit">
        Images: NASA/JPL-Caltech and partner institutions (for factual data); all other images were illustrated for this story.
        This project is not endorsed by NASA.
      </p>
    </div>
  );
}

export default function Overlay({ overlay, onRestart }) {
  if (!overlay) return null;
  switch (overlay.type) {
    case "title": return <Title o={overlay} />;
    case "deduction": return <Deduction o={overlay} />;
    case "identity": return <Identity o={overlay} />;
    case "boltLearns": return <BoltLearns o={overlay} />;
    case "chapterBreak": return <ChapterBreak o={overlay} />;
    case "end": return <End onRestart={onRestart} />;
    default: return null;
  }
}
