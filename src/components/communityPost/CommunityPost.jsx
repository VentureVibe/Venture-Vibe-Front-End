import React, { useRef, useState } from 'react';
import './CommunityPost.scss'; 
import man from "../../assets/profilepics/Profile4.jpg";
import ella from "../../assets/ella.jpg";
import PopUpMain from '../popupmain/PopUpMain';
import CommunityPostPop from '../communityPostPop/CommunityPostPop';

const CommunityPost = ({ name, likes, comments, description, imageSrc, profile }) => {
  const postModelRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const data={
    name:name,
    likes:likes,
    comments:comments,
    description:description,
    imageSrc:imageSrc,
    profile:profile
  }
  const togglePost = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='CommunityPost' onClick={togglePost}>
      <img src={imageSrc} alt="" />
      <div className="detail">
        <img src={profile} alt="" />
        <h2>{name}</h2>
        <div className="like">
          <i className="fa-solid fa-heart"></i>
          <p>{likes}</p>
        </div>
        <div className="comment">
          <i className="fa-solid fa-comment"></i>
          <p>{comments}</p>
        </div>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      {showPopup && (
        <PopUpMain Component={<CommunityPostPop onClose={togglePost} data={data}/>}>
          
        </PopUpMain>
      )}
    </div>
  );
};

// Default props
CommunityPost.defaultProps = {
  name: "Kaveesha Weerakoon",
  likes: 123,
  comments: 42,
  profile: man,
  description: "I just returned from an amazing trip to Ella! The scenic views and charming atmosphere made it an unforgettable experience. 🌄✨ #Ella #TravelDiaries",
  imageSrc: ella 
};

export default CommunityPost;
