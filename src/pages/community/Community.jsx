import React from 'react'
import "./Community.scss"
import NavbarCommunity from '../../components/navbarCommunity/NavbarCommunity';
import CommunityFriends from '../../components/communityFriends/CommunityFriends';
import { Link, Outlet } from 'react-router-dom';
import CommunityFeedLeft from '../../components/communityFeedLeft/CommunityFeedLeft';

const Community = () => {
  return (
    <div className='community'> 
      <div className='container'>
           <NavbarCommunity/>
           <div className="bottom">
                <CommunityFeedLeft/>
                <Outlet></Outlet>
                <CommunityFriends/>

           </div>
      </div>
    </div>
  )
}

export default Community
