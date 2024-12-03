// src/pages/admin/panel/DashboardOverview.jsx
import React from "react";
import "./DashboardOverview.scss";
import SubscriberEmail from "../subscribers/SubscriberEmail";

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <div className="stats-container">
        <h1>Dashboard Overview</h1>
        <div className="stat-box">
          <h2>Total Users</h2>
          <p>23</p>
        </div>
        <div className="stat-box">
          <h2>Total Service Providers</h2>
          <p>6</p>
        </div>
        <div className="stat-box">
          <h2>Active Listings</h2>
          <p>8</p>
        </div>
        <div className="stat-box">
          <h2>Community Posts</h2>
          <p>20</p>
        </div>
        <div className="stat-box">
          <h2>Total Travel Guides</h2>
          <p>20</p>
        </div>
        <div className="stat-box">
          <h2>Total Event Planners</h2>
          <p>20</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>New Travel Guide Listed</li>
          <li>New Community Post is added</li>
          <li>Post is reported</li>
          <li>Event Planner posted</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
