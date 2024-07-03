import React from 'react'
import './communityFriendChat.scss'
import profile from '../../assets/man.jpg'
import { Link } from 'react-router-dom'

const CommunityFriendChat = ({ friendName,imageSrc,friendId }) => {
  return (
    <div className="CommunityFriendChat">
       <Link to={`/community/profile/${friendId}`}>
            <div className="detail">
                  <img src={imageSrc} alt="" />
                  <h2>{friendName}</h2>
            </div>
        </Link>
        <div className="chat">
            <div className="component-1">
                  <img src={imageSrc} alt="" />
                  <p> Hi there! How's your day going?</p>
            </div>      
            <div className="component-2">
                  <p> Hey! It's going well, thanks for asking.</p>
                  <img src={ profile} alt="" />
               
            </div>
            <div className="component-1">
                  <img src={imageSrc} alt="" />
                  <p>That's good to hear. Anything exciting happening?</p>
            </div> 
            <div className="component-2">
                  <p> Not much, just catching up on some reading. How about you?</p>
                  <img src={ profile} alt="" />
            </div>
            <div className="component-1">
                  <img src={imageSrc} alt="" />
                  <p> Just finished a workout. Feeling great!</p>
            </div>  
            <div className="component-2">
                  <p> Nice! Keep up the good work.</p>
                  <img src={ profile} alt="" />
            </div>
    
        </div>
       <div className="input">
           <i class="fa-regular fa-face-smile"></i>
           <input type="text" placeholder='Chat now !'/>
           <i class="fa-solid fa-paper-plane" ></i>
       </div>
    </div>
  )
}

export default CommunityFriendChat
