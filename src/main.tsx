import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

window.onerror = (msg, url, line, col, err) => {
  const el = document.getElementById("root");
  if (el) el.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">${String(msg)}\n${url}:${line}:${col}\n${err?.stack || ""}</pre>`;
};

window.addEventListener("unhandledrejection", (e) => {
  const el = document.getElementById("root");
  if (el) el.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">Unhandled: ${e.reason}\n${e.reason?.stack || ""}</pre>`;
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}
