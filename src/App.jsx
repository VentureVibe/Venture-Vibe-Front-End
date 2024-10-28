import "./App.css";

import "./App.css";
import React from "react";
import Home from "./pages/home/Home";
import TravelPlan from "./pages/travelPlan/TravelPlan";

import Admin from "./pages/admin/Admin";
import Community from "./pages/community/Community";
import ServiceProviderUser from "./pages/serviceProvider/ServiceProviderUser";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Feeds from "./pages/community/Feeds/Feeds";
import Popular from "./pages/community/popular/Popular";
import All from "./pages/community/all/All";
import CommunityFeed from "./components/communityFeed/CommunityFeed";
import FriendProfile from "./pages/community/profile/FriendProfile";
import ProfileAll from "./pages/community/profile/profileAll/ProfileAll";
import ProfilePopular from "./pages/community/profile/profilePopular/ProfilePopular";
import CommunityFriends from "./pages/community/friends/CommunityFriends";
import CommunityRequest from "./pages/community/requests/CommunityRequest";
import CommunitySearch from "./pages/community/search/CommunitySearch";
import CommunitySearchPost from "./pages/community/search/post/CommunitySearchPost";
import CommunitySearchUser from "./pages/community/search/users/CommunitySearchUser";
import CreateTravelPlan from "./pages/createTravelPlan/CreateTravelPlan";
import InviteTravelMates from "./pages/inviteTravelMates/InviteTravelMates";
import Map from "./pages/map/Map";
import MyListings from "./pages/myListings/MyListings";
import EventRegistration from "./pages/registration/events/EventRegistration";
import GuideRegistration from "./pages/registration/guide/GuideRegistration";
import GuideProfile from "./pages/profile/GuideProfile";
import ShowEvent from "./pages/showEvent/ShowEvent";
import ShowAllEvents from "./pages/showAllEvents/ShowAllEvents";
import ShowAllTravelGuides from "./pages/showAllTravelGuides/ShowAllTravelGuides";

import { AlertProvider } from "./context/errAlert/AlertContext";
import NotAuthorized from "./components/notAuthorized/NotAuthorized";
import withRole from "./components/hoc/withRole";
import { AuthProvider } from "./context/authContext";
import MyPlanings from "./pages/myplanings/MyPlanings";
import MyPlaningsContent from "./pages/myplaningscontent/MyPlaningsContent";
import TravelInvitations from "./pages/travelInvitations/TravelInvitations";

import DashboardOverview from "./pages/admin/Overview/DashboardOverview";
import UserTable from "./components/admin/users/UserTable";
import ServiceProviderListing from "./pages/admin/ServiceProviders/ServiceProviderListing";
import EditProfile from "./pages/editProfile/EditProfile";

const Layout = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

function App() {
  const GuidePro = withRole(GuideProfile, ["TravelGuide"]);
  const TravelPlann = withRole(TravelPlan, ["TravelGuide", "Traveler","EventPlanner"]);
  const AdminA = withRole(Admin, ["Admin"]);
  const MyListingss = withRole(MyListings, ["EventPlanner"]);
  const Communityy = withRole(Community, [
    "EventPlanner",
    "TravelGuide",
    "Traveler",
    "Admin",
  ]);

  // const InviteTravelMatess = withRole(InviteTravelMates, ['travelGuide','User']);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use the Layout component for the root path
      children: [
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
          element: <MyListingss />,
        },
        {
          path: "/travelguides",
          element: <ShowAllTravelGuides />,
        },
        {
          path: "/events",
          element: <ShowAllEvents />,
        },
        {
          path: "/editprofile",
          element: <EditProfile />,
        },
        {
          path: "/event/:id",
          element: <ShowEvent />,
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
        },

        {
          path: "/guideprofile",

          element: <GuidePro />,
        },
        {
          path: "/myplannings",
          element: <MyPlanings />,
          children: [
            {
              path: "",
              element: <MyPlaningsContent />,
            },
            {
              path: "travelinvitations",
              element: <TravelInvitations />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin/*",
      element: <AdminA />,
      // children: [
      //   {
      //     path: "",
      //     element: <DashboardOverview />,
      //   },
      //   {
      //     path: "/admin/users",
      //     element: <UserTable />,
      //   },
      //   {
      //     path: "admin/service-providers",
      //     element: <ServiceProviderListing />,
      //   },
      // ],
    },

    {
      path: "/travelplan/:id",
      element: <TravelPlann />,
    },
    {
      path: "/map",
      element: <Map />,
    },

    {
      path: "/community",
      element: <Communityy />,
      children: [
        {
          path: "",
          element: <CommunityFeed />,
          children: [
            {
              path: "",
              element: <Feeds />,
            },
            {
              path: "popular",
              element: <Popular />,
            },
            {
              path: "all",
              element: <All />,
            },
          ],
        },
        {
          path: "profile",
          element: <FriendProfile />,
          children: [
            {
              path: ":id",
              element: <ProfileAll />,
            },
            {
              path: "popular/:id",
              element: <ProfilePopular />,
            },
          ],
        },
        {
          path: "following",
          element: <CommunityFriends />,
        },
        {
          path: "followers",
          element: <CommunityRequest />,
        },
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
              element: <CommunitySearchUser />, // Placeholder for user search component
            },
          ],
        },
      ],
    },
    {
      path: "serviceprovideruser",
      element: <ServiceProviderUser />,
    },
    {
      path: "/not-authorized",
      element: <NotAuthorized />,
    },
  ]);

  return (
    <AlertProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
