import React, { useState, useEffect } from 'react';
import "./InviteTravelMates.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PopUpMain from '../../components/popupmain/PopUpMain';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';
import  saveUser  from '../../services/travelplan/TravelPlan';

const InviteTravelMates = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');

  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const to = queryParams.get('endDate');
  const from = queryParams.get('startDate');
  const location = queryParams.get('location');
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  const toggleSignUpPopUp = () => {
    setShowSignUp(!showSignUp);
  };

  const toggleSignInPopUp = () => {
    setShowSignIn(!showSignIn);
  };

  const shiftStates = () => {
    if (showSignIn) {
      setShowSignIn(false);
      setShowSignUp(true);
    } else {
      setShowSignUp(false);
      setShowSignIn(true);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('idToken');
    if (!jwtToken) {
      setShowSignIn(true);
    }
  }, []);

  useEffect(() => {
    if (!to || !from || !location || !lat || !lng) {

      navigate("/travelplan");

    }
  }, [to, from, location, lat, lng, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = async () => {
    const jwtToken = localStorage.getItem('idToken');
    if (!jwtToken) {
      setShowSignIn(true);
      return;
    }

    const userData = {
    
      to,
      from,
      location,
      lat,
      lng,
    };

    try {
      await saveUser(userData, jwtToken);
    } catch (error) {
      // Handle error, if needed
    }
  };

  return (
    <div className='inviteTravelMates'>
      <div className="container">
        <h1>Invite tripmates to your {location} trip</h1>
        <div className="where-to">
          <span>Invite tripmates</span>
          <input
            type="text"
            placeholder="Enter an email address"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="btn-container" onClick={handleInvite}>
          <span>Start Planning</span>
        </div>
        <Link to={`/travelplan/${to}/${from}/${location}/${lat}/${lng}`}>
          <div className="btn-container">
            <span>Start Planning</span>
          </div>
        </Link>
      </div>
      {showSignUp && (
        <PopUpMain Component={<Register onClose={toggleSignUpPopUp} onClickShift={shiftStates} />} />
      )}
      {showSignIn && (
        <PopUpMain Component={<Login onClose={toggleSignInPopUp} onClickShift={shiftStates} />} />
      )}
    </div>
  );
}

export default InviteTravelMates;
