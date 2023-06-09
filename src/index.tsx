import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./assets/style/style.scss";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(<App />);
