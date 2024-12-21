import React, { createContext, useContext, useEffect, useState } from "react";

// Tạo Context
const ThemeContext = createContext();

// Provider
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Lấy trạng thái từ localStorage hoặc mặc định là false
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    // Cập nhật class của body
    if (newMode) {
      document.body.classList.add("dark");
      document.body.classList.add("bg-dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("bg-dark");
    }
  };

  // Đồng bộ class của body khi load trang
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark", "text-white");
    } else {
      document.body.classList.remove("dark", "text-white");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook để sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);
