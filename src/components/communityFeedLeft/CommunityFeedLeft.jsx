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
                 <Cont Icon="fa-solid fa-user-plus" name="Following" link="/community/following" path={["/community/following"]}/>
                 <Cont Icon="fa-solid fa-user-group" name="Followers" link="/community/followers" path={["/community/followers"]} />
                 <Cont Icon="fa-solid fa-square-check" name="My Plannings" link="/myplannings" path={["/myplannings"]} />
                 <Cont Icon="fa-solid fa-person-hiking" name="Event & Activities" link="/events" path={["/events"]} />
                 <Cont Icon="fa-solid fa-car-side" name="Travel Guide" link="/travelguides" path={["/travelguides"]} />
                 <Cont Icon="fa-solid fa-person-snowboarding" name="Plan Now" link="/travelplan" path={["/travelplan"]} />
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
