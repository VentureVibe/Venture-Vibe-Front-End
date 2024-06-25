import React, { useState } from 'react'
import './RestaurantsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import { restaurants } from '../../dummyData';

const RestaurantsTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isplaceVisible, setIsPlaceVisible] = useState(true);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

    const bestRestaurants =  restaurants.slice(0, 3);

  return (
    <div className='restaurantsTravelPlan' id='restaurants'>
        <div className='container'>
            <div className='restaurants-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Restaurants</h2>
            </div>
            {isBottomContainerVisible && (
            <PlaceTravelPlan number='1' name='Hungry Restaurant Galle' color="#F68712"/>
        )}
            {isBottomContainerVisible && (<div className='add-restaurant-container'>
                <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
                <input type='text' placeholder='Add a restaurant'></input>
            </div>)}
            {isBottomContainerVisible && (<div className='recommended-restaurants-heading-container' onClick={togglePlace}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Recommended Restaurants</span>
            </div>)}
            {isBottomContainerVisible && isplaceVisible && (<div className='bottom-container'>
            {
              bestRestaurants.map(post => (
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

export default RestaurantsTravelPlan