import React from 'react'
import './ManageTripmates.scss';
import WestIcon from '@mui/icons-material/West';
import CloseIcon from '@mui/icons-material/Close';
import { tripmates } from '../../dummyData';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ManageTripmates = ({ onClose}) => {
  return (
    <div className='manageTripmates'>
        <div className="container">
            <div className="icons">
                <div className="back-i">
                    <i><WestIcon sx={{ color: '#747474', fontSize: 16 }}/></i>
                </div>
                <div className="closing-i" onClick={onClose}>
                    <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
                </div>
            </div>
            <div className="hearder">
                <span>Manage Tripmates</span>
            </div>
            <div className="body-container">
                {tripmates.length === 0 ? (
                    <span>No tripmates currently in plan</span>
                ) : (
                    tripmates.map((tripmate) => (
                        <div className="tripmate" key={tripmate.email}>
                            <div className="profile-pic">
                                <img src={tripmate.profilePic} alt={tripmate.email} />
                            </div>
                            <span className="email">{tripmate.email}</span>
                            <div className="remove-btn">
                                <i><DeleteOutlineIcon sx={{ color: '#ff0000', fontSize: 22 }}/></i>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  )
}

export default ManageTripmates
