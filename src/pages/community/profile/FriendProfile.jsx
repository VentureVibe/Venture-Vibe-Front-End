import React from 'react'
import './FriendProfile.scss'
import cover from '../../../assets/galle.jpg'
import profileImage from '../../../assets/man.jpg'

const FriendProfile = ({friendName="Kaveesha Weerakoon",isFriend=true}) => {
  return (
    <div className='FriendProfile'>
        <div className="top">
                    <img src={cover} alt="Cover" className="cover" />
                    <div className="profile-section">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <div className="friend-info">
                             <h2>{friendName}</h2>
                             {isFriend && <div className="friend-status">Friends</div>}
                        </div>
                    </div>
        </div>
    </div>
  )
}

export default FriendProfile
