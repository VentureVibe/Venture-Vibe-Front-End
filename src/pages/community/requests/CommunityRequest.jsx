import React, { useEffect, useState } from 'react';
import './CommunityRequest.scss';
import { GetCurrentUserC } from '../../../services/user/GetCurrentUserC';
import newRequest from '../../../services/NewRequst';
import { Link } from 'react-router-dom';
import PopUpMain from '../../../components/popupmain/PopUpMain';
import SendMessage from '../../../components/sendMessage/SendMessage';

const CommunityRequest = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null); 
  
  const userId = GetCurrentUserC().sub;

  useEffect(() => {
    newRequest.get(`following/followedTraveler/${userId}`)
      .then(response => {
        setFollowers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the following List.');
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = async (event, id) => {
    event.preventDefault();

    try {
      await newRequest.delete(`following/${id}/${userId}`);
      setResponseMessage('follower deleted successfully');
      console.log('follower deleted successfully');
      setFollowers(followers.filter(follower => follower.traveler.id !== id));
    } catch (error) {
      setError('There was an error deleting the follower.');
      console.error('Error deleting follower:', error);
    }
  }

  const limitedFriends = followers;

  return (
    <div className='CommunityRequest'>
      <div className="top">
        <h1>Followers</h1>
      </div>
      <div className="bottom">
        {limitedFriends.length == 0 && <div>No Followers to show</div>}
        {limitedFriends.map(friend => (
          <Cont
            key={friend.traveler.id}
            name={friend.traveler.name}
            imageSrc={friend.traveler.profileImg}
            id={friend.traveler.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

const Cont = ({ name, imageSrc, id, handleDelete }) => {
  const [sendMessage, setSendMessage] = useState(false);

     const toggleSendMessagePopUp = () => {
          setSendMessage(!sendMessage);
     };

  return (
    <>
    <div className='CommunityFriendView'>
      <Link to={`/community/profile/${id}`} key={id}>
      <div className="profile-detail">
        <img src={imageSrc} alt={name} />
        <h2>{name}</h2>
      </div>
      </Link>
      <div className="btn-container">
        <button className='message' onClick={toggleSendMessagePopUp}>Message</button>
        <button onClick={(e) => handleDelete(e, id)}>Delete</button>
      </div>
    </div>
    {sendMessage && (
      <PopUpMain Component={<SendMessage onClose={toggleSendMessagePopUp} id={id}/>} />
    )}
    </>
  )
}

export default CommunityRequest;
