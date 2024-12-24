import React, { useState, useEffect } from "react";
import "./GuideProfile.scss";
import axios from "axios";
import EditDetails from "./EditDetails";
import CombinedSpecialties from "./CombinedSpecialties";
import CalendarAndBookings from "./CalendarAndBookings";
import { GetUser } from "../../services/user/GetUser";

const specialtiesOptions = [
  "Urban Tours",
  "Historical Sites",
  "Nature Walks",
  "Adventure Tours",
  "Cultural Experiences",
  "Food Tours",
  "Wildlife Safaris",
  "Photography Tours",
];

const languagesOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Japanese",
  "Russian",
  "Arabic",
];

const GuideProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [guide, setGuide] = useState(null); // Initialize as null
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await GetUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchGuideDetails = async () => {
      if (user.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/serviceProvider/travel-guide/${user.id}`
          );
          const data = response.data;
          setGuide({
            id: data.id,
            name: data.name || "",
            price: data.price || null,
            phone: data.contactNumber || "",
            email: data.email || "",
            location: `${data.sp_lat}, ${data.sp_lng}`,
            specialties: data.specialties || [],
            languages: data.languages || [],
            experiences: data.experiences || [],
            unavailableDates: data.unavailableDates || [],
            bookings: data.bookings || [],
            radius: data.radius || null,
            sp_lat: data.sp_lat || null,
            sp_lng: data.sp_lng || null,
          });
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching guide details:", error);
          setLoading(false); // Set loading to false even if there's an error
        }
      }
    };

    fetchGuideDetails();
  }, [user]);

  const handleUpdateGuide = (updatedGuide) => {
    setGuide(updatedGuide);
    setLoading(false); // Ensure loading is set to false after updating guide
  };

  const renderContent = () => {
    if (loading || !guide) {
      return <div>Loading...</div>; // Show loading state while guide data is being fetched
    }

    switch (activeTab) {
      case "details":
        return <EditDetails guide={guide} onUpdateGuide={handleUpdateGuide} />;
      case "specialties":
        return (
          <CombinedSpecialties
            guide={guide}
            onUpdateGuide={handleUpdateGuide}
            specialtiesOptions={specialtiesOptions}
            languagesOptions={languagesOptions}
          />
        );
      case "availability":
        return (
          <CalendarAndBookings
            guide={guide}
            onUpdateGuide={handleUpdateGuide}
          />
        );
      default:
        return <EditDetails guide={guide} onUpdateGuide={handleUpdateGuide} />;
    }
  };

  return (
    <div className="edit-guide-profile">
      <div className="header">
        <h1>Edit Profile</h1>
        {/* {guide ? guide.name : "Loading..."} */}
        <div className="tabs">
          {["details", "specialties", "availability"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default GuideProfile;
