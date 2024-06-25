import React, { useState } from 'react';
import "./ExploreTravelPlan.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { posts } from '../../dummyData';
import { Link } from 'react-router-dom';

const ExploreTravelPlan = () => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  const explorePosts =  posts.slice(0, 2);

  return (
    <div className='exploreTravelPlan' id='explore'>
      <div className='container'>
        <div className='top-container'>
          <div className='explore-tag' onClick={toggleBottomContainer}>
            <i><KeyboardArrowDownIcon sx={{ color: '#747474' }} /></i>
            <h2>Explore</h2>
          </div>
          {isBottomContainerVisible && (
            <div className='browseall-btn'>
                <i><SearchIcon sx={{ color: '#ffffff', fontSize: 20 }} /></i>
                <Link to="/community"><span>Browse All</span></Link>
            </div>
        )}
        </div>
        {isBottomContainerVisible && (
          <div className='bottom-container'>
            {
              explorePosts.map(post => (
                <div className='article' key={post.id}>
                  <img className='post-cover' src={post.imageSrc} alt='' />
                  <div className='info'>
                    <span>{post.description}</span>
                    <div className='profile-info'>
                      <img src={post.profile} alt="" />
                      <span>{post.name}</span>
                    </div>
                  </div>
                </div>
              ))
            }
    
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreTravelPlan;
