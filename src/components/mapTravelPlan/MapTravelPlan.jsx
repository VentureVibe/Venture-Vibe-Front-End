import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const MapTravelPlan = ({ lat, lng }) => {
  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  console.log(lat);

  const center = {
    lat: lat, // Default to a specific location if lat is invalid
    lng: lng   // Default to a specific location if lng is invalid
  };

  return (
  
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
   
  );
};

export default MapTravelPlan;
