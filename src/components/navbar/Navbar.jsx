import React from 'react'
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink className="logo" to="/">
      <img src="/src/assets/3.png" />
      <h2>Venture Vibe</h2>
      </NavLink>
      <ul className="list">
        <li><NavLink to="/community">Community</NavLink></li>
        <li><NavLink to="/">Hotels</NavLink></li>
        <li><NavLink to="/">Events</NavLink></li>
        <li><NavLink to="/">Travel Guides</NavLink></li>
      </ul>
      <ul className="button">
        <li className="login"><button><NavLink to="/">Login</NavLink></button></li>
        <li className="signup"><button><NavLink to="/">Sign Up</NavLink></button></li>
      </ul>
    </div>
  )
}

export default Navbar