import React from 'react'
import './CommunityFriendView.scss'

const CommunityFriendView = ({ name, imageSrc, id, handleDelete }) => {
  return (
    <div className='CommunityFriendView'>
        <img src={imageSrc} alt={name} />
        <h2>{name}</h2>
        <button onClick={(e) => handleDelete(e, id)}>Unfollow</button>
    </div>
  )
}

export default CommunityFriendView
