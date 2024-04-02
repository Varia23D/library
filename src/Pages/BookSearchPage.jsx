import React, { useState } from 'react';
import useBookSearchResults from '../hooks/useBookSearchResults';
import { Link } from "react-router-dom";
import TopNavbar from '../../src/components/TopNavbar';
import Footer from '../../src/components/Footer';
import './BookSearchPage.css';

const BookSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { books, isLoading, isError } = useBookSearchResults(searchTerm);

    return (
        <div className="app-container">
            <TopNavbar />
            <div className="book-search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching books.</p>}
                <div className="results-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-cube">
                            <Link to={`/book/${book.id}`}>
                                <h3 className="book-title">{book.attributes.title}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookSearchPage;
