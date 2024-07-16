import { useState } from "react";
import "./App.css";
import './App.css'
import React from 'react';

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
import CommunityFriends from "./pages/community/friends/CommunityFriends";
import CommunityRequest from "./pages/community/requests/CommunityRequest";
import CommunitySearch from "./pages/community/search/CommunitySearch";
import CommunitySearchPost from "./pages/community/search/post/CommunitySearchPost";
import CommunityFriend from "./components/communityFriend/CommunityFriend";
import CommunitySearchUser from "./pages/community/search/users/CommunitySearchUser";
import CreateTravelPlan from "./pages/createTravelPlan/CreateTravelPlan";
import InviteTravelMates from "./pages/inviteTravelMates/InviteTravelMates";
import Map from "./pages/map/Map";

import InviteTripmate from "./components/inviteTripmate/InviteTripmate";
import ManageTripmates from "./components/manageTripmates/ManageTripmates";
import SetBudget from "./components/setBudget/SetBudget";
import MyListings from "./pages/myListings/MyListings";

import EventRegistration from "./pages/registration/events/EventRegistration";
import GuideRegistration from "./pages/registration/guide/GuideRegistration";


const Layout = () => {
  return (
    <div style={{ height: '100vh' }}>
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
        {
          path: "/mylistings",
          element: <MyListings />,
        },
        {
          path: "/travelplan/invite",
          element: <InviteTravelMates />,
        },
        {
          path: "/eventregister",
          element: <EventRegistration />,
        },
        {
          path: "/guideregister",
          element: <GuideRegistration />,
        }
      ],
    },  

    {
      path: "/travelplan/:to/:from/:location/:lat/:lng",
      element: <TravelPlan />,
    },
    {
      path: "/map",
      element: <Map />,
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
            }
            ,{
              path:"popular",
              element:<Popular/>
            }
            ,{
            path:"all",
            element:<All/>
          }
          ],
       
        }
      ,
        {
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
        },
        {
          path:"friends",
          element:<CommunityFriends/>
        }
        ,
        {
          path:"requests",
          element:<CommunityRequest/>
        }
        ,
        {
          path: "search",
          element: <CommunitySearch />,
          children: [
            {
              path: "post/:query",
              element: <CommunitySearchPost />,
            },
            {
              path: "user/:query", // Assuming you might want a user search route
              element: <CommunitySearchUser  />, // Placeholder for user search component
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
