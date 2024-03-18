import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import {navigate} from "./lib/QuaddictedLink.js";

const root = document.getElementById("root");

root.addEventListener("click", async function (ev) {
  if (ev.target.getAttribute("href")) {
    ev.preventDefault();
    const href = ev.target.getAttribute("href");
    await navigate(href);
    return false;
  }
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);
