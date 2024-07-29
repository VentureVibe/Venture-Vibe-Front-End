import React, { useEffect, useState } from 'react'
import './TravelInvitations.scss'
import TravelInvitationCont from '../../components/travelInvitationsCont/TravelInvitationsCont'
import {getTravelPlanInvitationsByUserId} from '../../services/travelplan/TravelPlan'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';

const TravelInvitations = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [travelInvites, settravelInvites] = useState({});

  const fetchTravelInvites = async (page = 0, size =2) => {
    const travelerId = GetCurrentUserC().sub;
    try {
      const { data } = await getTravelPlanInvitationsByUserId(travelerId, page, size);
      settravelInvites(data);
      setCurrentPage(page);
      console.log(data)
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    }
  };

  useEffect(() => {
    fetchTravelInvites(currentPage);
  }, [currentPage]);


  return (
    <div className='TravelInvitations '>
      <div className="top">
      {travelInvites?.content?.length === 0 && <div>No Travel Plans</div>}
        {travelInvites?.content?.length > 0 && travelInvites.content.map((plan) => (
          <TravelInvitationCont key={plan.id} plan={plan} fetchTravelInvites={fetchTravelInvites} />
        ))}
       
      </div>
      <div className="bottom">
         <button onClick={() => fetchTravelInvites(currentPage - 1)} disabled={currentPage === 0}>&laquo;</button>
        {travelInvites &&
          [...Array(travelInvites.totalPages).keys()].map((page) => (
            <button
              onClick={() => fetchTravelInvites(page)}
              className={currentPage === page ? 'active' : ''}
              key={page}
            >
              {page + 1}
            </button>
          ))
        }
        <button onClick={() => fetchTravelInvites(currentPage + 1)} disabled={currentPage === travelInvites.totalPages - 1}>&raquo;</button>
      </div>
    </div>
  )
}

export default TravelInvitations
