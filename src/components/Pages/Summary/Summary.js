import React from "react";
import { sampleData } from "../../../data/sampleData";
import TableReport from "../../Table/TableReport/TableReport";

const Summary = () => {
  return (
    <section className="summary">
      <div className="main-top">
        <h1>Báo cáo điểm</h1>
      </div>
      <TableReport data={sampleData} />
    </section>
  );
};

export default Summary;
