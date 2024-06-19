import React, { useState } from 'react'
import './RestaurantsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const RestaurantsTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isplaceVisible, setIsPlaceVisible] = useState(true);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

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
                <div className='restaurant'></div>
                <div className='restaurant'></div>
                <div className='restaurant'></div>
            </div>)}

        </div>
    </div>
  )
}

export default RestaurantsTravelPlan