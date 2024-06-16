import React from 'react'
import "./communityFeed.scss"
import { Link, Outlet } from 'react-router-dom';



const CommunityFeed = () => {
  return (
    <div className='communityFeed'>
         <div className="top">
            <h1>Recent Post</h1>
            <div className="right">
               <Link to="/community"><p>Feeds</p></Link>
               <Link to="/community/popular"><p>Popular</p></Link>
               <Link to="/community/all"><p>All</p></Link>
            </div>
         </div>
         <div className="bottom">
               <Outlet></Outlet>
         </div>
    </div>
  )
}

const Post=()=>{

}

export default CommunityFeed