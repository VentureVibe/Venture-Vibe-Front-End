import React from 'react'
import './CommunityFriends.scss'
import { friends } from '../../../dummyData'
import { Link } from 'react-router-dom'

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
            <Cont
              name={friend.name}
              imageSrc={friend.imageSrc}
             />
         </Link>
        ))}
         </div>
    </div>
  )
}

const Cont=({name,imageSrc})=>{
  return(
 
    <div className="cont">
    
     
      <img src={imageSrc} alt="" />
      <h2>{name}</h2>
      <button>Unfriend</button>
    </div>
  
  )
}

export default CommunityFriends
