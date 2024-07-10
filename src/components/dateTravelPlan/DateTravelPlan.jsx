import React, { useState } from 'react';
import './DateTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const DateTravelPlan = ({ from, to, place }) => {
  const daysOfWeekWithDates = getDaysOfWeekWithDates(from, to);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleBottomContainer = (index) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  return (
    <div className='DateTravelPlan'>
      <div className='container'>
        {daysOfWeekWithDates.map((day, index) => (
          <div key={index} className="day-container">
            <div className='day' onClick={() => toggleBottomContainer(index)}>
              <i className='down-arrow'><KeyboardArrowDownIcon sx={{ color: '#414143' }}/></i>
              <span>{day}</span>
              <i className='calendar'><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
            </div>
            {selectedDay === index && (
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

// Helper function to generate days of the week with formatted dates between two dates
const getDaysOfWeekWithDates = (from, to) => {
  const startDate = new Date(from);
  const endDate = new Date(to);
  const daysOfWeekWithDates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const formattedDate = `${dayOfWeek}, ${month} ${currentDate.getDate()}`;
    daysOfWeekWithDates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysOfWeekWithDates;
};

export default DateTravelPlan;
