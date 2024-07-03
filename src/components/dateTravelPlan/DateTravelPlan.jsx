import React, { useState } from 'react';
import './DateTravelPlan.scss';
import { days } from '../../dummyData';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const DateTravelPlan = ({ place }) => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  return (
    <div className='DateTravelPlan'>
      <div className='container'>
        {days.map((day, index) => (
          <div key={index} className="day-container">
            <div className='day' onClick={toggleBottomContainer}>
              <i className='down-arrow'><KeyboardArrowDownIcon sx={{ color: '#414143' }}/></i>
              <span>{day}</span>
              <i className='calender'><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
            </div>
            {isBottomContainerVisible && (
              <div className="bottom-container">
                {place}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateTravelPlan;
