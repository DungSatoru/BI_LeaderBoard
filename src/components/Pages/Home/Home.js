import { React, useEffect, useState } from "react";
import Card from "../../Card/Card";
import "./Home.css";
import LeaderboardItem from "../../Table/LeaderboardItem/LeaderboardItem";
import goldMedal from "../../../assets/Image/gold-rm.png";
import bronzeMedal from "../../../assets/Image/bronze-rm.png";

const Home = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [studentsGold, setStudentsGold] = useState([]);
  const [studentsSilver, setStudentsSilver] = useState([]);
  const [studentsBronze, setStudentsBronze] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3010/api/superset/leaderBoard?orderByScore=true", // Thêm tham số query string vào URL
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
    };

    fetchData(); // Gọi API để lấy dữ liệu
  }, []); // Gọi 1 lần khi component mount

  // Phân loại hạng Nhất, Nhì, Ba sau khi dữ liệu đã được tải về
  useEffect(() => {
    if (studentsData.length > 0) {
      const groupByScore = (students) => {
        const groups = [];
        let currentGroup = [students[0]];

        for (let i = 1; i < students.length; i++) {
          if (students[i].totalScore === currentGroup[0].totalScore) {
            currentGroup.push(students[i]);
          } else {
            groups.push(currentGroup);
            currentGroup = [students[i]];
          }
        }
        groups.push(currentGroup); // Đừng quên nhóm cuối cùng
        return groups;
      };

      const groups = groupByScore(studentsData); // Phân nhóm hạng từ studentsData
      setStudentsGold(groups[0] || []);   // Hạng Nhất
      setStudentsSilver(groups[1] || []); // Hạng Nhì
      setStudentsBronze(groups[2] || []); // Hạng Ba
    }
  }, [studentsData]); // Chạy lại khi studentsData thay đổi

  return (
    <section className="home">
      <div className="main-top">
        <h1>LEADERBOARD</h1>
      </div>
      <div className="CardList">
        {/* Hạng nhì */}
        <Card
          rank="Nhì"
          medal={bronzeMedal}
          students={studentsSilver}
          totalPoints={studentsSilver[0]?.totalScore || 0}
          cardClass="silver"
        />

        {/* Hạng nhất */}
        <Card
          rank="Nhất"
          medal={goldMedal}
          students={studentsGold}
          totalPoints={studentsGold[0]?.totalScore || 0}
          cardClass="gold"
        />

        {/* Hạng ba */}
        <Card
          rank="Ba"
          medal={goldMedal}
          students={studentsBronze}
          totalPoints={studentsBronze[0]?.totalScore || 0}
          cardClass="bronze"
        />
      </div>
      <div className="LeaderboardRankList">
        <h1 className="title">Xếp hạng toàn bộ sinh viên</h1>
        <p className="description">
          Dưới đây là bảng xếp hạng toàn bộ sinh viên môn Hệ thống kinh doanh
          thông minh.
        </p>
        <div className="leaderboard">
          {studentsData.map((student, index) => (
            <LeaderboardItem
              key={index}
              rank={student.top}
              uid={student.uid}
              name={student.name}
              class={student.class}
              absences={student.absences}
              boardTimes={student.boardTimes}
              totalScore={student.totalScore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
