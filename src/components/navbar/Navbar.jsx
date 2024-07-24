import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import PopUpMain from '../popupmain/PopUpMain';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAlert } from '../../context/errAlert/AlertContext';
import { handleLogout } from '../../services/user/LoginSignup';
import Profile from '../profile/Profile';

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const showAlert = useAlert(); // State to track user's login status

  useEffect(() => {
    const jwtToken = localStorage.getItem('idToken');
    setIsLoggedIn(!!jwtToken);
    if(localStorage.getItem('successok')) {
      showAlert('Login successful', 'success'/*, 40000*/); 
      localStorage.removeItem('successok');
      //console.log(jwtToken);
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
  };

  return (
    <div className='navbar'>
      <NavLink className="logo" to="/">
        <img src="/src/assets/3.png" alt="Venture Vibe" />
        <h2>Venture Vibe</h2>
      </NavLink>
      <ul className="list">
        <li><NavLink to="/community">Community</NavLink></li>
        <li><NavLink to="/">Hotels</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/travelguides">Travel Guides</NavLink></li>
      </ul>
      <ul className="button">
        {isLoggedIn ? (
          <li className="profile-dropdown">
            <button onClick={toggleDropdown} className="profile-button">
        {/* <img src="/src/assets/3.png" alt="Profile" className="profile-pic" />
        <ArrowDropDownIcon /> */}
        <Profile />
      </button>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <ul>
            <li>Profile</li>
            <li onClick={handleLogout}>Logout</li>
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
        <PopUpMain Component={<Register onClose={toggleSignUpPopUp} onClickShift={shiftStates} />} />
      )}

      {showSignIn && (
        <PopUpMain Component={<Login onClose={toggleSignInPopUp} onClickShift={shiftStates} />} />
      )}
    </div>
  );
};

export default Navbar;

