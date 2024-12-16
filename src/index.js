import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import Login from "./components/Pages/Login/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* {localStorage.getItem("token") ? <App /> : <Login />} */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
