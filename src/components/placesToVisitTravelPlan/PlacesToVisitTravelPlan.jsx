import React, { useEffect, useState, useRef } from 'react';
import "./PlacesToVisitTravelPlan.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';
import Google from '../../assets/google-logo.png';
import { updateDestination, getDestination,deleteDestination } from '../../services/travelDestination/TravelDestination';


const PlacesToVisitTravelPlan = ({ lat, long ,setClickedPlace,addedPlaces,updatePlacesInBackend,fetchTravelPlan,travelPlan}) => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isPlaceVisible, setIsPlaceVisible] = useState(true);
    const [bestPlaces, setBestPlaces] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [inputValue, setInputValue] = useState('');
    const [placeSuggestions, setPlaceSuggestions] = useState([]);
    const whereToInputRef = useRef(null);
    const autocompleteService = useRef(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    
    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

    const fetchBestPlaces = (latitude, longitude) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: new window.google.maps.LatLng(latitude, longitude),
            radius: 25000, // 25 kilometers
            type: ['tourist_attraction', 'museum', 'art_gallery', 'park', 'natural_feature', 'temple'],
            keyword: 'scenic spots hiking trails landmarks nature reserves cultural sites historical sites temples beaches',
            region: 'LK' // Restricting to Sri Lanka
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const filteredResults = results
                    .filter(place =>
                        !['lodging', 'restaurant'].some(exclude => place.types.includes(exclude))
                    )
                    .filter(place => place.rating && place.user_ratings_total >= 5)
                    .sort((a, b) => b.rating - a.rating);

                setBestPlaces(filteredResults);
            } else {
                console.error('Error fetching best places:', status);
            }
        });
    };

    const handlePreviousClick = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 3, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 3, Math.max(0, bestPlaces.length - 3)));
    };

    const handleAddToTrip = (place) => {
        // onclickPlace(place);
  
        // Create a new place object with all desired attributes
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
    
        updatePlacesInBackend(placeDetails,"Places")
    };
     
    const onclickPlace = (recentPlace) => {
        const lat = recentPlace.geometry?.location?.lat() || recentPlace.lat;
        const longi = recentPlace.geometry?.location?.lng() || recentPlace.longi;
  
        if (isNaN(lat) || isNaN(longi)) {
          throw new Error('Invalid latitude or longitude values');
        }
  
        const photoUrl ='';
  
        const updatedPlace = {
          lat: lat,
          longi: longi,
          description: recentPlace.name,
          index:addedPlaces.length+1,
          name: recentPlace.name,
          imgUrl: photoUrl,
          type: "Places",
          rating:recentPlace.rating,
      
        };
    
       setClickedPlace( updatedPlace );
    };
    
    const handleRemoveFromTrip = async (id) => {
        try {
            // Remove the destination
            await deleteDestination(id);
            
            // Fetch the updated travel plan to refresh addedPlaces
            await fetchTravelPlan();  // Ensure fetchTravelPlan is async if you need to wait for it
    
            console.log("Before update:", addedPlaces);
    
            // Filter out the removed place and update the rest
            const updatedPlaces = await Promise.all(
                addedPlaces
                    .filter((place) => place.id !== id) // Exclude the place with the specified id
                    .map(async (place, index) => {
                        const place1 = await getDestination(place.id);
                        place1.index = index; // Update the index (starting from 0)
                        return place1;
                    })
            );
    
            console.log("Updated places:", updatedPlaces);
    
            // Optionally update the backend with the new places
            for (let i = 0; i < updatedPlaces.length; i++) {
                await updateDestination(updatedPlaces[i]);
            }
    
            // Fetch the updated travel plan after all places are updated
            await fetchTravelPlan();
           // Ensure this fetches the latest state
        } catch (error) {
            console.error(error);
        }
    };
    
    
    

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            if (!autocompleteService.current) {
                autocompleteService.current = new window.google.maps.places.AutocompleteService();
            }

            autocompleteService.current.getPlacePredictions({ input: value, region: 'LK' }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setPlaceSuggestions(predictions);
                } else {
                    console.error('Error fetching place suggestions:', status);
                }
            });
        } else {
            setPlaceSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        
        // Fetch the full details of the selected place using place_id
        service.getDetails({ placeId: suggestion.place_id }, (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
                const placeDetails = {
                    place_id: result.place_id,
                    name: result.name,
                    rating: result.rating,
                    user_ratings_total: result.user_ratings_total,
                    geometry: result.geometry,  // Include geometry if needed
                    photos: result.photos,      // Include photos if available
                    types: result.types,        // Include types if available
                    vicinity: result.vicinity   // Include vicinity if available
                };
                
                handleAddToTrip(placeDetails); // Add place with full details to trip
                setPlaceSuggestions([]); // Clear suggestions after selection
                setInputValue(''); // Optionally clear input field
            } else {
                console.error('Error fetching place details:', status);
            }
        });
    };
    

    // const handleDragStart = (index) => {
    //     setDraggedIndex(index);
    // };

    // const handleDragOver = (event) => {
    //     event.preventDefault(); // Necessary to allow drop
    // };

    // const handleDrop = async (index) => {
    //     const updatedPlaces = [...addedPlaces];
      
    //     const [draggedPlace] = updatedPlaces.splice(draggedIndex, 1);
    //     updatedPlaces.splice(index, 0, draggedPlace);
    
    //     // Update the state with a function to guarantee the latest value
    //     setAddedPlaces(() => updatedPlaces);
     
    //  // Correctly log the new array
    //     for (let i = 0; i < updatedPlaces.length; i++) {
    //         const place = updatedPlaces[i];
      
    //         try {
    //             // Fetch the place data from the backend
    //             const place1 = await getDestination(place.id);
           
    //             // Update only the specific attribute, e.g., the index
    //             place1.index =i+1; // Update the index
        
    //             // Send the updated place with the new index to the backend
    //             const { data } = await updateDestination(place1);
    //         } catch (error) {
    //             console.error('Error updating place:', error);
    //         }
    //     }
    //     fetchTravelPlan();
    //     setDraggedIndex(null);
    // };

    useEffect(() => {
        if (lat && long) {
            fetchBestPlaces(lat, long);
        }
        console.log(setClickedPlace);
    }, [lat, long]);

    const isPlaceAdded = (placeId) => {
        return addedPlaces.some(place => place.place_id === placeId);
    };



    return (
        
        <div className='placesToVisitTravelPlan' id='places-to-visit'>
            <div className='container'>
                <div className='places-heading-container' onClick={toggleBottomContainer}>
                    <i><KeyboardArrowDownIcon sx={{ color: '#747474' }} /></i>
                    <h2>Places to Visit</h2>
                </div>
                {isBottomContainerVisible && (
                  <div className='added-places-container'>
                        {addedPlaces
                             .slice() // Create a copy of the array to avoid mutating the original array
                             .sort((a, b) => a.index - b.index) // Sort by place.index
                             .map((place, index) => (
                   <div
                       key={place.place_id}
                       // draggable
                       // onDragStart={() => handleDragStart(index)}
                       // onDragOver={handleDragOver}
                       // onDrop={() => handleDrop(index,place)}
                       className='draggable-item'
                    >
                    <PlaceTravelPlan

                        placeId={place.index} // Assign index in ascending order
                        color='#1BBC9B'
                        handleRemoveFromTrip={() => handleRemoveFromTrip(place.id)} 
                        place={place}
                        onClick={onclickPlace}
                        travelPlan={travelPlan}
                        fetchTravelPlan={fetchTravelPlan}
                    />
                </div>
            ))}
                  </div>
                )}

                {isBottomContainerVisible && (
                    <div className='add-place-container'>
                        <div className="top">
                          <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }} /></i>
                          <input
                            type='text'
                            placeholder='Add a place'
                            value={inputValue}
                            onChange={handleInputChange}
                            ref={whereToInputRef}
                        />
                        </div>
                        <div className="bottom">
                          {placeSuggestions.length > 0 && (
                            <div className='suggestions-list'>
                                {placeSuggestions.map(suggestion => (
                                    <div className="cont" key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                                        <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }} /></i>
                                        {suggestion.description}
                                    </div>
                                ))}
                            </div>
                          )}
                        </div>
                       
                    </div>
                )}
                {isBottomContainerVisible && (
                    <div className='recommended-places-heading-container' onClick={togglePlace}>
                        <i><KeyboardArrowDownIcon sx={{ color: '#747474' }} /></i>
                        <span>Recommended Places</span>
                    </div>
                )}
                {isBottomContainerVisible && isPlaceVisible && (
                    <div className='bottom-container'>
                        <div className="button" onClick={handlePreviousClick}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <div className="middle">
                            {bestPlaces.slice(currentIndex, currentIndex + 3).map(place => (
                                <div className='article' key={place.place_id} onClick={() => onclickPlace(place)}>
                                    <FetchPlacePhoto placeId={place.place_id}>
                                        {photoUrl => (
                                            <img className='post-cover' src={photoUrl} alt={place.name} />
                                        )}
                                    </FetchPlacePhoto>
                                    <div className='info'>
                                        <span className='hotel-name'>{place.name}</span>
                                        <div className='rating'>
                                            <i className="fa-solid fa-star"></i>
                                            {place.rating}
                                            <img src={Google} alt="" />
                                        </div>
                                        <div className="add-booking-btn">
                                            {isPlaceAdded(place.place_id) ? (
                                                <div >
                                                    <i class="fa-solid fa-square-check"></i>
                                                    <span>Added to Trip</span>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleAddToTrip(place)}>
                                                    <i className="fa-solid fa-bookmark"></i>
                                                    <span>Add to Trip</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="button" onClick={handleNextClick}>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FetchPlacePhoto = ({ placeId, children }) => {
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        const fetchPhoto = () => {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));
            const request = {
                placeId: placeId,
                fields: ['photos'],
            };

            service.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.photos && place.photos.length > 0) {
                    const url = place.photos[0].getUrl({ maxWidth: 400 });
                    setPhotoUrl(url);
                }
            });
        };

        if (window.google && window.google.maps && window.google.maps.places) {
            fetchPhoto();
        }
    }, [placeId]);

    return children(photoUrl);
};

export default PlacesToVisitTravelPlan;
