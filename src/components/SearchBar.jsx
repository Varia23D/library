import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/book-types?filters[title]=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Book types:', data.data); // Log the data to ensure it is received correctly
      
      onSearch(data.data); // Pass the data array to the parent component
    } catch (error) {
      console.error('Error fetching book types:', error);
    }
  };

  return (
    <div className="search-bar-wrapper">
      <form onSubmit={handleSubmit} className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          className="search-bar-input"
        />
        <button type="submit" className="search-bar-button">Search</button>
      </form>
    </div>
  );
};
export default SearchBar;