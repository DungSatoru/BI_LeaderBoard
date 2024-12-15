import React, { useEffect, useState } from "react";
import { sampleData } from "../../../data/sampleData";
import TableReport from "../../Table/TableReport/TableReport";
import Class63HT1Data from "../../../data/63ht_order.json";


const Summary = () => {
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    // Gán dữ liệu JSON đã sắp xếp
    const data = Class63HT1Data.data;
    setStudentsData(data);
  }, []);

  return (
    <section className="summary">
      <div className="main-top">
        <h1>BÁO CÁO ĐIỂM CHI TIẾT</h1>
      </div>
      <TableReport data={studentsData} />
    </section>
  );
};

export default Summary;
