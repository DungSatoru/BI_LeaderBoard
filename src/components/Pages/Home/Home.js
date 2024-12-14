import React from "react";
import Card from "../../Card/Card";
import "./Home.css";
import { sampleData } from "../../../data/sampleData";

const Home = () => {
  const sortedData = sampleData.sort((a, b) => b.totalScore - a.totalScore);

  const topScores = [...new Set(sortedData.map((student) => student.totalScore))].slice(0, 3);

  const rankedGroups = topScores.map((score) => ({
    rank: topScores.indexOf(score) + 1,
    students: sortedData.filter((student) => student.totalScore === score),
  }));

  return (
    <section className="home">
      <div className="main-top">
        <h1>Leaderboard</h1>
      </div>
      <div className="users">
        {rankedGroups.map((group) => (
          <div key={group.rank} className="rank-group">
            {group.students.map((student) => (
              <Card
                key={student.studentId}
                data={{
                  fullName: student.fullName,
                  studentId: student.studentId,
                  score: student.totalScore,
                  rank: group.rank,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
