import React, { useEffect, useState } from 'react';
import "./TripToTravelPlan.scss";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InviteTripmate from './../inviteTripmate/InviteTripmate';
import PopUpMain from '../popupmain/PopUpMain';
import { Link, useParams } from 'react-router-dom';
import { getTravelPlanById } from '../../services/travelplan/TravelPlan';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC'; // Ensure this import is correct

const TripToTravelPlan = ({ location, from, to }) => {
  // Extract the first word before the comma in the location
  const locationFirstWord = location.split(',')[0].trim();
  const { id } = useParams();
  const [travelPlan, setTravelPlan] = useState(null);
  const [userId,setUserId]=useState('');

  // Format the date to show only the month and day
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedFrom = formatDate(from);
  const formattedTo = formatDate(to);

  const [showInviteTrip, setShowInviteTrip] = useState(false);

  const toggleInviteTripmatePopUp = () => {
    setShowInviteTrip(!showInviteTrip);
  };

  const fetchTravelPlan = async () => {
    const jwtToken = GetCurrentUserC();
    setUserId(jwtToken.sub);
    try {
      const data = await getTravelPlanById(id, jwtToken.sub);
      console.log(data);
      setTravelPlan(data);
    } catch (error) {
      console.error('Error fetching travel plan:', error);
    }
  };

  useEffect(() => {
    fetchTravelPlan();
  }, [id]); // Added `id` as a dependency to refetch if it changes

  return (
    <div className='tripToTravelPlan'>
      <div className='container'>
        <h1>Trip to {locationFirstWord}</h1>
        <div className='bottom-container'>
          <div className='date'>
            <i><CalendarMonthOutlinedIcon sx={{ color: '#747474', fontSize: 20 }} /></i>
            <span>{formattedFrom} - {formattedTo}</span>
          </div>
          <div className='people-container'>
  {travelPlan?.travelers?.map((traveler) => (
    <Link to={`/community/profile/${traveler.id}`} key={traveler.id}>
      <div className='profile-pic'>
        <img src={traveler.profileImg} alt={traveler.name} />
      </div>
    </Link>
  ))}

  {travelPlan?.travelPlanOwner?.id === userId && (
    <i onClick={toggleInviteTripmatePopUp}>
      <GroupAddIcon sx={{ color: '#747474', fontSize: 27 }} />
    </i>
  )}
</div>

        </div>
        {showInviteTrip && (
          <PopUpMain Component={<InviteTripmate onClose={toggleInviteTripmatePopUp} travelPlanId={id} />} />
        )}
      </div>
    </div>
  );
};

export default TripToTravelPlan;
