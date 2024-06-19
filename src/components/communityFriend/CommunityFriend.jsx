import React from 'react'
import './CommunityFriend.scss'

const CommunityFriend = ({name,messages,imageSrc,handleClickFriend}) => {
  return (
         <div className="friend" onClick={()=>handleClickFriend(name,imageSrc)}>
            <img src={imageSrc} alt="" />
             <p>{name}</p>
             <div className="circle">{messages}</div> 
        </div>
 
  )
}

export default CommunityFriend
