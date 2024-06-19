import React from 'react'
import './CommunityFriends.scss'
import { friends } from '../../../dummyData'

const CommunityFriends = () => {
  
  const limitedFriends = friends;
  return (
    <div className='CommunityFriends'>
        <div className="top">
            <h1>Friends</h1>
         </div>
         <div className="bottom">
               {limitedFriends.map(friend => (
          <Cont
            name={friend.name}
            imageSrc={friend.imageSrc}
          />
         
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
