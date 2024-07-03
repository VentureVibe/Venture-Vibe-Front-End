import React from "react";
import "./Admin.scss";
import logo from "../../assets/profilepics/logo3.png";

const Admin = () => {
  return (
    <div className="admin">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <a href="#dashboard">
              <img src={logo} alt="Venture Vibe Logo" /> Venture Vibe
            </a>
          </li>
          <li>
            <a href="#users">Users</a>
          </li>
          <li>
            <a href="#trips">Trips</a>
          </li>
          <li>
            <a href="#bookings">Bookings</a>
          </li>
          <li>
            <a href="#analytics">Analytics</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </div>

      <div className="content">
        <div id="dashboard">
          <h2>Dashboard</h2>
          <p>Welcome to the admin dashboard!</p>
        </div>

        <div id="users">
          <h2>Users</h2>
          <p>Manage user accounts here.</p>
        </div>

        <div id="trips">
          <h2>Trips</h2>
          <p>Manage trips and destinations.</p>
        </div>

        <div id="bookings">
          <h2>Bookings</h2>
          <p>View and manage bookings.</p>
        </div>

        <div id="analytics">
          <h2>Analytics</h2>
          <p>Track application analytics.</p>
        </div>

        <div id="settings">
          <h2>Settings</h2>
          <p>Adjust application settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
