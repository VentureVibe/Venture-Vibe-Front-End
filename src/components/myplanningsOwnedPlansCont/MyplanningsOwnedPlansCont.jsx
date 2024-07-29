import React, { useState } from 'react'
import './MyplanningsOwnedPlansCont.scss'
import { Link } from 'react-router-dom';
import PopUpMain from '../popupmain/PopUpMain';
import DeleteConfirm from '../deleteConfirm/DeleteConfirm';
import {deleteTravelPlanById} from '../../services/travelplan/TravelPlan'
import Google from '../../assets/MapsCover.avif'
const MyplanningsOwnedPlansCont = ({plan,fetchTravelPlans}) => {

  const[travelPlan,setTravelPlan]=useState(plan);
  const [showPopup, setShowPopup] = useState(false);

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
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <img src={travelPlan.imgUrl ? travelPlan.imgUrl : Google} alt="" />
            <span><i class="fa-solid fa-plus"></i> Invite</span>
          </div> 
          
        </div>
        <div className="delete">
            <span onClick={toggleModal}>
              <i class="fa-solid fa-trash"></i>
              <p>Delete</p>
            </span>
          
        </div>
        {showPopup && (
          <PopUpMain Component={<DeleteConfirm onClose={toggleModal} onConfirm={deleteTravelPlan}/>} />
      )}
    </div>
    
  )
}

export default MyplanningsOwnedPlansCont
