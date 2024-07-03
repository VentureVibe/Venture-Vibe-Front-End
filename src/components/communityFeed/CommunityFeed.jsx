import React from 'react'
import "./communityFeed.scss"
import { Link, Outlet,useLocation } from 'react-router-dom';



const CommunityFeed = () => {

  const location = useLocation();
  const isBold = (path) => {
    return location.pathname === path ? { 
      fontWeight: '700' ,
      color:"#F68712",
  

    } : {};
  };

  return (
    <div className='communityFeed'>
         <div className="top">
            <h1>Recent Post</h1>
            <div className="right">
                <Link to="/community" style={isBold('/community')}><p>Feeds</p></Link>
                <Link to="/community/popular" style={isBold('/community/popular')}><p>Popular</p></Link>
                <Link to="/community/all" style={isBold('/community/all')}><p>All</p></Link>
            </div>
         </div>
         <div className="bottom">
               <Outlet></Outlet>
         </div>
    </div>
  )
}



export default CommunityFeed