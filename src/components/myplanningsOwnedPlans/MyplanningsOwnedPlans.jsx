import React, { useEffect, useState } from 'react';
import './MyplanningsOwnedPlans.scss';
import MyplanningsOwnedPlansCont from '../myplanningsOwnedPlansCont/MyplanningsOwnedPlansCont';
import { getOwnedTravelPlansByUser } from '../../services/travelplan/TravelPlan';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';

const MyplanningsOwnedPlans = ({setLocations}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [travelPlans, setTravelPlans] = useState({});

  const fetchTravelPlans = async (page = 0, size = 2) => {
    const travelerId = GetCurrentUserC().sub;
    try {
      const { data } = await getOwnedTravelPlansByUser(travelerId, page, size);
      setTravelPlans(data);
      setCurrentPage(page);

      // Extract locations from travel plans and update `setLocations`
      const locations = data?.content?.map(plan => ({
        id: plan.id,          // Unique identifier for the location
        lat: plan.lat,        // Latitude from the travel plan
        lng: plan.longi,      // Longitude from the travel plan
        location: plan.location, // Additional location name or details if needed
      }));
      setLocations(locations || []); // Update locations state in the parent
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    }
  };

  useEffect(() => {
    fetchTravelPlans(currentPage);
  }, [currentPage]);

  return (
    <div className='MyplanningsOwnedPlans'>
      <div className="MyplanningsOwnedPlans-Top">
        {travelPlans?.content?.length === 0 && <div>No Travel Plans</div>}
        {travelPlans?.content?.length > 0 && travelPlans.content.map((plan) => (
          <MyplanningsOwnedPlansCont key={plan.id} plan={plan} fetchTravelPlans={fetchTravelPlans} />
        ))}
      </div>
      <div className="MyplanningsOwnedPlans-Bottom">
        <button onClick={() => fetchTravelPlans(currentPage - 1)} disabled={currentPage === 0}>&laquo;</button>
        {travelPlans &&
          [...Array(travelPlans.totalPages).keys()].map((page) => (
            <button
              onClick={() => fetchTravelPlans(page)}
              className={currentPage === page ? 'active' : ''}
              key={page}
            >
              {page + 1}
            </button>
          ))
        }
        <button onClick={() => fetchTravelPlans(currentPage + 1)} disabled={currentPage === travelPlans.totalPages - 1}>&raquo;</button>
      </div>
    </div>
  );
};

export default MyplanningsOwnedPlans;