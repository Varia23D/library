import React from 'react';
import './Footer.css'; // Import CSS file for styling

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <div className="spacer-container">
      <footer className="footer-container">
        <p className="footer-text">Copyright © {currentYear}  All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
