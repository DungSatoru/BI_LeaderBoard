import React from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "./Sidebar.css";

function Sidebar() {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("studentInfo");
    // Điều hướng về trang login
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <nav id="Sidebar">
      <ul className="list-unstyled">
        {/* <li>
          <Link to="/dashboard" className="logo text-decoration-none">
            <img src="/logo192.png" alt="Logo" />
            <span className="nav-item">TỔNG QUAN</span>
          </Link>
        </li>
        <li>
          <Link to="/home" className="text-decoration-none">
            <i className="fas fa-home"></i> Trang chủ
          </Link>
        </li> */}
        <li>
          <Link to="/home" className="logo text-decoration-none">
            <img src="/logo192.png" alt="Logo" />
            <span className="nav-item">TRANG CHỦ</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-decoration-none">
            <i className="fas fa-home"></i> Tổng quan
          </Link>
        </li>
        <li>
          <Link to="/ranking" className="text-decoration-none">
            <i className="fas bi bi-stars"></i> Bảng xếp hạng
          </Link>
        </li>
        {token && (
          <li>
            <Link to="/profile" className="text-decoration-none">
              <i className="fas fa-user"></i> Thông tin cá nhân
            </Link>
          </li>
        )}

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
            <i className="fas fa-tasks"></i> Công việc
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-decoration-none">
            <i className="fas fa-cog"></i> Cài đặt
          </Link>
        </li>
        <li>
          <Link to="/help" className="text-decoration-none">
            <i className="fas fa-question-circle"></i> Giúp đỡ
          </Link>
        </li>
        {token ? (
          <li>
            <a
              className="logout text-decoration-none"
              href="#"
              role="link"
              onClick={(e) => {
                e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
                handleLogout();
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </a>
          </li>
        ) : (
          <li>
            <a
              className="login text-decoration-none"
              href="#"
              role="link"
              onClick={(e) => {
                e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
                handleLogin();
              }}
            >
              <i className="fas bi bi-box-arrow-in-right"></i> Đăng nhập
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;
