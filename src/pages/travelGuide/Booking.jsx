// import "./Booking.scss";
// import React, { useState, useEffect } from "react";
// import { Event, ChevronLeft, ChevronRight } from "@mui/icons-material";
// import axios from "axios";
// import { GetUser } from "../../services/user/GetUser";

// const Booking = ({ guide }) => {
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [booked, setBooked] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const user = await GetUser();
//       setUserDetails(user);
//     };
//     fetchUserDetails();
//     setBooked(false);
//   }, []);

//   const getMonthYear = (date) => {
//     return {
//       month: date.toLocaleString("default", { month: "long" }),
//       year: date.getFullYear(),
//     };
//   };

//   const { month, year } = getMonthYear(currentMonth);

//   const changeMonth = (offset) => {
//     setCurrentMonth(
//       new Date(currentMonth.setMonth(currentMonth.getMonth() + offset))
//     );
//   };

//   const isDateUnavailable = (date) => {
//     return guide.unavailableDates.some(
//       (unavailableDate) =>
//         date.getDate() === unavailableDate.getDate() &&
//         date.getMonth() === unavailableDate.getMonth() &&
//         date.getYear() === unavailableDate.getYear()
//     );
//   };

//   const generateCalendar = () => {
//     const firstDay = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       1
//     ).getDay();
//     const daysInMonth = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth() + 1,
//       0
//     ).getDate();

//     const days = [];
//     for (let i = 0; i < firstDay; i++) {
//       days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(
//         currentMonth.getFullYear(),
//         currentMonth.getMonth(),
//         day
//       );
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

//   const handlePayment = async () => {
//     if (!window.payhere) {
//       console.error("PayHere library is not loaded");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/payment/generateHash",
//         {
//           amount: calculateTotalPrice(),
//           currency: "LKR",
//         }
//       );

//       const data = response.data;
//       console.log("Response data:", data);

//       const payment = {
//         sandbox: true,
//         merchant_id: import.meta.env.VITE_MERCHANT_ID,
//         return_url: `http://localhost:5173`,
//         cancel_url: `http://localhost:5173`,
//         notify_url: "",
//         order_id: data.orderId,
//         items: "Tour Booking",
//         amount: calculateTotalPrice().toFixed(2),
//         currency: "LKR",
//         hash: data.hash,
//         first_name: userDetails.firstName,
//         last_name: userDetails.lastName,
//         email: userDetails.email,
//         phone: userDetails.contactNumber,
//         address: "",
//         city: "",
//         country: "",
//       };

//       window.payhere.onCompleted = async function onCompleted(orderId) {
//         setPaymentSuccess(true);
//         console.log("Payment success:", orderId);

//         const bookingDetails = {
//           travelGuideId: guide.id,
//           bookerId: userDetails.id,
//           amount: calculateTotalPrice(),
//           noOfDays: selectedDates.length,
//           bookedDates: selectedDates.map(
//             (date) => date.toISOString().split("T")[0]
//           ),
//         };
//         console.log("Booking details:", bookingDetails);

//         try {
//           const response = await axios.post(
//             "http://localhost:8080/api/v1/booking/store",
//             bookingDetails
//           );
//           if (response.status === 200) {
//             //alert("Booking confirmed and stored successfully!");
//             setBooked(true);
//           }
//         } catch (error) {
//           console.error("Error storing booking details:", error);
//           alert("Failed to store booking details.");
//         }
//       };

//       window.payhere.onDismissed = function onDismissed() {
//         console.log("Payment dismissed");
//       };

//       window.payhere.onError = function onError(error) {
//         console.error("Payment error:", error);
//       };

//       window.payhere.startPayment(payment);
//     } catch (error) {
//       console.error("Error fetching hash:", error);
//     }
//   };

//   const handleConfirmBooking = async () => {
//     await handlePayment();
//   };

//   return (
//     <div className="booking-container">
//       <div className="booking-grid">
//         <div className="calendar-section card">
//           <h2>Select Tour Dates</h2>
//           <div className="calendar">
//             <div className="calendar-header">
//               <div className="month-navigation">
//                 <button
//                   onClick={() => changeMonth(-1)}
//                   className="month-nav-btn"
//                 >
//                   <ChevronLeft />
//                 </button>
//                 <h3 className="month-year">
//                   {month} {year}
//                 </h3>
//                 <button
//                   onClick={() => changeMonth(1)}
//                   className="month-nav-btn"
//                 >
//                   <ChevronRight />
//                 </button>
//               </div>
//               <div className="weekdays">
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                   (day) => (
//                     <div key={day} className="weekday">
//                       {day}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//             <div className="calendar-body">{generateCalendar()}</div>
//           </div>
//         </div>

//         <div className="booking-summary card">
//           <h2>Booking Summary</h2>
//           {selectedDates.length > 0 ? (
//             <div className="summary">
//               <div className="selected-dates">
//                 <h3>Selected Dates:</h3>
//                 <div className="dates">
//                   {selectedDates.map((date) => (
//                     <div key={date.toISOString()} className="date">
//                       <Event />
//                       <span>{date.toLocaleDateString()}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="total">
//                 <div className="days">
//                   <span>Days selected:</span>
//                   <span>{selectedDates.length}</span>
//                 </div>
//                 <div className="price">
//                   <span>Total Price:</span>
//                   <span>LKR {calculateTotalPrice()}</span>
//                 </div>
//                 <button className="book-button" onClick={handleConfirmBooking}>
//                   {booked ? "Booked Successfully" : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p className="empty-message">
//               Please select dates to book your tour
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;

import "./Booking.scss";
import React, { useState, useEffect } from "react";
import { Event, ChevronLeft, ChevronRight } from "@mui/icons-material";
import axios from "axios";
import { GetUser } from "../../services/user/GetUser";

const Booking = ({ guide }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await GetUser();
      setUserDetails(user);
    };
    fetchUserDetails();
    setBooked(false);
  }, []);

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

  const handlePayment = async () => {
    if (!window.payhere) {
      console.error("PayHere library is not loaded");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/payment/generateHash",
        {
          amount: calculateTotalPrice(),
          currency: "LKR",
        }
      );

      const data = response.data;
      console.log("Response data:", data);

      const payment = {
        sandbox: true,
        merchant_id: import.meta.env.VITE_MERCHANT_ID,
        return_url: `http://localhost:5173`,
        cancel_url: `http://localhost:5173`,
        notify_url: "",
        order_id: data.orderId,
        items: "Tour Booking",
        amount: calculateTotalPrice().toFixed(2),
        currency: "LKR",
        hash: data.hash,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.contactNumber,
        address: "",
        city: "",
        country: "",
      };

      window.payhere.onCompleted = async function onCompleted(orderId) {
        setPaymentSuccess(true);
        console.log("Payment success:", orderId);

        const bookingDetails = {
          travelGuideId: guide.id,
          bookerId: userDetails.id,
          amount: calculateTotalPrice(),
          noOfDays: selectedDates.length,
          bookedDates: selectedDates.map(
            (date) => date.toISOString().split("T")[0]
          ),
        };
        console.log("Booking details:", bookingDetails);

        try {
          const bookingResponse = await axios.post(
            "http://localhost:8080/api/v1/booking/store",
            bookingDetails
          );
          if (bookingResponse.status === 200) {
            console.log("Booking confirmed and stored successfully!");

            const paymentDetails = {
              sender: userDetails.id,
              receiver: guide.id, // Assuming guide has a name property
              dateTime: new Date().toISOString(),
              amount: calculateTotalPrice(),
              category: "Guide_Booking",
            };

            try {
              const paymentResponse = await axios.post(
                "http://localhost:8080/api/v1/payment/store",
                paymentDetails
              );
              if (paymentResponse.status === 200) {
                alert("Payment details stored successfully!");
                setBooked(true);
              }
            } catch (error) {
              console.error("Error storing payment details:", error);
              alert("Failed to store payment details.");
            }
          }
        } catch (error) {
          console.error("Error storing booking details:", error);
          alert("Failed to store booking details.");
        }
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
      };

      window.payhere.onError = function onError(error) {
        console.error("Payment error:", error);
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Error fetching hash:", error);
    }
  };

  const handleConfirmBooking = async () => {
    await handlePayment();
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
                  <span>LKR {calculateTotalPrice()}</span>
                </div>
                <button className="book-button" onClick={handleConfirmBooking}>
                  {booked ? "Booked Successfully" : "Confirm Booking"}
                </button>
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
