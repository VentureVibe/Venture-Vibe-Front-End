import React, { useState } from 'react'
import './EventsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceTravelPlan from '../placeTravelPlan/PlaceTravelPlan';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import { events } from '../../dummyData';

const EventsTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
    const [isplaceVisible, setIsPlaceVisible] = useState(true);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const togglePlace = () => {
        setIsPlaceVisible(prevState => !prevState);
    };

    const bestEvents =  events.slice(0, 3);

  return (
    <div className='eventsTravelPlan' id='activities'>
        <div className='container'>
            <div className='events-heading-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Events and Activities</h2>
            </div>
            {isBottomContainerVisible && (
                <PlaceTravelPlan number='1' name='Scuba Diving in Unawatuna' color='#15BAD3'/>
            )}
            {/* <div className='add-place-container'>
                <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
                <input type='text' placeholder='Add a restaurant'></input>
            </div> */}
            {isBottomContainerVisible && (<div className='recommended-events-heading-container' onClick={togglePlace}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Add Events and Activities</span>
            </div>)}
            {isBottomContainerVisible && isplaceVisible && (<div className='bottom-container'>
            {
              bestEvents.map(post => (
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

export default EventsTravelPlan