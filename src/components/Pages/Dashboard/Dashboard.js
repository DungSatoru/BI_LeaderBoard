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
          <iframe width="100%" height="400px" seamless frameBorder="0" scrolling="no"
            src="http://localhost:8088/explore/?slice_id=239&form_data=%7B%22slice_id%22%3A%20239%7D&standalone=true">
          </iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" seamless frameBorder="0" scrolling="no"
            src="http://localhost:8088/explore/?slice_id=240&form_data=%7B%22slice_id%22%3A%20240%7D&standalone=true">
          </iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" seamless frameBorder="0" scrolling="no"
            src="http://localhost:8088/explore/?slice_id=241&form_data=%7B%22slice_id%22%3A%20241%7D&standalone=true">
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
