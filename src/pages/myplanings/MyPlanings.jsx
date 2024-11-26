import React from 'react';
import './MyPlanings.scss';
import { Link, Outlet } from 'react-router-dom';
import { GoogleMap,Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const MyPlanings = ({locations}) => {
  return (
    <div className='myplannings'>
      <div className="left">
        <div className="top">
          <div className="cont">
            <i className='fa-solid fa-square-check'></i>
            <Link to="/myplannings"><p>My Plannings</p></Link>
          </div>
          <Link to="travelinvitations">
            <div className="cont">
              <i className="fa-solid fa-envelope-open-text"></i>
              <p>Travel Invitations</p>
            </div>
          </Link>
        </div>
        <div className="bottom">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="right">
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7.7}
        >
          {/* Render markers for each location */}
          {locations?.map(location => (
            <Marker
              key={location.id} // Unique key for each marker
              position={{ lat: location.lat, lng: location.lng }}
              title={location.location} // Display location name on hover
            />
          ))}
        </GoogleMap>
 
      </div>
    </div>
  );
};

export default MyPlanings;
