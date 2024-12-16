import React from "react";
import { useTheme } from "../../../Contexts/ThemeContext"; // Import useTheme

const Setting = () => {
  const { darkMode, toggleDarkMode } = useTheme(); // Lấy trạng thái và hàm toggle từ ThemeContext

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Cài đặt</h1>
      <div className="form-check form-switch">
        {/* Sử dụng Bootstrap Switch */}
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode} // Hiển thị trạng thái bật/tắt của Dark Mode
          onChange={toggleDarkMode} // Bật/tắt Dark Mode khi người dùng thay đổi
        />
        <label className="form-check-label" htmlFor="darkModeToggle">
          Kích hoạt Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Setting;
