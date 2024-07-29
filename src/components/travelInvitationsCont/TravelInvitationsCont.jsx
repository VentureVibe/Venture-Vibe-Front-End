import React, { useState } from 'react'
import './TravelInvitationsCont.scss'

const TravelInvitationsCont = ({plan}) => {
  const [travelPlan,setTravelPlan]=useState(plan);
  console.log(plan)
  return (
    <div className='TravelInvitationsCont'>a
        {/* <img src={travelPlan.imgUrl} alt="" />
        <div className="details">
          <h1>Trip to {travelPlan.location}</h1>
          <p>{travelPlan.fromDate} - {travelPlan.toDate} </p>
          <Link to={`/travelplan/${travelPlan.id}`}>
              <button>View</button>
          </Link>
          <div className="people">
                 <img src={travelPlan.imgUrl} alt="" />
                 <img src={travelPlan.imgUrl} alt="" />
                 <img src={travelPlan.imgUrl} alt="" />
                 <img src={travelPlan.imgUrl} alt="" />
                 <img src={travelPlan.imgUrl} alt="" />
                 <img src={travelPlan.imgUrl} alt="" />
                 <span><i class="fa-solid fa-plus"></i> Invite</span>
          </div> 
          
        </div>
        <div className="delete">
            <span onClick={toggleModal}>
              <i class="fa-solid fa-trash"></i>
              <p>Delete</p>
            </span>
          
        </div> */}
    </div>
  )
}

export default TravelInvitationsCont
