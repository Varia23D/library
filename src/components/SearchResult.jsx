import React from 'react';
import './SearchResult.css';

const SearchResult = ({ results }) => {
  return (
    <div className="search-result-container">
      <h2>Search Results</h2>
      <ul className="search-result-list">
        {results.map((result, index) => (
          <li key={index} className="search-result-item">{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;