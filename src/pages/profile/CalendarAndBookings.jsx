import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarAndBookings.scss";

const mockGuide = {
  unavailableDates: [new Date("2023-12-25"), new Date("2023-12-31")],
  bookings: [
    { date: "2023-12-20", clientName: "John Doe", details: "City Tour" },
    { date: "2023-12-22", clientName: "Jane Smith", details: "Nature Trail" },
  ],
};

const CalendarAndBookings = () => {
  const [guide, setGuide] = useState(mockGuide);

  const handleDateChange = (date) => {
    if (!guide.unavailableDates.some((d) => d.getTime() === date.getTime())) {
      const updatedGuide = {
        ...guide,
        unavailableDates: [...guide.unavailableDates, date],
      };
      setGuide(updatedGuide);
    }
  };

  const handleRemoveDate = (date) => {
    const updatedGuide = {
      ...guide,
      unavailableDates: guide.unavailableDates.filter(
        (d) => d.getTime() !== date.getTime()
      ),
    };
    setGuide(updatedGuide);
  };

  return (
    <form
      className="calendar-and-bookings card"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="calendar-bookings-container">
        <div className="calendar-section">
          <h3>My Off Days</h3>
          <DatePicker
            selected={null}
            onChange={handleDateChange}
            inline
            highlightDates={guide.unavailableDates}
          />
          <div className="unavailable-dates-list">
            {guide.unavailableDates.map((date) => (
              <div key={date.toISOString()} className="unavailable-date">
                <span>{date.toLocaleDateString()}</span>
                <button type="button" onClick={() => handleRemoveDate(date)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bookings-section">
          <h3>My Bookings</h3>
          <ul className="bookings-list">
            {guide.bookings.map((booking, index) => (
              <li key={index}>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Client:</strong> {booking.clientName}
                </p>
                <p>
                  <strong>Details:</strong> {booking.details}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default CalendarAndBookings;
