import React from 'react'
import "./NavbarTravelplan.scss"
import logo from "../../assets/3.png"
const NavbarTravelplan = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <h2 className='logo-name'>Venture Vibe</h2>
        </div>
        <div className='nav-right'>
            <div className='share'><h3>Share</h3></div>
            <div className='print'><h3>Print</h3></div>
        </div>
    </div>
  )
}

export default NavbarTravelplan