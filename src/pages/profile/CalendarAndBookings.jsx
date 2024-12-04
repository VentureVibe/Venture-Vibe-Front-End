// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./CalendarAndBookings.scss";

// const mockGuide = {
//   unavailableDates: [new Date("2023-12-25"), new Date("2023-12-31")],
//   bookings: [
//     { date: "2023-12-20", clientName: "John Doe", details: "City Tour" },
//     { date: "2023-12-22", clientName: "Jane Smith", details: "Nature Trail" },
//   ],
// };

// const CalendarAndBookings = () => {
//   const [guide, setGuide] = useState(mockGuide);

//   const handleDateChange = (date) => {
//     if (!guide.unavailableDates.some((d) => d.getTime() === date.getTime())) {
//       const updatedGuide = {
//         ...guide,
//         unavailableDates: [...guide.unavailableDates, date],
//       };
//       setGuide(updatedGuide);
//     }
//   };

//   const handleRemoveDate = (date) => {
//     const updatedGuide = {
//       ...guide,
//       unavailableDates: guide.unavailableDates.filter(
//         (d) => d.getTime() !== date.getTime()
//       ),
//     };
//     setGuide(updatedGuide);
//   };

//   return (
//     <form
//       className="calendar-and-bookings card"
//       onSubmit={(e) => e.preventDefault()}
//     >
//       <div className="calendar-bookings-container">
//         <div className="calendar-section">
//           <h3>My Off Days</h3>
//           <DatePicker
//             selected={null}
//             onChange={handleDateChange}
//             inline
//             highlightDates={guide.unavailableDates}
//           />
//           <div className="unavailable-dates-list">
//             {guide.unavailableDates.map((date) => (
//               <div key={date.toISOString()} className="unavailable-date">
//                 <span>{date.toLocaleDateString()}</span>
//                 <button type="button" onClick={() => handleRemoveDate(date)}>
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bookings-section">
//           <h3>My Bookings</h3>
//           <ul className="bookings-list">
//             {guide.bookings.map((booking, index) => (
//               <li key={index}>
//                 <p>
//                   <strong>Date:</strong> {booking.date}
//                 </p>
//                 <p>
//                   <strong>Client:</strong> {booking.clientName}
//                 </p>
//                 <p>
//                   <strong>Details:</strong> {booking.details}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CalendarAndBookings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarAndBookings.scss";

const CalendarAndBookings = ({ guide }) => {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/unavailable-dates/user/${guide.id}`
        );
        if (response.data) {
          const fetchedUnavailableDates = response.data.unavailableDates.map(
            (date) => new Date(date)
          );
          setUnavailableDates(fetchedUnavailableDates);
        }
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/booking/travelGuide/${guide.id}`
        );
        const fetchedBookings = response.data.map((booking) => ({
          ...booking,
          bookedDates: booking.bookedDates.map((date) => new Date(date)),
        }));
        setBookings(fetchedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUnavailableDates();
    fetchBookings();
  }, [guide.id]);

  const handleDateChange = (date) => {
    if (!unavailableDates.some((d) => d.getTime() === date.getTime())) {
      const updatedDates = [...unavailableDates, date];
      setUnavailableDates(updatedDates);
    }
  };

  const handleRemoveDate = (date) => {
    const updatedDates = unavailableDates.filter(
      (d) => d.getTime() !== date.getTime()
    );
    setUnavailableDates(updatedDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/unavailable-dates/user/${guide.id}`
      );
      if (response.data && response.data.unavailableDates.length > 0) {
        await axios.put(
          `http://localhost:8080/api/v1/unavailable-dates/update/${guide.id}`,
          unavailableDates.map((date) => date.toISOString().split("T")[0])
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/v1/unavailable-dates/save`,
          {
            userId: guide.id,
            unavailableDates: unavailableDates.map(
              (date) => date.toISOString().split("T")[0]
            ),
          }
        );
      }
      //alert("Unavailable dates submitted successfully!");
    } catch (error) {
      console.error("Error submitting unavailable dates:", error);
      //alert("Failed to submit unavailable dates.");
    }
  };

  return (
    <form className="calendar-and-bookings card" onSubmit={handleSubmit}>
      <div className="calendar-bookings-container">
        <div className="calendar-section">
          <h3>My Off Days</h3>
          <DatePicker
            selected={null}
            onChange={handleDateChange}
            inline
            highlightDates={unavailableDates}
          />
          <div className="unavailable-dates-list">
            {unavailableDates.map((date) => (
              <div key={date.toISOString()} className="unavailable-date">
                <span>{date.toLocaleDateString()}</span>
                <button type="button" onClick={() => handleRemoveDate(date)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="submit">Submit Unavailable Dates</button>
        </div>

        <div className="bookings-section">
          <h3>My Bookings</h3>
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <p>
                  <strong>Booking ID:</strong> {booking.id}
                </p>
                <p>
                  <strong>Amount:</strong> LKR {booking.amount * 0.85}
                </p>
                <p>
                  <strong>No of Days:</strong> {booking.noOfDays}
                </p>
                <p>
                  <strong>Booked Dates:</strong>{" "}
                  {booking.bookedDates
                    .map((date) => date.toLocaleDateString())
                    .join(", ")}
                </p>
                <p>
                  <strong>Booker Profile:</strong>{" "}
                  <a
                    href={`http://localhost:5173/community/profile/${booking.bookerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
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
