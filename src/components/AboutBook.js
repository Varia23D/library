import React from 'react';
import './AboutBook.css';

const BookPage = ({ book }) => {

  console.log('Book Details:', book.attributes.cover.data[0].attributes.url );

  return (
    <div className='whole-page-container'>
      <div className='max-width-container'>
          <div className='cover-photo-container'>
            <img className='circular-image' src={`${process.env.REACT_APP_BACKEND}${book.attributes.cover.data[0].attributes.url}`} alt="" />
          </div>

              <div className='title-container'>
                <span className='about-title'>{book.attributes.title}</span>
              </div>

                <div className='about-btn-container'>
                    <button className='return-book-btn'>
                    <span className='btn-text'>Return book</span>
                    </button>
                  <div className='about-section'>
                     <span className='about-the-book-title'>About</span>
                     <span className='about-the-book-text'>{book.attributes.description}</span>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default BookPage;
