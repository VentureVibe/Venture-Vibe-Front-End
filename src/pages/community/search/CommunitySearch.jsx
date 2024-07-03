import React from 'react'
import './CommunitySearch.scss'
import { Link, Outlet, useParams } from 'react-router-dom';

const CommunitySearch = () => {

  const { query } = useParams();
  const isBold = (path) => {
    return location.pathname === path ? { 
      fontWeight: '700' ,
      color:"#F68712",
  

    } : {};
  };


  return (
    <div className='CommunitySearch'>
        <div className="top">
                <h1>Search results for "{query}"</h1>   
                <div className="right">
                    <Link to="/community/search/post/${`query`}" style={isBold('/community')}><p>Posts </p></Link>
                    <Link to="/community/search/user/as" style={isBold('/community/popular')}><p>Users</p></Link>

            </div>
        </div>
         <div className="bottom">
       
            <Outlet></Outlet>
         </div>
    </div>
  )
}

export default CommunitySearch
