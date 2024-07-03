import React from 'react'
import './CommunityFriend.scss'


const CommunityFriend = ({name,messages,imageSrc,handleClickFriend,friendId}) => {
  return (
         <div className="friend" onClick={()=>handleClickFriend(name,imageSrc,friendId)}>
            <img src={imageSrc} alt="" />
             <p>{name}</p>
             <div className="circle">{messages}</div> 
        </div>
 
  )
}

export default CommunityFriend
