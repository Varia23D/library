import React from 'react';
import PropTypes from 'prop-types';
import BarIndicator from './BarIndicator';
import './BookList.css';
import { formatDate } from './helpers/formatDate';

const BookItem = ({ book }) => (
  <div className="book-container">
    <div className="book-details">
      <h2>{book.book.book.title}</h2>
      <BarIndicator rentedDate={formatDate(book.publishedAt)} dueDate={book.returnDate} />
      <p className="due-date">{book.returnDate}</p>
    </div>
  </div>
);

const BookList = ({ books }) => {
  const today = new Date();
  
 const renderBookList = (title, bookList) => (
    <div>
      <h1>{title}</h1>
      {bookList.length === 0 ? (
        <p>{`No books ${title === 'Rented' ? 'have been rented yet' : 'are overdue'}`}</p>
      ) : (
        bookList.map((item, index) => <BookItem key={index} book={item} />)
      )}
    </div>
  );

  const rentedBooks = books.filter(book => {
    const dueDate = new Date(book.returnDate);
    return today <= dueDate;
  });
  const overdueBooks = books.filter(book => {
    const dueDate = new Date(book.returnDate);
    return today > dueDate;
  });

  return (
    <div className="book-list-wrapper">
      <div className="book-list">
        {renderBookList('Rented', rentedBooks)}
        {renderBookList('Overdue', overdueBooks)}
      </div>
    </div>
  );


};


export default BookList;
