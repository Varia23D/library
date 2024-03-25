import React, { useState, useEffect } from 'react';
import { useBooks } from '../hooks/useBooks'
import BookList from '../../src/components/BookList';
import TopNavbar from '../../src/components/TopNavbar'; // Import the TopNavbar component
import Greeting from '../../src/components/Greeting'; // Import the Greeting component
import QrReader from '../../src/components/QrReader';
import Footer from '../../src/components/Footer'; // Import the Footer component
import { userData } from '../helpers/userStorage';

const StudentHomePage = () => {
  const {books, updateBooks} = useBooks();
  const {username} = userData() || {}
  
  // Fetch book data from your API endpoint
  useEffect(() => {
    updateBooks()
  }, []); 

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}> 
      <TopNavbar />
      <Greeting username={username} /> {/* Pass the username prop */}
      <div className="app-container" style={{ width: '200px', height: '200px',display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <QrReader updateBooks={updateBooks}/></div>
      <BookList books={books} />
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default StudentHomePage;