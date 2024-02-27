import React, { useState } from 'react';
import './QrReader.css'; // Import CSS file for styling

const QrReader = () => {

  return (
    <div className={`qr-container`}>
      <button className="square-button" >
        Add More {/* Button text */}
        <span className="plus-icon">&#43;</span> {/* Plus icon */}
      </button>
    </div>
  );
};

export default QrReader;
