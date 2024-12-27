import React from "react";
import { useTheme } from "../../../Contexts/ThemeContext";

const LeaderboardItem = ({
  rank,
  name,
  class: studentClass,
  finalScore,
  uid,
}) => {
  const { darkMode } = useTheme(); // Lấy giá trị darkMode từ ThemeContext

  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

  const studentId = studentInfo?.uid;

  // Xác định nếu item này là của studentId
  const isCurrentUser = studentId === uid;

  return (
    <div
      className={`leaderboard-item d-flex align-items-center justify-content-between border-bottom ${
        isCurrentUser ? "bg-info" : ""
      } `}
    >
      {/* Rank */}
      <div className="rank fs-4 fw-bold mx-3">{rank}</div>

      {/* Avatar */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
        alt="player-avatar"
        className="avatar rounded-circle border border-2 me-3"
        style={{ width: "50px", height: "50px" }}
      />

      {/* Name */}
      <div className="name flex-grow-1 fw-semibold text-truncate">{name}</div>

      {/* Class */}
      <div className="class text-muted">{studentClass}</div>

      {/* Points */}
      <div className="points fs-5 fw-semibold px-2">{finalScore} Điểm</div>
    </div>
  );
};

export default LeaderboardItem;
