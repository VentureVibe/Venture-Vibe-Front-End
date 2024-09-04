import React, { useState, useEffect } from 'react';
import './TravelDestinationDatePop.scss';
import { updateDestination, getDestination } from '../../services/travelDestination/TravelDestination';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns'; // Import date-fns for formatting

const TravelDestinationDatePop = ({ onClose, place, travelPlan, fetchTravelPlan }) => {
  const [selectedDate, setSelectedDate] = useState(place.date || '');
  const [isCustomDate, setIsCustomDate] = useState(selectedDate === 'custom');
  const [dates, setDates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (travelPlan && travelPlan.travelDates) {
      const dateArray = travelPlan.travelDates.map(item => item.date);
      setDates(dateArray);
    }
  }, [travelPlan]);

  useEffect(() => {
    setSelectedDate(place.date || '');
    setIsCustomDate(place.date === 'custom');
  }, [place.date]);

  const handleSetDate = async () => {
    const place1 = await getDestination(place.id);
    const updatedPlace = { ...place1, date: selectedDate };
    await updateDestination(updatedPlace);
    fetchTravelPlan();
    onClose();
  };

  const onRemoveDate = async () => {
    const place1 = await getDestination(place.id);
    const updatedPlace = { ...place1, date: '' };
    await updateDestination(updatedPlace);
    fetchTravelPlan();
    onClose();
  };

  const handleDateSelection = (e) => {
    setSelectedDate(e.target.value);
    setIsCustomDate(e.target.value === 'custom');
  };

  const formatDate = (date) => {
    return format(parseISO(date), 'do MMMM'); // Format the date to "5th August"
  };

  return (
    <div className="travel-destination-date-pop">
      <div className="pop-header">
        <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
      </div>
      <div className="pop-body">
        <select 
          className="date-select" 
          value={selectedDate} 
          onChange={handleDateSelection}
        >
          {dates.map((date, index) => (
            <option key={index} value={date}>
              {formatDate(date)} {/* Display formatted date */}
            </option>
          ))}
        </select>

        {isCustomDate && (
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        )}

        <div className="button-group">
          <button className="set-btn" onClick={handleSetDate}>Set</button>
          <button className="remove-btn" onClick={onRemoveDate}>Remove Date</button>
        </div>
      </div>
    </div>
  );
};

export default TravelDestinationDatePop;
