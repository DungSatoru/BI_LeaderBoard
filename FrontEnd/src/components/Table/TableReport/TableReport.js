import React from "react";
import "./TableReport.css";

function TableReport({ data }) {
  const currentUser = JSON.parse(localStorage.getItem("studentInfo"));

  return (
    <section className="attendance">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Mã sinh viên</th>
              <th className="text-center">Họ và Tên</th>
              <th className="text-center">Lớp</th>
              <th className="text-center">Phát biểu</th>
              <th className="text-center">Vắng mặt</th>
              <th className="text-center">Phát biểu</th>
              <th className="text-center">Cộng hệ thống phân nhóm</th>
              <th className="text-center">Cộng Leaderboard</th>
              <th className="text-center">Chuyên cần</th>
              <th className="text-center">Điểm phát biểu</th>
              <th className="text-center">Điểm quá trình</th>
              <th className="text-center">Điểm quá trình cuối cùng</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={
                  item.uid === currentUser?.uid
                    ? "table-primary"
                    : item.absences === "x"
                    ? "table-danger"
                    : ""
                }
              >
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.uid}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.class}</td>
                <td className="text-center">{item.boardTimes}</td>
                <td className="text-center">{item.absences}</td>
                <td className="text-center">{item.boardTimes}</td>
                <td className="text-center">{item.percentGroup}</td>
                <td className="text-center">{item.percentLeaderboard}</td>
                <td className="text-center">{item.project}</td>
                <td className="text-center">{item.boardScore}</td>
                <td className="text-center">{item.progressScore}</td>
                <td className="text-center">{item.finalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableReport;
