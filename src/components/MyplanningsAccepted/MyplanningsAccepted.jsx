import React, { useEffect, useState } from 'react';
import './MyplanningsAccepted.scss';
import MyplanningsAcceptedCont from '../../components/MyplanningsAcceptedCont/MyplanningsAcceptedCont';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import { getAcceptedTravelPlansByUser } from '../../services/travelplan/TravelPlan';

const MyplanningsAccepted = ({setLocations}) => {
  const [currentPage1, setCurrentPage1] = useState(0);
  const [travelPlans2, setTravelPlans2] = useState({});

  const fetchTravelPlans2 = async (page = 0, size = 2) => {
    const travelerId = GetCurrentUserC().sub;
    try {
      const { data } = await getAcceptedTravelPlansByUser(travelerId, page, size);
      setTravelPlans2(data);
      setCurrentPage1(page);
      const locations = data?.content?.map(plan => ({
        id: plan.id,          // Unique identifier for the location
        lat: plan.lat,        // Latitude from the travel plan
        lng: plan.longi,      // Longitude from the travel plan
        location: plan.location, // Additional location name or details if needed
      }));
      setLocations(locations || []);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    }
  };

  useEffect(() => {
    fetchTravelPlans2(currentPage1);
  }, [currentPage1]);

  return (
    <div className='MyplanningsAccepted'>
      <div className="MyplanningsAccepted-Top">
        {travelPlans2?.content?.length === 0 && <div>No Travel Plans</div>}
        {travelPlans2?.content?.length > 0 && travelPlans2.content.map((plan) => (
          <MyplanningsAcceptedCont key={plan.id} plan={plan} fetchTravelPlans={fetchTravelPlans2} />
        ))}
      </div>
      <div className="MyplanningsAccepted-Bottom">
        <button onClick={() => fetchTravelPlans2(currentPage1 - 1)} disabled={currentPage1 === 0}>&laquo;</button>
        {travelPlans2 &&
          [...Array(travelPlans2.totalPages).keys()].map((page) => (
            <button
              onClick={() => fetchTravelPlans2(page)}
              className={currentPage1 === page ? 'active' : ''}
              key={page}
            >
              {page + 1}
            </button>
          ))
        }
        <button onClick={() => fetchTravelPlans2(currentPage1 + 1)} disabled={currentPage1 === travelPlans2.totalPages - 1}>&raquo;</button>
      </div>
    </div>
  );
};

export default MyplanningsAccepted;
