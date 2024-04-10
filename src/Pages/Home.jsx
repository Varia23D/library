import React, { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks'
import BookList from '../components/BookList';
import TopNavbar from '../components/TopNavbar'; // Import the TopNavbar component
import Greeting from '../components/Greeting'; // Import the Greeting component
import QrReader from '../components/QrReader';
import Footer from '../components/Footer'; // Import the Footer component
import { userData } from '../helpers/userStorage';

const Home = () => {
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
      <Footer />
    </div>
  );
};

export default Home;