import React from "react";
import logo from "../../../assets/Logo2.png";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar-admin">
      <div className="tophead">
        <img src="" alt="" />
        {/* <h1 className="dashboard">Dashboard</h1> */}
        <ul className="side-menu">
          <li>
            <a href="dashboard">Dashboard Overview</a>
          </li>
          <li>
            <a href="dashboard">User Management</a>
          </li>
          <li>
            <a href="dashboard">Service Provider Listings</a>
          </li>
          <li>
            <a href="dashboard">Content Oversight</a>
          </li>
          <li>
            <a href="dashboard">Financial Insights</a>
          </li>
          <li>
            <a href="dashboard">Reports</a>
          </li>
          <li>
            <a href="dashboard">Recommendations</a>
          </li>
          <li>
            <a href="dashboard">Settings</a>
          </li>
        </ul>

        <button className="logout">
          Logout <i class="fa-solid fa-right-from-bracket"></i>
        </button>

        {/* <div className="home">
          <img src={logo} alt="logo-icon" />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
