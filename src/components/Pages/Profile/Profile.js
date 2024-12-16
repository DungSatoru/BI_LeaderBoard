import React, { useEffect, useState } from "react";
import "./Profile.css"; // Đảm bảo bạn đã import file CSS

const Profile = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy thông tin sinh viên từ sessionStorage
    const storedStudentInfo = sessionStorage.getItem("studentInfo");

    if (storedStudentInfo) {
      // Chuyển đổi dữ liệu từ JSON string thành object
      setStudentInfo(JSON.parse(storedStudentInfo));
      setLoading(false);
    } else {
      console.error("Không tìm thấy thông tin sinh viên trong sessionStorage");
      setLoading(false);
    }
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
  console.log(studentInfo);

  return (
    <div className="profile">
      <div className="main-top">
        <h1>THÔNG TIN CÁ NHÂN {studentInfo.studentId}</h1>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Thông tin cá nhân</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="studentId">Mã sinh viên</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  value={studentInfo.studentId}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={studentInfo.name}
                  disabled
                />
              </div>
              <div className="form-group"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title">Thông tin cá nhân</h1>
          <div className="profile-info">
            <div className="profile-item">
              <span className="label">Mã sinh viên:</span>
              {studentInfo.uid}
            </div>
            <div className="profile-item">
              <span className="label">Họ và tên:</span>
              {studentInfo.displayName}
            </div>
            <div className="profile-item">
              <span className="label">Nơi sinh:</span> {studentInfo.birthPlace}
            </div>
            <div className="profile-item">
              <span className="label">Ngày sinh:</span> {studentInfo.birthDate}
            </div>
            <div className="profile-item">
              <span className="label">Giới tính:</span> {studentInfo.gender}
            </div>
            <div className="profile-item">
              <span className="label">Điện thoại:</span>
              {studentInfo.phoneNumber}
              {studentInfo.phoneNumber}
            </div>
            <div className="profile-item">
              <span className="label">Ngành học:</span> {studentInfo.speciality}
            </div>
            <div className="profile-item">
              <span className="label">Khoa:</span> {studentInfo.department}
            </div>
            <div className="profile-item">
              <span className="label">Khóa:</span> {studentInfo.courseyear}
            </div>
            <div className="profile-item">
              <span className="label">GPA 4:</span> {studentInfo.gpa4}
            </div>
            <div className="profile-item">
              <span className="label">GPA 10:</span> {studentInfo.gpa10}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
