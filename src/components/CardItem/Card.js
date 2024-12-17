import React from "react";
import "./Card.css"; // Thêm CSS tùy chỉnh nếu cần

const Card = ({ rank, medal, students, totalPoints, cardClass }) => {
  return (
    <div className={`cardItem ${cardClass} shadow-sm mb-4`}>
      <div className="card-header d-flex align-items-center justify-content-center">
        <div className="medal-wrapper">
          <img src={medal} alt={`${rank} Medal`} className="img-fluid" />
        </div>
      </div>
      <div className="cardItem-body">
        <h5 className="card-title text-center text-uppercase fw-bold">
          Sinh viên hạng {rank}
        </h5>
        <p className="card-text text-center">
          <strong>Tổng điểm:</strong> {totalPoints}
        </p>
        <ul className="list-group list-group-flush">
          {students.map((student, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className=" text-white">{student.name}</span>
              <span className=" text-white">{student.class}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
