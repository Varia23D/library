import React, { useState, useMemo } from 'react';
import useBookSearchResults from '../hooks/useBookSearchResults';
import { Link } from "react-router-dom";
import TopNavbar from '../../src/components/TopNavbar';
import Footer from '../../src/components/Footer';
import '../css/BookSearch.css';

const BookSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { bookCopies, isLoading, isError } = useBookSearchResults(searchTerm);

    const booksAvailability = useMemo(() => bookCopies.reduce((acc, copy) => {              // Memo the book availability data
        const { bookTitle, isAvailable } = copy;                                            // Reduce the book copies based on book title
        const bookTypeId = copy.attributes.book_type.data.id;
        if (!acc[bookTitle]) {
            acc[bookTitle] = { count: 0, bookTypeId };
        }
        if (isAvailable) {                                                                // Checking if book is available
            acc[bookTitle].count += 1;                                                    // Incrementing the available books
        }
        return acc;
    }, {}), [bookCopies]);

    const filteredBooks = useMemo(() => {                                                   // Memo the filtered books
        if (!searchTerm) return {};                                                         // Check if search term is empty or not

        const lowerCaseSearchTerm = searchTerm.toLowerCase();                               // Filtering the books based on search term
        return Object.entries(booksAvailability).reduce((acc, [title, data]) => {           // Reducing the books based on search term
            if (title.toLowerCase().includes(lowerCaseSearchTerm)) {                        // Check if title includes search term
                acc[title] = data;                                                          // Add the book to the filtered books
            }
            return acc;                                                                     // Return the filtered books
        }, {});
    }, [booksAvailability, searchTerm]);                                                    // Memo the filtered books based on search term

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
                    {Object.entries(filteredBooks).map(([title, { count, bookTypeId }]) => (
                        <div key={bookTypeId} className="book-cube">
                            <Link to={`/book/${bookTypeId}`}>
                                <h3 className="book-title">{title}</h3>
                                <p className={`book-availability ${count === 0 ? 'no-copies' : 'copies-available'}`}>
                                    {count === 0 ? "No copies available" : `Available Copies: ${count}`}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookSearch;
