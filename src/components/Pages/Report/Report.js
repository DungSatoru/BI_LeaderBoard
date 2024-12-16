import React from "react";
import { sampleData } from "../../../data/sampleData";
import TableGroup from "../../Table/TableGroup/TableGroup";
import "./Report.css";

const Report = () => {
  const groups = [
    ["2151163664", "2151163668", "2151163689", "2151163724", "2151160519"],
    ["2151160535", "2151163738", "2151163731", "2151163702", "2151163696"],
    ["2151163680", "2151160496", "2151160501", "2151163722", "2151163708"],
    ["2251162190", "2151163718", "2151163713", "2151163709", "2151160512"],
  ];

  const getStudentsForGroup = (groupIds) => {
    return sampleData.filter((student) => groupIds.includes(student.studentId));
  };

  const calculateGroupScore = (groupIds) => {
    const studentsInGroup = getStudentsForGroup(groupIds);
    return studentsInGroup.reduce(
      (total, student) => total + student.totalScore,
      0
    );
  };

  const getGroupRank = (groupScores) => {
    const sortedScores = [...groupScores].sort((a, b) => b.totalScore - a.totalScore);
    return groupScores.map(
      (group) => sortedScores.findIndex((g) => g.totalScore === group.totalScore) + 1
    );
  };

  const groupScores = groups.map((groupIds) => {
    const totalGroupScore = calculateGroupScore(groupIds);
    return { groupIds, totalScore: totalGroupScore };
  });

  const groupRanks = getGroupRank(groupScores);

  return (
    <section className="report">
      <div className="main-top">
        <h1 className="fw-bold">BÁO CÁO ĐIỂM</h1>
      </div>
      <div className="groups-container">
        {groups.map((groupIds, index) => {
          const studentsInGroup = getStudentsForGroup(groupIds);
          const groupName = `Nhóm ${index + 1}`;
          const totalGroupScore = calculateGroupScore(groupIds);
          const rank = groupRanks[index];

          // Xác định kiểu và icon chỉ cho hạng 1, 2, 3
          const groupClass =
            rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";
          const icon =
            rank === 1 || rank === 2 || rank === 3 ? (
              <i className={`fas fa-trophy ${groupClass} icon`}></i>
            ) : null;

          return (
            <div key={index} className="group-item">
              <TableGroup
                data={studentsInGroup}
                groupName={groupName}
                totalGroupScore={totalGroupScore}
                rank={rank} // Truyền rank vào đây
                groupClass={groupClass}
                icon={icon} // Truyền icon nếu có
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Report;