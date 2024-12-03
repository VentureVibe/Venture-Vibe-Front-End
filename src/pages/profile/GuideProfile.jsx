import React, { useState, useEffect, useRef } from "react";
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

// const GuideProfile = () => {
//   const [activeTab, setActiveTab] = useState("details");
//   const [guide, setGuide] = useState({
//     name: "",
//     experience: "",
//     price: null,
//     phone: "",
//     email: "",
//     location: "",
//     specialties: [],
//     languages: [],
//     experiences: [],
//     unavailableDates: [],
//     bookings: [],
//     radius: null,
//     sp_lat: null,
//     sp_lng: null,
//   });

//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const user = await GetUser();
//         setUser(user);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   useEffect(() => {
//     const fetchGuideDetails = async () => {
//       if (user.id) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/api/v1/serviceProvider/travel-guide/${user.id}`
//           );
//           const data = response.data;
//           setGuide({
//             name: data.name || "",
//             experience: data.experience || "",
//             price: data.price || null,
//             phone: data.contactNumber || "",
//             email: data.email || "",
//             location: `${data.sp_lat}, ${data.sp_lng}`,
//             specialties: data.specialties || [],
//             languages: data.languages || [],
//             experiences: data.experiences || [],
//             unavailableDates: data.unavailableDates || [],
//             bookings: data.bookings || [],
//             radius: data.radius || null,
//             sp_lat: data.sp_lat || null,
//             sp_lng: data.sp_lng || null,
//           });
//         } catch (error) {
//           console.error("Error fetching guide details:", error);
//         }
//       }
//     };

//     fetchGuideDetails();
//   }, [user]);

//   const handleUpdateGuide = (updatedGuide) => {
//     setGuide(updatedGuide);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "details":
//         return <EditDetails guide={guide} onUpdateGuide={handleUpdateGuide} />;
//       case "specialties":
//         return (
//           <CombinedSpecialties
//             guide={guide}
//             onUpdateGuide={handleUpdateGuide}
//             specialtiesOptions={specialtiesOptions}
//             languagesOptions={languagesOptions}
//           />
//         );
//       case "availability":
//         return (
//           <CalendarAndBookings
//             guide={guide}
//             onUpdateGuide={handleUpdateGuide}
//           />
//         );
//       default:
//         return <EditDetails guide={guide} onUpdateGuide={handleUpdateGuide} />;
//     }
//   };

//   return (
//     <div className="edit-guide-profile">
//       <div className="header">
//         <h1>Edit Profile: {guide.name}</h1>
//         <div className="tabs">
//           {["details", "specialties", "availability"].map((tab) => (
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

// // const MapContainer = ({ radius, lat, lng, travelGuide, setTravelGuide }) => {
// //   const mapRef = useRef(null);

// //   useEffect(() => {
// //     const initializeMap = () => {
// //       const map = new window.google.maps.Map(mapRef.current, {
// //         center: { lat: Number(lat), lng: Number(lng) },
// //         zoom: 10,
// //       });

// //       const circle = new window.google.maps.Circle({
// //         map: map,
// //         center: { lat: Number(lat), lng: Number(lng) },
// //         radius: Number(radius),
// //         fillColor: "#0075C3",
// //         fillOpacity: 0.35,
// //         strokeColor: "#0075C3",
// //         strokeOpacity: 0.8,
// //         strokeWeight: 2,
// //         draggable: true,
// //         editable: true,
// //       });

// //       const sendDataToBackend = async () => {
// //         try {
// //           const updatedRadius = circle.getRadius();
// //           const updatedCenter = circle.getCenter();
// //           const updatedTravelGuide = {
// //             ...travelGuide,
// //             radius: updatedRadius,
// //             sp_lat: updatedCenter.lat(),
// //             sp_lng: updatedCenter.lng(),
// //           };
// //           await axios.put(
// //             `http://localhost:8080/api/v1/serviceProvider/update-travel-guide/${travelGuide.id}`,
// //             updatedTravelGuide
// //           );
// //           setTravelGuide(updatedTravelGuide);
// //         } catch (error) {
// //           console.error("Error updating map data:", error);
// //         }
// //       };

// //       window.google.maps.event.addListener(
// //         circle,
// //         "radius_changed",
// //         sendDataToBackend
// //       );
// //       window.google.maps.event.addListener(
// //         circle,
// //         "center_changed",
// //         sendDataToBackend
// //       );
// //     };

// //     if (window.google && window.google.maps) {
// //       initializeMap();
// //     } else {
// //       console.error("Google Maps JavaScript API not loaded.");
// //     }
// //   }, [lat, lng, radius, travelGuide, setTravelGuide]);

// //   return (
// //     <div className="map-container">
// //       <h3>My Region</h3>
// //       <div ref={mapRef} className="map"></div>
// //     </div>
// //   );
// // };

// export default GuideProfile;

const GuideProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [guide, setGuide] = useState(null); // Initialize as null

  const [user, setUser] = useState({});

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
            name: data.name || "",
            experience: data.experience || "",
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
        } catch (error) {
          console.error("Error fetching guide details:", error);
        }
      }
    };

    fetchGuideDetails();
  }, [user]);

  const handleUpdateGuide = (updatedGuide) => {
    setGuide(updatedGuide);
  };

  const renderContent = () => {
    if (!guide) {
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
        <h1>Edit Profile: {guide ? guide.name : "Loading..."}</h1>
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
