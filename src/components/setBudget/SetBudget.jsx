import React from 'react'
import './SetBudget.scss';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SetBudget = () => {
  return (
    <div className='setBudget'>
        <div className="container">
            <div className="closing-i">
                <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
            </div>
            <div className="hearder">
                <span>Set Budget</span>
            </div>
            <div className="type-budget">
                <i><AttachMoneyIcon sx={{ color: '#747474', fontSize: 22 }}/></i>
                <input type="text" placeholder='0'/>
            </div>
            <div className="save-btn">
                <span>Save</span>
            </div>
        </div>
    </div>
  )
}

export default SetBudget
