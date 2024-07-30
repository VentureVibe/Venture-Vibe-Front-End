import React, { useEffect, useState } from 'react';
import './MyplanningsOwnedPlans.scss';
import MyplanningsOwnedPlansCont from '../myplanningsOwnedPlansCont/MyplanningsOwnedPlansCont';
import { getOwnedTravelPlansByUser } from '../../services/travelplan/TravelPlan';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';

const MyplanningsOwnedPlans = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [travelPlans, setTravelPlans] = useState({});

  const fetchTravelPlans = async (page = 0, size =2) => {
    const travelerId = GetCurrentUserC().sub;
    try {
      const { data } = await getOwnedTravelPlansByUser(travelerId, page, size);
      setTravelPlans(data);
      setCurrentPage(page);
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