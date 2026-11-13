export function getSpeechText(step) {
  if (!["nova", "bolt", "rover"].includes(step?.speaker) || !step.text) return "";
  return [step.text, step.quote?.text].filter(Boolean).join(" ");
}

export function getVoiceKey(step) {
  const text = getSpeechText(step);
  return text ? `${step.speaker}:${text}` : null;
}
