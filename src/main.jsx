/**
 * @file This is the main entry point for the application. It sets up React concurrent mode and renders the App component into the DOM.
 */

// Importing necessary libraries, components and styles
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@smastrom/react-rating/style.css";

/**
 * Gets the root DOM node where the React application will be attached.
 * @type {HTMLElement}
 */
const rootContainer = document.getElementById("root");

/**
 * Creates a React root for Concurrent Mode rendering.
 * @type {ReactRoot}
 */
const root = createRoot(rootContainer);

/**
 * Renders the App component into the DOM.
 * Wraps the App component with React.StrictMode for additional checks and warnings in development.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
