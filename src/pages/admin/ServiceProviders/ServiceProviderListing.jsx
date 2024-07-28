import "./ServiceProviderListing.scss";
import React, { useState, useEffect } from "react";
import event1 from "../../../assets/event1.jpg";
import event2 from "../../../assets/event2.jpg";
import event3 from "../../../assets/event3.jpg";

const ServiceProviderListing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from the server (mock data used here for illustration)
    const fetchListings = async () => {
      const mockData = [
        {
          id: 1,
          img: event1,

          title: "Whales Watching Tour Transfer - Galle",
          description: "Whales Watching Tour Transfer - Galle",
          price: 200,
          status: "pending",
        },
        {
          id: 2,
          img: event2,
          title: "Whales Watching Tour Transfer - Galle",
          description: "River Safari, Sea Turtle & Stilt Fishermen",
          price: 300,
          status: "pending",
        },
        {
          id: 3,
          img: event3,
          title: "Safari Trip to Yala & Udawalawe",
          description: "Safari Trip to Yala & Udawalawe",
          price: 150,
          status: "approved",
        },
      ];
      setListings(mockData);
    };

    fetchListings();
  }, []);

  const handleStatusChange = (id, status) => {
    setListings(
      listings.map((listing) =>
        listing.id === id ? { ...listing, status } : listing
      )
    );
    // Update status on the server here
  };

  return (
    <div className="service-provider-listing-admin">
      <h1>Event Listings</h1>
      <div className="listing-container">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <img src={listing.img} alt={listing.title} />
            <div className="listing-details">
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <div className="admin-actions">
                <p>${listing.price}</p>
                <span className={`status ${listing.status}`}>
                  {listing.status}
                </span>
                {listing.status === "pending" && (
                  <>
                    <div className="buttonsofChoice">
                      <button
                        className="approve-btn"
                        onClick={() =>
                          handleStatusChange(listing.id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleStatusChange(listing.id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderListing;
