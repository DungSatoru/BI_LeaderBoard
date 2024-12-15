import React, { useState, useEffect } from "react";
import "./Login.css"; // Import CSS riêng cho trang Login

const Login = () => {
  return (
    <div id="Login" className="dark">
      <div className="login-bg" style={{ backgroundImage: "url('https://i.pinimg.com/736x/66/fc/01/66fc01237650a7ef751b5c77e301c38f.jpg')" }}>
        <div>
          <h2>Nhóm 2 - Cụm 1</h2>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h1>Xin chào</h1>
          <p>Chào mừng đến với LeaderBoard</p>
          <form className="mt-6">
            <div className="input-field">
              <label htmlFor="uid">Mã sinh viên</label>
              <input
                type="text"
                id="uid"
                placeholder="Nhập mã sinh viên"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
