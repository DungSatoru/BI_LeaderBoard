import React, { useEffect, useState } from "react";
import { sampleData } from "../../../data/sampleData";
import TableReport from "../../Table/TableReport/TableReport";
import Class63HT1Data from "../../../data/63ht_order.json";
import API_URL from "../../../Config/config";

const Summary = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Đặt loading thành true khi bắt đầu

      // LẤY DỮ LIỆU TỪ API
      const response = await fetch(
        `${API_URL}/superset/leaderBoard?orderByScore=false`, // Thêm tham số query string vào URL
        {
          method: "GET", // Sử dụng GET
          headers: {
            "Content-Type": "application/json", // Đảm bảo content-type là application/json
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoading(false);

        setStudentsData(data.data); // Giả sử bạn muốn lấy dữ liệu từ key `data` trong response
      } else {
        console.error("Error fetching data");
      }


      // DỮ LIỆU MẪU
      // setStudentsData(Class63HT1Data.data);
    };

    fetchData();
  }, []);

  
  if (loading) {
    return (
      <div className="spinner">
        <div></div>
      </div>
    );
  }


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
