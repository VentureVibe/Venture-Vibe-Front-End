import React from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="tophead">
        <img src="" alt="" />
        <h1>Dashboard</h1>
        <ul>
          <li>
            <a href="dashboard">Dashboard</a>
          </li>
          <li>
            <a href="dashboard">Users</a>
          </li>
          <li>
            <a href="dashboard">Blog</a>
          </li>
          <li>
            <a href="dashboard">Travel Plan</a>
          </li>
          <li>
            <a href="dashboard">Item</a>
          </li>
          <li>
            <a href="dashboard">Item</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
