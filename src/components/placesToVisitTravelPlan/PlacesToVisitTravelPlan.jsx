import React, { useState } from 'react'
import "./PlacesToVisitTravelPlan.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { places } from '../../dummyData';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';

const PlacesToVisitTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isplaceVisible, setIsPlaceVisible] = useState(true);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

    const bestHotels =  places.slice(0, 3);

  return (
    <div className='placesToVisitTravelPlan' id='places-to-visit'>
        <div className='container'>
            <div className='places-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Places to Visit</h2>
            </div>
            {isBottomContainerVisible && (
                <PlaceTravelPlan number='1' name='Induruwa Sea Turtle Conservation Center' color='#1BBC9B'/>
            )}
            {isBottomContainerVisible && (<div className='add-place-container'>
                <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
                <input type='text' placeholder='Add a place'></input>
            </div>)}
            {isBottomContainerVisible && (<div className='recommended-places-heading-container' onClick={togglePlace}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Recommended Places</span>
            </div>)}
            {isBottomContainerVisible && isplaceVisible && (<div className='bottom-container'>
            {
              bestHotels.map(post => (
                <div className='article' key={post.id}>
                  <img className='post-cover' src={post.imageSrc} alt='' />
                  <div className='info'>
                    <span className='hotel-name'>{post.name}</span>
                    <div className='rating'>
                        <i><StarRateIcon sx={{ color: '#414143', fontSize: 15 }}/></i>
                        <i><StarRateIcon sx={{ color: '#414143', fontSize: 15 }}/></i>
                        <i><StarRateIcon sx={{ color: '#414143', fontSize: 15 }}/></i>
                        <i><StarRateIcon sx={{ color: '#414143', fontSize: 15 }}/></i>
                    </div>
                    <div className="add-booking-btn">
                        <i><BookmarkOutlinedIcon sx={{ fontSize: 20 }}/></i>
                        <span>Add to Trip</span>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>)}

        </div>
    </div>
  )
}

export default PlacesToVisitTravelPlan