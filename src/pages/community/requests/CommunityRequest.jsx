import React from 'react'
import './CommunityRequest.scss'
import { friends } from '../../../dummyData'

const CommunityRequest = () => {

  const limitedFriends = friends;

  return (
    <div className='CommunityRequest'>
      <div className="top">
            <h1>Requests</h1>
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
      <button>Accept</button>
      <button className='dlt'>Delete</button>
    </div>
  
  )
}

export default CommunityRequest
