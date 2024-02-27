import React from 'react';
import './BarIndicator.css'; // Import CSS file for styling

const BarIndicator = ({ rentedDate, dueDate }) => {
  const today = new Date();
  const rentedParts = rentedDate.split('-').map(Number);
  const dueParts = dueDate.split('-').map(Number);
  
  // Month is 0-indexed in JavaScript Date objects, so we subtract 1 from month
  const start = new Date(rentedParts[2], rentedParts[1] - 1, rentedParts[0]);
  const end = new Date(dueParts[2], dueParts[1] - 1, dueParts[0]);

  // Ensure start date is always before end date
  const [earlierDate, laterDate] = start <= end ? [start, end] : [end, start];

  const totalMilliseconds = Math.max(laterDate - earlierDate, 1); // Ensure totalMilliseconds is at least 1 to avoid division by zero
  const elapsedMilliseconds = Math.max(today - earlierDate, 0); // Ensure elapsedMilliseconds is at least 0

  const progress = Math.min(100, (elapsedMilliseconds / totalMilliseconds) * 100);

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
