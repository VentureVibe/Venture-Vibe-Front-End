
import { useState } from 'react'
import './App.css'

import React from 'react';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import TravelPlan from './pages/travelPlan/TravelPlan';
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
      element: <Layout />,  // Use the Layout component for the root path
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
          path: "/",
          element: <Home />,
        }
      ],
    },
    {
      path: "/travelplan",
      element: <TravelPlan />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
