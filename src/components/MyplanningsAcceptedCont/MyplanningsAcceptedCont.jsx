import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './MyplanningsAcceptedCont.scss'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';

const MyplanningsAcceptedCont = ({plan}) => {

  const[travelPlan,setTravelPlan]=useState(plan);
  const [showPopup, setShowPopup] = useState(false);
  const userToken=GetCurrentUserC();
  console.log(plan);

  const toggleModal = () => {
    setShowPopup(!showPopup); // Toggle the state of showPopup
  };

  return (
     <div className='MyplanningsAcceptedCont'>
        <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />

        <div className="details">
          <h1>Trip to {travelPlan.location}</h1>
          <p>{travelPlan.fromDate} - {travelPlan.toDate} </p>
          <Link to={`/travelplan/${travelPlan.id}`}>
              <button>View</button>
          </Link>
          <Link to={`/community/profile/${travelPlan.travelPlanOwner.id}`}>
        
          <div className="by">
              <h4>By</h4>
              <img src={travelPlan.travelPlanOwner.profileImg} alt="" />
              <p>{travelPlan.travelPlanOwner.email}</p>
          </div>
          </Link>
          <div className="people">
            <p>Travelers</p>
            {travelPlan.travelers.map(traveler => (
            traveler.email,
            traveler.id !== userToken.sub ? (
                  <Link to={`/community/profile/${traveler.id}`}>
                     <img key={traveler.id} src={traveler.profileImg ? traveler.profileImg : Google} alt="" />
                  </Link>
            ) : null
          ))}
      
        

          </div> 
          
        </div>
        <div className="delete">
            <span onClick={toggleModal}>
              <i class="fa-solid fa-trash"></i>
              <p>Leave</p>
            </span>
          
        </div>
        {showPopup && (
          <PopUpMain Component={<DeleteConfirm onClose={toggleModal} onConfirm={deleteTravelPlan}/>} />
      )}
    </div>
  )
}

export default MyplanningsAcceptedCont
