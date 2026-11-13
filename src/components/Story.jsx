import { useCallback, useMemo, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import { BOARD_IMG, BOARD_INTRO_IMG, chapters } from "../data/story";
import CaseBoard from "./CaseBoard.jsx";
import Dialogue from "./Dialogue.jsx";
import Overlay from "./Overlay.jsx";
import NasaModal from "./NasaModal.jsx";
import VoiceControls from "./VoiceControls.jsx";
import { useCharacterVoice } from "../lib/use-character-voice.js";

const allSteps = chapters.flatMap((chapter, ci) =>
  chapter.steps.map((step, si) => ({ ...step, ci, isFirst: si === 0 }))
);
const chapterStart = chapters.map((_, ci) => allSteps.findIndex((s) => s.ci === ci));
const nasaGalleries = chapters.map((chapter) =>
  [...new Map(chapter.steps.filter((step) => step.nasa).map((step) => [step.nasa.src, step.nasa])).values()]
);
const images = [...new Set(allSteps.map((s) => s.img))];
const isBoard = (img) => img === BOARD_IMG || img === BOARD_INTRO_IMG;
// Centered overlays take the whole screen, so the text column stays empty for them.
const FULL_OVERLAYS = new Set(["title", "chapterBreak", "end"]);

export default function Story({ onExit }) {
  const [current, setCurrent] = useState(0);
  const [nasa, setNasa] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const closeNasa = useCallback(() => setNasa(null), []);

  const step = allSteps[current];
  const voice = useCharacterVoice(step, Boolean(nasa) || menuOpen || exiting);
  const chapter = chapters[step.ci];
  const overlayType = step.overlay?.type;
  const fullOverlay = FULL_OVERLAYS.has(overlayType);
  const showBoard = isBoard(step.img) && !step.overlay;
  const label = step.reveal && chapter.realName ? chapter.realName : chapter.codeName;
  const nasaSections = (chapter.nasaSections ?? []).filter((section) => !section.revealOnly || step.reveal);
  const nasaContent = step.nasa
    ? { ...step.nasa, sections: nasaSections }
    : chapter.id !== "intro" && nasaGalleries[step.ci].length
      ? { title: `${label} · NASA Images & Data`, gallery: nasaGalleries[step.ci], sections: nasaSections }
      : null;
  // NASA records would give the answer away, so they stay locked until the identity is confirmed.
  const nasaLocked = chapter.id !== "intro" && !step.reveal;
  const progress = useMemo(() => ((current + 1) / allSteps.length) * 100, [current]);

  const jumpTo = (ci) => {
    setMenuOpen(false);
    document.getElementById(`step-${chapterStart[ci]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const restart = () => {
    setExiting(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(onExit, 600);
  };

  return (
    <div className="story" style={{ "--theme": chapter.theme }}>
      <div className="story__progress" style={{ width: `${progress}%` }} />
      <VoiceControls voice={voice} />

      <div className="story__stage" aria-hidden="true">
        {images.map((src) => {
          const active = src === step.img;
          return (
            <img
              key={src}
              src={src}
              alt=""
              className={`stage-img ${active ? "is-active" : ""}`}
              style={active ? { filter: `brightness(${step.dim ? 0.45 : 1})` } : undefined}
            />
          );
        })}
        <div className="story__vignette" />
      </div>

      {!step.isFirst && overlayType !== "end" && (
        <div className="chapter-chip" key={`${chapter.id}-${label}`}>
          <span className="chapter-chip__code">{chapter.code}</span>
          <span className="chapter-chip__name">{label}</span>
        </div>
      )}

      <nav className={`case-nav ${menuOpen ? "is-open" : ""}`}>
        <button className="case-nav__toggle" onClick={() => setMenuOpen((v) => !v)}>
          ☰ Cases
        </button>
        {menuOpen && (
          <ul>
            {chapters.map((c, ci) => (
              <li key={c.id}>
                <button className={ci === step.ci ? "is-current" : ""} onClick={() => jumpTo(ci)}>
                  <b>{c.code}</b> {c.codeName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {showBoard && <CaseBoard step={step} />}

      <div className={`story__overlay ${fullOverlay ? "is-full" : ""}`} key={current}>
        <Overlay overlay={step.overlay} onRestart={restart} />
      </div>

      {nasaContent && (
        <button
          className={`nasa-btn ${nasaLocked ? "is-locked" : ""}`}
          onClick={() => setNasa(nasaContent)}
          disabled={nasaLocked}
          key={`nasa-${current}-${nasaLocked}`}
        >
          <img src="/chars/bolt.webp" alt="" />
          <span>
            {nasaLocked ? "🔒 View NASA data" : "🔓 View NASA data"}
            <small>{nasaLocked ? "Unlocks when identity is confirmed" : "Real images"}</small>
          </span>
        </button>
      )}

      <div className="story__scroll">
        <Scrollama offset={0.55} onStepEnter={({ data }) => setCurrent(data)}>
          {allSteps.map((s, idx) => (
            <Step data={idx} key={idx}>
              <div
                id={`step-${idx}`}
                className={`step ${idx === current ? "is-active" : ""} ${FULL_OVERLAYS.has(s.overlay?.type) ? "step--empty" : ""} ${isBoard(s.img) && !s.overlay ? "step--board" : ""}`}
              >
                {!FULL_OVERLAYS.has(s.overlay?.type) && <Dialogue step={s} active={idx === current} />}
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>

      <NasaModal content={nasa} onClose={closeNasa} />
    </div>
  );
}
