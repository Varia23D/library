import React, { useState } from 'react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <button className="burger-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-items">
          <button className="menu-item">Profile Settings</button>
          <button className="menu-item">Logout</button>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
