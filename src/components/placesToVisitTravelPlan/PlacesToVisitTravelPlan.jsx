import React from 'react'
import "./PlacesToVisitTravelPlan.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

const PlacesToVisitTravelPlan = () => {
  return (
    <div className='placesToVisitTravelPlan'>
        <div className='container'>
            <div className='places-heading-container'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Places to Visit</h2>
            </div>
            <div className='show-place-container'>
                <div className="place-name">
                    <div className="icon-tag">
                        <i><LocationOnIcon sx={{ color: '#1BBC9B', fontSize: 35 }}/></i>
                        <span>1</span>   
                    </div>
                    <span>Induruwa Sea Turtle Conservation Center</span>
                    <i className='delete'><DeleteIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
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
            </div>
            {/* <div className='show-place-container'>
                <div className="place-name">
                    <div className="icon-tag">
                        <span>1</span>
                        <i></i>
                    </div>
                    <span>Galle Dutch Fort</span>
                </div>
                <div className="add-notes">
                    <input type="text" placeholder='Add notes, links, etc. here'/>
                </div>
                <div className="bottom-show-place">
                    <div className="add-attachment">
                        <i></i>
                        <span>Attach</span>
                    </div>
                    <div className="add-cost">
                        <i></i>
                        <span>Add cost</span>
                    </div>
                </div>
            </div> */}
            <div className='add-place-container'>
                <i><LocationOnIcon sx={{ color: '#414143', fontSize: 25 }}/></i>
                <input type='text' placeholder='Add a place'></input>
            </div>
            <div className='recommended-places-heading-container'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <span>Recommended Places</span>
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

export default PlacesToVisitTravelPlan