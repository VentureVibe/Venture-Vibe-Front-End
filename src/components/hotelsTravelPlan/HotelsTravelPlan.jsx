import React, { useEffect, useRef, useState } from 'react'
import './HotelsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Google from '../../assets/google-logo.png';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';
import { deleteDestination, getDestination, updateDestination } from '../../services/travelDestination/TravelDestination';

const HotelsTravelPlan = ({lat,long,addedHotels,setClickedPlace, setAddedHotels,updatePlacesInBackend,fetchTravelPlan,travelPlan}) => {
   
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isplaceVisible, setIsPlaceVisible] = useState(true);
    const [bestHotels, setbestHotels] = useState([]);
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


    const fetchBestHotels = (latitude, longitude) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          location: new window.google.maps.LatLng(latitude, longitude),
          radius: 25000, // 25 kilometers
          type: ['lodging'], // Focus on hotels and lodging
          keyword: 'hotels lodging resorts guesthouses', // Use relevant keywords for hotels and lodging
          region: 'LK' // Restricting to Sri Lanka
        };
      
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const filteredResults = results
              .filter(place => place.rating && place.user_ratings_total >= 5) // Filter by places with ratings and sufficient reviews
              .sort((a, b) => b.rating - a.rating); // Sort by highest rating
      
            setbestHotels(filteredResults); // Update state with filtered and sorted results
          } else {
            console.error('Error fetching best hotels:', status);
          }
        });
    };
      

    const handlePreviousClick = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 3, 0));
    };
  
    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 3, Math.max(0, bestHotels.length - 3)));
    };

    const handleAddToTrip = (place) => {
        // onclickPlace(place);
    
        const placeDetails = {
            place_id: place.place_id,
            name: place.name,
            rating: place.rating,
            user_ratings_total: place.user_ratings_total,
            geometry: place.geometry,
            photos: place.photos,
            types: place.types,
            vicinity: place.vicinity
        };
    
        updatePlacesInBackend(placeDetails,"Hotels")
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
          index:1,
          name: recentPlace.name,
          imgUrl: photoUrl,
          type: "Hotels",
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
    
            console.log("Before update:",  addedHotels);
    
            // Filter out the removed place and update the rest
            const updatedPlaces = await Promise.all(
                addedHotels
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
            await fetchTravelPlan(); // Ensure this fetches the latest state
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


    const handleSuggestionClick = (place) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: place.place_id }, (result, status) => {
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
                setInputValue('');
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
  
    // const handleDrop = (index) => {
    //     const updatedPlaces = [...addedHotels]; // Cloning the state
    //     const [draggedPlace] = updatedPlaces.splice(draggedIndex, 1);
    //     updatedPlaces.splice(index, 0, draggedPlace);
    //     setAddedHotels(updatedPlaces);
    //     setDraggedIndex(null);
    // };


    const isPlaceAdded = (placeId) => {
        return addedHotels.some(hotel => hotel.place_id === placeId);
    };
    

    useEffect(() => {
        if (lat && long) {
            fetchBestHotels(lat, long);
        }
       
    }, [lat, long]);


  return (
    <div className='hotelsTravelPlan' id='hotels-and-logging'>
        <div className='container'>
            <div className='places-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Hotels and Lodgings</h2>
            </div>
            {isBottomContainerVisible && (
              <div className='added-places-container'>
               {addedHotels.slice() // Create a copy of the array to avoid mutating the original array
            .sort((a, b) => a.index - b.index) // Sort by place.index
            .map((place, index) => (
                  <div
                      key={place.place_id}
                    //   draggable
                    //   onDragStart={() => handleDragStart(index)}
                    //   onDragOver={handleDragOver}
                    //   onDrop={() => handleDrop(index)}
                      className='draggable-item'
                  >

                      <PlaceTravelPlan
                          index={index+1}
                          placeId={place.index}
                          color='#0075C3'
                          handleRemoveFromTrip={() => handleRemoveFromTrip(place.id)}
                          place={place}
                          travelPlan={travelPlan}
                          fetchTravelPlan={fetchTravelPlan}
                          onClick={onclickPlace}
                      />
                      
                  </div>
                ))}
              </div>
            )}
            {isBottomContainerVisible && (
             <div className='add-place-container'>
                <div className="top">
                   <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
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
             </div>)}
            {isBottomContainerVisible && (
              <div className='recommended-places-heading-container' onClick={togglePlace}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Recommended Hotels & Lodgings</span>
            </div>)}
            {isBottomContainerVisible && isplaceVisible && (
            <div className='bottom-container'>
           
                <div className='bottom-container'>
                        <div className="button" onClick={handlePreviousClick}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <div className="middle">
                        {bestHotels.slice(currentIndex, currentIndex + 3).map(place => (
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
             
           
            </div>)}
        </div>
    </div>
  )
}


const FetchPlacePhoto = ({ placeId, children }) => {
    const [photoUrl, setPhotoUrl] = useState('');
  
    useEffect(() => {
      const fetchPhoto = () => {
        if (!placeId) return; // Return early if placeId is not defined
  
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
  
      if (window.google && window.google.maps && window.google.maps.places && placeId) {
        fetchPhoto();
      }
    }, [placeId]);
  
    return children(photoUrl);
  };

export default HotelsTravelPlan