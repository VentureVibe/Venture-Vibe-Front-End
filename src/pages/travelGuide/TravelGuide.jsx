// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Details from "./Details";
// import Booking from "./Booking";
// import Reviews from "./Reviews";
// import "./TravelGuide.scss";
// import axios from "axios";

// const TravelGuideProfile = () => {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState("details");
//   const [guide, setGuide] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchGuideDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/v1/serviceProvider/travel-guide/${id}`
//         );
//         const userResponse = await fetch(
//           `http://localhost:8080/api/v1/public/traveler/${id}`
//         );
//         const userData = await userResponse.json();
//         console.log("Fetched user data:", userData);
//         setUser(userData);
//         const data = await response.json();
//         console.log(data);
//         const totalExperience = data.experiences.reduce(
//           (acc, exp) => acc + exp.yearsOfExperience,
//           0
//         );

//         // Fetch reviews
//         const reviewsResponse = await axios.get(
//           `http://localhost:8080/api/v1/review/receiver/${id}`
//         );
//         const reviewsData = reviewsResponse.data;

//         // Calculate average rating
//         const totalRating = reviewsData.reduce(
//           (acc, review) => acc + review.rating,
//           0
//         );
//         const averageRating =
//           reviewsData.length > 0 ? totalRating / reviewsData.length : 0;

//         setGuide({
//           id: id,
//           name: `${userData.firstName} ${userData.lastName}`, // Corrected data
//           experience: `${totalExperience} years`, // Calculated experience
//           price: data.price,
//           phone: data.contactNumber,
//           email: data.email,
//           location: "Sri Lanka", // Demo data
//           specialties: data.specialties,
//           languages: data.languages,
//           rating: averageRating, // Calculated average rating
//           reviews: reviewsData, // Fetched reviews
//           // unavailableDates: [
//           //   new Date(2024, 9, 18),
//           //   new Date(2024, 9, 19),
//           //   new Date(2024, 9, 25),
//           // ],
//         });
//       } catch (error) {
//         console.error("Error fetching guide details:", error);
//       }
//     };

//     fetchGuideDetails();
//   }, [id]);

//   const handleAddReview = (newReview) => {
//     const updatedGuide = {
//       ...guide,
//       reviews: [...guide.reviews, newReview],
//       rating: calculateNewRating([...guide.reviews, newReview]),
//     };
//     setGuide(updatedGuide);
//   };

//   const calculateNewRating = (reviews) => {
//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     return (totalRating / reviews.length).toFixed(1);
//   };

//   const renderContent = () => {
//     if (!guide) return <p>Loading...</p>;

//     switch (activeTab) {
//       case "details":
//         return <Details guide={guide} />;
//       case "booking":
//         return <Booking guide={guide} />;
//       case "reviews":
//         return <Reviews guide={guide} onAddReview={handleAddReview} />;
//       default:
//         return <Details guide={guide} />;
//     }
//   };

//   return (
//     <div className="travel-guide-profile">
//       <div className="header">
//         <div className="header-content">
//           <h1>{guide ? guide.name : "Loading..."}</h1>
//           {user && (
//             <a href={`http://localhost:5173/community/profile/${guide.id}`}>
//               <img
//                 src={user.profileImg}
//                 alt={guide ? guide.name : "Guide"}
//                 className="guide-image"
//               />
//             </a>
//           )}
//         </div>
//         <div className="tabs">
//           {["details", "booking", "reviews"].map((tab) => (
//             <button
//               key={tab}
//               className={`tab ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="content">{renderContent()}</div>
//     </div>
//   );
// };

// export default TravelGuideProfile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import Booking from "./Booking";
import Reviews from "./Reviews";
import "./TravelGuide.scss";
import axios from "axios";

const TravelGuideProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [guide, setGuide] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/serviceProvider/travel-guide/${id}`
        );
        const userResponse = await fetch(
          `http://localhost:8080/api/v1/public/traveler/${id}`
        );
        const userData = await userResponse.json();
        console.log("Fetched user data:", userData);
        setUser(userData);
        const data = await response.json();
        console.log(data);
        const totalExperience = data.experiences.reduce(
          (acc, exp) => acc + exp.yearsOfExperience,
          0
        );
        // Fetch reviews
        const reviewsResponse = await axios.get(
          `http://localhost:8080/api/v1/review/receiver/${id}`
        );
        const reviewsData = reviewsResponse.data;

        // Calculate average rating
        const totalRating = reviewsData.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const averageRating =
          reviewsData.length > 0 ? totalRating / reviewsData.length : 0;

        setGuide({
          id: id,
          name: `${userData.firstName} ${userData.lastName}`, // Corrected data
          experience: `${totalExperience} years`, // Calculated experience
          price: data.price,
          phone: data.contactNumber,
          email: data.email,
          location: "Sri Lanka", // Demo data
          specialties: data.specialties,
          languages: data.languages,
          rating: averageRating, // Calculated average rating
          reviews: reviewsData, // Fetched reviews
          image: data.image, // Assuming the image URL is in the data
          // unavailableDates: [
          //   new Date(2024, 9, 18),
          //   new Date(2024, 9, 19),
          //   new Date(2024, 9, 25),
          // ],
        });
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };

    fetchGuideDetails();
  }, [id]);

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
    if (!guide) return <p>Loading...</p>;

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
        <div className="header-content">
          <h1>{guide ? guide.name : "Loading..."}</h1>
          {user && (
            <a
              href={`http://localhost:5173/community/profile/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={user.profileImg}
                alt={guide ? guide.name : "Guide"}
                className="guide-image"
              />
            </a>
          )}
        </div>
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
