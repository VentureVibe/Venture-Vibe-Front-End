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
import Feeds from "./pages/community/Feeds/Feeds";
import Popular from "./pages/community/popular/Popular";
import All from "./pages/community/all/All";
import CommunityFeed from "./components/communityFeed/CommunityFeed";
import FriendProfile from "./pages/community/profile/FriendProfile";
import ProfileAll from './pages/community/profile/profileAll/ProfileAll'
import ProfilePopular from './pages/community/profile/profilePopular/ProfilePopular'
import CreateTravelPlan from "./pages/createTravelPlan/CreateTravelPlan";

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
        {
          path: "/travelplan",
          element: <CreateTravelPlan />,
        },
      ],
    },
    {
      path: "/travelplan/12",
      element: <TravelPlan />,
    },
    {
      path: "/community",
      element: <Community />,
      children:[
        {
          path:"",
          element:<CommunityFeed/>,
          children: [
            {
              path:"",
              element:<Feeds/>
            },{
              path:"popular",
              element:<Popular/>
            },{
            path:"all",
            element:<All/>
          }
          ],
       
        }
      ,{
        path: "profile",
        element :<FriendProfile/>,
        children: [
          {
            path:":id",
            element:<ProfileAll/>
          },{
            path:"popular/:id",
            element:<ProfilePopular/>
          }
        ]
      }
      
      ]
     
    },
    {
      path: "serviceprovideruser",
      element: <ServiceProviderUser />,
    }

  ]);

  return <RouterProvider router={router} />;
}

export default App;
