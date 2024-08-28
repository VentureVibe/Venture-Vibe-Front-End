import React, { useState, useEffect } from 'react';
import "./InviteTravelMates.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import PopUpMain from '../../components/popupmain/PopUpMain';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';

import { saveTravelPlan, getTravelerByEmailPartially } from '../../services/travelplan/TravelPlan';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';

const InviteTravelMates = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [placeImage, setPlaceImage] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const to = queryParams.get('endDate');
  const from = queryParams.get('startDate');
  const location = queryParams.get('location');
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  const toggleSignUpPopUp = () => setShowSignUp(!showSignUp);
  const toggleSignInPopUp = () => setShowSignIn(!showSignIn);

  const shiftStates = () => {
    if (showSignIn) {
      setShowSignIn(false);
      setShowSignUp(true);
    } else {
      setShowSignUp(false);
      setShowSignIn(true);
    }
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  
    const jwtToken = GetCurrentUserC();
  
    if (!jwtToken) {
      setEmail('');
      setShowSignIn(true);
      return;
    }
  
    if (newEmail.length > 8) {
      try {
        const data = await getTravelerByEmailPartially(newEmail);
        const filteredData = data.filter(user =>
          !selectedUsers.some(selected => selected.id === user.id) &&
          user.email !== jwtToken.email // Exclude logged-in user
        );
  
        setRecommendedUsers(filteredData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    } else {
      setRecommendedUsers([]);
    }
  };
  

  const handleSelectUser = (user) => {
    const jwtToken = GetCurrentUserC();
  
    if (user.email === jwtToken.email) {
      alert("You cannot invite yourself.");
      return;
    }
  
    setSelectedUsers(prevSelectedUsers => {
      const updatedSelectedUsers = [...prevSelectedUsers, user];
      setRecommendedUsers(prevRecommendedUsers => prevRecommendedUsers.filter(rec => rec.id !== user.id));
      setEmail(''); // Clear the input field if you want
      return updatedSelectedUsers;
    });
  };
  

  const handleRemoveUser = (userId) => {
    const userToRemove = selectedUsers.find(user => user.id === userId);
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));

    // Optionally, re-add the removed user back to recommendations
    if (userToRemove) {
      setRecommendedUsers([...recommendedUsers, userToRemove]);
    }
  };

  const handleInvite = async () => {
    const jwtToken = GetCurrentUserC();
    if (!jwtToken) {
      setShowSignIn(true);
      return;
    }
    
    const filteredSelectedUsers = selectedUsers.filter(user => user.email !== jwtToken.email);
  
    const userData = {
      budget:0,
      toDate: to,
      fromDate: from,
      location,
      lat,
      longi: lng,
      imgUrl: placeImage,
      travelInviteList: filteredSelectedUsers.map(user => user.id)
    };
    
    try {
      const data = await saveTravelPlan(userData, jwtToken,jwtToken.sub);
      navigate(`/travelplan/${data.id}`);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
  
  

  useEffect(() => {
    const jwtToken = localStorage.getItem('idToken');
    console.log(selectedUsers);
    if (!jwtToken) {
      setShowSignIn(true);
      return;
    }

    if (!to || !from || !location || !lat || !lng) {
      navigate("/travelplan");
      return;
    }

    const fetchPlaceDetails = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
          location: new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
          radius: 500,
          query: location,
          fields: ['photos', 'place_id'],
        };

        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            const place = results[0];
            if (place.photos && place.photos.length > 0) {
              const photoUrl = place.photos[0].getUrl({ maxWidth: 800 });
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
  }, [to, from, location, lat, lng, navigate ,selectedUsers]);

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
          {recommendedUsers.length > 0 && (
            <div className="recommending">
              {recommendedUsers.map(rec => (
                <div
                  key={rec.id}
                  className="recommendation-item"
                  onClick={() => handleSelectUser(rec)}
                >
                  {rec.email}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="selected-users">
          {selectedUsers.map(user => (
            <div key={user.id} className="selected-user">
              <p>
                {user.email}
                <i onClick={() => handleRemoveUser(user.id)} className="fa-solid fa-xmark"></i>
              </p>
            </div>
          ))}
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
