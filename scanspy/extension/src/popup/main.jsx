import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";

console.log("FuzzForge Popup Initializing...");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find root element");
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <HelmetProvider>
          <MemoryRouter initialEntries={["/"]}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </MemoryRouter>
        </HelmetProvider>
      </React.StrictMode>
    );
    console.log("FuzzForge Popup Rendered Successfully");
  } catch (error) {
    console.error("FuzzForge Popup Render Error:", error);
  }
}
