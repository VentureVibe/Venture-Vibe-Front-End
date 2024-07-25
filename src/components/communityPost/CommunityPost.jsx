import React, { useEffect, useState } from 'react';
import './CommunityPost.scss'; 
import man from "../../assets/profilepics/Profile4.jpg";
import ella from "../../assets/ella.jpg";
import PopUpMain from '../popupmain/PopUpMain';
import CommunityPostPop from '../communityPostPop/CommunityPostPop';
import noAvatar from "../../assets/noavatar.jpg";
import newRequest from '../../services/NewRequst';

const CommunityPost = ({ userId, likes, comments, description, imageSrc, createdAt }) => {
  const [showPopup, setShowPopup] = useState(false); // Start with popup hidden
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ likes, comments, description, imageSrc, createdAt });

  const toggleModal = () => {
    setShowPopup(!showPopup); // Toggle the state of showPopup
  };

  useEffect(() => {
    newRequest.get(`public/traveler/${userId}`)
      .then(response => {
       setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the posts.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(imageSrc);

  return (
    <div className='CommunityPost' onClick={toggleModal}>
      <img src={imageSrc} alt="" />
      <div className="detail">
        <img src={(user.profileImg != null) ? user.profileImg : noAvatar} alt="" />
        <h2>{user.name}</h2>
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
        <PopUpMain Component={<CommunityPostPop onClose={toggleModal} data1={data} user={user}/>} />
      )}
    </div>
  );
};

export default CommunityPost;
