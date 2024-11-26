import React, { useEffect, useState } from "react";
import "./ShowAllTravelGuides.scss";
import GuideCard from "../../components/guideCard/GuideCard";
import axios from "axios"; // If you are using axios for API calls
import { getTravelGuides } from "../../services/serviceProvider/ServiceProvider";

const ShowAllTravelGuides = () => {
  const [guides, setGuides] = useState([]); // State for storing travel guides
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch travel guides
  const fetchTravelGuides = async () => {
    try {
      const guideData = await getTravelGuides();

      // For each guide, fetch additional details
      const guidesWithDetails = await Promise.all(
        guideData.map(async (guide) => {
          try {
            const detailsResponse = await axios.get(
              `http://localhost:8080/api/v1/public/traveler/${guide.id}`
            );
            return {
              ...guide,
              imageSrc: detailsResponse.data.profileImg,
              name: detailsResponse.data.firstName,
            }; // Combine guide with extra details
          } catch (err) {
            console.error(
              `Error fetching details for guide ID ${guide.id}`,
              err
            );
            return guide; // Fallback to guide without additional details
          }
        })
      );

      setGuides(guidesWithDetails); // Update state with full data
      //console.log(guides);
      setIsLoading(false); // Turn off loading state
    } catch (err) {
      console.error("Error fetching travel guides", err);
      setError("Failed to fetch travel guides.");
      setIsLoading(false);
    }
  };

  // useEffect to call the fetch function when the component loads
  useEffect(() => {
    fetchTravelGuides();
  }, []);

  // Render loading or error messages
  if (isLoading) return <div>Loading travel guides...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="showAllTravelGuides">
      <div className="container">
        <div className="heading-container">
          <span className="heading">Travel Guides</span>
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="listings">
          {guides.map((guide, index) => (
            <GuideCard
              key={index}
              img={guide.imageSrc}
              name={guide.name}
              price={guide.radius}
              location={guide.sp_lat}
              contactNumber={guide.contactNumber}
              id={guide.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAllTravelGuides;
