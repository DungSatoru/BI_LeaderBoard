import axios from "axios"; // Import axios
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../Contexts/ThemeContext"; // Import useTheme từ ThemeContext
import "./Profile.css"; // Đảm bảo bạn đã import file CSS
import API_URL from "../../../Config/config";

const Profile = () => {
  const { darkMode } = useTheme(); // Lấy giá trị darkMode từ ThemeContext
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentMark, setStudentMark] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      setLoading(true); // Đặt loading thành true khi bắt đầu
      const storedStudentInfo = localStorage.getItem("studentInfo");
      const token = localStorage.getItem("token");

      if (storedStudentInfo) {
        setStudentInfo(JSON.parse(storedStudentInfo));
      } else {
        if (token) {
          try {
            const studentResponse = await axios.get(
              `${API_URL}/student/getSummaryMark`,
              {
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              }
            );

            if (studentResponse.status === 200) {
              const student = studentResponse.data;

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

              localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
              setStudentInfo(studentInfo);
            }
          } catch (error) {
            console.error("Lỗi khi gọi API:", error);
          }
        } else {
          console.error("Không tìm thấy token trong localStorage.");
        }
      }

      try {
        const studentListMarkResponse = await axios.get(
          `${API_URL}/student/getListMarkDetail`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        setLoading(false);
        setStudentMark(studentListMarkResponse.data.data);
        console.log(studentListMarkResponse.data.data);

        console.log(studentMark);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchStudentInfo();
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <div></div>
      </div>
    );
  }

  if (!studentInfo) {
    return <div>Không có thông tin sinh viên để hiển thị.</div>;
  }

  return (
    <div className={`profile ${darkMode ? "dark" : ""}`}>
      <div className={`main-top ${darkMode ? "text-white" : ""}`}>
        <h1>THÔNG TIN CÁ NHÂN {studentInfo.studentId}</h1>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-9">
            <div className={`card ${darkMode ? "bg-dark text-white" : ""}`}>
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-start gap-5">
                  <img
                    className="object-fit-center p-3"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/User_icon-cp.png/483px-User_icon-cp.png"
                    alt="Student Avatar"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="d-flex align-items-start justify-content-center flex-column gap-3">
                    <h2 className="card-title h2 text-uppercase text-nowrap">
                      {studentInfo.displayName}
                    </h2>
                    <h6 className="card-subtitle h6">{studentInfo.uid}</h6>
                  </div>
                </div>
              </div>
              <div className="card-body mt-3">
                <div className="d-flex align-items-center flex-column gap-5">
                  <div
                    className={`card shadow w-100 ${
                      darkMode ? "bg-dark text-white" : ""
                    }`}
                  >
                    <div className="card-header">
                      <h3 className="card-title">Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Khoa</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.department}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Ngành</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.speciality}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Lớp</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.class}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`card shadow w-100 ${
                      darkMode ? "bg-dark text-white" : ""
                    }`}
                  >
                    <div className="card-header">
                      <h3 className="card-title">Thông tin chung</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Điện thoại</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.phoneNumber}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Giới tính</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.gender}
                          </p>
                        </div>

                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Ngày sinh</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.birthDate}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Email</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.email}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5 fw-bold">Nơi sinh</h5>
                          <p
                            className={`text-dark ${
                              darkMode ? "text-white" : ""
                            }`}
                          >
                            {studentInfo.birthPlace}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className={`card ${darkMode ? "bg-dark text-white" : ""}`}>
              <div className="card-header">
                <h3 className="card-title h3">Điểm số</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="progress-group text-center">
                      <div className="circle-progress">
                        <svg
                          viewBox="0 0 36 36"
                          className="circular-chart blue"
                        >
                          <path
                            className="circle-background"
                            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
                          />
                          <path
                            className="circle-progress-bar"
                            strokeDasharray={`${
                              (studentInfo.gpa4 * 100) / 4
                            }, 100`}
                            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
                          />
                        </svg>
                        <div className="circle-content">
                          <b>{studentInfo.gpa4}</b>/4
                        </div>
                      </div>
                      <p className="mt-2">GPA Hệ 4</p>
                    </div>
                    <div className="progress-group text-center">
                      <div className="circle-progress">
                        <svg
                          viewBox="0 0 36 36"
                          className="circular-chart green"
                        >
                          <path
                            className="circle-background"
                            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
                          />
                          <path
                            className="circle-progress-bar"
                            strokeDasharray={`${
                              (studentInfo.gpa10 * 100) / 10
                            }, 100`}
                            d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
                          />
                        </svg>
                        <div className="circle-content">
                          <b>{studentInfo.gpa10}</b>/10
                        </div>
                      </div>
                      <p className="mt-2">GPA Hệ 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className={`card ${darkMode ? "bg-dark text-white" : ""}`}>
              <div className="card-header">
                <h3 className="card-title">Bảng điểm</h3>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr className={`text-center ${darkMode ? "text-white bg-dark" : ""}`}>
                      <th className={`text-center ${darkMode ? "text-white bg-dark" : ""}`} scope="col">Môn học</th>
                      <th className={`text-center ${darkMode ? "text-white bg-dark" : ""}`} scope="col">Điểm</th>
                      <th className={`text-center ${darkMode ? "text-white bg-dark" : ""}`} scope="col">Điểm Hệ 4</th>
                      <th className={`text-center ${darkMode ? "text-white bg-dark" : ""}`} scope="col">Xếp loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentMark && studentMark.length > 0 ? (
                      studentMark.map((subject, index) => (
                        <tr key={index} className={` ${darkMode ? "text-white bg-dark" : ""}`}>
                          <td className={`text-center ${darkMode ? "text-white bg-dark" : ""}`}>{subject.subjectName}</td>
                          <td className={`text-center ${darkMode ? "text-white bg-dark" : ""}`}>{subject.mark}</td>
                          <td className={`text-center ${darkMode ? "text-white bg-dark" : ""}`}>{subject.mark4}</td>
                          <td className={`text-center ${darkMode ? "text-white bg-dark" : ""}`}>{subject.charmark}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Không có dữ liệu điểm.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
