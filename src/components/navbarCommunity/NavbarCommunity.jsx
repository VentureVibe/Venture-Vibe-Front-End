import React, { useState } from 'react';
import './NavbarCommunity.scss';
import logo from '../../assets/3.png';
import man from '../../assets/man.jpg';
import { Link, useNavigate } from 'react-router-dom';

const NavbarCommunity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Access navigate function for navigation

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/community/search/post/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'>
      <div className='logo'>
        <img src={logo} alt='logo'/>
        <h2 className='logo-name'>Venture Vibe</h2>
      </div>
      </Link>
      <div className='nav-search'>
        <input
          type="text"
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
      </div>
      <div className="profile-bar">
        <i className="fa-regular fa-bell"></i>
        <h4>Kaveesha</h4>
        <img src={man} alt="" />
      </div>
    </div>
  );
};

export default NavbarCommunity;
