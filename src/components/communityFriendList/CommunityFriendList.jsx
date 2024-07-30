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
    const fetchConversations = async () => {
      try {
        const response = await newRequest.get(`chat/conversations/${userId}`);
        setConversations(response.data);
      } catch (error) {
        console.error('There was an error!', error);
        setError('There was an error fetching the Conversations.');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="CommunityFriendList">
      <div className="top">
        {conversations.length === 0 ? (
          <span>No chats to show</span>
        ) : (
          conversations.map(friend => {
            const isUser2 = friend.user2.id !== userId;
            const friendInfo = isUser2 ? friend.user2 : friend.user1;

            return (
              <CommunityFriend
                key={friendInfo.id}
                conversationId={friend.id}
                friendId={friendInfo.id}
                handleClickFriend={handleClickFriend}
                name={friendInfo.name}
                messages="." // Placeholder
                lastMessage={friend.lastMessage}
                imageSrc={friendInfo.profileImg}
              />
            );
          })
        )}
      </div>
      {conversations.length > 0 && (
        <div className="view-more">
          <i className="fa-solid fa-angles-down"></i>
          More
        </div>
      )}
    </div>
  );
}

export default CommunityFriendList;
