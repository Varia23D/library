import React from 'react';

const BookPage = ({ book }) => {

  console.log('Book Details:', book.attributes.cover.data[0].attributes.url );

  return (
    <div className='img-background'>
      <h1>{book.attributes.title}</h1>
      <p>{book.attributes.description}</p>
      <img src={`${process.env.REACT_APP_BACKEND}${book.attributes.cover.data[0].attributes.url}`} alt="" />
    </div>
  );
};

export default BookPage;
