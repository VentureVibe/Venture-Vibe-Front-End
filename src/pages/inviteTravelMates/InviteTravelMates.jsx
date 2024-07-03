import React from 'react';
import "./InviteTravelMates.scss";
import { Link } from 'react-router-dom';

const InviteTravelMates = () => {
  return (
    <div className='inviteTravelMates'>
        <div className="container">
            <h1>Invite tripmates to your Hawaii trip</h1>
            <div className="where-to">
                <span>Invite tripmates</span>
                <input type="text" placeholder="Enter an email address" />
            </div>
            <div className="btn-container">
                <Link to="/travelplan/12">
                    <span>Start Planning</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default InviteTravelMates