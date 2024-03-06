import React from 'react';
import './Footer.css'; // Import CSS file for styling

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <footer className="footer-container"> {/* Container for the footer */}
      <p className="footer-text">Copyright © {currentYear}  All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
