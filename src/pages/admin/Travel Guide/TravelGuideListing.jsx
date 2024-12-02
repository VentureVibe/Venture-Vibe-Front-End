import axios from "axios";
import React, { useEffect, useState } from "react";

const TravelGuideListing = () => {
  const [listings, setListings] = useState([]);

  // Fetch listings from the backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/serviceProvider/travel-guides"
        );
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      // Update the listing status on the backend
      await axios.put(
        `http://localhost:8080/api/v1/serviceProvider/update-travel-guide`,
        {
          id,
          status,
        }
      );
      consol.log("Fetched Listings:", response.data);

      // Update the state to reflect the new status
      setListings(
        listings.map((listing) =>
          listing.id === id ? { ...listing, status } : listing
        )
      );
    } catch (error) {
      console.error("Error updating listing status:", error);
    }
  };

  return (
    <div className="service-provider-listing-admin">
      <h1>Travel Guide Listings</h1>
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

export default TravelGuideListing;
