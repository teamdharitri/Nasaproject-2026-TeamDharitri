import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative URLs let the build run from a subfolder such as GitHub Pages' /<repo>/.
  base: "./",
  plugins: [react()],
});
