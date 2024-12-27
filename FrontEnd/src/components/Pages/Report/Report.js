import React, { useState, useEffect } from "react";
import "./Report.css";
import { useTheme } from "../../../Contexts/ThemeContext";
import API_URL from "../../../Config/config";
import ImageTop1 from "../../../assets/Image/gold-rm.png";
import ImageTop2 from "../../../assets/Image/silver-rm.png";
import ImageTop3 from "../../../assets/Image/bronze-rm.png";

// Tính trung bình điểm của một nhóm, làm tròn đến 2 chữ số thập phân
const calculateGroupScore = (group) => {
  const totalScore = group.reduce(
    (total, student) => total + student.finalScore,
    0
  );
  return group.length > 0
    ? parseFloat((totalScore / group.length).toFixed(2))
    : 0;
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

const Report = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/superset/leaderBoard?orderByScore=false`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStudentsData(data.data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc và nhóm sinh viên
  const clusters = groupStudents(studentsData);

  // Tính điểm trung bình cho mỗi cụm
  const clusterScores = clusters.map((cluster) => {
    const totalGroupScores = cluster.groups.reduce(
      (total, group) => total + calculateGroupScore(group),
      0
    );
    return cluster.groups.length > 0
      ? parseFloat((totalGroupScores / cluster.groups.length).toFixed(2))
      : 0;
  });

  // Tìm tổng điểm cao nhất trong các cụm
  const highestClusterScore = Math.max(...clusterScores);

  // State để quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState(0);
  const { darkMode } = useTheme();

  const currentUser = JSON.parse(localStorage.getItem("studentInfo"));

  if (loading) {
    return (
      <div className="spinner">
        <div></div>
      </div>
    );
  }

  return (
    <section className="report">
      <div className="main-top">
        <h1 className="fw-bold">BÁO CÁO ĐIỂM CỤM - NHÓM</h1>
      </div>

      <div className="clusters-container">
        <div className="d-flex justify-content-around">
          {clusters.map((cluster, clusterIndex) => {
            const averageClusterScore = clusterScores[clusterIndex];

            // Xác định ảnh xếp hạng cụm
            let imageSrc;
            if (averageClusterScore === highestClusterScore) {
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
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                key={clusterIndex}
              >
                <img
                  src={imageSrc}
                  className="card-img-top"
                  alt={`Cụm ${cluster.cluster}`}
                  style={{
                    width: "100px",
                    margin: "auto",
                    display: "block",
                  }}
                />
                <div className="card-body">
                  <p className="card-text text-center h5 fw-bold">
                    Cụm {cluster.cluster}: {averageClusterScore} điểm
                  </p>
                </div>
              </div>
            );
          })}
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
                >
                  Cụm {cluster.cluster}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content">
          <div className="row">
            <div className="col-md-3 mt-3">
              <div
                className={`card text-center ${
                  darkMode ? "bg-dark text-white border-light" : ""
                }`}
              >
                <div className="card-header fw-bold">Nhóm 1</div>
                <div className="card-body">
                  Hệ thống Kinh doanh thông minh cho nông nghiệp
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div
                className={`card text-center ${
                  darkMode ? "bg-dark text-white border-light" : ""
                }`}
              >
                <div className="card-header fw-bold">Nhóm 2</div>
                <div className="card-body">
                  Hệ thống Quản lý tài chính thông minh cho cá nhân
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div
                className={`card text-center ${
                  darkMode ? "bg-dark text-white border-light" : ""
                }`}
              >
                <div className="card-header fw-bold">Nhóm 3</div>
                <div className="card-body">
                  Hệ thống Tìm kiếm mặt bằng cho thuê thông minh
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div
                className={`card text-center ${
                  darkMode ? "bg-dark text-white border-light" : ""
                }`}
              >
                <div className="card-header fw-bold">Nhóm 4</div>
                <div className="card-body">
                  Hệ thống Đào tạo thông minh cho sinh viên
                </div>
              </div>
            </div>
          </div>
          {clusters.map((cluster, index) => (
            <div
              key={index}
              className={`tab-pane fade ${
                activeTab === index ? "show active" : ""
              }`}
            >
              <div className="row mt-2">
                {cluster.groups.map((group, groupIndex) => {
                  const totalGroupScore = calculateGroupScore(group);
                  return (
                    <div
                      key={groupIndex}
                      className={`col-md-6 col-12 mt-2 ${
                        darkMode ? "bg-dark text-white" : ""
                      }`}
                    >
                      <div
                        className={`card ${
                          darkMode ? "bg-dark text-white" : ""
                        }`}
                      >
                        <div className="card-header d-flex align-items-center justify-content-between">
                          <div className="fw-bold text-primary">
                            NHÓM {groupIndex + 1}
                          </div>
                          <div className="fw-bold text-success">
                            Tổng điểm: {totalGroupScore}
                          </div>
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
                                <th className="text-center">Điểm quá trình</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.length > 0 ? (
                                group.map((item, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      item.uid === currentUser?.uid
                                        ? "table-primary"
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
                                      {item.finalScore}
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
