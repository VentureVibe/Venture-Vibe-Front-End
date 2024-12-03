import "./ServiceProviderListing.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProviderListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/serviceProvider/event-planner"
        );
        console.log(response);
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
        setError("Failed to fetch event planner listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/serviceProvider/delete-event-planner/${id}`
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
      <h1>Event Planner Listings</h1>
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
              <p>{listing.contactNumber || "No description available."}</p>
              <div className="admin-actions">
                <p>{listing.price || "Negotiable"}</p>
                <button
                  className="reject-btn"
                  onClick={() => handleDeleteListing(listing.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderListing;

// const ServiceProviderListing = () => {
//   const [listings, setListings] = useState([]);

//   // Fetch listings from the backend
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/serviceProvider/event-planner"
//         );
//         const guidesWithDetails = await Promise.all(
//           response.data.map(async (guide) => {
//             try {
//               const detailsResponse = await axios.get(
//                 `http://localhost:8080/api/v1/public/traveler/${guide.id}`
//               );
//               return {
//                 ...guide,
//                 imageSrc: detailsResponse.data.profileImg,
//                 name: detailsResponse.data.firstName,
//               }; // Combine guide with extra details
//             } catch (err) {
//               console.error(
//                 `Error fetching details for guide ID ${guide.id}`,
//                 err
//               );
//               return guide; // Fallback to guide without additional details
//             }
//           })
//         );
//         setListings(guidesWithDetails);
//       } catch (error) {
//         console.error("Error fetching listings:", error);
//       }
//     };

//     fetchListings();
//   }, []); // Empty dependency array ensures this effect runs only once

//   const handleStatusChange = async (id, status) => {
//     try {
//       // Update the listing status on the backend
//       await axios.put(
//         `http://localhost:8080/api/v1/serviceProvider/update-event-planner`,
//         {
//           id,
//           status,
//         }
//       );

//       // Update the state to reflect the new status
//       setListings(
//         listings.map((listing) =>
//           listing.id === id ? { ...listing, status } : listing
//         )
//       );
//     } catch (error) {
//       console.error("Error updating listing status:", error);
//     }
//   };

//   return (
//     <div className="service-provider-listing-admin">
//       <h1>Event Listings</h1>
//       <div className="listing-container">
//         {listings.map((listing) => (
//           <div className="listing-item">
//             <img src={listing.imageSrc} alt={listing.title} />
//             <div className="listing-details">
//               <h2>{listing.title}</h2>
//               <p>{listing.description}</p>
//               <div className="admin-actions">
//                 <p>${listing.price}</p>
//                 <span className={`status ${listing.status}`}>
//                   {listing.status}
//                 </span>
//                 {listing.status === "pending" && (
//                   <>
//                     <div className="buttonsofChoice">
//                       <button
//                         className="approve-btn"
//                         onClick={() =>
//                           handleStatusChange(listing.id, "approved")
//                         }
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject-btn"
//                         onClick={() =>
//                           handleStatusChange(listing.id, "rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServiceProviderListing;
