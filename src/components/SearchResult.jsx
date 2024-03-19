import React from 'react';
import './SearchResult.css';

const SearchResult = ({ results }) => {
  return (
    <div className="search-result-container">
      <h2>Search Results</h2>
      <ul className="search-result-list">
        {results.map((result, index) => (
          <li key={index} className="search-result-item">
            <h3>{result.title}</h3>
            {console.log ("title: ",result.title)}
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;