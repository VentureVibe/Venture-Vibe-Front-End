import React from 'react'
import './HotelsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import HotelIcon from '@mui/icons-material/Hotel';

const HotelsTravelPlan = () => {
  return (
    <div className='hotelsTravelPlan'>
        <div className='container'>
            <div className='hotels-tag'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Hotels and lodging</h2>
            </div>
            <div className='add-find-hotels'>
                <div className='add-lodging'>
                    <i><AddIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                    <span>Add lodging</span>
                </div>
                <div className='find-hotel'>
                    <i><HotelIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                    <span>Find hotels</span>
                </div>
            </div>
            <div className='bottom-container'>
                <div className='article'></div>
                <div className='article'></div>
                <div className='article'></div>
            </div>
        </div>
    </div>
  )
}

export default HotelsTravelPlan