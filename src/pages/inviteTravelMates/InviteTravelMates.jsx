import React, { useState, useEffect } from 'react';
import "./InviteTravelMates.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import PopUpMain from '../../components/popupmain/PopUpMain';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';

import { saveUser } from '../../services/travelplan/TravelPlan';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';


const InviteTravelMates = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [placeImage, setPlaceImage] = useState('');

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

    if (!to || !from || !location || !lat || !lng) {
      navigate("/travelplan");
    }

    const fetchPlaceDetails = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);
        
        const request = {
          location: new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
          radius: 500, // Radius in meters
          query: location,
          fields: ['photos', 'place_id'],
        };

        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const place = results[0];
            if (place.photos && place.photos.length > 0) {
              const photoUrl = place.photos[0].getUrl({ maxWidth: 800 });
              console.log('Photo URL:', photoUrl);
              setPlaceImage(photoUrl);
            }
          } else {
            console.error('Error fetching place details:', status);
          }
        });
      } else {
        console.error('Google Maps API not loaded');
      }
    };

    fetchPlaceDetails();
  }, [to, from, location, lat, lng, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = async () => {
    const jwtToken = GetCurrentUserC();
    if (!jwtToken) {
      setShowSignIn(true);
      return;
    }

    const userData = {
      id: jwtToken.sub,
      toDate: to,
      fromDate: from,
      location,
      lat,
      longi: lng,
    };

    try {
      await saveUser(userData, jwtToken);
    } catch (error) {
      // Handle error, if needed
      console.error('Error saving user data:', error);
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
