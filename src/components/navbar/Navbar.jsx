import React, { useState } from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import PopUpMain from '../popupmain/PopUpMain';

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleSignUpPopUp = () => {
  
    setShowSignUp(!showSignUp);
  };

  const toggleSignInPopUp = () => {
  
    setShowSignIn(!showSignIn);
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
        <li><NavLink to="/">Events</NavLink></li>
        <li><NavLink to="/">Travel Guides</NavLink></li>
      </ul>
      <ul className="button">

        <li className="login">
          <button onClick={toggleSignInPopUp}>Login</button>
        </li>
        <li className="signup">
          <button onClick={toggleSignUpPopUp}>Sign Up</button>
        </li>

      </ul>

      {showSignUp && (
        <PopUpMain Component={<Register onClose={toggleSignUpPopUp} />} />
      )}

      {showSignIn && (
        <PopUpMain Component={<Login onClose={toggleSignInPopUp} />} />
      )}
    </div>
  );
};

export default Navbar;
