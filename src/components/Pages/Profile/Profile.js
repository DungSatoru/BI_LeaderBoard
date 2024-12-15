import React, { useEffect, useState } from "react";
import TableReport from "../../Table/TableReport/TableReport";
import Class63HT1Data from "../../../data/63ht_order.json";

const Summary = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Thêm tham số "orderByScore=true" vào URL query string
      const response = await fetch("http://localhost:3010/api/superset/leaderBoard?orderByScore=false", {
        method: "GET", // Sử dụng GET
        headers: {
          "Content-Type": "application/json", // Đảm bảo content-type là application/json
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        setStudentsData(data.data); // Giả sử bạn muốn lấy dữ liệu từ key `data` trong response
      } else {
        console.error("Error fetching data");
      }
    };

    fetchData();
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
