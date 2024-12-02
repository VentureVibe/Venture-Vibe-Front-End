import React, { useState } from "react";
import "./subscribeDiv.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubscribeDiv = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/subscribers",
        { email }
      );
      alert(response.data.message || "Subscribed successfully!");
      setEmail(""); // Clear the input after submission
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  const loadEventRegister = () => {
    navigate("/eventregister");
  };

  const loadGuideRegister = () => {
    navigate("/guideregister");
  };

  return (
    <div className="div-4">
      <h1>
        SUBSCRIBE NEWSLETTER & GET
        <br /> THE LATEST NEWS
      </h1>
      <div className="input-btn">
        <input
          type="text"
          placeholder="Enter E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe Now</button>
      </div>
      <div className="btns">
        <button className="btn-tg" onClick={loadGuideRegister}>
          Become a Travel Guide
        </button>
        <button className="btn-ep" onClick={loadEventRegister}>
          Become a Event Planner
        </button>
      </div>
    </div>
  );
};

export default SubscribeDiv;
