import React, { useState } from "react";
import "./ShowAllEvents.scss";
import EventsTravelPlan from "../../components/eventsTravelPlan/EventsTravelPlan";
import MyEventListing from "../../components/myEventListing/MyEventListing";
import { eventListings } from "../../dummyData";
import EventCard from "../../components/eventCard/EventCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ShowAllEvents = () => {
  const [showEventDiv, setShowEventDiv] = useState(false);
  const jwtToken = localStorage.getItem("idToken");
  return (
    <>
      <div className="showAllEvents">
        <div className="container">
          <div className="heading-container">
            <span className="heading">Events and Activities</span>
            <div className="search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="listings">
            {eventListings.map((event, index) => (
              <EventCard
                key={index}
                img={event.imageSrc}
                title={event.title}
                price={event.price}
                location={event.location}
                id={event.id}
              />
            ))}
          </div>
        </div>
      </div>
      {jwtToken && (
        <div
          className="add-event"
          onMouseEnter={() => setShowEventDiv(true)}
          onMouseLeave={() => setShowEventDiv(false)}
        >
          <AddCircleIcon className="add-icon" />
          <div className={`event-div ${showEventDiv ? "show" : "hide"}`}>
            <p>Add New Event</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAllEvents;
