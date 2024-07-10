import React from 'react';
import './ItineraryTravelPlan.scss';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DateTravelPlan from '../dateTravelPlan/DateTravelPlan';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const ItineraryTravelPlan = ({from, to}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    return `${day} ${month}`;
  };

  const fromDateFormatted = formatDate(from);
  const toDateFormatted = formatDate(to);

  return (
    <div className='itineraryTravelPlan' id='sun-1/6'>
      <div className='container'>
        <div className="heading">
          <span>Itinerary</span>
          <div className='date-tag'>
            <i><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 20 }}/></i>
            <span>{fromDateFormatted} - {toDateFormatted}</span>
          </div>
        </div>
        <div className="itinerary-body">
          <DateTravelPlan from={from} to={to} place={<PlaceTravelPlan number='1' name='Induruwa Sea Turtle Conservation Center' color='#1BBC9B' />} />
        </div>
      </div>
    </div>
  );
}

export default ItineraryTravelPlan;
