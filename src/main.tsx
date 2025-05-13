import { createRoot } from "react-dom/client";
// import { createRoot } from "./MyReactDOM";
// import { createRoot } from "./MyReactDOM_test";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
