import React from 'react'
import "./NavbarTravelplan.scss"
import logo from "../../assets/3.png"
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const NavbarTravelplan = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <h2 className='logo-name'>Venture Vibe</h2>
        </div>
        <div className='nav-right'>
            <div className='share'>
              <i><ShareOutlinedIcon sx={{ fontSize: 18 }}/></i>
              <h3>Share</h3>
            </div>
            <div className='print'>
              <i><PrintOutlinedIcon sx={{ fontSize: 18 }}/></i>
              <h3>Print</h3>
            </div>
        </div>
    </div>
  )
}

export default NavbarTravelplan