import React from 'react';
import "./InviteTravelMates.scss";
import { Link, useLocation } from 'react-router-dom';

const InviteTravelMates = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const locationName = decodeURIComponent(params.get('location'));
  const lat = params.get('lat');
  const lng = params.get('lng');

  return (
    <div className='inviteTravelMates'>
      <div className="container">
        <h1>Invite tripmates to your trip to {locationName}</h1>
        <div className="where-to">
          <span>Invite tripmates</span>
          <input type="text" placeholder="Enter an email address" />
        </div>
        <div className="btn-container">
          <Link to={`/travelplan/${startDate}/${endDate}/${locationName}/${lat}/${lng}`}>
            <span>Start Planning</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InviteTravelMates;
