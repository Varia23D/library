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
    <div className="app-container"> 
      <TopNavbar />
      <Greeting username={username} /> {/* Pass the username prop */}
      <QrReader updateBooks={updateBooks}/>
      <BookList books={books} />
       {/*<Footer />*/}
    </div>
  );
};

export default StudentHomePage;