import React, { useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import './CommunityFeedLeft.scss'
import PopUpMain from '../popupmain/PopUpMain'
import CommunityPostPublish from '../communityPostPublish/CommunityPostPublish'

const CommunityFeedLeft = () => {

  const [showPopup, setShowPopup] = useState(false);
  
  const toggleModal = () => {
    setShowPopup(!showPopup); // Toggle the state of showPopup
  };

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
                  <div className="publish" onClick={toggleModal}>
                    <i class="fa-solid fa-upload"></i>
                    <h4 >Post Now</h4>
                  </div>
                  {showPopup && (
                          <PopUpMain Component={<CommunityPostPublish onClose={toggleModal}/>} />
                  )}
    </div>
  )
}


const Cont = ({ Icon, name, link, path }) => {
  const location = useLocation();

  const isBold = () => {
    return path.includes(location.pathname) ? 'bold' : '';
  };



  return (
    <Link to={link}>
      <div className={`cont ${isBold()}`}>
        <i className={Icon}></i>
        <p>{name}</p>
      </div>
     
    </Link>
  );
};

export default CommunityFeedLeft
