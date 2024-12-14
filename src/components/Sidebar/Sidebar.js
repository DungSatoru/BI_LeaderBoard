import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './Sidebar.css';

function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="#" className="logo">
            <img src="/logo192.png" alt="Logo" />
            <span className="nav-item">DashBoard</span>
          </a>
        </li>
        <li>
          <Link to="/" className='text-decoration-none'>
            <i className="fas fa-home"></i> Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className='text-decoration-none'>
            <i className="fas fa-user"></i> Thông tin cá nhân
          </Link>
        </li>
        <li>
          <Link to="/summary" className='text-decoration-none'>
            <i className="fas fa-wallet"></i> Bảng tổng hợp
          </Link>
        </li>
        <li>
          <Link to="/report" className='text-decoration-none'>
            <i className="fas fa-chart-bar"></i> Báo cáo điểm nhóm
          </Link>
        </li>
        <li>
          <Link to="/tasks" className='text-decoration-none'>
            <i className="fas fa-tasks"></i> Tasks
          </Link>
        </li>
        <li>
          <Link to="/settings" className='text-decoration-none'>
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
        <li>
          <Link to="/help" className='text-decoration-none'>
            <i className="fas fa-question-circle"></i> Help
          </Link>
        </li>
        <li>
          <Link to="/logout" className="logout">
            <i className="fas fa-sign-out-alt"></i> Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
