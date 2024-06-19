import React from 'react'
import './ItineraryTravelPlan.scss';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DateTravelPlan from '../dateTravelPlan/DateTravelPlan';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

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
                <DateTravelPlan place={<PlaceTravelPlan number='1' name='Induruwa Sea Turtle Conservation Center' color='#1BBC9B' />} />
            </div>
        </div>
    </div>
  )
}

export default ItineraryTravelPlan