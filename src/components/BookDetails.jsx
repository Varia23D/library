import React, { useState, useEffect } from 'react';
import '../css/BookDetails.css';
import QrReader from './QrReader';
import { isTaken } from '../helpers/apiRequests';

const BookDetails = ({ book, updateBooks }) => {
  const [isBookTaken, setIsBookTaken] = useState(false);

  useEffect(() => {
    const fetchBookStatus = async () => {
      try {
        const takenStatus = await isTaken(book.id);
        setIsBookTaken(takenStatus);
      } catch (error) {
        console.error('Error fetching book status:', error);
      }
    };

    fetchBookStatus();
  }, [book.id]);
  
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
          <QrReader updateBooks={updateBooks} isReturnButton={isBookTaken} />{/* Pass isBookTaken as prop */}
            <div className='about-section'>
              <span className='about-the-book-title'>About</span>
              <span className='about-the-book-text'>{book.attributes.description}</span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default BookDetails;
