import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TravelGuideListing.scss";

const TravelGuideListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/serviceProvider/travel-guides"
        );
        const guidesWithDetails = await Promise.all(
          response.data.map(async (guide) => {
            try {
              const detailsResponse = await axios.get(
                `http://localhost:8080/api/v1/public/traveler/${guide.id}`
              );
              return {
                ...guide,
                imageSrc: detailsResponse.data.profileImg,
                name: detailsResponse.data.firstName,
                status: guide.status || "listed",
                price: detailsResponse.price,
                description: detailsResponse.guidesWithDetails,

                // Default status
              };
            } catch (err) {
              console.error(
                `Error fetching details for guide ID ${guide.id}`,
                err
              );
              return { ...guide, status: guide.status || "listed" }; // Default status
            }
          })
        );
        setListings(guidesWithDetails);
      } catch (err) {
        setError("Failed to fetch travel guide listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/serviceProvider/delete-travel-guide/${id}`
      );
      setListings(listings.filter((listing) => listing.id !== id)); // Remove deleted listing from UI
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="service-provider-listing-admin">
      <h1>Travel Guide Listings</h1>
      <div className="listing-container">
        {listings.map((listing) => (
          <div className="listing-item">
            <span className={`status-label ${listing.status}`}>
              {listing.status.toUpperCase()}
            </span>
            <img src={listing.imageSrc} alt={listing.name || "Travel Guide"} />
            <div className="listing-details">
              <h2>{listing.name || "Travel Guide"}</h2>
              <p>{listing.description || "No description available."}</p>
              <div className="admin-actions">
                <p>{listing.price || "Negotiable"}</p>
                <button
                  className="reject-btn"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuideListing;
