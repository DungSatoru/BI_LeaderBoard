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
              <th>Lên bảng</th>
              <th>Mindmap tổng hợp</th>
              <th>Code hệ thống</th>
              <th>Nghỉ học</th>
              <th>Không mang lap</th>
              <th>Tổng điểm tích cực</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={item.absences === "x" ? "active" : ""}>
                <td>{index + 1}</td>
                <td>{item.studentId}</td>
                <td>{item.fullName}</td>
                <td>{item.className}</td>
                <td>{item.boardTimes}</td>
                <td>{item.mindmapTimes}</td>
                <td>{item.systemCodeTimes}</td>
                <td>{item.absences}</td>
                <td>{item.noLaptop}</td>
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
