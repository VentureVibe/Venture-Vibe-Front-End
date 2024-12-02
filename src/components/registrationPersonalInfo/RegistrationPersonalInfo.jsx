// import React, { useState, useEffect } from "react";
// import "./RegistrationPersonalInfo.scss";

// const RegistrationPersonalInfo = ({ setUserDetails, onNext }) => {
//   const [dob, setDob] = useState({ day: "", month: "", year: "" });
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDob((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleNext = () => {
//     setUserDetails({
//       firstName,
//       lastName,
//       contactNumber,
//       email,
//       dob: `${dob.year}-${dob.month}-${dob.day}`,
//       location,
//     });
//     onNext();
//   };

//   useEffect(() => {
//     if (window.google) {
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 6.927079, lng: 79.861244 },
//         zoom: 8,
//       });
//       const marker = new window.google.maps.Marker({
//         position: map.getCenter(),
//         map,
//         draggable: true,
//       });
//       setLocation({
//         lat: map.getCenter().lat(),
//         lng: map.getCenter().lng(),
//       });
//       marker.addListener("dragend", (event) => {
//         setLocation({
//           lat: event.latLng.lat(),
//           lng: event.latLng.lng(),
//         });
//       });
//     }
//   }, []);

//   return (
//     <div className="registration-personal-info-container">
//       <div className="registration-personal-info">
//         {/* <h2>Personal Information</h2> */}
//         <div className="form-container">
//           <div className="form-fields">
//             <div className="form-group">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Date of Birth</label>
//               <div className="dob-inputs">
//                 <input
//                   type="text"
//                   name="day"
//                   value={dob.day}
//                   placeholder="DD"
//                   maxLength="2"
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="month"
//                   value={dob.month}
//                   placeholder="MM"
//                   maxLength="2"
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="year"
//                   value={dob.year}
//                   placeholder="YYYY"
//                   maxLength="4"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="contactNumber">Contact Number</label>
//               <input
//                 type="tel"
//                 id="contactNumber"
//                 value={contactNumber}
//                 onChange={(e) => setContactNumber(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="map-section">
//             <label>Select Your Location</label>
//             <div id="map" className="map-container"></div>
//           </div>
//         </div>
//         <button className="next-button" onClick={handleNext}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPersonalInfo;

import React, { useState, useEffect, useRef } from "react";
import "./RegistrationPersonalInfo.scss";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../services/user/GetUser";

const RegistrationPersonalInfo = ({ setUserDetails, onNext }) => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState({ lat: 7.2906, lng: 80.6337 }); // Default to Kandy
  const [radius, setRadius] = useState(1000); // default radius in meters
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem("idToken");
  const registrationRole = localStorage.getItem("registration_role");
  const searchInputRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const userData = await GetUser();
        setUser(userData);
      };
      fetchUser();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDob((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNext = () => {
    registrationRole === "TravelGuide"
      ? setUserDetails({
          firstName,
          lastName,
          contactNumber,
          email,
          dob: `${dob.year}-${dob.month}-${dob.day}`,
          location,
          radius,
        })
      : setUserDetails({
          firstName,
          lastName,
          contactNumber,
          email,
          dob: `${dob.year}-${dob.month}-${dob.day}`,
          location,
        });
    localStorage.removeItem("registration_role");
    onNext();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (window.google) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input: e.target.value,
          types: ["(cities)"],
          componentRestrictions: { country: "lk" },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const placesService = new window.google.maps.places.PlacesService(
      mapRef.current
    );
    placesService.getDetails(
      { placeId: suggestion.place_id },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const location = place.geometry.location;
          setLocation({ lat: location.lat(), lng: location.lng() });
          setSearch(suggestion.description);
          setSuggestions([]);
          updateMap(location.lat(), location.lng());
        }
      }
    );
  };

  const updateMap = (lat, lng) => {
    if (mapRef.current && markerRef.current) {
      const newCenter = new window.google.maps.LatLng(lat, lng);
      mapRef.current.setCenter(newCenter);
      markerRef.current.setPosition(newCenter);
      if (circleRef.current) {
        circleRef.current.setCenter(newCenter);
      }
    }
  };

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 7.2906, lng: 80.6337 }, // Default to Kandy
        zoom: 8,
      });
      mapRef.current = map;

      const marker = new window.google.maps.Marker({
        position: map.getCenter(),
        map,
        draggable: true,
      });
      markerRef.current = marker;

      if (registrationRole === "TravelGuide") {
        const circle = new window.google.maps.Circle({
          map,
          radius: radius, // default radius in meters
          fillColor: "#AA0000",
          editable: true, // Allow the user to change the radius
        });
        circle.bindTo("center", marker, "position");
        circleRef.current = circle;

        circle.addListener("radius_changed", () => {
          setRadius(circle.getRadius());
        });
      }

      setLocation({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
      });

      marker.addListener("dragend", (event) => {
        setLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    }
  }, [registrationRole]);

  return (
    <div className="registration-personal-info-container">
      <div className="registration-personal-info">
        <div className="form-container">
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <div className="dob-inputs">
                <input
                  type="text"
                  name="day"
                  value={dob.day}
                  placeholder="DD"
                  maxLength="2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="month"
                  value={dob.month}
                  placeholder="MM"
                  maxLength="2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="year"
                  value={dob.year}
                  placeholder="YYYY"
                  maxLength="4"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="search">Search Location</label>
              <input
                type="text"
                id="search"
                ref={searchInputRef}
                onChange={handleSearchChange}
              />
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="map-section">
            <label>Select Your Location</label>
            <div id="map" className="map-container"></div>
          </div>
        </div>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RegistrationPersonalInfo;
