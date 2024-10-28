import React, { useEffect, useState } from 'react';
import './DateTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const DateTravelPlan = ({ from, to, travelPlan, fetchTravelPlan,onClick}) => {
  const daysOfWeekWithDates = getDaysOfWeekWithDates(from, to);
  const [selectedDay, setSelectedDay] = useState(null);
  const [travelDestinations, setTravelDestinations] = useState([]);

  const toggleBottomContainer = (index) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  const handleRemoveFromTrip=()=>{

  }

  useEffect(() => {
    if (travelPlan?.travelDestinations) {
      setTravelDestinations(travelPlan.travelDestinations);
    }
    console.log("tes")
;  }, [travelPlan]);

  return (
    <div className='DateTravelPlan'>
      <div className='container'>
        {daysOfWeekWithDates.map(({ dateStr, id, date }, index) => (
          <div key={index} className="day-container" id={id}>
            <div className='day' onClick={() => toggleBottomContainer(index)}>
              <i className='down-arrow'><KeyboardArrowDownIcon sx={{ color: '#414143' }}/></i>
              <span>{dateStr}</span>
              <i className='calendar'><CalendarMonthOutlinedIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
            </div>
            {selectedDay === index && (
              <div className="bottom-container">
                {travelDestinations
                  .filter(destination => destination.date === date) // Match the destination date with the current date
                  .map((place, placeIndex) => (
                    <PlaceTravelPlan
                      placeId=''
                      key={placeIndex}
                      color='#1BBC9B'
                      handleRemoveFromTrip={handleRemoveFromTrip}
                      onClick={onClick}
                      place={place}
                      travelPlan={travelPlan}
                      delete={false} 
                      fetchTravelPlan={fetchTravelPlan}
                      
                      
                    />
                  ))}
                {travelDestinations.filter(destination => destination.date === date).length === 0 && (
                  <p>No destinations for this date.</p> // Display message if no places are available for that date
                )}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate days of the week with formatted dates between two dates
const getDaysOfWeekWithDates = (from, to) => {
  const startDate = new Date(from);
  const endDate = new Date(to);
  const days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const day = currentDate.getDate();
    const formattedDate = `${dayOfWeek}, ${month} ${day}`;
    const date = currentDate.toISOString().split('T')[0]; // Get date in 'YYYY-MM-DD' format
    const id = `${dayOfWeek.substring(0, 3).toLowerCase()}-${day}/${currentDate.getMonth() + 1}`;
    days.push({ dateStr: formattedDate, id, date });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export default DateTravelPlan;
