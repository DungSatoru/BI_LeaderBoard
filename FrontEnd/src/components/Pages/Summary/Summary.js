import React, { useEffect, useState } from "react";
import { sampleData } from "../../../data/sampleData";
import TableReport from "../../Table/TableReport/TableReport";
import Class63HT1Data from "../../../data/63ht_order.json";

const Summary = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // LẤY DỮ LIỆU TỪ API
      const response = await fetch(
        "http://localhost:3010/api/superset/leaderBoard?orderByScore=false", // Thêm tham số query string vào URL
        {
          method: "GET", // Sử dụng GET
          headers: {
            "Content-Type": "application/json", // Đảm bảo content-type là application/json
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setStudentsData(data.data); // Giả sử bạn muốn lấy dữ liệu từ key `data` trong response
      } else {
        console.error("Error fetching data");
      }


      // DỮ LIỆU MẪU
      // setStudentsData(Class63HT1Data.data);
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
