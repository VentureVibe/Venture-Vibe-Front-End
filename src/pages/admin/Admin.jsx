import React from "react";
import "./Admin.scss";

const Admin = () => {
  return (
    <>
      <div class="sidebar">
        <h2>
          {" "}
          <i class="fa-solid fa-bars"></i>
          <img src="/src/assets/Logo2.png" />
          Venture Vibe
        </h2>
        <a href="#dashboard">
          <i class="fa-solid fa-user"></i>Dashboard
        </a>
        <a href="#users">Users</a>
        <a href="#settings">Settings</a>
        <a href="#reports">Reports</a>
        <a href="#logout">Logout</a>
      </div>
    </>
  );
};

export default Admin;
