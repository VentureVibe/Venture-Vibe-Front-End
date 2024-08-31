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
        {daysOfWeekWithDates.map(({ dateStr, id }, index) => (
          <div key={index} className="day-container" id={id}>
            <div className='day' onClick={() => toggleBottomContainer(index)}>
              <i className='down-arrow'><KeyboardArrowDownIcon sx={{ color: '#414143' }}/></i>
              <span>{dateStr}</span>
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
  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Saturday"
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' }); // e.g., "August"
    const day = currentDate.getDate(); // e.g., 24
    const formattedDate = `${dayOfWeek}, ${month} ${day}`;
    const id = `${dayOfWeek.substring(0, 3).toLowerCase()}-${day}/${currentDate.getMonth() + 1}`; // e.g., "sat-24/8"
    days.push({ dateStr: formattedDate, id });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export default DateTravelPlan;
