import React, { useState, useEffect } from 'react';
import "./InviteTravelMates.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PopUpMain from '../../components/popupmain/PopUpMain';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';

const InviteTravelMates = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const { search } = useLocation();
  //const history = useHistory();
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
      //history.push('/travelplan');
      navigate("/travelplan");
    }
  }, [to, from, location, lat, lng, history]);

  return (
    <div className='inviteTravelMates'>
      <div className="container">
        <h1>Invite tripmates to your {location} trip</h1>
        <div className="where-to">
          <span>Invite tripmates</span>
          <input type="text" placeholder="Enter an email address" />
        </div>
        <div className="btn-container">
          <Link to={`/travelplan/${to}/${from}/${location}/${lat}/${lng}`}>
            <span>Start Planning</span>
          </Link>
        </div>
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
