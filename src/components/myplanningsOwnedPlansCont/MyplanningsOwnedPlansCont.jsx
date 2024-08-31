import React, { useState } from 'react'
import './MyplanningsOwnedPlansCont.scss'
import { Link } from 'react-router-dom';
import PopUpMain from '../popupmain/PopUpMain';
import DeleteConfirm from '../deleteConfirm/DeleteConfirm';
import {deleteTravelPlanById} from '../../services/travelplan/TravelPlan'
import Google from '../../assets/MapsCover.avif'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import InviteTripmate from '../inviteTripmate/InviteTripmate';

const MyplanningsOwnedPlansCont = ({plan,fetchTravelPlans}) => {

  const[travelPlan,setTravelPlan]=useState(plan);
  const [showPopup, setShowPopup] = useState(false);
  const [showInviteTrip, setShowInviteTrip] = useState(false);
  const userToken=GetCurrentUserC();

  const toggleModal = () => {
    setShowPopup(!showPopup); // Toggle the state of showPopup
  };
  
  const deleteTravelPlan = async () => {
    try {
      const { data } = await deleteTravelPlanById(travelPlan.id);
      fetchTravelPlans();
      setShowPopup(!showPopup);
      
    } catch (error) {
      console.error('Error deleting travel plan:', error);
    }
  };
  
  const toggleInviteTripmatePopUp = () => {
    setShowInviteTrip(!showInviteTrip);
  };

  return (
    <div className='MyplanningsOwnedPlansCont'>
        <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />

        <div className="details">
          <h1>Trip to {travelPlan.location}</h1>
          <p>{travelPlan.fromDate} - {travelPlan.toDate} </p>
          <Link to={`/travelplan/${travelPlan.id}`}>
              <button>View</button>
          </Link>
          <div className="people">
          {travelPlan.travelers.map(traveler => (
            traveler.email,
            traveler.id !== userToken.sub ? (
                  <Link to={`/community/profile/${traveler.id}`}>
                     <img key={traveler.id} src={traveler.profileImg ? traveler.profileImg : Google} alt="" />
                  </Link>
            ) : null
          ))}
       
            <span onClick={toggleInviteTripmatePopUp}><i class="fa-solid fa-plus"></i> Invite</span>
          </div> 
          
        </div>
        <div className="delete">
            <span onClick={toggleModal}>
              <i class="fa-solid fa-trash"></i>
              <p>Delete</p>
            </span>
          
        </div>
        {showPopup && (
          <PopUpMain Component={<DeleteConfirm onClose={toggleModal} onConfirm={deleteTravelPlan} message={"Are you sure you want to delete this travel plan?"}/>} />
      )}
        {showInviteTrip && (
          <PopUpMain Component={<InviteTripmate onClose={toggleInviteTripmatePopUp} travelPlanId={travelPlan.id} />} />
        )}
    </div>
    
  )
}

export default MyplanningsOwnedPlansCont
