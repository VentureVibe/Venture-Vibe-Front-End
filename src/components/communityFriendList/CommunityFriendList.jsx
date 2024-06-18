import React from 'react'
import CommunityFriend from '../communityFriend/CommunityFriend'
import profile1 from '../../assets/profilepics/Profile1.jpg'
import profile2 from '../../assets/profilepics/Profile2.jpg'
import profile3 from '../../assets/profilepics/Profile3.jpg'
import profile4 from '../../assets/profilepics/Profile4.jpg'
import profile5 from '../../assets/profilepics/Profile5.jpg'
import profile6 from '../../assets/profilepics/Profile6.jpg'
import './CommunityFriendList.scss';

const CommunityFriendList = ({handleClickFriend}) => {
  
  return (
    <div className='CommunityFriendList'>
         <div className="top">
            <CommunityFriend handleClickFriend={handleClickFriend} name="Himasha Ravishanka"  messages="2" imageSrc={profile1} />
            <CommunityFriend handleClickFriend={handleClickFriend} name="Sithum Randika" messages="3" imageSrc={profile2}/>
            <CommunityFriend handleClickFriend={handleClickFriend} name="Akila Buwaneka" messages="5" imageSrc={profile3}/>
            <CommunityFriend handleClickFriend={handleClickFriend} name="Rashmika Guruge" messages="8" imageSrc={profile4}/>
            <CommunityFriend handleClickFriend={handleClickFriend} name="Donald Trump" messages="17" imageSrc={profile5}/>
         </div>
         <div className="view-more">
            <i class="fa-solid fa-angles-down"></i>
           More
        </div>
    </div>
  )
}

export default CommunityFriendList
