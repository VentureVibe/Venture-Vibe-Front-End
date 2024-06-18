import React from 'react'
import './FriendProfile.scss'
import CommunityProfileTop from '../../../components/communityProfileTop/CommunityProfileTop'
import { Link, Outlet } from 'react-router-dom'
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage'


const FriendProfile = () => {
  return (
    <div className='FriendProfile'>
        <CommunityProfileTop/>
   
        <div className="bottom">
             <div className="top">
                 <h1>Recent Post</h1>
                 <div className="right">
                     <Link to="/community/profile/12"><p>All</p></Link>
                     <Link to="/community/profile/popular/12"><p>Popular</p></Link>
            </div>
             </div>
             <div className="bottom">
             <Outlet />
             </div>
        </div>
    </div>
  )
}

export default FriendProfile
