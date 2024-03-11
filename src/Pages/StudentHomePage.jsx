import React, { useState, useEffect } from 'react';
import { useBooks } from '../components/hooks/useBooks';
import BookList from '../components//BookList'; // Adjust the path as needed
import TopNavbar from '../components//TopNavbar'; // Adjust the path as needed
import Greeting from '../components//Greeting'; // Adjust the path as needed
import QrReader from '../components//QrReader'; // Adjust the path as needed
import Footer from '../components//Footer'; // Adjust the path as needed
import SearchBar from '../components//SearchBar'; // Adjust the path as needed
import SearchResult from '../components//SearchResult'; // Adjust the path as needed
import { userData } from '../components/helpers/userStorage';

const StudentHomePage = () => {
  const { books, updateBooks } = useBooks();
  const { username } = userData() || {};
  const [searchResults, setSearchResults] = useState([]); // Define searchResults state

  // Fetch book data from your API endpoint
  useEffect(() => {
    updateBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm); // Check if handleSearch is called and receiving the correct search term
    // Perform search logic here
    // For example, you can filter books based on the search term
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
