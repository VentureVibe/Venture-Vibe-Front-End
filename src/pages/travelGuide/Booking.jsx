// import "./Booking.scss";
// import React, { useState } from "react";
// import { Event } from "@mui/icons-material";

// const Booking = ({ guide }) => {
//   const [selectedDates, setSelectedDates] = useState([]);

//   const getCurrentMonthYear = () => {
//     const date = new Date();
//     return {
//       month: date.toLocaleString("default", { month: "long" }),
//       year: date.getFullYear(),
//     };
//   };

//   const { month, year } = getCurrentMonthYear();

//   const isDateUnavailable = (date) => {
//     return guide.unavailableDates.some(
//       (unavailableDate) =>
//         date.getDate() === unavailableDate.getDate() &&
//         date.getMonth() === unavailableDate.getMonth() &&
//         date.getYear() === unavailableDate.getYear()
//     );
//   };

//   const generateCalendar = () => {
//     const today = new Date();
//     const month = today.getMonth();
//     const year = today.getFullYear();
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const days = [];
//     for (let i = 0; i < firstDay; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       const isSelected = selectedDates.some(
//         (selectedDate) =>
//           selectedDate.getDate() === date.getDate() &&
//           selectedDate.getMonth() === date.getMonth()
//       );
//       const unavailable = isDateUnavailable(date);

//       days.push(
//         <button
//           key={day}
//           className={`calendar-day ${isSelected ? "selected" : ""} ${
//             unavailable ? "unavailable" : ""
//           }`}
//           onClick={() => {
//             if (!unavailable) {
//               if (isSelected) {
//                 setSelectedDates(
//                   selectedDates.filter((d) => d.getDate() !== date.getDate())
//                 );
//               } else {
//                 setSelectedDates([...selectedDates, date]);
//               }
//             }
//           }}
//           disabled={unavailable}
//         >
//           {day}
//         </button>
//       );
//     }

//     return days;
//   };

//   const calculateTotalPrice = () => {
//     return selectedDates.length * guide.price;
//   };

//   return (
//     <div className="booking-grid">
//       <div className="calendar-section card">
//         <h2>Select Tour Dates</h2>
//         <div className="calendar">
//           <div className="calendar-header">
//             <h3 className="month-year">
//               {month} {year}
//             </h3>
//             <div className="weekdays">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div key={day} className="weekday">
//                   {day}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="calendar-body">{generateCalendar()}</div>
//         </div>
//       </div>

//       <div className="booking-summary card">
//         <h2>Booking Summary</h2>
//         {selectedDates.length > 0 ? (
//           <div className="summary">
//             <div className="selected-dates">
//               <h3>Selected Dates:</h3>
//               <div className="dates">
//                 {selectedDates.map((date) => (
//                   <div key={date.toISOString()} className="date">
//                     <Event />
//                     <span>{date.toLocaleDateString()}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="total">
//               <div className="days">
//                 <span>Days selected:</span>
//                 <span>{selectedDates.length}</span>
//               </div>
//               <div className="price">
//                 <span>Total Price:</span>
//                 <span>${calculateTotalPrice()}</span>
//               </div>
//               <button className="book-button">Confirm Booking</button>
//             </div>
//           </div>
//         ) : (
//           <p className="empty-message">Please select dates to book your tour</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking;

import "./Booking.scss";
import React, { useState } from "react";
import { Event, ChevronLeft, ChevronRight } from "@mui/icons-material";

const Booking = ({ guide }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthYear = (date) => {
    return {
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    };
  };

  const { month, year } = getMonthYear(currentMonth);

  const changeMonth = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + offset))
    );
  };

  const isDateUnavailable = (date) => {
    return guide.unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getYear() === unavailableDate.getYear()
    );
  };

  const generateCalendar = () => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected = selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth()
      );
      const unavailable = isDateUnavailable(date);

      days.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""} ${
            unavailable ? "unavailable" : ""
          }`}
          onClick={() => {
            if (!unavailable) {
              if (isSelected) {
                setSelectedDates(
                  selectedDates.filter((d) => d.getDate() !== date.getDate())
                );
              } else {
                setSelectedDates([...selectedDates, date]);
              }
            }
          }}
          disabled={unavailable}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const calculateTotalPrice = () => {
    return selectedDates.length * guide.price;
  };

  return (
    <div className="booking-container">
      <div className="booking-grid">
        <div className="calendar-section card">
          <h2>Select Tour Dates</h2>
          <div className="calendar">
            <div className="calendar-header">
              <div className="month-navigation">
                <button
                  onClick={() => changeMonth(-1)}
                  className="month-nav-btn"
                >
                  <ChevronLeft />
                </button>
                <h3 className="month-year">
                  {month} {year}
                </h3>
                <button
                  onClick={() => changeMonth(1)}
                  className="month-nav-btn"
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="weekdays">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="weekday">
                      {day}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="calendar-body">{generateCalendar()}</div>
          </div>
        </div>

        <div className="booking-summary card">
          <h2>Booking Summary</h2>
          {selectedDates.length > 0 ? (
            <div className="summary">
              <div className="selected-dates">
                <h3>Selected Dates:</h3>
                <div className="dates">
                  {selectedDates.map((date) => (
                    <div key={date.toISOString()} className="date">
                      <Event />
                      <span>{date.toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="total">
                <div className="days">
                  <span>Days selected:</span>
                  <span>{selectedDates.length}</span>
                </div>
                <div className="price">
                  <span>Total Price:</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
                <button className="book-button">Confirm Booking</button>
              </div>
            </div>
          ) : (
            <p className="empty-message">
              Please select dates to book your tour
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
