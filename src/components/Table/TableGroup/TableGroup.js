import React from "react";
import "./TableGroup.css";

function TableGroup({
  data,
  groupName,
  totalGroupScore,
  groupClass,
  icon,
  rank,
}) {
  return (
    <section className="attendance">
      <div className="attendance-list">
        {/* Bọc tên nhóm và tổng điểm vào một div */}
        <div className="group-header d-flex align-items-center justify-content-between">
          <h3>{groupName}</h3> {/* Hiển thị tên nhóm */}
          <div>Tổng điểm: {totalGroupScore}</div>
          <div>
            Hạng {rank} &nbsp;
            {icon} {/* Thêm icon vào sau tổng điểm */}
          </div>
        </div>

        {/* Áp dụng lớp màu cho bảng */}
        <table className={`table ${groupClass}`}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Họ và Tên</th>
              <th>Lớp</th>
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
                <td>{item.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableGroup;
