import React from "react";
import "./TableReport.css";

function TableReport({ data }) {
  return (
    <section className="attendance">
      <div className="attendance-list">
        <h1>Báo cáo chi tiết</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Họ và Tên</th>
              <th>Lớp</th>
              <th>Phát biểu</th>
              <th>Vắng mặt</th>
              <th>Tổng điểm</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={item.absences === "x" ? "active" : ""}>
                <td>{index + 1}</td>
                <td>{item.uid}</td>
                <td>{item.name}</td>
                <td>{item.class}</td>
                <td>{item.boardTimes}</td>
                <td>{item.absences}</td>
                <td>{item.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableReport;
