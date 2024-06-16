import React from 'react'
import './EventsTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

const EventsTravelPlan = () => {
  return (
    <div className='eventsTravelPlan'>
        <div className='container'>
            <div className='events-heading-container'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Events and Activities</h2>
            </div>
            <div className='show-events-container'>
                <div className="event-name">
                    <div className="icon-tag">
                        <i><LocationOnIcon sx={{ color: '#15BAD3', fontSize: 35 }}/></i>
                        <span>1</span>   
                    </div>
                    <span>Scuba Diving in Unawatuna</span>
                    <i className='delete'><DeleteIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                </div>
                <div className="add-notes">
                    <input type="text" placeholder='Add notes, links, etc. here'/>
                </div>
                <div className="bottom-events-place">
                    <div className="add-attachment">
                        <i><AttachFileIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>Attach</span>
                    </div>
                    <div className="add-cost">
                        <i><AttachMoneyIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>Add cost</span>
                    </div>
                </div>
            </div>
            {/* <div className='add-place-container'>
                <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
                <input type='text' placeholder='Add a restaurant'></input>
            </div> */}
            <div className='recommended-events-heading-container'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Add Events and Activities</span>
            </div>
            <div className='bottom-container'>
                <div className='place'></div>
                <div className='place'></div>
                <div className='place'></div>
            </div>

        </div>
    </div>
  )
}

export default EventsTravelPlan