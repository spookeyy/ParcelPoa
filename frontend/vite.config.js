import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  publicDir: "public", // This ensures files in the public directory are copied to dist
});
