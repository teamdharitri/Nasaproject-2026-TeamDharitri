import { useEffect, useRef } from "react";
import { TypewriterText } from "./Dialogue.jsx";

export default function CaseFilePopup({ file, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const solved = file.state === "open";
  const text = [
    `Case ID: ${file.code}`,
    `Case Name: ${file.codeName}`,
    `Destination: ${file.caseFile.destination}`,
    `Location: ${file.caseFile.location}`,
    `Difficulty: ${file.caseFile.difficulty}`,
    `Archive Status: ${solved ? "Restored" : "Damaged"}`,
    `Explorer Identity: ${solved ? file.realName : "Unknown"}`,
  ].join("\n");

  return (
    <div className="case-file" onClick={onClose}>
      <div
        className="case-file__panel"
        style={{ "--accent": file.theme }}
        role="dialog"
        aria-modal="true"
        aria-label={`Case file ${file.code}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-file__head">
          <span>{solved ? "🔓" : "🔒"} Archive X-17 · Case File</span>
          <button ref={closeRef} onClick={onClose} aria-label="Close case file">×</button>
        </div>
        <TypewriterText text={text} active level={solved ? 5 : 3} />
      </div>
    </div>
  );
}
