import React from 'react'
import { Link } from 'react-router-dom'
import './CommunityFeedLeft.scss'

const CommunityFeedLeft = () => {
  return (
    <div className='CommunityFeedLeft'>
                 <Cont Icon="fa-solid fa-square-rss" name="Feed" link="/community" path={["/community", "/community/popular", "/community/all"]} />
                 <Cont Icon="fa-solid fa-user-group" name="Friends" link="/community/friends" path={["/community/friends"]}/>
                 <Cont Icon="fa-solid fa-square-caret-down" name="Requests" link="/community/requests" path={["/community/requests"]} />
                 <Cont Icon="fa-solid fa-square-check" name="My Plannings" link="/community" path={["/"]} />
                 <Cont Icon="fa-solid fa-hotel" name="Accomodations" link="/community" path={["/"]} />
                 <Cont Icon="fa-solid fa-person-hiking" name="Event & Activities" link="/community" path={["/"]} />
                 <Cont Icon="fa-solid fa-car-side" name="Travel Guide" link="/community" path={["/"]} />
                 <Cont Icon="fa-solid fa-person-snowboarding" name="Plan Now" link="/travelplan" path={["/"]} />
                 <i class=""></i>
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
