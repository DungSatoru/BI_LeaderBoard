import { React, useEffect, useState } from "react";
import Card from "../../CardItem/Card";
import "./Ranking.css";
import LeaderboardItem from "../../Table/LeaderboardItem/LeaderboardItem";
import goldMedal from "../../../assets/Image/gold-rm.png";
import bronzeMedal from "../../../assets/Image/bronze-rm.png";
import silverMedal from "../../../assets/Image/silver-rm.png";
import sampleData from "../../../data/63ht_order.json";
import API_URL from "../../../Config/config";

const Ranking = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [studentsGold, setStudentsGold] = useState([]);
  const [studentsSilver, setStudentsSilver] = useState([]);
  const [studentsBronze, setStudentsBronze] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API
  useEffect(() => {
    setLoading(true); 
    const fetchData = async () => {
      // LẤY DỮ LIỆU TỪ API
      const response = await fetch(
        `${API_URL}/superset/leaderBoard?orderByScore=true`, // Thêm tham số query string vào URL
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
        setLoading(false); 

        setStudentsData(data.data); // Giả sử bạn muốn lấy dữ liệu từ key `data` trong response
      } else {
        console.error("Error fetching data");
      }

      // LẤY DỮ LIỆU TỪ FILE JSON
      // setStudentsData(sampleData.data);
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
      setStudentsGold(groups[0] || []); // Hạng Nhất
      setStudentsSilver(groups[1] || []); // Hạng Nhì
      setStudentsBronze(groups[2] || []); // Hạng Ba
    }
  }, [studentsData]); // Chạy lại khi studentsData thay đổi

  if (loading) {
    return (
      <div className="spinner">
        <div></div>
      </div>
    );
  }

  return (
    <section className="ranking">
      <div className="main-top text-center mb-4">
        <h1>BẢNG XẾP HẠNG</h1>
      </div>
      <div className="CardList d-flex justify-content-center gap-4 mb-4">
        {/* Hạng nhì */}
        <Card
          rank="Nhì"
          medal={silverMedal}
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
          medal={bronzeMedal}
          students={studentsBronze}
          totalPoints={studentsBronze[0]?.totalScore || 0}
          cardClass="bronze"
        />
      </div>
      <div className="LeaderboardRankList max-w-900px mx-auto p-4 bg-white rounded shadow">
        <h1 className="title text-center mb-3">Xếp hạng toàn bộ sinh viên</h1>
        <p className="description text-center mb-4">
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

export default Ranking;
