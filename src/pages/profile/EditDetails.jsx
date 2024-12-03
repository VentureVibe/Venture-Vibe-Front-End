import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditDetails.scss";

const EditDetails = ({ guide, onUpdateGuide }) => {
  const [details, setDetails] = useState(guide);
  const mapRef = useRef(null);
  const [circleRadius, setCircleRadius] = useState(Number(guide.radius));
  const [center, setCenter] = useState({
    lat: Number(guide.sp_lat),
    lng: Number(guide.sp_lng),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDetails = { id: guide.id, ...details };
    try {
      await axios.put(
        "http://localhost:8080/api/v1/serviceProvider/update-travel-guide",
        updatedDetails
      );
      onUpdateGuide(updatedDetails);
    } catch (error) {
      console.error("Error updating guide details:", error);
    }
  };

  const sendDataToBackend = async (updatedRadius, updatedCenter) => {
    try {
      const updatedDetails = {
        ...details,
        radius: updatedRadius,
        sp_lat: updatedCenter.lat(),
        sp_lng: updatedCenter.lng(),
      };
      await axios.put(
        "http://localhost:8080/api/v1/serviceProvider/update-travel-guide",
        updatedDetails
      );
      setDetails(updatedDetails);
      onUpdateGuide(updatedDetails);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  useEffect(() => {
    const latitude = Number(guide.sp_lat);
    const longitude = Number(guide.sp_lng);

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 10,
    });

    const circle = new window.google.maps.Circle({
      map: map,
      center: { lat: latitude, lng: longitude },
      radius: guide.radius,
      fillColor: "#0075C3",
      fillOpacity: 0.35,
      strokeColor: "#0075C3",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      draggable: true,
      editable: true,
    });

    window.google.maps.event.addListener(circle, "radius_changed", () => {
      const newRadius = Number(circle.getRadius());
      setCircleRadius(newRadius);
      sendDataToBackend(newRadius, circle.getCenter());
    });

    window.google.maps.event.addListener(circle, "center_changed", () => {
      const newCenter = circle.getCenter();
      setCenter(newCenter);
      sendDataToBackend(circle.getRadius(), newCenter);
    });

    return () => {
      window.google.maps.event.clearListeners(circle, "radius_changed");
      window.google.maps.event.clearListeners(circle, "center_changed");
    };
  }, [guide]);

  return (
    <form className="edit-details card" onSubmit={handleSubmit}>
      <div className="details-container">
        <div className="details-section">
          <h3>Edit Details</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={details.experience}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label>Price per day</label>
            <input
              type="number"
              name="price"
              value={details.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="contactNumber"
              value={details.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="map-section">
          <h3>My Region</h3>
          <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditDetails;
