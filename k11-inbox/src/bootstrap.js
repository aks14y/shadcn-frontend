import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SharedContextProvider } from "k11_war/SharedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SharedContextProvider>
    <App />
    </SharedContextProvider>
  </React.StrictMode>
);
