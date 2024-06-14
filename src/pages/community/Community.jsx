import React from 'react'
import "./Community.scss"
import NavbarCommunity from '../../components/navbarCommunity/NavbarCommunity';
import CommunityFeed from '../../components/communityFeed/CommunityFeed';
import CommunityFriends from '../../components/communityFriends/CommunityFriends';


const Community = () => {
  return (
    <div className='community'> 
      <div className='container'>
           <NavbarCommunity/>
           <div className="bottom">
               <div className="bottom-one">

               </div>
               <CommunityFeed/>
               <CommunityFriends/>

           </div>
      </div>
    </div>
  )
}

export default Community
