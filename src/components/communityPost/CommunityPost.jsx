import React from 'react';
import './CommunityPost.scss'; 
import man from "../../assets/profilepics/Profile4.jpg";
import ella from "../../assets/ella.jpg";

const CommunityPost = ({ name, likes, comments, description, imageSrc,profile }) => {
  return (
    <div className='CommunityPost'>
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
    </div>
  );
};

// Default props
CommunityPost.defaultProps = {
  name: "Kaveesha Weerakoon",
  likes: 123,
  comments: 42,
  profile:man,
  description: "I just returned from an amazing trip to Ella! The scenic views and charming atmosphere made it an unforgettable experience. 🌄✨ #Ella #TravelDiaries",
  imageSrc: ella 
};

export default CommunityPost;
