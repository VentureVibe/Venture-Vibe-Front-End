// import React, { useState, useEffect } from "react";
// import "./Navbar.scss";
// import { NavLink, useNavigate } from "react-router-dom";
// import Login from "../login/Login";
// import Register from "../register/Register";
// import PopUpMain from "../popupmain/PopUpMain";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { useAlert } from "../../context/errAlert/AlertContext";
// import { handleLogout } from "../../services/user/LoginSignup";
// import Profile from "../profile/Profile";
// import Loading from "../loading/Loading";
// import { exchangeCodeForTokens } from "../../services/user/LoginSignup";
// import { useAuth } from "../../context/authContext";
// import { GetUser } from "../../services/user/GetUser";

// const Navbar = () => {
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const showAlert = useAlert(); // State to track user's login status
//   const [loading, setLoading] = useState(false);
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");
//     const state = urlParams.get("state");

//     if (code) {
//       setLoading(true);
//       exchangeCodeForTokens(code, state)
//         .then(() => setLoading(false))
//         .catch((error) => {
//           setLoading(false);
//           showAlert("Error exchanging code for tokens", "error");
//         });
//     }

//     const jwtToken = localStorage.getItem("idToken");
//     setIsLoggedIn(!!jwtToken);
//     if (localStorage.getItem("successok")) {
//       showAlert("Login successful", "success");
//       localStorage.removeItem("successok");
//     }
//   }, []);

//   const toggleSignUpPopUp = () => {
//     setShowSignUp(!showSignUp);
//   };

//   const toggleSignInPopUp = () => {
//     setShowSignIn(!showSignIn);
//   };

//   const shiftStates = () => {
//     if (showSignIn) {
//       setShowSignIn(!showSignIn);
//       setShowSignUp(!showSignUp);
//     } else {
//       setShowSignUp(!showSignUp);
//       setShowSignIn(!showSignIn);
//     }
//   };

//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//     if (dropdownVisibleIcon) {
//       setDropdownVisibleIcon(!dropdownVisibleIcon);
//     }
//   };

//   const [dropdownVisibleIcon, setDropdownVisibleIcon] = useState(false);

//   const toggleDropdownI = () => {
//     setDropdownVisibleIcon(!dropdownVisibleIcon);
//     if (dropdownVisible) {
//       setDropdownVisible(!dropdownVisible);
//     }
//   };

//   const handleProfileClick = async () => {
//     try {
//       const user = await GetUser();
//       const userRole = user.role;
//       //console.log(userRole);
//       if (userRole === "TravelGuide") {
//         navigate("/guideprofile");
//       } else if (userRole === "EventPlanner") {
//         navigate("/mylistings");
//       } else if (userRole === "Admin") {
//         navigate("/admin");
//       } else {
//         navigate("/editprofile");
//       }
//       setDropdownVisible(!dropdownVisible);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       navigate("/");
//     }
//   };

//   return (
//     <div className="navbar">
//       {loading && <Loading />}
//       <NavLink className="logo" to="/">
//         <img src="/src/assets/3.png" alt="Venture Vibe" />
//         <h2>Venture Vibe</h2>
//       </NavLink>
//       <ul className="list">
//         <li>
//           <NavLink to="/community">Community</NavLink>
//         </li>
//         <li>
//           <NavLink to="/">Hotels</NavLink>
//         </li>
//         <li>
//           <NavLink to="/events">Events</NavLink>
//         </li>
//         <li>
//           <NavLink to="/travelguides">Travel Guides</NavLink>
//         </li>
//       </ul>
//       <ul className="button">
//         {isLoggedIn ? (
//           <li className="profile-dropdown">
//             <button onClick={toggleDropdownI} className="notification-button">
//               <div className="notification">
//                 <i className="fa-regular fa-bell"></i>
//                 <p className="notification-count">3</p>
//               </div>
//             </button>
//             <button onClick={toggleDropdown} className="profile-button">
//               <Profile />
//             </button>
//             {dropdownVisible && (
//               <div className="dropdown-menu-profile">
//                 <ul>
//                   <li onClick={handleProfileClick}>Profile</li>
//                   <li onClick={handleLogout}>Logout</li>
//                 </ul>
//               </div>
//             )}
//             {dropdownVisibleIcon && (
//               <div className="dropdown-menu">
//                 <ul>
//                   <li>You have invites</li>
//                   <li>Kasun liked your post</li>
//                   <li>Bimsara added new post</li>
//                 </ul>
//               </div>
//             )}
//           </li>
//         ) : (
//           <>
//             <li className="login">
//               <button onClick={toggleSignInPopUp}>Login</button>
//             </li>
//             <li className="signup">
//               <button onClick={toggleSignUpPopUp}>Sign Up</button>
//             </li>
//           </>
//         )}
//       </ul>

//       {showSignUp && (
//         <PopUpMain
//           Component={
//             <Register onClose={toggleSignUpPopUp} onClickShift={shiftStates} />
//           }
//         />
//       )}

//       {showSignIn && (
//         <PopUpMain
//           Component={
//             <Login onClose={toggleSignInPopUp} onClickShift={shiftStates} />
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import PopUpMain from "../popupmain/PopUpMain";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAlert } from "../../context/errAlert/AlertContext";
import { handleLogout } from "../../services/user/LoginSignup";
import Profile from "../profile/Profile";
import Loading from "../loading/Loading";
import { exchangeCodeForTokens } from "../../services/user/LoginSignup";
import { useAuth } from "../../context/authContext";
import { GetUser } from "../../services/user/GetUser";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../../services/traveler/Traveler";
import { GetCurrentUserC } from "../../services/user/GetCurrentUserC";

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [notifications, setNotifications] = useState([]); // Initialize as empty array

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const jwtToken = localStorage.getItem("idToken");

    const fetchNotifications = async () => {
      const userId = GetCurrentUserC().sub;
      if (jwtToken) {
        try {
          const response = await getNotifications(userId);

          setNotifications(response || []);
          console.log(notifications);
          // Ensure that notifications is always an array
        } catch (error) {
          showAlert("Error fetching notifications", "error");
          setNotifications([]); // In case of error, ensure notifications is empty
        }
      }
    };

    fetchNotifications();

    if (code) {
      setLoading(true);
      exchangeCodeForTokens(code, state)
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          showAlert("Error exchanging code for tokens", "error");
        });
    }

    setIsLoggedIn(!!jwtToken);
    if (localStorage.getItem("successok")) {
      showAlert("Login successful", "success");
      localStorage.removeItem("successok");
    }

    if (jwtToken) {
      GetUser().then((user) => {
        setUserRole(user.role);
      });
    }
  }, []);

  const toggleSignUpPopUp = () => {
    setShowSignUp(!showSignUp);
  };

  const toggleSignInPopUp = () => {
    setShowSignIn(!showSignIn);
  };

  const shiftStates = () => {
    if (showSignIn) {
      setShowSignIn(!showSignIn);
      setShowSignUp(!showSignUp);
    } else {
      setShowSignUp(!showSignUp);
      setShowSignIn(!showSignIn);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (dropdownVisibleIcon) {
      setDropdownVisibleIcon(!dropdownVisibleIcon);
    }
  };

  const [dropdownVisibleIcon, setDropdownVisibleIcon] = useState(false);

  const toggleDropdownI = async () => {
    try {
      // Make sure `userId` is available here (e.g., get from context, props, or state)
      const userId = GetCurrentUserC().sub;
      setDropdownVisibleIcon(!dropdownVisibleIcon);
      await markAllNotificationsAsRead(userId);
      // Toggle the notification dropdown visibility
      if (dropdownVisible) {
        setDropdownVisible(!dropdownVisible);
      }
    } catch (error) {
      console.error("Error in marking notifications as read:", error);
    }
  };
  const handleProfileClick = async () => {
    try {
      const user = await GetUser();
      const userRole = user.role;
      if (userRole === "TravelGuide") {
        navigate("/guideprofile");
      } else if (userRole === "EventPlanner") {
        navigate("/mylistings");
      } else if (userRole === "Admin") {
        navigate("/admin");
      } else {
        navigate("/editprofile");
      }
      setDropdownVisible(!dropdownVisible);
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      {loading && <Loading />}
      <NavLink className="logo" to="/">
        <img src="/src/assets/3.png" alt="Venture Vibe" />
        <h2>Venture Vibe</h2>
      </NavLink>
      <ul className="list">
        <li>
          <NavLink to="/community">Community</NavLink>
        </li>
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        <li>
          <NavLink to="/travelguides">Travel Guides</NavLink>
        </li>
      </ul>
      <ul className="button">
        {isLoggedIn ? (
          <li className="profile-dropdown">
            <button onClick={toggleDropdownI} className="notification-button">
              <div className="notification">
                <i className="fa-regular fa-bell"></i>
                <p className="notification-count">
                  {unreadNotifications.length}
                </p>
              </div>
            </button>
            <button onClick={toggleDropdown} className="profile-button">
              <Profile />
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu-profile">
                <ul>
                  {userRole === "TravelGuide" && (
                    <li
                      onClick={() => {
                        navigate("/guideprofile");
                        setDropdownVisible(!dropdownVisible);
                      }}
                    >
                      Profile
                    </li>
                  )}
                  {userRole === "EventPlanner" && (
                    <li
                      onClick={() => {
                        navigate("/mylistings");
                        setDropdownVisible(!dropdownVisible);
                      }}
                    >
                      My Listings
                    </li>
                  )}
                  {userRole === "Admin" && (
                    <li
                      onClick={() => {
                        navigate("/admin");
                        setDropdownVisible(!dropdownVisible);
                      }}
                    >
                      Dashboard
                    </li>
                  )}
                  {userRole === "TravelGuide_EventPlanner" && (
                    <>
                      <li
                        onClick={() => {
                          navigate("/mylistings");
                          setDropdownVisible(!dropdownVisible);
                        }}
                      >
                        My Listings
                      </li>
                      <li
                        onClick={() => {
                          navigate("/guideprofile");
                          setDropdownVisible(!dropdownVisible);
                        }}
                      >
                        Profile
                      </li>
                    </>
                  )}
                  {["Traveler", "EventPlanner", "Admin"].includes(userRole) && (
                    <li
                      onClick={() => {
                        navigate("/editprofile");
                        setDropdownVisible(!dropdownVisible);
                      }}
                    >
                      Profile
                    </li>
                  )}
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
            {dropdownVisibleIcon && (
              <div className="dropdown-menu">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <a
                        href={notification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <li key={index}>
                          <p className="header">{notification.title}</p>
                          <p>{notification.message}</p>
                        </li>
                      </a>
                    ))
                  ) : (
                    <li>No new notifications</li>
                  )}
                </ul>
              </div>
            )}
          </li>
        ) : (
          <>
            <li className="login">
              <button onClick={toggleSignInPopUp}>Login</button>
            </li>
            <li className="signup">
              <button onClick={toggleSignUpPopUp}>Sign Up</button>
            </li>
          </>
        )}
      </ul>

      {showSignUp && (
        <PopUpMain
          Component={
            <Register onClose={toggleSignUpPopUp} onClickShift={shiftStates} />
          }
        />
      )}

      {showSignIn && (
        <PopUpMain
          Component={
            <Login onClose={toggleSignInPopUp} onClickShift={shiftStates} />
          }
        />
      )}
    </div>
  );
};

export default Navbar;
