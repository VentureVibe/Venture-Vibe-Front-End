import React from "react";
import "./Admin.scss";

const Admin = () => {
  return (
    <>
      <div class="admin-dashboard">
        <aside class="sidebar">
          <div class="sidebar-header">
            <h2>Admin Panel</h2>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <a href="#dashboard">Dashboard Overview</a>
              </li>
              <li>
                <a href="#user-management">User Management</a>
              </li>
              <li>
                <a href="#itineraries">Travel Plans & Itineraries</a>
              </li>
              <li>
                <a href="#bookings">Bookings Management</a>
              </li>
              <li>
                <a href="#destinations">Destinations & Packages</a>
              </li>
              <li>
                <a href="#vendors">Vendor & Partner Management</a>
              </li>
              <li>
                <a href="#content">Content Management</a>
              </li>
              <li>
                <a href="#financial">Financial Management</a>
              </li>
              <li>
                <a href="#analytics">Analytics & Reports</a>
              </li>
              <li>
                <a href="#settings">Settings</a>
              </li>
              <li>
                <a href="#support">Support & Feedback</a>
              </li>
              <li>
                <a href="#security">Security & Compliance</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main class="main-content">
          <section id="dashboard">
            <h2>Dashboard Overview</h2>
            <div class="cards">
              <div class="card">
                <h3>Active Users</h3>
                <p>1200</p>
              </div>
              <div class="card">
                <h3>Bookings</h3>
                <p>350</p>
              </div>
              <div class="card">
                <h3>Revenue</h3>
                <p>$25,000</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Admin;
