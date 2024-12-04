import React from "react";
import logo from "../../../assets/Logo2.png";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar-admin">
      <div className="tophead">
        <img src="" alt="" />
        {/* <h1 className="dashboard">Dashboard</h1> */}
        <ul className="side-menu">
          {/* <li>
            <NavLink to="/admin" activeClassName="active">
              Dashboard Overview
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/admin/users" activeClassName="active">
              User Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/service-providers" activeClassName="active">
              Event Organizer Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/travel-guide" activeClassName="active">
              Travel Guide Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/content" activeClassName="active">
              Content Oversight
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/financials" activeClassName="active">
              Financial Insights
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/revenue" activeClassName="active">
              Our Revenue
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/subscribers" activeClassName="active">
              Subscribers
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/overview" activeClassName="active">
              Overview
            </NavLink>
          </li> */}
          {/* <li>
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
          </li> */}
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
