import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Revenue.scss";

const Revenue = () => {
  const [financialData, setFinancialData] = useState([]);
  const [totalPayment, setTotalPayment] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/payment/category/Guide_Booking"
        );
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };
    fetchData();
  }, []);

  const generateMonthlyPayment = () => {
    const total = financialData.reduce(
      (sum, record) => sum + record.amount * 0.15,
      0
    );
    setTotalPayment(total);
  };

  return (
    <div className="financial-insights">
      <h1>Financial Outcome Overview</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              {/* <th>Receiver</th> */}
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sender || "N/A"}</td>
                {/* <td>{item.receiver || "N/A"}</td> */}
                <td>{item.category}</td>
                <td>LKR {(item.amount * 0.15).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="generate-button" onClick={generateMonthlyPayment}>
        Generate Total Payment
      </button>
      {totalPayment !== null && (
        <div className="total-payment">
          <h3>Total Payment: LKR {totalPayment.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Revenue;
