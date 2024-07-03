import React, { useState, useRef, useEffect } from 'react';
import './CreateTravelPlan.scss';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./DatePickerStyles.scss";

const CreateTravelPlan = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateInputClick = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='createTravelPlan'>
      <div className="container">
        <h1>Plan a new trip</h1>
        <div className="where-to">
          <span>Where to?</span>
          <input type="text" placeholder="Enter a city or destination" />
        </div>
        <div className="dates">
          <span className='date-heading'>Dates (optional)</span>
          <div className="select-date">
            <div className="date-inputs" ref={dateInputRef}>
                <div className="date-input-wrapper" onClick={handleDateInputClick}>
                    <CalendarMonthOutlinedIcon sx={{ color: '#747474', fontSize: 17 }} />
                    <input 
                        type="text" 
                        value={startDate ? startDate.toLocaleDateString() : ''} 
                        placeholder="Start date" 
                        readOnly
                        className="date-input"
                    />
                </div>
                <div className="date-input-wrapper" onClick={handleDateInputClick}>
                    <CalendarMonthOutlinedIcon sx={{ color: '#747474', fontSize: 17 }} />
                    <input 
                        type="text" 
                        value={endDate ? endDate.toLocaleDateString() : ''} 
                        placeholder="End date" 
                        readOnly
                        className="date-input"
                    />
                </div>
            </div>
            
            {showDatePicker && (
              <div ref={datePickerRef}>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  monthsShown={2}
                  minDate={new Date()}
                  className="date-picker"
                />
              </div>
            )}
          </div>
        </div>
        <div className="invite-trip">
          <AddIcon sx={{ color: '#747474', fontSize: 18 }} />
          <span>Invite tripmates</span>
        </div>
        <div className="btn-container">
          <span>Start Planning</span>
        </div>
      </div>
    </div>
  );
}

export default CreateTravelPlan;
