import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// After React finishes its first paint, fade the page in.
// Double rAF ensures the browser has actually committed the frame to screen.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.body.classList.add("app-ready");
  });
});
