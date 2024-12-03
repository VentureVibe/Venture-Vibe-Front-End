// src/components/HeaderBar.jsx
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import "./HeaderBar.scss";
import logo from "../../../assets/Logo2.png";
import Profile from "../../profile/Profile";
import FreeSolo from "../search/Search";

const HeaderBar = () => {
  const notificationsCount = 5; // Example notification count

  return (
    <header className="header-bar">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="Venture Vibe Logo" className="logo" />
        </a>

        <nav>
          <ul>
            <li>
              <a href="/admin/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/admin/users">Users</a>
            </li>
            <li>
              <a href="/admin/providers">Providers</a>
            </li>
            <li>
              <a href="/admin/reports">Reports</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="profile">
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
