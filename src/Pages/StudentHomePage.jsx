import React, { useState, useEffect } from 'react';
import { useBooks } from '../components/hooks/useBooks';
import BookList from '../components/BookList'; 
import TopNavbar from '../components/TopNavbar'; 
import Greeting from '../components/Greeting'; 
import QrReader from '../components/QrReader'; 
import Footer from '../components/Footer'; 
import SearchBar from '../components/SearchBar'; 
import SearchResult from '../components/SearchResult';
import { userData } from '../components/helpers/userStorage';

const StudentHomePage = () => {
  const { books, updateBooks } = useBooks();
  const { username } = userData() || {};
  const [SearchResults, setSearchResults] = useState([]); 
  const [showResults, setShowResults] = useState(false); 

  useEffect(() => {
    updateBooks();
  }, []);

  const handleSearch = (data) => {
    setSearchResults(data);
    setShowResults(true); 
  };

  return (
    <div className="app-container">
      <TopNavbar />
      <Greeting username={username} />
      <QrReader updateBooks={updateBooks} />
      <SearchBar onSearch={handleSearch} />
      {showResults ? (
        <SearchResult results={SearchResults} />
      ) : (
        <BookList books={books} />
      )}
      <Footer />
    </div>
  );
};

export default StudentHomePage;
