import React from 'react';
import './CommunitySearchUser.scss';
import { Link } from 'react-router-dom';
import { friends } from '../../../../dummyData';
import CommunityFriendView from '../../../../components/communityFriendView/CommunityFriendView';

const CommunitySearchUser = () => {
  const limitedFriends = friends;

  return (
    <div className='CommunitySearchUser'>
      {limitedFriends.map((friend) => (
        <Link to={`/community/profile/${friend.id}`} key={friend.id}>
          <CommunityFriendView
            name={friend.name}
            imageSrc={friend.imageSrc}
          />
        </Link>
      ))}
    </div>
  );
};



export default CommunitySearchUser;
