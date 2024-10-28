import React from "react";
import "./subscribeDiv.scss";
import { useNavigate } from "react-router-dom";

const SubscribeDiv = () => {
  const navigate = useNavigate();

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
        <input type="text" placeholder="Enter E-mail address" />
        <button>Subscribe Now</button>
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
