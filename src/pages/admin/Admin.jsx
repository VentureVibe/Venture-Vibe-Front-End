import React from "react";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./Admin.scss";
import UserTable from "../../components/admin/users/UserTable";
import Navbar from "../components/navbar/Navbar";

const Admin = () => {
  return (
    <>
      <UserTable />
      <Sidebar />
    </>
  );
};

export default Admin;
