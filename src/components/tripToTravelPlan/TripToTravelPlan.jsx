import React from 'react';
import "./TripToTravelPlan.scss";
import man from "../../assets/man.jpg";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const TripToTravelPlan = ({ location, from, to }) => {
  // Extract the first word before the comma in the location
  const locationFirstWord = location.split(',')[0].trim();

  // Format the date to show only the month and day
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedFrom = formatDate(from);
  const formattedTo = formatDate(to);

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
            <div className='profile-pic'>
              <img src={man} alt="" />
            </div>
            <i><GroupAddIcon sx={{ color: '#747474', fontSize: 27 }} /></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripToTravelPlan;
