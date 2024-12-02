import React, { useState } from "react";
import Details from "./Details";
import Booking from "./Booking";
import Reviews from "./Reviews";
import "./TravelGuide.scss";

const TravelGuideProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [guide, setGuide] = useState({
    name: "Sarah Anderson",
    experience: "8 years",
    price: 150,
    phone: "+1 (555) 123-4567",
    email: "sarah.anderson@guides.com",
    location: "San Francisco, CA",
    specialties: ["Urban Tours", "Historical Sites", "Food Tours"],
    languages: ["English", "Spanish", "French"],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-10-01",
        comment: "Amazing experience! Sarah knows the city inside out.",
        tourDuration: "3 days",
      },
      {
        id: 2,
        user: "Maria R.",
        rating: 4,
        date: "2024-09-28",
        comment: "Very knowledgeable guide, showed us hidden gems.",
        tourDuration: "2 days",
      },
    ],
    unavailableDates: [
      new Date(2024, 9, 18),
      new Date(2024, 9, 19),
      new Date(2024, 9, 25),
    ],
  });

  const handleAddReview = (newReview) => {
    const updatedGuide = {
      ...guide,
      reviews: [...guide.reviews, newReview],
      rating: calculateNewRating([...guide.reviews, newReview]),
    };
    setGuide(updatedGuide);
  };

  const calculateNewRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <Details guide={guide} />;
      case "booking":
        return <Booking guide={guide} />;
      case "reviews":
        return <Reviews guide={guide} onAddReview={handleAddReview} />;
      default:
        return <Details guide={guide} />;
    }
  };

  return (
    <div className="travel-guide-profile">
      <div className="header">
        <h1>{guide.name}</h1>
        <div className="tabs">
          {["details", "booking", "reviews"].map((tab) => (
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

export default TravelGuideProfile;
