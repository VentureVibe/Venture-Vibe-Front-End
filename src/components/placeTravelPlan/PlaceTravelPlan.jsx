import React, { useState } from 'react'
import "./PlaceTravelPlan.scss";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PlaceTravelPlan = ({number, name, color}) => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);

    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };
  return (
    <div className='placeTravelPlan'>
        <div className='show-place-container'>
                <div className="place-name">
                    <div className="icon-tag">
                        <i><LocationOnIcon sx={{ color: color, fontSize: 35 }}/></i>
                        <span style={{ backgroundColor: color }}>{number}</span> 
                    </div>
                    <span onClick={toggleBottomContainer}>{name}</span>
                    <i className='delete'><DeleteIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                </div>
                {isBottomContainerVisible && (<div className="add-notes">
                    <input type="text" placeholder='Add notes, links, etc. here'/>
                </div>)}
                {isBottomContainerVisible && (<div className="bottom-show-place">
                    <div className="add-attachment">
                        <i><AttachFileIcon sx={{ color: '#414143', fontSize: 16 }}/></i>
                        <span>Attach</span>
                    </div>
                    <div className="add-cost">
                        <i><AttachMoneyIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>Add cost</span>
                    </div>
                </div>)}
            </div>
    </div>
  )
}

export default PlaceTravelPlan