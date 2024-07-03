import React from 'react'
import './CommunityFriends.scss'
import { friends } from '../../../dummyData'
import { Link } from 'react-router-dom'
import CommunityFriendView from '../../../components/communityFriendView/CommunityFriendView'

const CommunityFriends = () => {
  
  const limitedFriends = friends;
  return (
    <div className='CommunityFriends'>
        <div className="top">
            <h1>Friends</h1>
         </div>
         <div className="bottom">
               {limitedFriends.map(friend => (
         <Link to={`/community/profile/${friend.id}`} key={friend.id}>
            <CommunityFriendView
              name={friend.name}
              imageSrc={friend.imageSrc}
             />
         </Link>
        ))}
         </div>
    </div>
  )
}



export default CommunityFriends
