
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const p = window.location.pathname;
const initialLang = p.startsWith("/ua") ? "ua" : p.startsWith("/en") ? "en" : "no";
createRoot(document.getElementById("root")!).render(<App initialLang={initialLang} />);
  