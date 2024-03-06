import React, { useState, useEffect } from 'react';
import BookList from '../../src/components/BookList';
import TopNavbar from '../../src/components/TopNavbar'; // Import the TopNavbar component
import Greeting from '../../src/components/Greeting'; // Import the Greeting component
import QrReader from '../../src/components/QrReader';
import Footer from '../../src/components/Footer'; // Import the Footer component

const StudentHomePage = () => {
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
      <TopNavbar />
      <Greeting username="User" /> {/* Pass the username prop */}
      <QrReader/>
      <BookList books={books} />
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default StudentHomePage;