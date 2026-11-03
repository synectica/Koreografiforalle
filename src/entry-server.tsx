// Brukes bare under bygging (scripts/prerender.mjs): rendrer siden til statisk HTML for Google.
import { renderToString } from "react-dom/server";
import App from "./app/App.tsx";

export function render(): string {
  return renderToString(<App />);
}
