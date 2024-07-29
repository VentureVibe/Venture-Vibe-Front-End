import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Recommendations.scss";

const data = [
  { name: "Jan", recommendations: 4000 },
  { name: "Feb", recommendations: 3000 },
  { name: "Mar", recommendations: 2000 },
  { name: "Apr", recommendations: 2780 },
  { name: "May", recommendations: 1890 },
  { name: "Jun", recommendations: 2390 },
  { name: "Jul", recommendations: 3490 },
  { name: "Aug", recommendations: 3000 },
  { name: "Sep", recommendations: 2000 },
  { name: "Oct", recommendations: 2780 },
  { name: "Nov", recommendations: 1890 },
  { name: "Dec", recommendations: 2390 },
];

const Recommendations = () => {
  return (
    <div className="recommendations">
      <h1>Recommendations</h1>
      <div className="chart-container">
        <h2>Monthly Recommendations</h2>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="recommendations" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Recommendations;
