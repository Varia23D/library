import React from 'react';
import './BarIndicator.css'; // Import CSS file for styling

const BarIndicator = ({rentedDate, dueDate}) => {
  const todayParsed = Date.now()
  const parsedRentedDate = Date.parse(rentedDate)
  const parsedDueDate = Date.parse(dueDate)
  const rentedTime = parsedDueDate - parsedRentedDate
  const progress =  100 * ( todayParsed - parsedRentedDate ) /rentedTime

  let color;
  if (progress < 25) {
    color = '#badc58';
  } else if (progress < 50) {
    color = '#f6e58d';
  } else if (progress < 85) {
    color = '#ffbe76';
  } else {
    color = '#ff7979';
  }

  return (
    <div className="bar-indicator">
      <div className="bar" style={{ width: `${progress}%`, backgroundColor: color }}></div>
    </div>
  );
};

export default BarIndicator;
