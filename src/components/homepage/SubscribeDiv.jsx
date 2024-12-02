// import React, { useState, useEffect } from "react";
// import "./subscribeDiv.scss";
// import { useNavigate } from "react-router-dom";
// import { GetUser } from "../../services/user/GetUser";

// const SubscribeDiv = () => {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("idToken");
//   useEffect(() => {
//     console.log("Token: ", token);
//     const fetchUser = async () => {
//       if (token) {
//         const userData = await GetUser();
//         setUser(userData);
//         console.log("User: ", userData);
//       }
//     };
//     fetchUser();
//   }, []);
//   const navigate = useNavigate();

//   const loadEventRegister = () => {
//     navigate("/eventregister");
//   };

//   const loadGuideRegister = () => {
//     navigate("/guideregister");
//   };

//   return (
//     <div className="div-4">
//       <h1>
//         SUBSCRIBE NEWSLETTER & GET
//         <br /> THE LATEST NEWS
//       </h1>
//       <div className="input-btn">
//         <input type="text" placeholder="Enter E-mail address" />
//         <button>Subscribe Now</button>
//       </div>
//       {token ? (
//         user.role === "Traveler" ? (
//           <div className="btns">
//             <button className="btn-tg" onClick={loadGuideRegister}>
//               Become a Travel Guide
//             </button>
//             <button className="btn-ep" onClick={loadEventRegister}>
//               Become a Event Planner
//             </button>
//           </div>
//         ) : user.role === "EventPlanner" ? (
//           <div className="btns">
//             <button className="btn-tg" onClick={loadGuideRegister}>
//               Become a Travel Guide
//             </button>
//           </div>
//         ) : (
//           <div className="btns">
//             <button className="btn-ep" onClick={loadEventRegister}>
//               Become a Event Planner
//             </button>
//           </div>
//         )
//       ) : (
//         <div className="btns">
//           <button className="btn-tg" onClick={loadGuideRegister}>
//             Become a Travel Guide
//           </button>
//           <button className="btn-ep" onClick={loadEventRegister}>
//             Become a Event Planner
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscribeDiv;

import React, { useState, useEffect } from "react";
import "./subscribeDiv.scss";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../../services/user/GetUser";

const SubscribeDiv = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("idToken");

  useEffect(() => {
    console.log("Token: ", token);
    const fetchUser = async () => {
      if (token) {
        const userData = await GetUser();
        setUser(userData);
        console.log("User: ", userData);
      }
    };
    fetchUser();
  }, [token]);

  const navigate = useNavigate();

  const loadEventRegister = () => {
    localStorage.setItem("registration_role", "EventPlanner");
    navigate("/eventregister");
  };

  const loadGuideRegister = () => {
    localStorage.setItem("registration_role", "TravelGuide");
    navigate("/guideregister");
  };

  return (
    <div className="div-4">
      <h1>
        SUBSCRIBE NEWSLETTER & GET
        <br /> THE LATEST NEWS
      </h1>
      <div className="input-btn">
        <input type="text" placeholder="Enter E-mail address" />
        <button>Subscribe Now</button>
      </div>
      {token && user ? (
        user.role === "Traveler" ? (
          <div className="btns">
            <button className="btn-tg" onClick={loadGuideRegister}>
              Become a Travel Guide
            </button>
            <button className="btn-ep" onClick={loadEventRegister}>
              Become a Event Planner
            </button>
          </div>
        ) : user.role === "EventPlanner" ? (
          <div className="btns">
            <button className="btn-tg" onClick={loadGuideRegister}>
              Become a Travel Guide
            </button>
          </div>
        ) : user.role === "TravelGuide_EventPlanner" ? (
          <div className="btns"></div>
        ) : (
          <div className="btns">
            <button className="btn-ep" onClick={loadEventRegister}>
              Become a Event Planner
            </button>
          </div>
        )
      ) : (
        <div className="btns">
          <button className="btn-tg" onClick={loadGuideRegister}>
            Become a Travel Guide
          </button>
          <button className="btn-ep" onClick={loadEventRegister}>
            Become a Event Planner
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscribeDiv;
