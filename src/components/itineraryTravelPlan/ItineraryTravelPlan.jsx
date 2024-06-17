import React from 'react'
import './ItineraryTravelPlan.scss';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DateTravelPlan from '../dateTravelPlan/DateTravelPlan';

const ItineraryTravelPlan = () => {
  return (
    <div className='itineraryTravelPlan'>
        <div className='container'>
            <div className="heading">
                <span>Itinerary</span>
                <div className='date-tag'>
                    <i><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 20 }}/></i>
                    <span>6/9 - 6/15</span>
                </div>
            </div>
            <div className="itinerary-body">
                <DateTravelPlan />
            </div>
        </div>
    </div>
  )
}

export default ItineraryTravelPlan