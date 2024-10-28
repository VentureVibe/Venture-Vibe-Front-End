import React from 'react';
import './ItineraryTravelPlan.scss';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DateTravelPlan from '../dateTravelPlan/DateTravelPlan';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const ItineraryTravelPlan = ({from, to,travelPlan,fetchTravelPlan,setClickedPlace}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    return `${day} ${month}`;
  };

  const fromDateFormatted = formatDate(from);
  const toDateFormatted = formatDate(to);

  const onclickPlace = (recentPlace) => {
    const lat = recentPlace.geometry?.location?.lat() || recentPlace.lat;
    const longi = recentPlace.geometry?.location?.lng() || recentPlace.longi;

    if (isNaN(lat) || isNaN(longi)) {
      throw new Error('Invalid latitude or longitude values');
    }

    const photoUrl ='';

 

   setClickedPlace( recentPlace);
};
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
          <DateTravelPlan from={from} to={to} travelPlan={travelPlan} fetchTravelPlan={fetchTravelPlan} onClick={onclickPlace}  />
        </div>
      </div>
    </div>
  );
}

export default ItineraryTravelPlan;
