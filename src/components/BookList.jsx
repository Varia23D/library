import React from 'react';
import './BookList.css';
import BookItem from './BookItem';


const BookList = ({ books = [] }) => {
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

  const rentedBooks =  books.filter(book => {
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
