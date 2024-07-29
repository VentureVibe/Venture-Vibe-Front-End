// import React, { useState } from 'react';
// import './AddEventListing.scss';
// import CloseIcon from '@mui/icons-material/Close';

// function AddEventListing({ onClose}) {

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit form data
//     console.log('Form data submitted:', formData);
//     // Reset form or redirect user after submission
//   };

//   return (
//     <div className='add-event-listing-form'>
//       <div className="closing-i" onClick={onClose}>
//         <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
//       </div>
//     <form onSubmit={handleSubmit}>
//       <h2>Add Event Listing</h2>
//       {/* Assuming you have a way to handle image uploads, omitted here for brevity */}
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           //value={formData.title}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="location">Location:</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           //value={formData.location}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           //value={formData.description}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="price">Price:</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           //value={formData.price}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="contactNumber">Contact Number:</label>
//         <input
//           type="text"
//           id="contactNumber"
//           name="contactNumber"
//           //value={formData.contactNumber}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           //value={formData.email}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Add Event</button>
//     </form>
//     </div>
//   );
// }

// export default AddEventListing;

import React, { useState, useEffect, useRef } from "react";
import "./AddEventListing.scss";
import CloseIcon from "@mui/icons-material/Close";

function AddEventListing({ onClose }) {
  const [formData, setFormData] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    const google = window.google;
    if (!google) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    const input = document.getElementById("location");
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        map.setCenter(location);
        map.setZoom(15);

        setFormData((prevState) => ({
          ...prevState,
          location: place.formatted_address,
        }));

        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new google.maps.Marker({
          position: location,
          map: map,
        });
      }
    });

    autocompleteRef.current = autocomplete;

    // Add click event listener to the map
    map.addListener("click", (event) => {
      const clickedLocation = event.latLng;

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position: clickedLocation,
        map: map,
      });

      setCoordinates({
        lat: clickedLocation.lat(),
        lng: clickedLocation.lng(),
      });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results, status) => {
        if (status === "OK" && results[0]) {
          setFormData((prevState) => ({
            ...prevState,
            location: results[0].formatted_address,
          }));
          input.value = results[0].formatted_address;
        }
      });
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      coordinates,
    };
    console.log(
      "Form data submitted:",
      submittedData.title,
      submittedData.coordinates,
      submittedData.email
    );
    // Reset form or redirect user after submission
  };

  return (
    <div className="add-event-listing-form">
      <div className="head-add-event">
        <h2>Add Event Listing</h2>
        <i onClick={onClose}>
          <CloseIcon sx={{ color: "#747474", fontSize: 20 }} />
        </i>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="add-event-left">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Event</button>
        </div>
        <div className="add-event-right">
          <div className="enter-location">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
            />
          </div>
          <div ref={mapRef} className="map-container"></div>
        </div>
      </form>
    </div>
  );
}

export default AddEventListing;
