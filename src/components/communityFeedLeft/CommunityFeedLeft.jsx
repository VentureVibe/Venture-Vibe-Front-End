import React from 'react'
import { Link } from 'react-router-dom'
import './CommunityFeedLeft.scss'

const CommunityFeedLeft = () => {
  return (
    <div className='CommunityFeedLeft'>
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
  )
}

const cont =({Icon,name,link})=>{
    return(
        <Link to={link}>
             <div className="cont">
                 <i class={Icon}></i>
                 <p>{name}</p>
            </div> 
        </Link> 
    );
}

export default CommunityFeedLeft
