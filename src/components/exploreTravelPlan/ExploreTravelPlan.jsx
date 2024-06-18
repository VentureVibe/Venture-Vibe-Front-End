import React, { useState } from 'react';
import "./ExploreTravelPlan.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

const ExploreTravelPlan = () => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  return (
    <div className='exploreTravelPlan'>
      <div className='container'>
        <div className='top-container'>
          <div className='explore-tag' onClick={toggleBottomContainer}>
            <i><KeyboardArrowDownIcon sx={{ color: '#747474' }} /></i>
            <h2>Explore</h2>
          </div>
          {isBottomContainerVisible && (
            <div className='browseall-btn'>
                <i><SearchIcon sx={{ color: '#ffffff', fontSize: 20 }} /></i>
                <span>Browse All</span>
            </div>
        )}
        </div>
        {isBottomContainerVisible && (
          <div className='bottom-container'>
            <div className='article'></div>
            <div className='article'></div>
            <div className='article'></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreTravelPlan;
