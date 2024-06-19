import React, { useState } from 'react'
import './NotesTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NotesTravelPlan = () => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  return (
    <div className='notesTravelPlan' id='notes'>
        <div className='container'>
            <div className='top-container' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Notes</h2>
            </div>
            {isBottomContainerVisible && (<div className='bottom-container'>
                <textarea name="" id="" placeholder='Write or paste anything here. how to get around, tips and tricks'></textarea>
            </div>)}
        </div>
    </div>

  )
}

export default NotesTravelPlan