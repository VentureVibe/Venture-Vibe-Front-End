import React from 'react'
import "./NavbarCommunity.scss"
import logo from "../../assets/3.png"
import man from "../../assets/man.jpg"


const NavbarCommunity = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <h2 className='logo-name'>Venture Vibe</h2>
        </div>
        <div className='nav-search'>
           <input type="text" placeholder='Search'/>
           <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="profile-bar">
           <i class="fa-regular fa-bell"></i>
           <h4>Kaveesha</h4>
          <img src={man} alt="" />
        </div>
    </div>
  )
}

export default NavbarCommunity