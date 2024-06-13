import React from 'react'
import "./ExploreTravelPlan.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

const ExploreTravelPlan = () => {
  return (
    <div className='exploreTravelPlan'>
        <div className='container'>
            <div className='top-container'>
                <div className='explore-tag'>
                    <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
                    <h2>Explore</h2>
                </div>
                <div className='browseall-btn'>
                    <i><SearchIcon sx={{ color: '#ffffff', fontSize: 20 }}/></i>
                    <span>Browse All</span>
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

export default ExploreTravelPlan