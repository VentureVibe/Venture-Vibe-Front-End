import React from 'react'
import "./Community.scss"
import NavbarCommunity from '../../components/navbarCommunity/NavbarCommunity';
import CommunityFriends from '../../components/communityFriends/CommunityFriends';
import CommunityFeed from '../../components/communityFeed/CommunityFeed';
import { Link, Outlet } from 'react-router-dom';


const Community = () => {
  return (
    <div className='community'> 
      <div className='container'>
           <NavbarCommunity/>
           <div className="bottom">
               <div className="bottom-one">

                  <Link to="/community">
                  <div className="cont">
                       <i class="fa-solid fa-square-rss"></i>
                      <p>Feed</p>
                  </div>   
                  </Link> 
                  <div className="cont">
                      <i class="fa-solid fa-users"></i>
                      <p>Friends</p>
                  </div>
                  <div className="cont">
                        <i class="fa-solid fa-square-caret-down"></i>              
                        <p>Requests</p>
                  </div>
                  <div className="cont">
                       <i class="fa-solid fa-square-check"></i>    
                       <p>My Plannings</p>
                  </div>
               
                  <div className="cont">
                        <i class="fa-solid fa-hotel"></i>                      
                        <p>Accomodations</p>
                  </div>
                  <div className="cont">
                        <i class="fa-solid fa-person-hiking"></i>            
                        <p>Event & Activities</p>
                  </div>
                  <div className="cont">
                        <i class="fa-solid fa-car-side"></i>             
                        <p>Transpotation</p>
                  </div>
                  <Link to="/travelplan">
                  <div className="cont">
                        <i class="fa-solid fa-person-snowboarding"></i>              
                        <p>Plan Now</p>
                  </div>
                  </Link> 
                  <div className="publish">
                    <i class="fa-solid fa-upload"></i>
                    <h4>Post Now</h4>
                  </div>
                </div>
                <Outlet></Outlet>
               <CommunityFriends/>

           </div>
      </div>
    </div>
  )
}

export default Community
