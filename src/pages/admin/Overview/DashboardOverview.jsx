// src/pages/admin/panel/DashboardOverview.jsx
import React from "react";
import "./DashboardOverview.scss";

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <h1>Dashboard Overview</h1>
      <div className="stats-container">
        <div className="stat-box">
          <h2>Total Users</h2>
          <p>1,234</p>
        </div>
        <div className="stat-box">
          <h2>Total Providers</h2>
          <p>567</p>
        </div>
        <div className="stat-box">
          <h2>Active Bookings</h2>
          <p>89</p>
        </div>
        <div className="stat-box">
          <h2>Revenue</h2>
          <p>$12,345</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>User John Doe booked a service.</li>
          <li>Provider ABC updated their profile.</li>
          <li>User Jane Smith left a review.</li>
          <li>New user registration: Alice Johnson.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
