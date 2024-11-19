// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./pages/styles/globals.css";
import "flowbite/dist/flowbite.css";
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);