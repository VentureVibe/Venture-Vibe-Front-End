import { useState } from "react";
import "./App.css";


import './App.css'


import React from 'react';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import TravelPlan from './pages/travelPlan/TravelPlan';
import Admin from "./pages/admin/Admin";
import Community from './pages/community/Community';
import ServiceProviderUser from './pages/serviceProvider/ServiceProviderUser';
import Navbar from './components/navbar/Navbar';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use the Layout component for the root path
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/travelplan",
      element: <TravelPlan />,
    },

    {
      path: "/community",
      element: <Community />,
    },
    {
      path: "serviceprovideruser",
      element: <ServiceProviderUser />,
    }

  ]);

  return <RouterProvider router={router} />;
}

export default App;
