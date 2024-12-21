import { React } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="main-header text-center mb-4">
        <h1>TỔNG QUAN</h1>
      </div>
      <div className="main-body">
        <div>
          <iframe></iframe>
        </div>
        <div>
          <iframe></iframe>
        </div>
        <div>
          <iframe></iframe>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
