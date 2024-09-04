// import React, { useState } from "react";
// import "./Checkout.scss";

// const Checkout = () => {
//   const [selectedPlan, setSelectedPlan] = useState("monthly");

//   const handlePlanClick = (plan) => {
//     setSelectedPlan(plan);
//   };

//   return (
//     <>
//       <div className="Checkout">
//         <div
//           className={`plan monthly-plan ${
//             selectedPlan === "monthly" ? "selected" : ""
//           }`}
//           onClick={() => handlePlanClick("monthly")}
//         >
//           <h2>Monthly Plan</h2>
//           <img
//             src="src/assets/event_organizer_icon.png"
//             alt="Event Organizer Icon"
//           />
//           <h4>50$/month</h4>
//           <ul>
//             <li>Add Unlimited Events</li>
//             <li>Access To Event Management Tools</li>
//             <li>24/7 Support</li>
//           </ul>
//         </div>
//         <div
//           className={`plan annual-plan ${
//             selectedPlan === "annual" ? "selected" : ""
//           }`}
//           onClick={() => handlePlanClick("annual")}
//         >
//           <h2>Annual Plan</h2>
//           <img
//             src="src/assets/event_organizer_icon.png"
//             alt="Event Organizer Icon"
//           />
//           <h4>500$/year</h4>
//           <ul>
//             <li>Add Unlimited Events</li>
//             <li>Access To Event Management Tools</li>
//             <li>24/7 Support</li>
//           </ul>
//         </div>
//       </div>
//       <button className="btn-checkout">Next</button>
//     </>
//   );
// };

// export default Checkout;

import React from "react";
import "./Checkout.scss";

const Checkout = ({ selectedPlan, setSelectedPlan, onNext }) => {
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <div className="Checkout">
        <div
          className={`plan monthly-plan ${
            selectedPlan === "monthly" ? "selected" : ""
          }`}
          onClick={() => handlePlanClick("monthly")}
        >
          <h2>Monthly Plan</h2>
          <img
            src="src/assets/event_organizer_icon.png"
            alt="Event Organizer Icon"
          />
          <h4>$50/month</h4>
          <ul>
            <li>Add Unlimited Events</li>
            <li>Access To Event Management Tools</li>
            <li>24/7 Support</li>
          </ul>
        </div>
        <div
          className={`plan annual-plan ${
            selectedPlan === "annual" ? "selected" : ""
          }`}
          onClick={() => handlePlanClick("annual")}
        >
          <h2>Annual Plan</h2>
          <img
            src="src/assets/event_organizer_icon.png"
            alt="Event Organizer Icon"
          />
          <h4>$500/year</h4>
          <ul>
            <li>Add Unlimited Events</li>
            <li>Access To Event Management Tools</li>
            <li>24/7 Support</li>
          </ul>
        </div>
      </div>
      <button className="btn-checkout" onClick={onNext}>
        Next
      </button>
    </>
  );
};

export default Checkout;
