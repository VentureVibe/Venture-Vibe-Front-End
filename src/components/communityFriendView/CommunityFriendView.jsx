import React from 'react'
import './CommunityFriendView.scss'

const CommunityFriendView = ({ name, imageSrc }) => {
  return (
    <div className='CommunityFriendView'>
        <img src={imageSrc} alt={name} />
        <h2>{name}</h2>
        <button>Add Friend</button>
    </div>
  )
}

export default CommunityFriendView
