import React from 'react';
import PropTypes from 'prop-types';
import BarIndicator from './BarIndicator';
import './BookList.css';

const BookList = ({ books }) => {
  const today = new Date();

  // Filter books into rented and overdue categories
  const rentedBooks = books.filter(book => {
    const dueDate = new Date(book.dueDate.split('-').reverse().join('-'));
    return today <= dueDate;
  });

  const overdueBooks = books.filter(book => {
    const dueDate = new Date(book.dueDate.split('-').reverse().join('-'));
    return today > dueDate;
  });

  // Mock data for three books
  const mockBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rentedDate: "01-01-2024",
      dueDate: "01-04-2024"
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rentedDate: "02-02-2024",
      dueDate: "02-05-2024"
    },
    {
      title: "1984",
      author: "George Orwell",
      rentedDate: "03-02-2024",
      dueDate: "03-04-2024"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        rentedDate: "02-02-2024",
        dueDate: "02-02-2024"
      }
  ];

  // Render rented books or a message if no books are rented
  const renderRentedBooks = () => {
    if (rentedBooks.length === 0) {
      return (
        <div>
          <h1>Rented</h1>
          <p>No books have been rented yet.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Rented</h1>
          {rentedBooks.map((book, index) => (
            <div key={index} className="book-container">
              <div className="book-details">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                <BarIndicator rentedDate={book.rentedDate} dueDate={book.dueDate} />
                <p className="due-date">{book.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  // Render overdue books or a message if no books are overdue
  const renderOverdueBooks = () => {
    if (overdueBooks.length === 0) {
      return (
        <div>
          <h1>Overdue</h1>
          <p>No books are overdue. Keep up!</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Overdue</h1>
          {overdueBooks.map((book, index) => (
            <div key={index} className="book-container">
              <div className="book-details">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                <BarIndicator rentedDate={book.rentedDate} dueDate={book.dueDate} />
                <p className="due-date">{book.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="book-list-wrapper">
      <div className="book-list">
        {renderRentedBooks()}
        {renderOverdueBooks()}
        {/* Include the mockBooks */}
        <div>
          <h1>Mock Books</h1>
          {mockBooks.map((book, index) => (
            <div key={index} className="book-container">
              <div className="book-details">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                <BarIndicator rentedDate={book.rentedDate} dueDate={book.dueDate} />
                <p className="due-date">{book.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BookList;
