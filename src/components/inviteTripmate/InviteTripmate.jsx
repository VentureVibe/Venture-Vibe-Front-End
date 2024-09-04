import React, { useState, useRef, useEffect } from 'react'
import './InviteTripmate.scss';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageTripmates from './../manageTripmates/ManageTripmates';
import PopUpMain from '../popupmain/PopUpMain';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import {getTravelerByEmailPartially } from '../../services/travelplan/TravelPlan';
import { getTravelPlanById } from '../../services/travelplan/TravelPlan';
import { sendTravelInvitation } from '../../services/travelInivitation/TravelInvitation';

const InviteTripmate = ({ onClose,travelPlanId}) => {
  const [email, setEmail] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const sendEmailRef = useRef(null)
  const [showManageTripmate, setShowManageTripmate] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [travelPlan,setTravelPlan]=useState([])

  const toggleManageTripmatePopUp = () => {
    setShowManageTripmate(!showManageTripmate);
  };

  const handleInputChange =async (event) => {

    const newEmail=event.target.value;

    setEmail(event.target.value)
    
    const jwtToken = GetCurrentUserC();
  
    if (!jwtToken) {
      setEmail('');
      setShowSignIn(true);
      return;
    }

    if (newEmail.length > 8) {
      try {
        const data = await getTravelerByEmailPartially(newEmail);
        const travelPlanTravelerIds = travelPlan.travelers.map(traveler => traveler.id); // Extract IDs from the travel plan
        const travelPlanInvitees = travelPlan.travelInvitations.map(travelInvitation => travelInvitation.travelPlanInvitee.id); // Extract IDs from the travel plan

        const filteredData = data.filter(user =>
          !selectedUsers.some(selected => selected.id === user.id) &&
          !travelPlanTravelerIds.includes(user.id) && 
          !travelPlanInvitees .includes(user.id) &&
          user.email !== jwtToken.email 
        );
  
        setRecommendedUsers(filteredData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    } else {
      setRecommendedUsers([]);
    }
  
  }

  const sendInvite = async () => {
    if (selectedUsers.length > 0) {
      try {
        const data = await sendTravelInvitation(travelPlan.id, selectedUsers[0].id);
        onClose();
      } catch (error) {

      }
    } else {
    }
  };
  
 

  const handleSelectUser = (user) => {
    const jwtToken = GetCurrentUserC();
  
    if (user.email === jwtToken.email) {
      alert("You cannot invite yourself.");
      return;
    }
  
    setSelectedUsers(prevSelectedUsers => {
      const updatedSelectedUsers = [...prevSelectedUsers, user];
      setRecommendedUsers(prevRecommendedUsers => prevRecommendedUsers.filter(rec => rec.id !== user.id));
      setEmail(''); // Clear the input field if you want
      return updatedSelectedUsers;
    });
  };

  const fetchTravelPlan = async () => {
    const jwtToken = GetCurrentUserC();
    const id=travelPlanId;
    try {
      const data = await getTravelPlanById(id, jwtToken.sub);
      setTravelPlan(data);
    } catch (error) {
      console.error('Error fetching travel plan:', error);
    }
  };

  
  useEffect(() => {
    fetchTravelPlan()
  }, [])

  return (
    <div className='inviteTripmate'>
        <div className="container">
            <div className="closing-i" onClick={onClose}>
                <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="hearder">
                <span>Invite Tripmates</span>
            </div>
            {/* <div className="link-container">
                <i><LinkIcon sx={{ color: '#747474', fontSize: 25 }} /></i>
                <span className='invite-link'>https://venturevibe.com/ffffmdmff</span>
                <div className="copy-btn">
                    <span>Copy Link</span>
                </div>
            </div> */}
            <div className="email-container">
                <i><MailOutlineOutlinedIcon sx={{ color: '#747474', fontSize: 25 }}/></i>
           
                <input
                  type="text"
                  placeholder={selectedUsers.length > 0 ? '' : 'Enter an email'}                  value={email}
                  onChange={handleInputChange}
                />
                <span className="selected-user">
                {selectedUsers.map(user => (
                   <div key={user.id} >
                      <p>
                         {user.email}
                 
                      </p>
                   </div>
                ))}
                </span>
                <div className="copy-btn">
                    <span onClick={sendInvite}>Invite</span>
                </div>
            </div>
            {recommendedUsers.length > 0 && (
                <div className="send-email-container" ref={sendEmailRef}>
                  {recommendedUsers.map(rec => (
                  <div
                    key={rec.id}
                    className="detail-container"
                    onClick={() => handleSelectUser(rec)}
                  >
                  <span className='send-email'>{rec.email}</span>
                </div>
                  ))}
                {/* <i><EmailIcon sx={{ color: '#747474', fontSize: 25 }}/></i>
                <div className="detail-container">
                    <span className='send-email'>Send an email</span>
                    <span className='friend-email'>{email ? `to ${email}` : 'to'}</span>
                </div> */}
              </div>
            )}
            <hr className='hr-tag'/>
            <div className="manage-tripmates" onClick={toggleManageTripmatePopUp}>
                <i><ManageAccountsIcon sx={{ color: '#747474', fontSize: 18 }}/></i>
                <span>Manage Tripmates</span>
            </div>
            {showManageTripmate && (
              <PopUpMain Component={<ManageTripmates onClose={toggleManageTripmatePopUp} travelPlan={travelPlan}  fetchTravelPlan={fetchTravelPlan}/>} />
            )}
        </div>
    </div>
  )
}

export default InviteTripmate
