import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./Admin.scss";
import UserTable from "../../components/admin/users/UserTable";
import HeaderBar from "../../components/admin/head/HeaderBar";
import DashboardOverview from "./Overview/DashboardOverview";
// import Navbar from "../components/navbar/Navbar";

const Admin = () => {
  return (
    <>
      <div className="headerBar">
        <HeaderBar />
      </div>

      <div className="wrapper">
        <div className="sidebar-content">
          <Sidebar />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UserTable />} />
            {/* <Route path="/users" element={<UserTable />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/users" element={<UserTable />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
