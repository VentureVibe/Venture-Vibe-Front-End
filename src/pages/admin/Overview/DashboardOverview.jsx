import React, { useState, useEffect } from "react";
import "./DashboardOverview.scss";

const DashboardOverview = () => {
  const [data, setData] = useState({
    users: 50,
    eventPlanners: 5,
    travelGuides: 10,
    otherStats: {
      activeEvents: 3,
      pendingReports: 2,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard-overview">
      <h1 className="dashboard-title">Admin Dashboard Overview</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p className="card-count">{data.users}</p>
        </div>
        <div className="dashboard-card">
          <h3>Event Planners</h3>
          <p className="card-count">{data.eventPlanners}</p>
        </div>
        <div className="dashboard-card">
          <h3>Travel Guides</h3>
          <p className="card-count">{data.travelGuides}</p>
        </div>
      </div>

      <div className="essential-features">
        <div className="feature-card">
          <h4>Active Events</h4>
          <div className="feature-number">{data.otherStats.activeEvents}</div>
        </div>
        <div className="feature-card">
          <h4>Pending Reports</h4>
          <div className="feature-number">{data.otherStats.pendingReports}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
