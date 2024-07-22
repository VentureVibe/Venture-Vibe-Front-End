import React from "react";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./Admin.scss";
import UserTable from "../../components/admin/users/UserTable";
import HeaderBar from "../../components/admin/head/HeaderBar";
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
        <div className="usertable-admin">
          <UserTable />
        </div>
      </div>
    </>
  );
};

export default Admin;
