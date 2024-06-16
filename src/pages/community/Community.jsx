import React from 'react'
import "./Community.scss"
import NavbarCommunity from '../../components/navbarCommunity/NavbarCommunity';
import CommunityFriends from '../../components/communityFriends/CommunityFriends';
import CommunityFeed from '../../components/communityFeed/CommunityFeed';


const Community = () => {
  return (
    <div className='community'> 
      <div className='container'>
           <NavbarCommunity/>
           <div className="bottom">
               <div className="bottom-one">
                  <div className="cont">
                      <i class="fa-solid fa-bars"></i>
                      <p>Feed</p>
                  </div>    
                  <div className="cont">
                       <i class="fa-solid fa-image"></i>                
                        <p>Images</p>
                  </div>
                  <div className="cont">
                      <i class="fa-regular fa-circle-play"></i>                  
                      <p>Vedios</p>
                  </div>
                  <div className="cont">
                      <i class="fa-solid fa-user-group"></i>
                      <p>Friends</p>
                  </div>
                  <div className="publish">
                    <i class="fa-solid fa-upload"></i>
                    <h4>Post Now</h4>
                  </div>
                </div>
               <CommunityFeed/>
               <CommunityFriends/>

           </div>
      </div>
    </div>
  )
}

export default Community
