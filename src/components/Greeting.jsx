import React from 'react';
import '../css/Greeting.css'; // Import CSS file for Greeting component

const Greeting = ({ username }) => {
  return (
    <div className="greeting-container">
      <h2 className="greeting-text">Hello, {username}!</h2>
    </div>
  );
};

export default Greeting;