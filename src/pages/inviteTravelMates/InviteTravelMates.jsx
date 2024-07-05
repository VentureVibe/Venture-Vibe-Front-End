import React from 'react';
import "./InviteTravelMates.scss";
import { Link, useParams, useLocation } from 'react-router-dom';

const InviteTravelMates = () => {
  
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const to = queryParams.get('endDate');
  const from = queryParams.get('startDate');
  const location= queryParams.get('location');
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');


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
    </div>
  );
}

export default InviteTravelMates;
