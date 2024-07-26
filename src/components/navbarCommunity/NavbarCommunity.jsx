import React, { useEffect, useState } from 'react';
import './NavbarCommunity.scss';
import logo from '../../assets/3.png';
import man from '../../assets/man.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const NavbarCommunity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Access navigate function for navigation

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/community/search/post/${encodeURIComponent(searchTerm)}`);
    }
  };

  const userId = GetCurrentUserC().sub;
  //console.log(user)

  useEffect(() => {
    newRequest.get(`public/traveler/${userId}`)
      .then(response => {
       setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the posts.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <h4>{user.name}</h4>
        <img src={user.profileImg} alt="" />
      </div>
    </div>
  );
};

export default NavbarCommunity;
