import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Summary from "./components/Pages/Summary/Summary";
import Report from "./components/Pages/Report/Report";
// import Dashboard from "./components/pages/Dashboard";
// import Settings from "./components/pages/Settings";
// import Help from "./components/pages/Help";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Pages/Login/Login";

const App = () => {
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        {/* Các Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="/dashboard" element={<Dashboard sampleData={sampleData} />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/help" element={<Help />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
