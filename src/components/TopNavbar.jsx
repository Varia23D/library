import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../css/TopNavbar.css';

const TopNavbar = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  {/* Burger menu hides when scrolling */}
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);
  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate('/login');
  };

  return (
    <div className="nav-container">
      {/* Desktop Navbar */}
      <ul className="desktop-menu">
        <li><a className="menu__item" href="/account-settings">Edit Profile</a></li>
        <li><a className="menu__item" href="/">Home</a></li>
        <li><a className="menu__item" href="/book-search">Book search</a></li>
        <li><a className="menu__item" href="/login" onClick={handleLogout}>Logout</a></li>
      </ul>

      {/* Mobile Navbar */}
      <div className="menu__btn" onClick={toggleMenu}>
        <span className={menuOpen ? 'open' : ''}></span>
      </div>
      <ul className={`menu__box ${menuOpen ? 'open' : ''}`}>
        <li className="user-profile">
          <img className="user-avatar" src="https://popcat.click/twitter-card.jpg" alt="User Avatar" />
          <div className="user-details">
            <div className="user-name">{username}</div>
          </div>
        </li>
        <li><a className="menu__item" href="/account-settings">Edit Profile</a></li>
        <li><a className="menu__item" href="/">Home</a></li>
        <li><a className="menu__item" href="/book-search">Book search</a></li>
        <li><a className="menu__item" href="/login" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
}

export default TopNavbar;