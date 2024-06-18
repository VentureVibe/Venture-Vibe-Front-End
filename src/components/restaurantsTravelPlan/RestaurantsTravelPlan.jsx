import React, { useState } from 'react'
import './RestaurantsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

const RestaurantsTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);
    const [isplaceVisible, setIsPlaceVisible] = useState(false);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

  return (
    <div className='restaurantsTravelPlan'>
        <div className='container'>
            <div className='restaurants-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Restaurants</h2>
            </div>
            {isBottomContainerVisible && (<div className='show-restaurant-container'>
                <div className="restaurant-name">
                    <div className="icon-tag">
                        <i><LocationOnIcon sx={{ color: '#F68712', fontSize: 35 }}/></i>
                        <span>1</span>   
                    </div>
                    <span>Hungry Restaurant Galle</span>
                    <i className='delete'><DeleteIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                </div>
                <div className="add-notes">
                    <input type="text" placeholder='Add notes, links, etc. here'/>
                </div>
                <div className="bottom-show-restaurant">
                    <div className="add-attachment">
                        <i><AttachFileIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>Attach</span>
                    </div>
                    <div className="add-cost">
                        <i><AttachMoneyIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>Add cost</span>
                    </div>
                </div>
            </div>)}
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