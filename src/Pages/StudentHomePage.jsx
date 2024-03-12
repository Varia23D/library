import React, { useState, useEffect } from 'react';
import { useBooks } from '../components/hooks/useBooks';
import BookList from '../components//BookList'; 
import TopNavbar from '../components//TopNavbar'; 
import Greeting from '../components//Greeting'; 
import QrReader from '../components//QrReader'; 
import Footer from '../components//Footer'; 
import SearchBar from '../components//SearchBar'; 
import SearchResult from '../components//SearchResult'; 
import { userData } from '../components/helpers/userStorage';

const StudentHomePage = () => {
  const { books, updateBooks } = useBooks();
  const { username } = userData() || {};
  const [searchResults, setSearchResults] = useState([]); 

  //Dont forget Api
  useEffect(() => {
    updateBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm); 
    
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };


  return (
    <div className="app-container">
      <TopNavbar />
      <Greeting username={username} />
      <QrReader updateBooks={updateBooks} />
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <SearchResult results={searchResults} />
      ) : (
        <BookList books={books} />
      )}
      <Footer />
    </div>
  );
};

export default StudentHomePage;
