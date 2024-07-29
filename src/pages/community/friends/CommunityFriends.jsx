import React, { useEffect, useState } from 'react';
import './CommunityFriends.scss';
import { Link } from 'react-router-dom';
import CommunityFriendView from '../../../components/communityFriendView/CommunityFriendView';
import { GetCurrentUserC } from '../../../services/user/GetCurrentUserC';
import newRequest from '../../../services/NewRequst';
import SendMessage from '../../../components/sendMessage/SendMessage';
import PopUpMain from '../../../components/popupmain/PopUpMain';

const CommunityFriends = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null); // Added state for response message

  const userId = GetCurrentUserC().sub;

  useEffect(() => {
    newRequest.get(`following/traveler/${userId}`)
      .then(response => {
        setFollowing(response.data);
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
      await newRequest.delete(`following/${userId}/${id}`);
      setResponseMessage('Follower deleted successfully');
      console.log('Follower deleted successfully');
      setFollowing(following.filter(friend => friend.followedTraveler.id !== id));
    } catch (error) {
      setError('There was an error deleting the follower.');
      console.error('Error deleting follower:', error);
    }
  }

  const limitedFriends = following;
  return (
    <div className='CommunityFriends'>
      <div className="top">
        <h1>Following</h1>
      </div>
      <div className="bottom">
        {responseMessage && <div className="response-message">{responseMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        {limitedFriends.length === 0 && <div>No Followings to show</div>}
        {limitedFriends.map(friend => (
          <CommunityFriendView
            key={friend.followedTraveler.id} // Ensure unique keys
            name={friend.followedTraveler.name}
            imageSrc={friend.followedTraveler.profileImg}
            id={friend.followedTraveler.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityFriends;
