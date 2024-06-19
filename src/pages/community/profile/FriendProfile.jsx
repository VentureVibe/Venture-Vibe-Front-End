import React  from 'react'
import './FriendProfile.scss'
import CommunityProfileTop from '../../../components/communityProfileTop/CommunityProfileTop'
import { Link, Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const FriendProfile = () => {
  let { id } = useParams();
  return (
    <div className='FriendProfile'>
        <CommunityProfileTop/>
   
        <div className="bottom">
             <div className="top">
                 <h1>Recent Post</h1>
                 <div className="right">
                      <Link to={`/community/profile/${id}`}><p>All</p></Link>
                     <Link to={`/community/profile/popular/${id}`}><p>Popular</p></Link>
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
