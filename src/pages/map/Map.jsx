import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [placesDetails, setPlacesDetails] = useState([]);

  useEffect(() => {
    if (!window.google) return;

    const initMap = () => {
      const mapObj = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.0329, lng: 80.2168 },
        zoom: 13,
      });

      const serviceObj = new window.google.maps.places.PlacesService(mapObj);
      const autocompleteObj = new window.google.maps.places.Autocomplete(document.getElementById('search-input'));
      autocompleteObj.bindTo('bounds', mapObj);

      autocompleteObj.addListener('place_changed', () => onPlaceChanged(autocompleteObj, mapObj, serviceObj));

      mapObj.addListener('click', (event) => {
        mapObj.setCenter(event.latLng);
        findNearbyTouristPlaces(event.latLng, serviceObj);
      });

      setMap(mapObj);
      setService(serviceObj);
      setAutocomplete(autocompleteObj);
    };

    initMap();
  }, []);

  const onPlaceChanged = (autocomplete, map, service) => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log("Autocomplete's returned place contains no geometry");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    findNearbyTouristPlaces(place.geometry.location, service);
  };

  const findNearbyTouristPlaces = (location, service) => {
    const request = {
      location: location,
      radius: '5000',
      type: ['tourist_attraction'],
    };
    service.nearbySearch(request, callback);
  };

  const callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      const newMarkers = results.map((place) => createMarker(place));
      setMarkers(newMarkers);
    }
  };

  const createMarker = (place) => {
    const marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    marker.addListener('click', () => fetchPlaceDetails(place.place_id));
    return marker;
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const fetchPlaceDetails = (placeId) => {
    const request = {
      placeId: placeId,
      fields: ['name', 'rating', 'reviews', 'formatted_address', 'formatted_phone_number', 'website', 'photos'],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        displayPlaceDetails(place);
      }
    });
  };

  const displayPlaceDetails = (place) => {
    let photosHtml = '';
    if (place.photos) {
      photosHtml = place.photos.map(photo => <img src={photo.getUrl({ maxWidth: 400 })} alt={`${place.name} photo`} key={photo.getUrl()} />);
    }

    let reviewsHtml = '';
    if (place.reviews) {
      reviewsHtml = place.reviews.map((review, index) => <p key={index}>"{review.text}" - {review.author_name}</p>);
    }

    const placeDetails = (
      <div className="place-details" key={place.place_id}>
        <h2>{place.name}</h2>
        <p><strong>Rating:</strong> {place.rating}</p>
        <p><strong>Address:</strong> {place.formatted_address}</p>
        <p><strong>Phone:</strong> {place.formatted_phone_number}</p>
        <p><strong>Website:</strong> <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
        {photosHtml}
        {reviewsHtml}
      </div>
    );

    setPlacesDetails([placeDetails]);
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', margin: 0 }}>
      <div id="search-container" style={{
        position: 'absolute', top: '10px', left: '10px', width: '60%', zIndex: 5,
        background: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      }}>
        <input id="search-input" type="text" placeholder="Search for places..." style={{
          width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box',
        }} />
      </div>
      <div id="map" ref={mapRef} style={{ height: '100vh', width: '70%' }}></div>
      <div id="places" style={{
        height: '100vh', width: '30%', overflowY: 'auto', padding: '10px', boxSizing: 'border-box', borderLeft: '2px solid #ccc',
      }}>
        {placesDetails}
      </div>
    </div>
  );
};

export default Map;
