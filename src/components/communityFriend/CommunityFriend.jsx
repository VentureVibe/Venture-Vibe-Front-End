import React from 'react'
import './CommunityFriend.scss'


const CommunityFriend = ({name, messages, lastMessage, imageSrc, handleClickFriend, friendId, conversationId}) => {
  return (
         <div className="friend" onClick={()=>handleClickFriend(name,imageSrc,friendId, conversationId)}>
            <img src={imageSrc} alt="" />
            <div className="message-container">
              <p>{name}</p>
              <span>{lastMessage}</span>
            </div>
             <div className="circle">{messages}</div> 
        </div>
 
  )
}

export default CommunityFriend
