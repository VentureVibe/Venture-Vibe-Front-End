// import React from "react";
// import "./payment.scss";
// import visa from "../../assets/Visa.jpg";
// import mastercard from "../../assets/Mastercard.svg";

// const Payments = () => {
//   const handlePayment = () => {
//     console.log(import.meta.env.VITE_MERCHANT_ID);

//     payhere.onCompleted = function onCompleted(orderId) {
//       console.log("Payment completed. OrderID:", orderId);
//       // Handle post-payment actions here
//     };

//     payhere.onDismissed = function onDismissed() {
//       console.log("Payment dismissed");
//       // Handle payment dismissal here
//     };

//     payhere.onError = function onError(error) {
//       console.log("Error:", error);
//       // Handle payment errors here
//     };

//     const payment = {
//       sandbox: true, // Use sandbox mode for testing
//       merchant_id: import.meta.env.VITE_MERCHANT_ID, // Replace with your Merchant ID
//       return_url: `http://localhost:5173`, // Important
//       cancel_url: `http://localhost:5173`, // Important
//       notify_url: "http://your-backend/notify", // Your notification URL

//       order_id: "ITEM12345",
//       items: "Event Registration",
//       amount: "1000.00",
//       currency: "LKR",
//       first_name: "John",
//       last_name: "Doe",
//       email: "john@example.com",
//       phone: "0771234567",
//       address: "No.1, Galle Road",
//       city: "Colombo",
//       country: "Sri Lanka",
//     };

//     payhere.startPayment(payment);
//   };

//   return (
//     <div className="payment">
//       <div className="payemnt-left">
//         <div className="card-number">
//           <div className="top">
//             <h4>Card Number</h4>
//             <p>Enter the 16 digit card number on the card</p>
//           </div>
//           <div className="bottom">
//             <div className="bottom-left">
//               <img src={visa} alt="" />
//               <img src={mastercard} alt="" />
//             </div>
//             <input type="text" placeholder="**** **** **** ****" />
//           </div>
//         </div>
//         <div className="cvc">
//           <div className="cvc-left">
//             <h4>CVC Number</h4>
//             <p>Enter the 3 or 4 digit number on the card</p>
//           </div>
//           <div className="cvc-right"></div>
//         </div>
//         <div className="exp-date">
//           <div className="exp-date-left">
//             <h4>Expiry Date</h4>
//             <p>Enter the expiry date of the card</p>
//           </div>
//           <div className="exp-date-right"></div>
//         </div>
//         <div className="button">
//           <button onClick={handlePayment}>Pay now</button>
//         </div>
//       </div>
//       <div className="payment-right"></div>
//     </div>
//   );
// };

// export default Payments;

// import React from "react";
// import "./payment.scss";
// import visa from "../../assets/Visa.jpg";
// import mastercard from "../../assets/Mastercard.svg";

// const Payments = () => {
//   const handlePayment = () => {
//     // Ensure payhere is available
//     if (!window.payhere) {
//       console.error("PayHere library is not loaded");
//       return;
//     }

//     const payment = {
//       sandbox: true,
//       merchant_id: import.meta.env.VITE_MERCHANT_ID,
//       return_url: `http://localhost:5173`,
//       cancel_url: `http://localhost:5173`,
//       notify_url: "http://your-backend/notify",
//       order_id: "ITEM12345",
//       items: "Event Registration",
//       amount: "1000.00",
//       currency: "LKR",
//       first_name: "John",
//       last_name: "Doe",
//       email: "john@example.com",
//       phone: "0771234567",
//       address: "No.1, Galle Road",
//       city: "Colombo",
//       country: "Sri Lanka",
//     };

//     // Start payment
//     window.payhere.startPayment(payment);
//   };

//   return (
//     <div className="payment">
//       <div className="payemnt-left">
//         <div className="card-number">
//           <div className="top">
//             <h4>Card Number</h4>
//             <p>Enter the 16 digit card number on the card</p>
//           </div>
//           <div className="bottom">
//             <div className="bottom-left">
//               <img src={visa} alt="Visa" />
//               <img src={mastercard} alt="MasterCard" />
//             </div>
//             <input type="text" placeholder="**** **** **** ****" />
//           </div>
//         </div>
//         <div className="cvc">
//           <div className="cvc-left">
//             <h4>CVC Number</h4>
//             <p>Enter the 3 or 4 digit number on the card</p>
//           </div>
//         </div>
//         <div className="exp-date">
//           <div className="exp-date-left">
//             <h4>Expiry Date</h4>
//             <p>Enter the expiry date of the card</p>
//           </div>
//         </div>
//         <div className="button">
//           <button onClick={handlePayment}>Pay now</button>
//         </div>
//       </div>
//       <div className="payment-right"></div>
//     </div>
//   );
// };

// export default Payments;

import React, { useEffect, useState } from "react";
import "./payment.scss";

const Payments = ({ userDetails, selectedPlan }) => {
  const [orderId, setOrderId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!window.payhere) {
      console.error("PayHere library is not loaded");
      return;
    }
    console.log("User Details : ", userDetails);
    console.log("Selected Plan : ", selectedPlan);
    fetch("http://localhost:8080/auth/calculateHash", {
      method: "PUT",
      params: {
        amount: selectedPlan === "annual" ? 500.0 : 50.0,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderId(data.orderId))
      .catch((error) => console.error("Error fetching hash:", error));
  }, [selectedPlan]);

  useEffect(() => {
    console.log("User Details 2 : ", userDetails);
    console.log("Selected Plan 2 : ", selectedPlan);
    if (paymentSuccess) {
      fetch("http://localhost:8080/api/payment-notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          status: "Completed",
          amount: selectedPlan === "annual" ? 500.0 : 50.0,
          user_id: userDetails.email,
          role: "event_planner", // or "travel_guide"
          package: selectedPlan,
        }),
      });
    }
  }, [paymentSuccess, orderId, selectedPlan, userDetails]);

  const handlePayment = () => {
    if (!window.payhere) {
      console.error("PayHere library is not loaded");
      return;
    }

    const payment = {
      sandbox: true,
      merchant_id: import.meta.env.VITE_MERCHANT_ID,
      return_url: `http://localhost:5173`,
      cancel_url: `http://localhost:5173`,
      notify_url: "http://localhost:8080/api/payment-notify",
      order_id: orderId,
      items: "Event Registration",
      amount: selectedPlan === "annual" ? "500.00" : "50.00",
      currency: "USD",
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.contactNumber,
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.onCompleted = function onCompleted(orderId) {
      setPaymentSuccess(true);
    };

    window.payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    window.payhere.onError = function onError(error) {
      console.error("Error:", error);
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div className="Payments">
      <div className="button">
        <button onClick={handlePayment}>Pay now</button>
      </div>
    </div>
  );
};

export default Payments;
