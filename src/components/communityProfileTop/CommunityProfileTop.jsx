import React, { useEffect,useState } from 'react'
import './CommunityProfileTop.scss'
import cover from '../../assets/galle.jpg'
import profileImage from '../../assets/man.jpg'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../dummyData'

const CommunityProfileTop = ({friendName="Kaveesha Weerakoon",isFriend=true}) => {
  
  let { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
     let user1 = getUserById(parseInt(id));
     setUser(user1);
   }, [id]);


  return (
    <div className='CommunityProfileTop'>
         <img src={user.coverSrc} alt="Cover" className="cover" />
         <div className="profile-section">
                        <img src={user.imageSrc} alt="Profile" className="profile-image" />
                        <div className="friend-info">
                             <h2>{user.name}</h2>
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
