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
            <a href="#" className="brand">
              Dashboard
            </a>
          </li>
          <li className="divider">
            <a href="dashboard">Users</a>
          </li>
          <li>
            <a href="dashboard">Blog</a>
          </li>
          <li>
            <a href="dashboard">Travel Plan</a>
          </li>
          <li>
            <a href="dashboard">Service Providers</a>
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
