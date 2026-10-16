import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// After a deploy, a tab still running the old version may request page files
// that no longer exist. Reload once to pick up the new version instead of failing.
window.addEventListener("vite:preloadError", (event) => {
  const key = "reloadedForNewVersion";
  try {
    const last = Number(sessionStorage.getItem(key));
    if (last && Date.now() - last < 10000) return; // avoid a reload loop
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // sessionStorage unavailable; reload anyway
  }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
