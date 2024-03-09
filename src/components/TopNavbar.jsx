// Q:? why we repeat links

import React, { useState } from 'react';
import './TopNavbar.css';

const TopNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-container">
      {/* Desktop Navbar */}
      <ul className="desktop-menu">
        <li><a className="menu__item" href="#">Edit Profile</a></li>
        <li><a className="menu__item" href="#">Home</a></li>
        <li><a className="menu__item" href="#">Books</a></li>
        <li><a className="menu__item" href="/logout">Logout</a></li>
      </ul>

      {/* Mobile Navbar */}
      <div className="menu__btn" onClick={toggleMenu}>
        <span className={menuOpen ? 'open' : ''}></span>
      </div>
      <ul className={`menu__box ${menuOpen ? 'open' : ''}`}>
        <li className="user-profile">
          <img className="user-avatar" src="https://popcat.click/twitter-card.jpg" alt="User Avatar" />
          <div className="user-details">
            <div className="user-name">John Doe</div>
          </div>
        </li>
        <li><a className="menu__item" href="#">Edit Profile</a></li>
        <li><a className="menu__item" href="#">Home</a></li>
        <li><a className="menu__item" href="#">Books</a></li>
        <li><a className="menu__item" href="/logout">Logout</a></li>
      </ul>
    </div>
  );
}

export default TopNavbar;