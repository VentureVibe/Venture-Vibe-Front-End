import React from 'react'
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
      <img src="/src/assets/3.png" />
      <h2>Venture Vibe</h2>
      </div>
      <ul className="list">
        <li>Community</li>
        <li>Hotels</li>
        <li>Events</li>
        <li>Travel Guides</li>
      </ul>
      <ul className="button">
        <li className="login"><button>Login</button></li>
        <li className="signup"><button>SignUp</button></li>
      </ul>
    </div>
  )
}

export default Navbar