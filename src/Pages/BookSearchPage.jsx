import React, { useState } from 'react';
import useBookSearchResults from '../hooks/useBookSearchResults';
import './BookSearchPage.css';

const BookSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { books, isLoading, isError } = useBookSearchResults(searchTerm);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className={`book-search-container ${isModalOpen ? 'blurred' : ''}`}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching books.</p>}
                <ul className="results-list">
                    {books.map((book) => (
                        <li key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
                            <h3 className="book-title">{book.attributes.title}</h3>
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && selectedBook && (
                <div className="modal" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>{selectedBook.attributes.title}</h2>
                        <p><strong>Book ID:</strong> {selectedBook.id}</p>
                        <p>{selectedBook.attributes.description || 'No description available.'}</p>
                        <p><strong>Copies:</strong> {selectedBook.copiesCount || 'N/A'}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookSearchPage;
