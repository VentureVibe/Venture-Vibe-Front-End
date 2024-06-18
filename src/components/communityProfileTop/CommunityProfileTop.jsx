import React from 'react'
import './CommunityProfileTop.scss'
import cover from '../../assets/galle.jpg'
import profileImage from '../../assets/man.jpg'

const CommunityProfileTop = ({friendName="Kaveesha Weerakoon",isFriend=true}) => {
  return (
    <div className='CommunityProfileTop'>
         <img src={cover} alt="Cover" className="cover" />
         <div className="profile-section">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <div className="friend-info">
                             <h2>{friendName}</h2>
                             {isFriend && 
                             <div className="friend-details">
                                   <div className="cont-1">
                                        <i class="fa-solid fa-user-check"></i>
                                        <h4>Friends</h4>
                                   </div>
                                   <div className="cont-2">
                                      <i class="fa-brands fa-facebook-messenger"></i>
                                      <h4>Message</h4>
                                    </div>
                                   <div className="cont-3">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                   </div>
                              </div>}
                        </div>
         </div>
    </div>
  )
}

export default CommunityProfileTop
