import React from 'react'
import './MyPlanings.scss'
import Google  from '../../assets/map.png'
import { Link, Outlet } from 'react-router-dom'

const MyPlanings = () => {
  return (
    <div className='myplannings'>
       <div className="left">
        <div className="top">
           <div className="cont">
                <i className='fa-solid fa-square-check'></i>
                <Link to="/myplannings"><p>My Plannings</p></Link>
           </div>
           <Link to="travelinvitations">
           <div className="cont">
                <i class="fa-solid fa-envelope-open-text"></i>
               <p>Travel Invitations</p>
              
           </div>
           </Link>
        </div>
        <div className="bottom">
          <Outlet></Outlet>
        </div>
       </div>
       <div className="right">
            <img src={Google} alt="" />

       </div>
    </div>
  )
}



export default MyPlanings
