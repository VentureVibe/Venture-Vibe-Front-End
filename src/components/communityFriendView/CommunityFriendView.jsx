import React, { useState } from 'react'
import './CommunityFriendView.scss'
import PopUpMain from '../popupmain/PopUpMain'
import SendMessage from '../sendMessage/SendMessage'
import { Link } from 'react-router-dom'

const CommunityFriendView = ({ name, imageSrc, id, handleDelete}) => {
  const [sendMessage, setSendMessage] = useState(false);

     const toggleSendMessagePopUp = () => {
          setSendMessage(!sendMessage);
     };

  return (
    <>
    <div className='CommunityFriendView'>
      <Link to={`/community/profile/${id}`} key={id}>
      <div className="profile-detail">
        <img src={imageSrc} alt={name} />
        <h2>{name}</h2>
      </div>
      </Link>
      <div className="btn-container">
        <button className='message' onClick={toggleSendMessagePopUp}>Message</button>
        <button onClick={(e) => handleDelete(e, id)}>Unfollow</button>
      </div>
    </div>
    {sendMessage && (
      <PopUpMain Component={<SendMessage onClose={toggleSendMessagePopUp} id={id}/>} />
    )}
    </>
  )
}

export default CommunityFriendView
