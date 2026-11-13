import { useState } from "react";
import Landing from "./components/Landing.jsx";
import Story from "./components/Story.jsx";

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <Story onExit={() => setStarted(false)} />;
}
