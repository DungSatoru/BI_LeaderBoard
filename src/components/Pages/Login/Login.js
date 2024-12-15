import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đăng nhập đến API Node.js
      const response = await axios.post("http://localhost:3010/api/login", {
        client_id: "education_client",
        grant_type: "password",
        username: username,
        password: password,
        client_secret: "password",
      });

      // Kiểm tra nếu response có dữ liệu với thông điệp thành công
      if (response.data.message === "Get token success") {
        // Lưu token vào localStorage nếu đăng nhập thành công
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      } else {
        setError("Sai thông tin đăng nhập!");
      }
    } catch (error) {
      // Nếu lỗi 404, nghĩa là sai mật khẩu
      if (error.response && error.response.status === 404) {
        setError("Sai mật khẩu!");
      } else {
        // Nếu có lỗi khác, thông báo lỗi chung
        setError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  return (
    <div id="Login" className="dark">
      <div
        className="login-bg"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/66/fc/01/66fc01237650a7ef751b5c77e301c38f.jpg')",
        }}
      >
        <div>
          <h2>Nhóm 2 - Cụm 1</h2>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h1>Xin chào</h1>
          <p>Chào mừng đến với LeaderBoard</p>
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="username">Mã sinh viên</label>
              <input
                type="text"
                id="username"
                placeholder="Nhập mã sinh viên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Đăng nhập</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
