import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Set loading ban đầu là false

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading khi yêu cầu đăng nhập được gửi

    try {
      // Gửi yêu cầu đăng nhập đến API Node.js
      const response = await axios.post("http://localhost:3010/api/login", {
        client_id: "education_client",
        grant_type: "password",
        username: username,
        password: password,
        client_secret: "password",
      });

      // Sau khi nhận được response, set loading = false
      setLoading(false);

      // Kiểm tra nếu response có dữ liệu với thông điệp thành công
      if (response.data.message === "Get token success") {
        // Lưu token vào localStorage
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Gọi API lấy thông tin sinh viên
        const studentResponse = await axios.get(
          "http://localhost:3010/api/student/getSummaryMark",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (studentResponse.status === 200) {
          const student = studentResponse.data;

          // Chuẩn hóa thông tin và lưu vào sessionStorage
          const studentInfo = {
            uid: student.data.uid,
            displayName: student.data.displayName,
            birthPlace: student.data.birthPlace,
            birthDate: student.data.birthDate,
            gender: student.data.gender === "M" ? "Nam" : "Nữ",
            phoneNumber: student.data.phoneNumber,
            email: student.data.email,
            class: student.data.class,
            speciality: student.data.speciality,
            department: student.data.department,
            courseyear: student.data.courseyear,
            gpa4: student.data.gpa4,
            gpa10: student.data.gpa10,
          };
          sessionStorage.setItem("studentInfo", JSON.stringify(studentInfo));

          // Chuyển hướng đến trang chủ sau khi lưu thành công
          window.location.href = "/home"; // Chuyển hướng đến trang chủ
        } else {
          setError("Không trò lấy thông tin sinh viên. Vui lòng thử lại.");
        }
      } else {
        setError("Sai thông tin đăng nhập!");
      }
    } catch (error) {
      // Sau khi có lỗi, set loading = false để ẩn spinner
      setLoading(false);

      // Nếu lỗi 404, nghĩa là sai mật khẩu
      if (error.response && error.response.status === 400) {
        setError("Sai thông tin đăng nhập!");
      } else {
        // Nếu có lỗi khác, thông báo lỗi chung
        setError("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  return (
    <div id="Login" className="d-flex vh-100">
      {/* Background */}
      <div
        className="login-bg flex-fill d-none d-md-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/66/fc/01/66fc01237650a7ef751b5c77e301c38f.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
          Nhóm 2 - Cụm 1
        </h2>
      </div>

      {/* Login Form */}
      <div className="login-form-container flex-fill d-flex justify-content-center align-items-center">
        <div
          className="login-form p-4 bg-light rounded shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h1 className="text-center mb-3">Xin chào</h1>
          <p className="text-center text-muted">
            Chào mừng đến với LeaderBoard
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Mã sinh viên
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Nhập mã sinh viên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </form>
        </div>
      </div>

      {/* Spinner */}
      {loading && (
        <div
          className="spinner d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Login;