import React, { useState } from 'react'
import './TravelInvitationsCont.scss'
import PopUpMain from '../popupmain/PopUpMain';
import Google from '../../assets/MapsCover.avif'
import {deleteTravelInvitationById,acceptTravelInvitationById} from '../../services/travelInivitation/TravelInvitation'
import DeleteConfirm from '../deleteConfirm/DeleteConfirm';
import {GetCurrentUserC}  from '../../services/user/GetCurrentUserC'
import { Link } from 'react-router-dom';

const TravelInvitationsCont = ({plan,fetchTravelInvitation}) => {

  const [travelPlan,setTravelPlan]=useState(plan);
  const [showPopup, setShowPopup] = useState(false);
  console.log(plan)
  
  const toggleModal = () => {
    setShowPopup(!showPopup); // Toggle the state of showPopup
  };
  
  const addTravelToTravelPlan= async () => {
    try {
      const jwtToken=GetCurrentUserC()
      const { data } = await acceptTravelInvitationById(travelPlan.travelPlan.id,jwtToken.sub);
      const { data1 } = await deleteTravelInvitationById(travelPlan.id);
      fetchTravelInvitation();
    } catch (error) {
      console.error('Error deleting travel plan:', error);
    }
  };


  const deleteTravelInvitation = async () => {
    try {
      const { data } = await deleteTravelInvitationById(travelPlan.id);
      fetchTravelInvitation();
      setShowPopup(!showPopup);
      
    } catch (error) {
      console.error('Error deleting travel plan:', error);
    }
  };


  return (
    <div className='TravelInvitationsCont'>
        <img src={travelPlan.travelPlan.imgUrl} alt="" />
        <div className="details">
          <h1>Trip to {travelPlan.travelPlan.location}</h1>
          <p>{travelPlan.travelPlan.fromDate} - {travelPlan.travelPlan.toDate} </p>
     
          <button onClick={addTravelToTravelPlan}>Accept</button>

          <Link to={`/community/profile/${travelPlan.travelPlan.travelPlanOwner.id}`}>
          <div className="people">
               <h1>By</h1>
               <img src={travelPlan.travelPlan.travelPlanOwner.profileImg} alt={travelPlan.travelPlan.travelPlanOwner.email} />
               <p>{travelPlan.travelPlan.travelPlanOwner.email}</p>
            
          </div> 
          </Link>
        </div>
        <div className="delete">
            <span onClick={toggleModal}>
              <i class="fa-solid fa-trash"></i>
              <p>Remove</p>
            </span>
          
        </div>
        {showPopup && (
          <PopUpMain Component={<DeleteConfirm onClose={toggleModal} onConfirm={deleteTravelInvitation} message={"Are you sure you want to delete this travel invitation?"}/>} />
      )}
    </div>
  )
}

export default TravelInvitationsCont
