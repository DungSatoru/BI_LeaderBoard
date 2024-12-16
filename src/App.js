import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Home from "./components/Pages/Home/Home";
import Ranking from "./components/Pages/Ranking/Ranking";
import Summary from "./components/Pages/Summary/Summary";
import Report from "./components/Pages/Report/Report";
// import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/Pages/Setting/Setting";
// import Help from "./components/pages/Help";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Pages/Profile/Profile";
import "./DarkTheme.css";

import { ThemeProvider } from "./Contexts/ThemeContext"; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <div className="container-wrapper">
        <Sidebar />

        <div className="main">
          {/* Các Routes */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/help" element={<Help />} /> */}
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
