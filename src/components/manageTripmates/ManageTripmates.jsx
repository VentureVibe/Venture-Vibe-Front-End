import React from 'react'
import './ManageTripmates.scss';
import WestIcon from '@mui/icons-material/West';
import CloseIcon from '@mui/icons-material/Close';
import { tripmates } from '../../dummyData';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {leaveTravelPlan} from '../../services/travelplan/TravelPlan'
import {deleteTravelInvitationById} from '../../services/travelInivitation/TravelInvitation'

const ManageTripmates = ({ onClose,travelPlan,fetchTravelPlan}) => {

    const leaveTravelPlan1 = async (travelPlanId,useId) => {
        try {
         console.log(travelPlanId,useId)
          const { data } = await leaveTravelPlan(travelPlanId,useId);
          fetchTravelPlan()
          onClose();
          
        } catch (error) {
          console.error('Error deleting travel plan:', error);
        }
    };


    const deleteTravelInvitation = async (travelInivitationId) => {
        try {
          const { data } = await deleteTravelInvitationById(travelInivitationId);
          fetchTravelPlan()
          onClose();
          
        } catch (error) {
          console.error('Error deleting travel plan:', error);
        }
      };
    
  return (
    <div className='manageTripmates'>
        <div className="container">
            <div className="icons">
                <div className="back-i"  onClick={onClose}>
                    <i><WestIcon sx={{ color: '#747474', fontSize: 16 }}/></i>
                </div>
                <div className="closing-i" onClick={onClose}>
                    <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
                </div>
            </div>
            <div className="hearder">
                <span>Manage Tripmates</span>
            </div>
            <div className="body-container">
     {(travelPlan.travelers.length === 1 && travelPlan.travelInvitations.length === 0) ? (
        <span>No tripmates or invites currently in plan</span>
    ) : (
        <>
            {travelPlan.travelers.slice(1).map((tripmate, index) => (
                <div className="tripmate" key={tripmate.email}>
                    <div className="profile-pic">
                        <img src={tripmate.profileImg} alt={tripmate.email} />
                    </div>
                    <span className="email">{tripmate.name}</span>
                    <div className="remove-btn" onClick={() => leaveTravelPlan1(travelPlan.id, tripmate.id)}>
                         Remove
                    </div>
                </div>
            ))}

            {travelPlan.travelInvitations.map((travelInvitation, index) => (
                <div className="tripmate" key={travelInvitation.travelPlanInvitee.email}>
                    <div className="profile-pic">
                        <img src={travelInvitation.travelPlanInvitee.profileImg} alt={travelInvitation.travelPlanInvitee.email} />
                    </div>
                    <span className="email">{travelInvitation.travelPlanInvitee.name}</span>
                    <div className="remove-btn" onClick={() => deleteTravelInvitation (travelInvitation.id)}>
                            Cancel Invite
                    </div>
                </div>
            ))}
        </>
    )}
</div>

        </div>
    </div>
  )
}

export default ManageTripmates
