import React from "react";
import { sampleData } from "../../../data/sampleData";
import TableGroup from "../../Table/TableGroup/TableGroup";
import "./Report.css";

const Report = () => {
  // Các nhóm với mã sinh viên tương ứng
  const groups = [
    ["2151163664", "2151163668", "2151163689", "2151163724", "2151160519"], // Nhóm 1
    ["2151160535", "2151163738", "2151163731", "2151163702", "2151163696"], // Nhóm 2
    ["2151163680", "2151160496", "2151160501", "2151163722", "2151163708"], // Nhóm 3
    ["2251162190", "2151163718", "2151163713", "2151163709", "2151160512"], // Nhóm 4
  ];

  // Lọc sinh viên theo các nhóm
  const getStudentsForGroup = (groupIds) => {
    return sampleData.filter((student) => groupIds.includes(student.studentId));
  };

  // Tính tổng điểm của mỗi nhóm
  const calculateGroupScore = (groupIds) => {
    const studentsInGroup = getStudentsForGroup(groupIds);
    return studentsInGroup.reduce(
      (total, student) => total + student.totalScore,
      0
    );
  };

  // Xếp hạng nhóm
  const getGroupRank = (groupScores) => {
    const sortedScores = [...groupScores].sort((a, b) => b.totalScore - a.totalScore);
    return groupScores.map((group) => sortedScores.indexOf(group) + 1);
  };

  // Tính điểm và xếp hạng nhóm
  const groupScores = groups.map((groupIds) => {
    const totalGroupScore = calculateGroupScore(groupIds);
    return { groupIds, totalScore: totalGroupScore };
  });

  // Xếp hạng các nhóm
  const groupRanks = getGroupRank(groupScores);

  console.log(groupRanks);

  return (
    <section className="report">
      <div className="main-top">
        <h1>Báo cáo điểm</h1>
      </div>
      <div className="groups-container">
        {groups.map((groupIds, index) => {
          const studentsInGroup = getStudentsForGroup(groupIds);
          const groupName = `Nhóm ${index + 1}`;
          const totalGroupScore = calculateGroupScore(groupIds);
          const rank = groupRanks[index];

          // Chọn icon và màu sắc dựa trên hạng
          let groupClass = "";
          let iconClass = "";
          let icon = "";
          if (rank === 1) {
            groupClass = "gold";
            iconClass = "fa-trophy";
            icon = <i className={`fas ${iconClass} icon`}></i>;
          } else if (rank === 2) {
            groupClass = "silver";
            iconClass = "fa-medal";
            icon = <i className={`fas ${iconClass} icon`}></i>;
          } else if (rank === 3) {
            groupClass = "bronze";
            iconClass = "fa-medal";
            icon = <i className={`fas ${iconClass} icon`}></i>;
          }

          return (
            <div key={index} className="group-item">
              <TableGroup
                data={studentsInGroup}
                groupName={groupName}
                totalGroupScore={totalGroupScore}
                groupClass={groupClass}
                icon={icon}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Report;
