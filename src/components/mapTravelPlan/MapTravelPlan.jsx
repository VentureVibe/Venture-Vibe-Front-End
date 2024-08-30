import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import './MapTravelPlan.scss';
import Google from '../../assets/google-logo.png';

const MapTravelPlan = ({ lat, lng, clickedPlace, addedPlaces, setAddedPlaces,addedRestaurants,addedHotels, updatePlacesInBackend}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const [infoWindowIndex, setInfoWindowIndex] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '100%',
    outlineFocus: 'none !important',
    border: 'none'
  };

  const center = {
    lat: lat || 6.9271,
    lng: lng || 79.8612
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: ['places'],
  });

  useEffect(() => {
    if (clickedPlace) {
      setSelectedPlace(clickedPlace);
      setDetailsVisible(true);
      if (mapRef.current) {
        mapRef.current.panTo({
          lat: clickedPlace.lat,
          lng: clickedPlace.longi,
        });
      }
    }
  }, [clickedPlace]);

  const handleMapClick = useCallback((event) => {
    const latLng = event.latLng;
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      location: latLng,
      radius: 15,
      type: ['tourist_attraction', 'museum', 'art_gallery', 'park', 'natural_feature', 'temple'],
      keyword: 'scenic spots, hiking trails, landmarks, nature reserves, cultural sites, historical sites, temples, beaches',
      region: 'LK'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const place = results[0];
        setSelectedPlace(place);
        setDetailsVisible(true);
        mapRef.current.panTo(latLng);
      } else {
        console.error('No places found or error fetching places');
      }
    });
  }, []);

  const handleIconClick = useCallback((placeId) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    
    const request = {
      placeId: placeId,
      fields: ['name', 'geometry', 'vicinity', 'rating', 'types']
    };
    
    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        setSelectedPlace(place);
        setDetailsVisible(true);
        mapRef.current.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error('Error fetching place details');
      }
    });
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedPlace(null);
    setDetailsVisible(false);
  }, []);

  const handleAddToTrip = (place) => {
    const placeDetails = {
      place_id: place.place_id,
      name: place.name,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      geometry: place.geometry, // Include geometry if needed
      photos: place.photos,     // Include photos if available
      types: place.types,       // Include types if available
      vicinity: place.vicinity  // Include vicinity if available
    };
    updatePlacesInBackend(placeDetails)
 
  };

  const handleMarkerClick = (place, index) => {
    setSelectedPlace(place);
    setDetailsVisible(true);
    setInfoWindowIndex(index);
  };

  const customMarkerIcon = (index) => {
    const markerLabel = String(index + 1);
    const svgContent = `
       <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
       <!-- Location pin shape -->
        <path d="M25 3C15.85 3 8.75 10.1 8.75 19c0 4.07 1.5 7.99 4.11 11.03L25 47l12.14-16.97C40.3 27.99 41.75 24.07 41.75 19 41.75 10.1 34.65 3 25 3z" fill="#1BBC9B" stroke="white" stroke-width="4"/>
        <!-- Text in the center -->
        <text x="25" y="28" font-size="18" font-weight="bold" text-anchor="middle" alignment-baseline="middle" fill="#FFFFFF">${markerLabel}</text>
     </svg>
    `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgContent)}`;
  };

  const restaurantMarkerIcon = (index) => {
 
    const markerLabel = String(index + 1); // Index starts from 1
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <!-- Location pin shape -->
        <path d="M25 3C15.85 3 8.75 10.1 8.75 19c0 4.07 1.5 7.99 4.11 11.03L25 47l12.14-16.97C40.3 27.99 41.75 24.07 41.75 19 41.75 10.1 34.65 3 25 3z" fill="#F68712" stroke="white" stroke-width="4"/>
        <!-- Text in the center -->
        <text x="25" y="28" font-size="18" font-weight="bold" text-anchor="middle" alignment-baseline="middle" fill="#FFFFFF">${markerLabel}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgContent)}`;
  };
  
  
  const hotelMarkerIcon = (index) => {
    const markerLabel = String(index + 1); // Index starts from 1
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <!-- Location pin shape -->
        <path d="M25 3C15.85 3 8.75 10.1 8.75 19c0 4.07 1.5 7.99 4.11 11.03L25 47l12.14-16.97C40.3 27.99 41.75 24.07 41.75 19 41.75 10.1 34.65 3 25 3z" fill="#0075C3" stroke="white" stroke-width="4"/>
        <!-- Text in the center -->
        <text x="25" y="28" font-size="18" font-weight="bold" text-anchor="middle" alignment-baseline="middle" fill="#FFFFFF">${markerLabel}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgContent)}`;
  };
  
  

  return isLoaded ? (
    <div className="maptravelplan">
      <div className="map-container">
        <GoogleMap
          className="containerStyle"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
            if (lat && lng) {
              map.panTo(center);
            }
  
            map.addListener('click', (event) => {
              if (event.placeId) {
                event.stop();
                handleIconClick(event.placeId);
              }
            });
          }}
          onClick={handleMapClick}
          options={{
            disableDefaultUI: true,
            clickableIcons: true,
            disableDoubleClickZoom: true,
            draggableCursor: 'pointer'
          }}
        >
          {selectedPlace && (
            <Marker
              position={{
                lat: selectedPlace.lat,
                lng: selectedPlace.longi,
              }}
            />
          )}
          {addedPlaces.map((place, index) => (
            <Marker
              key={place.id}
              position={{
                lat: place.lat,
                lng: place.longi,
              }}
              icon={customMarkerIcon(index)}
              // onClick={() => handleMarkerClick(place, index)}
            />
          ))}
          {addedRestaurants.map((restaurant, index) => (
            <Marker
              key={restaurant.place_id}
              position={{
                lat: restaurant.geometry.location.lat(),
                lng: restaurant.geometry.location.lng(),
              }}
              icon={restaurantMarkerIcon(index)}
              onClick={() => handleMarkerClick(restaurant, index)}
            />
          ))}
           {addedHotels.map((hotel, index) => (
            <Marker
              key={hotel.place_id}
              position={{
                lat: hotel.geometry.location.lat(),
                lng:hotel.geometry.location.lng(),
              }}
              icon={hotelMarkerIcon(index)}
              onClick={() => handleMarkerClick(hotel, index)}
            />
          ))}
        </GoogleMap>
        {detailsVisible && selectedPlace && (
          <div className="bottom">
            <div className="cont">
              <i className="fa-regular fa-circle-xmark" onClick={handleCloseDetails}></i>
              <div className="details">
                <div className="top">
                  <div className="left"> 
                    <h3><i className="fa-solid fa-location-dot"></i> {selectedPlace.name}</h3>
                    <button onClick={() => handleAddToTrip(selectedPlace)}>
                      <i className="fa-solid fa-bookmark"></i> 
                      Add to places
                    </button>
                    <div className="rating">
                      <i className="fa-solid fa-star"></i>
                      <p>{selectedPlace.rating || 'No rating available'}</p>
                      <img src={Google} alt="" />
                    </div>
                  </div>
                  <div className="right">
                    {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                      <img
                        src={selectedPlace.photos[0].getUrl({ maxWidth: 400, maxHeight: 200 })}
                        alt={selectedPlace.name}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : <div>Loading...</div>;
  
};

export default MapTravelPlan;
