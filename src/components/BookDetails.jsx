import React, { useEffect, useState } from 'react';
import '../css/BookDetails.css';
import QrReader from './QrReader';
import { fetchTransactionData, isTaken } from '../helpers/apiRequests';

const BookDetails = ({ book }) => {
  const [buttonText, setButtonText] = useState(null);

  useEffect(() => {
    console.log('Book details:', book);
    checkStatus(); 
  }, []);
  
  const checkStatus = async () => {
    try {
      const transactionId = await fetchTransactionData(book.id);
      const takenStatus = await isTaken(book.id);

      if (transactionId && takenStatus) {
        setButtonText('Book is Taken');
      } else if (!transactionId && !takenStatus) {
        setButtonText('Book is Available');
      } else {
        setButtonText('Status Unknown');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setButtonText('Status Unknown');
    }
  };
  
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
          <QrReader />
          {buttonText && <span>{buttonText}</span>}
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
