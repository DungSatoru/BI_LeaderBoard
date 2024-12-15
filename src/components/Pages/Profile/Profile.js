import React, { useEffect, useState } from "react";
import "./Profile.css"; // Đảm bảo bạn đã import file CSS

const Profile = () => {
  //   const studentInfo = {
  //     studentId: "123456",
  //     fullName: "Nguyễn Văn A",
  //     birthPlace: "Hà Nội",
  //     birthDate: "2000-01-01",
  //     gender: "Nam",
  //     phone: "0123456789",
  //     major: "Kỹ thuật phần mềm",
  //     faculty: "Khoa Công nghệ Thông tin",
  //     course: "Khóa 2020",
  //     gpa4: "3.8",
  //     gpa10: "9.5",
  //   };

  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy token từ localStorage
  const token = localStorage.getItem("token"); // Đảm bảo 'token' là tên đúng mà bạn đã lưu trong localStorage

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!token) {
        console.error("Token not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3010/api/student/getSummaryMark",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`, // Thêm token vào header
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          const result = {
            uid: data.data.uid,
            displayName: data.data.displayName,
            birthPlace: data.data.birthPlace,
            birthDate: data.data.birthDate,
            gender: data.data.gender === "M" ? "Nam" : "Nữ", // Chuyển đổi giới tính
            phoneNumber: data.data.phoneNumber,
            speciality: data.data.speciality,
            department: data.data.department,
            courseyear: data.data.courseyear,
            gpa4: data.data.gpa4,
            gpa10: data.data.gpa10,
          };

          setStudentInfo(result);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [token]); // Phụ thuộc vào token

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Thông tin cá nhân</h1>
        <div className="profile-info">
          <div className="profile-item">
            <span className="label">Mã sinh viên:</span> {studentInfo.uid}
          </div>
          <div className="profile-item">
            <span className="label">Họ và tên:</span> {studentInfo.displayName}
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
            <span className="label">Điện thoại:</span> {studentInfo.phoneNumber}
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
  );
};

export default Profile;
