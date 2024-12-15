import React from "react";

const LeaderboardItem = ({ rank, name, class: studentClass, totalScore }) => {
  return (
    <div className="leaderboard-item">
      <div className="rank">{rank}</div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
        alt="player-avatar"
        className="avatar"
      />
      <div className="name">{name}</div>
      <div className="class">{studentClass}</div>
      <div className="points">{totalScore} Điểm</div>
    </div>
  );
};

export default LeaderboardItem;
