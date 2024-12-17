import React, { useEffect, useState } from "react";
import "./Profile.css"; // Đảm bảo bạn đã import file CSS

const Profile = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy thông tin sinh viên từ sessionStorage
    const storedStudentInfo = sessionStorage.getItem("studentInfo");
    console.log(storedStudentInfo);

    if (storedStudentInfo) {
      // Chuyển đổi dữ liệu từ JSON string thành object
      setStudentInfo(JSON.parse(storedStudentInfo));
      setLoading(false);
    } else {
      console.error("Không tìm thấy thông tin sinh viên trong sessionStorage");
      setLoading(false);
    }
  }, []);

  // const studentInfo = {
  //   uid: "2151160535",
  //   displayName: "Hạ Quang Dũng",
  //   birthPlace: "Vĩnh Phúc",
  //   birthDate: "18/09/2003",
  //   gender: gender === "M" ? "Nam" : "Nữ",
  //   phoneNumber: "0393049255",
  //   speciality: "Hệ thống thông tin",
  //   department: "Công nghệ thông tin",
  //   courseyear: "2025",
  //   gpa4: 3.42,
  //   gpa10: 8.37,
  // };

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

      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-start gap-5 bg-white">
                  <img
                    className="object-fit-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
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
                  <div className="card shadow w-100">
                    <div className="card-header">
                      <h3 className="card-title">Thông tin sinh viên</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="h5">Khoa</h5>
                          <p className="text-muted">{studentInfo.department}</p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5">Ngành</h5>
                          <p className="text-muted">{studentInfo.speciality}</p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5">Lớp</h5>
                          <p className="text-muted">{studentInfo.class}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow w-100">
                    <div className="card-header">
                      <h3 className="card-title">Thông tin chung</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="h5">Điện thoại</h5>
                          <p className="text-muted">
                            {studentInfo.phoneNumber}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5">Giới tính</h5>
                          <p className="text-muted">{studentInfo.gender}</p>
                        </div>

                        <div className="col-md-4">
                          <h5 className="h5">Ngày sinh</h5>
                          <p className="text-muted">{studentInfo.birthDate}</p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5">Email</h5>
                          <p className="text-muted">{studentInfo.email}</p>
                        </div>
                        <div className="col-md-4">
                          <h5 className="h5">Nơi sinh</h5>
                          <p className="text-muted">{studentInfo.birthPlace}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
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
                            strokeDasharray="66, 100"
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
                            strokeDasharray="78, 100"
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
    </div>
  );
};

export default Profile;
