import React, { useState, useEffect } from 'react';
import './App.css';
import StudentHomePage from './Pages/StudentHomePage';
//import Home from './Pages/Home';


const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch book data from your API endpoint
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <div className="app-container"> {/* Add a class for styling */}
      <StudentHomePage/>
    </div>
  );
};

export default App;