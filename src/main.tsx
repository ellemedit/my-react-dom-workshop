import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
// import { createRoot } from "./MyReacDOM";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
