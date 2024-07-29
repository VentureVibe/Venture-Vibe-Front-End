import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Reports.scss";

const data = [
  { name: "Completed Reports", value: 400 },
  { name: "Pending Reports", value: 300 },
  { name: "Overdue Reports", value: 300 },
  { name: "Failed Reports", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports = () => {
  return (
    <div className="reports">
      <h1>Reports</h1>
      <div className="chart-container">
        <h2>Report Status</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Reports;
