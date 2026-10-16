import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Large libraries get their own chunks so they stay cached across deploys.
const vendorChunks = {
  react: [
    "react",
    "react-dom",
    "react-dom/client",
    "scheduler",
    "react-router",
    "react-router-dom",
  ],
  // Auth, Storage and Analytics are left out so they stay lazy-loaded.
  firebase: ["firebase/app", "firebase/firestore/lite"],
  motion: ["framer-motion"],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: { manualChunks: vendorChunks },
    },
  },
});
