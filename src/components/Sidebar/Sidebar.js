import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link từ react-router-dom
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem("token");
    // Điều hướng về trang login
    window.location.href = "/login";
  };

  return (
    <nav>
      <ul className="list-unstyled">
        <li>
          <Link to="/dashboard" className="logo text-decoration-none">
            <img src="/logo192.png" alt="Logo" />
            <span className="nav-item">TỔNG QUAN</span>
          </Link>
        </li>
        <li>
          <Link to="/home" className="text-decoration-none">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/ranking" className="text-decoration-none">
            <i className="fas bi bi-stars"></i> Bảng xếp hạng
          </Link>
        </li>
        <li>
          <Link to="/profile" className="text-decoration-none">
            <i className="fas fa-user"></i> Thông tin cá nhân
          </Link>
        </li>
        <li>
          <Link to="/summary" className="text-decoration-none">
            <i className="fas fa-wallet"></i> Bảng tổng hợp
          </Link>
        </li>
        <li>
          <Link to="/report" className="text-decoration-none">
            <i className="fas fa-chart-bar"></i> Báo cáo điểm nhóm
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="text-decoration-none">
            <i className="fas fa-tasks"></i> Tasks
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-decoration-none">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
        <li>
          <Link to="/help" className="text-decoration-none">
            <i className="fas fa-question-circle"></i> Help
          </Link>
        </li>
        <li>
          <a className="logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Log out
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
