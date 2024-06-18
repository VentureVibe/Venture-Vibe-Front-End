import React, { useState } from 'react'
import './TransportTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';

const TransportTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);
    const [isplaceVisible, setIsPlaceVisible] = useState(false);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };
  return (
    <div className='transportTravelPlan'>
        <div className='container'>
            <div className='transport-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Transport Services</h2>
            </div>
            {isBottomContainerVisible && (
                <PlaceTravelPlan number='1' name='Amas Transport' color='#1BBC9B'/>
            )}
           {isBottomContainerVisible && ( <div className='recommended-transport-heading-container' onClick={togglePlace}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Add Transport Services</span>
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

export default TransportTravelPlan