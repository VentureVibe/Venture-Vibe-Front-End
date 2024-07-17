import React from "react";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./Admin.scss";
import UserTable from "../../components/admin/users/UserTable";
// import Navbar from "../components/navbar/Navbar";

const Admin = () => {
  return (
    <>
      <div className="usertable-admin">
        <UserTable />
      </div>
      <div className="sidebar-content">
        <Sidebar />
      </div>
    </>
  );
};

export default Admin;
