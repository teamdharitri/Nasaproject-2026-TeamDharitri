import { useCallback, useState } from "react";
import { chapters, MOON_CASES } from "../data/story";
import CaseFilePopup from "./CaseFilePopup.jsx";

// Pixel coordinates on the 1672x941 board illustration.
const W = 1672;
const H = 941;
const MARS = { x: 819, y: 318, r: 165 };
const MOON = { x: 1312, y: 415, r: 135 };
// Slots avoid the child (left), the chapter chip (top centre) and the dialogue
// bubble (lower right), and stay inside the visible crop down to a 5:4 window,
// which cuts off the right edge of the illustration.
const MARS_SLOTS = [[590, 135], [660, 570], [1050, 135]];
const MOON_SLOTS = [[1255, 130], [1120, 320], [1120, 530]];

const marsCases = chapters.map((c, ci) => ({ ...c, ci })).filter((c) => c.portrait);
const shortCode = (code) => code.replace("Case ", "");

// A file opens once the reader reaches the step where that rover's identity is revealed.
function cardState(step, ci) {
  if (step.ci > ci || (step.ci === ci && step.reveal)) return "open";
  return step.ci === ci ? "current" : "locked";
}

// Ends the tether at the planet's rim so it never crosses the planet itself.
function tether([x, y], p) {
  const dx = x - p.x;
  const dy = y - p.y;
  const d = Math.hypot(dx, dy);
  return { x1: x, y1: y, x2: p.x + (dx / d) * p.r, y2: p.y + (dy / d) * p.r };
}

const pos = ([x, y]) => ({ "--x": `${(x / W) * 100}%`, "--y": `${(y / H) * 100}%` });

function Folder({ code, name, state, photo, accent, slot, onOpen }) {
  const Tag = onOpen ? "button" : "div";
  return (
    <div className={`holo is-${state}`} style={{ ...pos(slot), "--accent": accent }}>
      <Tag
        className={`holo__folder ${onOpen ? "is-clickable" : ""}`}
        {...(onOpen && { type: "button", onClick: onOpen, "aria-label": `Open case file ${code}` })}
      >
        <span className="holo__tab" />
        <div className="holo__body">
          {state === "open" ? <img src={photo} alt={name} /> : <span className="holo__lock">🔒</span>}
        </div>
      </Tag>
      <span className="holo__label">
        <b>{code}</b> {state === "open" && "🔓"}
        <span>{name}</span>
      </span>
    </div>
  );
}

export default function CaseBoard({ step }) {
  const [openFile, setOpenFile] = useState(null);
  const closeFile = useCallback(() => setOpenFile(null), []);
  // Case files open only once the reader is inside a mission, not during the prologue.
  const missionStarted = step.ci > 0;

  return (
    <>
    {openFile && <CaseFilePopup file={openFile} onClose={closeFile} />}
    <div className="holo-board" aria-label="Case board">
      <div className="holo-board__map">
        <svg className="holo-board__lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {MARS_SLOTS.map((s, i) => <line key={`m${i}`} {...tether(s, MARS)} />)}
          {MOON_SLOTS.map((s, i) => <line key={`l${i}`} {...tether(s, MOON)} />)}
        </svg>

        <div className="holo-group">
          <span className="holo-group__label">Mars</span>
          {marsCases.map((c, i) => {
            const state = cardState(step, c.ci);
            return (
              <Folder
                key={c.id}
                code={shortCode(c.code)}
                name={state === "open" ? c.realName : c.codeName}
                state={state}
                photo={c.portrait}
                accent={c.theme}
                slot={MARS_SLOTS[i]}
                onOpen={missionStarted ? () => setOpenFile({ ...c, code: shortCode(c.code), state }) : undefined}
              />
            );
          })}
        </div>

        <div className="holo-group">
          <span className="holo-group__label">Moon</span>
          {MOON_CASES.map((c, i) => (
            <Folder key={c.code} code={c.code} name={c.codeName} state="locked" slot={MOON_SLOTS[i]} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
