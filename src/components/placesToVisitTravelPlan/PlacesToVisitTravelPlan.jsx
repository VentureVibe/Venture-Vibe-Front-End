import React, { useState } from 'react'
import "./PlacesToVisitTravelPlan.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const PlacesToVisitTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);
    const [isplaceVisible, setIsPlaceVisible] = useState(false);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

  return (
    <div className='placesToVisitTravelPlan'>
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
                <div className='place'></div>
                <div className='place'></div>
                <div className='place'></div>
            </div>)}

        </div>
    </div>
  )
}

export default PlacesToVisitTravelPlan