import React, { useState, useEffect } from "react";
import "./Report.css";
import { useTheme } from "../../../Contexts/ThemeContext"; // Import useTheme từ ThemeContext
import Class63HT1Data from "../../../data/63ht.json"; // Dữ liệu gốc
import ImageTop1 from "../../../assets/Image/gold-rm.png";
import ImageTop2 from "../../../assets/Image/silver-rm.png";
import ImageTop3 from "../../../assets/Image/bronze-rm.png";

// Tính tổng điểm của một nhóm
const calculateGroupScore = (group) => {
  return group.reduce((total, student) => total + student.totalScore, 0);
};

// Lọc và nhóm sinh viên theo cụm và nhóm
const groupStudents = (data) => {
  const groupedByClusterAndGroup = {};

  data.forEach((student) => {
    if (!groupedByClusterAndGroup[student.cluster]) {
      groupedByClusterAndGroup[student.cluster] = {};
    }

    if (!groupedByClusterAndGroup[student.cluster][student.group]) {
      groupedByClusterAndGroup[student.cluster][student.group] = [];
    }

    groupedByClusterAndGroup[student.cluster][student.group].push(student);
  });

  // Chuyển đổi object thành array và trả về
  return Object.entries(groupedByClusterAndGroup).map(([cluster, groups]) => ({
    cluster,
    groups: Object.values(groups),
  }));
};

// Xếp hạng các nhóm dựa trên tổng điểm
const getGroupRank = (groupScores) => {
  const sortedScores = [...groupScores].sort(
    (a, b) => b.totalScore - a.totalScore
  );
  return groupScores.map(
    (group) =>
      sortedScores.findIndex((g) => g.totalScore === group.totalScore) + 1
  );
};

const Report = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // LẤY DỮ LIỆU TỪ API
      const response = await fetch(
        "http://localhost:3010/api/superset/leaderBoard?orderByScore=false", // Thêm tham số query string vào URL
        {
          method: "GET", // Sử dụng GET
          headers: {
            "Content-Type": "application/json", // Đảm bảo content-type là application/json
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setStudentsData(data.data); // Giả sử bạn muốn lấy dữ liệu từ key `data` trong response
      } else {
        console.error("Error fetching data");
      }


      // DỮ LIỆU MẪU
      setStudentsData(Class63HT1Data.data);
    };

    fetchData();
  }, []);

  // Lọc và nhóm sinh viên
  // const clusters = groupStudents(data63HT1.data);
  const clusters = groupStudents(studentsData);

  // Tính điểm cho mỗi nhóm và xếp hạng các nhóm
  const groupRanks = clusters.map((cluster) => {
    const groupScores = cluster.groups.map((group) => ({
      group,
      totalScore: calculateGroupScore(group),
    }));
    return getGroupRank(groupScores);
  });

  // Tính tổng điểm của mỗi cụm
  const clusterScores = clusters.map((cluster) =>
    cluster.groups.reduce(
      (total, group) => total + calculateGroupScore(group),
      0
    )
  );

  // Tìm tổng điểm cao nhất trong các cụm
  const highestClusterScore = Math.max(...clusterScores);

  // State để quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState(0);
  const { darkMode } = useTheme(); // Lấy giá trị darkMode từ ThemeContext

  const isCurrentUser = JSON.parse(localStorage.getItem("studentInfo"));
  console.log(isCurrentUser.uid);

  return (
    <section className="report">
      <div className="main-top">
        <h1 className="fw-bold">BÁO CÁO ĐIỂM CỤM - NHÓM</h1>
      </div>

      <div className="clusters-container">
        <div>
          <div className="d-flex justify-content-around">
            {clusters.map((cluster, clusterIndex) => {
              // Xác định ảnh cho mỗi cụm
              const totalScore = cluster.groups.reduce(
                (total, group) => total + calculateGroupScore(group),
                0
              );
              let imageSrc;

              if (totalScore === highestClusterScore) {
                imageSrc = ImageTop1;
              } else if (clusterIndex === 1) {
                imageSrc = ImageTop2;
              } else {
                imageSrc = ImageTop3;
              }

              return (
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    backgroundImage:
                      "url(https://t3.ftcdn.net/jpg/09/36/80/68/360_F_936806883_SgyFiO3KOx29JW0wPyceY8FfGv31YEZf.jpg)",
                    backgroundSize: "cover", // Đảm bảo ảnh nền phủ đầy div
                    backgroundPosition: "center", // Canh giữa ảnh nền
                    backgroundRepeat: "no-repeat", // Không lặp lại ảnh nền
                  }}
                  key={clusterIndex}
                >
                  <img
                    src={imageSrc}
                    className="card-img-top"
                    alt={`Cụm ${cluster.cluster}`}
                    style={{
                      width: "100px", // Chỉ điều chỉnh chiều rộng ảnh nếu cần
                      margin: "auto", // Căn giữa ảnh
                      display: "block", // Đảm bảo ảnh là một block element
                    }}
                  />
                  <div className="card-body">
                    <p className="card-text text-center h5 fw-bold">
                      Cụm {cluster.cluster} {": "} {totalScore} điểm
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tabs mt-3">
          <ul
            className={`nav nav-tabs ${
              darkMode ? "bg-dark text-white" : "text-dark"
            }`}
          >
            {clusters.map((cluster, index) => (
              <li className="nav-item" key={index}>
                <button
                  className={`nav-link fw-bold ${
                    activeTab === index ? "active" : ""
                  } ${darkMode ? "bg-dark text-white" : "text-dark"}`}
                  onClick={() => setActiveTab(index)}
                  href="#"
                >
                  Cụm {cluster.cluster}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content">
          <ul className="list-group mt-3">
            <li className="list-group-item">
              Nhóm 1: Hệ thống Kinh doanh thông minh cho nông nghiệp
            </li>
            <li className="list-group-item">
              Nhóm 2: Hệ thống Quản lý tài chính thông minh cho cá nhân
            </li>
            <li className="list-group-item">
              Nhóm 3: Hệ thống Tìm kiếm mặt bằng cho thuê thông minh
            </li>
            <li className="list-group-item">
              Nhóm 4: Hệ thống Đào tạo thông minh cho sinh viên
            </li>
          </ul>

          {clusters.map((cluster, index) => (
            <div
              key={index}
              className={`tab-pane fade ${
                activeTab === index ? "show active" : ""
              }`}
            >
              <div className="groups-container mt-2">
                {cluster.groups.map((group, groupIndex) => {
                  const totalGroupScore = calculateGroupScore(group);
                  return (
                    <div
                      key={groupIndex}
                      className={`group-item ${
                        darkMode ? "bg-dark text-white" : ""
                      }`}
                    >
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                          <div className="fw-bold text-primary">NHÓM {groupIndex + 1}</div>
                          <div className="fw-bold text-success">Tổng điểm: {totalGroupScore}</div>
                        </div>
                        <div className="card-body">
                          <table
                            className={`table ${
                              darkMode ? "bg-dark text-white" : ""
                            }`}
                          >
                            <thead>
                              <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Mã sinh viên</th>
                                <th className="text-center">Họ và Tên</th>
                                <th className="text-center">Lớp</th>
                                <th className="text-center">Tổng điểm tích cực</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.length > 0 ? (
                                group.map((item, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      isCurrentUser.uid === item.uid
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{item.uid}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                      {item.class}
                                    </td>
                                    <td className="text-center">
                                      {item.totalScore}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    Không có dữ liệu
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Report;
