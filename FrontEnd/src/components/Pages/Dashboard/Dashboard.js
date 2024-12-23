import { React } from "react";
import "./Dashboard.css";
import { useTheme } from "../../../Contexts/ThemeContext"; // Import useTheme từ ThemeContext

const Dashboard = () => {
  const { darkMode } = useTheme(); // Lấy giá trị darkMode từ ThemeContext

  return (
    <section className="dashboard container">
      <div className="main-header text-center mb-4">
        <h1 className={`${darkMode ? "text-white" : ""}`}>TỔNG QUAN</h1>
      </div>
      <div className="main-body row g-4">
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">Tổng số điểm theo cụm</div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/LEN3wbRw2bJ/?standalone=1&height=400"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">
              So sánh điểm phát biểu giữa các nhóm
            </div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/1kZwa5aw6OQ/?standalone=1&height=400"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">
              Tổng điểm của từng nhóm trong cụm
            </div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/PK0wRYdBAZ9/?standalone=1&height=400"
                ></iframe>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">
              Tỉ lệ sinh viên vắng
            </div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/gz8DndABlGr/?standalone=1&height=400"
                ></iframe>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">
              So sánh điểm phát biểu giữa các nhóm
            </div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/J8QMgr7DOvj/?standalone=1&height=400"
                ></iframe>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
          >
            <div className="card-header h2">
              Top 5 sinh viên điểm cao nhất
            </div>
            <div className="card-body">
              <iframe
                className={`card-img-top ${
                  darkMode ? "bg-dark text-white" : ""
                }`}
                width="100%"
                height="400px"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/superset/explore/p/XZxB7mQD6Y2/?standalone=1&height=400"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <iframe
  width="600"
  height="400"
  seamless
  frameBorder="0"
  scrolling="no"
>
</iframe>



    </section>
  );
};

export default Dashboard;
