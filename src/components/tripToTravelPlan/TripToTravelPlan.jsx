import React from 'react'
import "./TripToTravelPlan.scss"
import man from "../../assets/man.jpg"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const TripToTravelPlan = () => {
  return (
    <div className='tripToTravelPlan'>
        <div className='container'>
            <h1>Trip to Galle</h1>
            <div className='bottom-container'>
                <div className='date'>
                    <i><CalendarMonthOutlinedIcon sx={{ color: '#747474', fontSize: 20 }}/></i>
                    <span>6/9 - 6/15</span>
                </div>
                <div className='people-container'>
                    <div className='profile-pic'>
                        <img src={man} alt="" />
                    </div>
                    <i><GroupAddIcon sx={{ color: '#747474', fontSize: 27 }}/></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TripToTravelPlan