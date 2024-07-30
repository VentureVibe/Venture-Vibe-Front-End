import React, { useState, useEffect } from "react";
import "./MyListings.scss";
import MyEventListing from "../../components/myEventListing/MyEventListing";
import AddEventListing from "../../components/addEventListing/AddEventListing";
import PopUpMain from "../../components/popupmain/PopUpMain";
import { getEvents } from "../../services/events/eventServices";

const MyListings = () => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleAddNewPopUp = () => {
    setShowAddNew(!showAddNew);
  };

  const fetchEvents = async (page) => {
    setLoading(true);
    try {
      const result = await getEvents(page);
      const { content, totalPages, number } = result;

      // Check if new content is being added to avoid duplication
      if (page === 0) {
        // Initial fetch, just set the events
        setEvents(content);
        //console.log(content);
      } else {
        // Subsequent fetches, append new events
        setEvents((prevEvents) => [...prevEvents, ...content]);
      }

      // Determine if there are more pages to load
      setHasMore(number < totalPages);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const loadMoreEvents = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="myListings">
      <div className="container">
        <div className="heading-container">
          <span className="heading">My Listings</span>
          <div className="new-listing" onClick={toggleAddNewPopUp}>
            <span>Add New</span>
          </div>
        </div>
        <div className="listings">
          {events.map((event) => (
            <MyEventListing
              key={event.eventId}
              img={event.eventImage}
              title={event.eventTitle}
              price={event.eventPrice}
              keyProp={event.eventId}
            />
          ))}
        </div>
        {hasMore && (
          <button
            className="load-more"
            onClick={loadMoreEvents}
            disabled={loading}
          >
            {loading ? "Loading..." : "See More"}
          </button>
        )}
        {showAddNew && (
          <PopUpMain
            Component={<AddEventListing onClose={toggleAddNewPopUp} />}
          />
        )}
      </div>
    </div>
  );
};

export default MyListings;
