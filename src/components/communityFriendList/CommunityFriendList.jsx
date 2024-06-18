import React from 'react'
import CommunityFriend from '../communityFriend/CommunityFriend'
import './CommunityFriendList.scss';
import { friends } from '../../dummyData'

const CommunityFriendList = ({handleClickFriend}) => {
  const limitedFriends = friends.slice(0, 6);
  return (
    <div className='CommunityFriendList'>
         <div className="top">
         {limitedFriends.map(friend => (
          <CommunityFriend
            key={friend.id}
            handleClickFriend={handleClickFriend}
            name={friend.name}
            messages={friend.messages}
            imageSrc={friend.imageSrc}
          />
        ))}
         </div>
         <div className="view-more">
            <i class="fa-solid fa-angles-down"></i>
           More
        </div>
    </div>
  )
}

export default CommunityFriendList
