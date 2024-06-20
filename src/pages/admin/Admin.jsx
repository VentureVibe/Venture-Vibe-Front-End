import React from "react";
import "./Admin.scss";

const Admin = () => {
  return (
    <>
      <div class="sidebar">
        <h2>Admin Dashboard</h2>
        <a href="#dashboard">Dashboard</a>
        <a href="#users">Users</a>
        <a href="#settings">Settings</a>
        <a href="#reports">Reports</a>
        <a href="#logout">Logout</a>
      </div>
    </>
  );
};

export default Admin;
