import React from 'react'
import './DateTravelPlan.scss';
import { days } from '../../dummyData';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const DateTravelPlan = () => {
  return (
    <div className='DateTravelPlan'>
        <div className='container'>
            {days.map((day, index) => (
            <div className="day-container">
                <div key={index} className='day'>
                    <i className='down-arrow'><KeyboardArrowDownIcon sx={{ color: '#414143' }}/></i>
                    <span>{day}</span>
                    <i className='calender'><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                </div>
                <hr />
            </div>
            ))}
        </div>
    </div>
  )
}

export default DateTravelPlan