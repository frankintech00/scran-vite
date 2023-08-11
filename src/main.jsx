// Importing necessary libraries, components and styles
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@smastrom/react-rating/style.css";

// Getting the root DOM node where the app will be attached
const rootContainer = document.getElementById("root");

// Creating a root for the app in concurrent mode
const root = createRoot(rootContainer);

// Rendering the app component into the root DOM node
// Wrapping the app component with React.StrictMode for additional checks during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
