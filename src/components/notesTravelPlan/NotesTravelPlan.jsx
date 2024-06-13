import React from 'react'
import './NotesTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NotesTravelPlan = () => {
  return (
    <div className='notesTravelPlan'>
        <div className='container'>
            <div className='top-container'>
                <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                <h2>Notes</h2>
            </div>
            <div className='bottom-container'>
                <textarea name="" id="" placeholder='Write or paste anything here. how to get around, tips and tricks'></textarea>
            </div>
        </div>
    </div>

  )
}

export default NotesTravelPlan