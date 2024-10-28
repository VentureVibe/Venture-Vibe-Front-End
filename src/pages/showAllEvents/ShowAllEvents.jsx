import React, { useState, useEffect, useCallback } from "react";
import "./ShowAllEvents.scss";
import EventCard from "../../components/eventCard/EventCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getEvents } from "../../services/events/eventServices";

const ShowAllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [showEventDiv, setShowEventDiv] = useState(false);
  const jwtToken = localStorage.getItem("idToken");

  // Function to fetch events with pagination
  const fetchEvents = useCallback(async (page) => {
    setLoading(true);
    try {
      const result = await getEvents();
      const { content, totalPages, number } = result;

      setEvents((prevEvents) => {
        if (page === 0) {
          return content;
        } else {
          return [...prevEvents, ...content];
        }
      });

      setHasMore(number < totalPages);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and pagination handling
  useEffect(() => {
    fetchEvents(page);
  }, [page, fetchEvents]);

  // Handle scrolling or any other mechanism to trigger page change
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <div className="showAllEvents">
        <div className="container">
          <div className="heading-container">
            <span className="heading">Events and Activities</span>
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="listings">
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  img={event.eventImage} // Adjust according to the actual property name
                  title={event.eventTitle} // Adjust according to the actual property name
                  price={event.eventPrice} // Adjust according to the actual property name
                  location={`${event.eventLat}, ${event.eventLon}`} // Adjust according to the actual property name
                  id={event.eventId} // Adjust according to the actual property name
                />
              ))
            )}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </div>
      {/* {jwtToken && (
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
      )} */}
    </>
  );
};

export default ShowAllEvents;
