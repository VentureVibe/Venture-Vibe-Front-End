import React, { useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapTravelPlan = ({ lat, lng }) => {
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: lat ? parseFloat(lat) : 0, // Default to 0 if lat is invalid
    lng: lng ? parseFloat(lng) : 0  // Default to 0 if lng is invalid
  };

  useEffect(() => {
    console.log('Map center:', center);
  }, [center]);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyCHC8CdWrCw593DZUii78rtRV-whzvwKwE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={map => console.log('Map loaded:', map)}
          onUnmount={map => console.log('Map unmounted:', map)}
        >
          { /* Child components, such as markers, info windows, etc. */ }
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapTravelPlan;
