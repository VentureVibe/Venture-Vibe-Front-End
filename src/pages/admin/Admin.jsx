import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./Admin.scss";
import UserTable from "../../components/admin/users/UserTable";
import HeaderBar from "../../components/admin/head/HeaderBar";
import DashboardOverview from "./Overview/DashboardOverview";
import UserManagement from "./UserManagement/UserManagement";
import ServiceProviderListing from "./ServiceProviders/ServiceProviderListing";
import ContentOversight from "./Blog/ContentOversight";
import FinancialInsights from "./Financial/FinancialInsights";
import Reports from "./Reports/Reports";
import Recommendations from "./Recommendation/Recommendations";
import Settings from "./Settings/Settings";
import TravelGuideListing from "./Travel Guide/TravelGuideListing";
import SubscriberEmail from "./subscribers/SubscriberEmail";
import Revenue from "./revenue/Revenue";
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
            <Route path="/" element={<UserManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route
              path="/service-providers"
              element={<ServiceProviderListing />}
            />
            <Route path="/travel-guide" element={<TravelGuideListing />} />
            <Route path="/content" element={<ContentOversight />} />
            <Route path="/financials" element={<FinancialInsights />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscribers" element={<SubscriberEmail />} />
            <Route path="/overview" element={<DashboardOverview />} />
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
