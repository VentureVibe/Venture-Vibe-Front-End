import React, { useEffect, useState } from 'react';
import CommunityFriend from '../communityFriend/CommunityFriend';
import './CommunityFriendList.scss';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const CommunityFriendList = ({ handleClickFriend }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = GetCurrentUserC().sub;

  useEffect(() => {
    newRequest.get(`chat/conversations/${userId}`)
      .then(response => {
        setConversations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the Conversations.');
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  //const limitedFriends = conversations.slice(0, 6);

  return (
    <div className='CommunityFriendList'>
      <div className="top">
        {conversations.length === 0 && (<span>No chats to show</span>)}
        {conversations.map(friend => (
          friend.user2.id !== userId ? (
            <CommunityFriend
              key={friend.user2.id}
              conversationId={friend.id}
              friendId={friend.user2.id}
              handleClickFriend={handleClickFriend}
              name={friend.user2.name}
              messages={"."} // Assuming this is a placeholder, update with actual data if available
              lastMessage={friend.lastMessage}
              imageSrc={friend.user2.profileImg}
            />
          ) : (
            <CommunityFriend
              key={friend.user1.id}
              conversationId={friend.id}
              friendId={friend.user1.id}
              handleClickFriend={handleClickFriend}
              name={friend.user1.name}
              messages={"."} // Assuming this is a placeholder, update with actual data if available
              lastMessage={friend.lastMessage}
              imageSrc={friend.user1.profileImg}
            />
          )
        ))}
      </div>
      <div className="view-more">
        <i className="fa-solid fa-angles-down"></i>
        More
      </div>
    </div>
  );
}

export default CommunityFriendList;
