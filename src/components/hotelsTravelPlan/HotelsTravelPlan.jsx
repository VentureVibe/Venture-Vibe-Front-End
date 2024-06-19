import React, { useState } from 'react'
import './HotelsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

const HotelsTravelPlan = () => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

  return (
    <div className='hotelsTravelPlan' id='hotels-and-logging'>
        <div className='container'>
            <div className='hotels-tag' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Hotels and lodging</h2>
            </div>
           {isBottomContainerVisible && ( <div className='show-hotel-container'>
                <div className="hotel-name">
                    <span>Radisson Blu Resort, Galle</span>
                    <i className='delete'><DeleteIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                </div>
                <div className="address-hotel">
                    <span>523C Colombo Main Rd, Galle 80280, Sri Lanka</span>
                </div>
                <div className="date-hotel">
                    <span>Mon, Jun 10th - Tue, Jun 11th</span>
                </div>
                <div className="add-notes">
                    <input type="text" placeholder='Add notes, links, etc. here'/>
                </div>
                <div className="bottom-show-place">
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
            {isBottomContainerVisible && (<div className='add-find-hotels'>
                <div className='add-lodging'>
                    <i><AddIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                    <span>Add lodging</span>
                </div>
                <div className='find-hotel'>
                    <i><HotelIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                    <span>Find hotels</span>
                </div>
            </div>)}
            {isBottomContainerVisible && (<div className='bottom-container'>
                <div className='article'></div>
                <div className='article'></div>
                <div className='article'></div>
            </div>)}
        </div>
    </div>
  )
}

export default HotelsTravelPlan