import React, { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks'
import BookList from '../components/BookList';
import TopNavbar from '../components/TopNavbar'; 
import Greeting from '../components/Greeting';
import QrReader from '../components/QrReader';
import Footer from '../components/Footer';
import { userData } from '../helpers/userStorage';

const Home = () => {
  const {books, updateBooks} = useBooks();
  const {username} = userData() || {}
  

  useEffect(() => {
    updateBooks()
  }, []); 

  return (
    <div className="app-container"> 
      <TopNavbar />
      <Greeting username={username} />
      <QrReader updateBooks={updateBooks}/>
      <BookList books={books} />
      <Footer />
    </div>
  );
};

export default Home;