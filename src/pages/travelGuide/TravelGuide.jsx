// import React, { useState } from "react";
// import "./TravelGuide.scss";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import EventIcon from "@mui/icons-material/Event";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";

// const TravelGuideProfile = () => {
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [activeTab, setActiveTab] = useState("details");

//   // Sample guide data
//   const guide = {
//     name: "Sarah Anderson",
//     experience: "8 years",
//     price: 150,
//     phone: "+1 (555) 123-4567",
//     email: "sarah.anderson@guides.com",
//     location: "San Francisco, CA",
//     specialties: ["Urban Tours", "Historical Sites", "Food Tours"],
//     languages: ["English", "Spanish", "French"],
//     rating: 4.8,
//     reviews: [
//       {
//         id: 1,
//         user: "John D.",
//         rating: 5,
//         date: "2024-10-01",
//         comment: "Amazing experience! Sarah knows the city inside out.",
//         tourDuration: "3 days",
//       },
//       {
//         id: 2,
//         user: "Maria R.",
//         rating: 4,
//         date: "2024-09-28",
//         comment: "Very knowledgeable guide, showed us hidden gems.",
//         tourDuration: "2 days",
//       },
//       {
//         id: 3,
//         user: "Maria R.",
//         rating: 4,
//         date: "2024-09-28",
//         comment: "Very knowledgeable guide, showed us hidden gems.",
//         tourDuration: "2 days",
//       },
//       {
//         id: 4,
//         user: "Maria R.",
//         rating: 4,
//         date: "2024-09-28",
//         comment: "Very knowledgeable guide, showed us hidden gems.",
//         tourDuration: "2 days",
//       },
//       {
//         id: 5,
//         user: "Maria R.",
//         rating: 4,
//         date: "2024-09-28",
//         comment: "Very knowledgeable guide, showed us hidden gems.",
//         tourDuration: "2 days",
//       },
//     ],
//     unavailableDates: [
//       new Date(2024, 9, 18),
//       new Date(2024, 9, 19),
//       new Date(2024, 9, 25),
//     ],
//   };

//   // Get current month and year
//   const getCurrentMonthYear = () => {
//     const date = new Date();
//     return {
//       month: date.toLocaleString("default", { month: "long" }),
//       year: date.getFullYear(),
//     };
//   };

//   const { month, year } = getCurrentMonthYear();

//   // Helper functions
//   const isDateUnavailable = (date) => {
//     return guide.unavailableDates.some(
//       (unavailableDate) =>
//         date.getDate() === unavailableDate.getDate() &&
//         date.getMonth() === unavailableDate.getMonth() &&
//         date.getYear() === unavailableDate.getYear()
//     );
//   };

//   const calculateTotalPrice = () => {
//     return selectedDates.length * guide.price;
//   };

//   const generateCalendar = () => {
//     const today = new Date();
//     const month = today.getMonth();
//     const year = today.getFullYear();
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const days = [];
//     for (let i = 0; i < firstDay; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       const isSelected = selectedDates.some(
//         (selectedDate) =>
//           selectedDate.getDate() === date.getDate() &&
//           selectedDate.getMonth() === date.getMonth()
//       );
//       const unavailable = isDateUnavailable(date);

//       days.push(
//         <button
//           key={day}
//           className={`calendar-day ${isSelected ? "selected" : ""} ${
//             unavailable ? "unavailable" : ""
//           }`}
//           onClick={() => {
//             if (!unavailable) {
//               if (isSelected) {
//                 setSelectedDates(
//                   selectedDates.filter((d) => d.getDate() !== date.getDate())
//                 );
//               } else {
//                 setSelectedDates([...selectedDates, date]);
//               }
//             }
//           }}
//           disabled={unavailable}
//         >
//           {day}
//         </button>
//       );
//     }

//     return days;
//   };

//   return (
//     <div className="travel-guide-profile">
//       <div className="header">
//         <h1>{guide.name}</h1>
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

//       <div className="content">
//         {activeTab === "details" && (
//           <div className="details-grid">
//             <div className="main-info card">
//               <div className="location">
//                 <LocationOnIcon />
//                 <span>{guide.location}</span>
//               </div>

//               <div className="stats">
//                 <div className="stat">
//                   <AccessTimeIcon />
//                   <div>
//                     <p className="label">Experience</p>
//                     <p className="value">{guide.experience}</p>
//                   </div>
//                 </div>
//                 <div className="stat">
//                   <EmojiEventsIcon />
//                   <div>
//                     <p className="label">Rating</p>
//                     <p className="value">
//                       {guide.rating} ({guide.reviews.length} reviews)
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="specialties">
//                 <h3>Specialties</h3>
//                 <div className="tags">
//                   {guide.specialties.map((specialty) => (
//                     <span key={specialty} className="tag">
//                       {specialty}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="languages">
//                 <h3>Languages</h3>
//                 <div className="tags">
//                   {guide.languages.map((language) => (
//                     <span key={language} className="tag">
//                       {language}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="contact-info card">
//               <div className="price">
//                 <p className="amount">${guide.price}</p>
//                 <p className="period">per day</p>
//               </div>

//               <div className="contacts">
//                 <div className="contact">
//                   <PhoneIcon />
//                   <span>{guide.phone}</span>
//                 </div>
//                 <div className="contact">
//                   <EmailIcon />
//                   <span>{guide.email}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "booking" && (
//           <div className="booking-grid">
//             <div className="calendar-section card">
//               <h2>Select Tour Dates</h2>
//               <div className="calendar">
//                 <div className="calendar-header">
//                   <h3 className="month-year">
//                     {month} {year}
//                   </h3>
//                   <div className="weekdays">
//                     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                       (day) => (
//                         <div key={day} className="weekday">
//                           {day}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//                 <div className="calendar-body">{generateCalendar()}</div>
//               </div>
//             </div>

//             <div className="booking-summary card">
//               <h2>Booking Summary</h2>
//               {selectedDates.length > 0 ? (
//                 <div className="summary">
//                   <div className="selected-dates">
//                     <h3>Selected Dates:</h3>
//                     <div
//                       className="dates"
//                       style={{
//                         maxHeight: "200px",
//                         overflowY: "auto",
//                         width: "100%",
//                       }}
//                     >
//                       {selectedDates.map((date) => (
//                         <div key={date.toISOString()} className="date">
//                           <EventIcon />
//                           <span>{date.toLocaleDateString()}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="total">
//                     <div className="days">
//                       <span>Days selected:</span>
//                       <span>{selectedDates.length}</span>
//                     </div>
//                     <div className="price">
//                       <span>Total Price:</span>
//                       <span>${calculateTotalPrice()}</span>
//                     </div>
//                     <button className="book-button">Confirm Booking</button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="empty-message">
//                   Please select dates to book your tour
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "reviews" && (
//           <div className="reviews card">
//             <div className="reviews-header">
//               <h2>Reviews</h2>
//               <button className="write-review">Write Review</button>
//             </div>
//             <div className="reviews-list">
//               {guide.reviews.map((review) => (
//                 <div key={review.id} className="review">
//                   <div className="review-header">
//                     <div>
//                       <h3>{review.user}</h3>
//                       <div className="rating">
//                         <div className="stars">
//                           {[...Array(5)].map((_, i) =>
//                             i < review.rating ? (
//                               <StarIcon key={i} className="star filled" />
//                             ) : (
//                               <StarBorderIcon key={i} className="star" />
//                             )
//                           )}
//                         </div>
//                         <span className="duration">{review.tourDuration}</span>
//                       </div>
//                     </div>
//                     <span className="date">{review.date}</span>
//                   </div>
//                   <p className="comment">{review.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TravelGuideProfile;

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
