import React from "react";
import logo from "../../../assets/Logo3.png";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="tophead">
        <img src="" alt="" />
        <h1>Dashboard</h1>
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
            <a href="dashboard">Item</a>
          </li>
          <li>
            <a href="dashboard">Item</a>
          </li>
        </ul>

        <button className="logout">
          Logout<i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
