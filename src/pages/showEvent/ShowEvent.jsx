import React from "react";
import "./ShowEvent.scss";
import { event } from "../../dummyData";

const ShowEvent = () => {
  return (
    <div className="showEvent">
      <div className="wrapper">
        <div className="imgContainer">
          <div className="img-event">
            <img src={event.img} />
          </div>
        </div>
        <div className="infoContainer">
          <h1>{event.title}</h1>
          <span className="location">Location : {event.location}</span>
          <span className="des">{event.des}</span>
          <span className="price">
            <b>${event.price}</b>
          </span>
          <hr />
          <span className="detail">{event.sellerName}</span>
          <span className="detail">{event.contactNumber}</span>
          <span className="detail">{event.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
