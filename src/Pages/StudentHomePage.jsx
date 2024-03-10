import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import TopNavbar from '../components/TopNavbar';
import Greeting from '../components/Greeting';
import QrReader from '../components/QrReader';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';

const StudentHomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch book data from your API endpoint
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  const handleSearch = (searchTerm) => {
    // Perform search logic here, e.g., filter books based on the search term
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  return (
    <div className="app-container"> {/* Add a class for styling */}
      <TopNavbar />
      <Greeting username="User" /> {/* Pass the username prop */}
      <QrReader/>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        // Render SearchResult if there are search results
        <SearchResult results={searchResults} />
      ) : (
        // Render BookList if there are no search results
        <BookList books={books} />
      )}
      <Footer />
    </div>
  );
};

export default StudentHomePage;