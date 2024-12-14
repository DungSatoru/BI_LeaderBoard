import React from "react";
import "./Card.css";
import { FaTrophy } from "react-icons/fa"; // Sử dụng Font Awesome Icon (trophy)

function Card({ data }) {
  // Xử lý class cho từng hạng
  let rankClass = "";
  switch (data.rank) {
    case 1:
      rankClass = "gold"; // Xếp hạng 1 là vàng
      break;
    case 2:
      rankClass = "silver"; // Xếp hạng 2 là bạc
      break;
    case 3:
      rankClass = "bronze"; // Xếp hạng 3 là đồng
      break;
    default:
      rankClass = ""; // Không có hạng
  }

  return (
    <div className={`card ${rankClass}`}>
      <img src="./user.png" alt="User" />
      <h4>{data.fullName}</h4>
      <p>{data.studentId}</p>
      <div className="d-flex">
        <div>
          Điểm số: <span>{data.score}</span>
        </div>
        <div>
          Xếp hạng: <span>{data.rank}</span>
        </div>
      </div>

      {/* Biểu tượng xếp hạng */}
      <FaTrophy className={`rank-icon ${rankClass}`} />
    </div>
  );
}

export default Card;
