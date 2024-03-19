import React from 'react';
import './BarIndicator.css'; // Import CSS file for styling

// calculates how much % of book's rented time passed
const calculateProgress = (rentedDate, dueDate) => {
  const todayParsed = Date.now();
  const parsedRentedDate = Date.parse(rentedDate);
  const parsedDueDate = Date.parse(dueDate);
  const rentedTime = parsedDueDate - parsedRentedDate;
  return 100 * (todayParsed - parsedRentedDate) / rentedTime;
};

//takes progress and return color
const getColor = (progress) => {
  if (0 <= progress && progress < 25) {
    return '#64CCC9';
  } else if (25 <= progress && progress < 50) {
    return '#FBBF24';
  } else if (50 <= progress && progress < 85) {
    return '#F59E0B';
  } else {
    return '#B20303';
  }
};

//function returns colorful bar indicator, depending on dates
const BarIndicator = ({ rentedDate, dueDate }) => {
  const progress = calculateProgress(rentedDate, dueDate);
  const color = getColor(progress);

  return (
    <div className="bar-indicator">
      <div className="bar" style={{ width: `${progress}%`, backgroundColor: color }}></div>
    </div>
  );
};

export default BarIndicator;
