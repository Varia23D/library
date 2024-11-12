import React, { useEffect, useState } from 'react';
import '../css/BookDetails.css';
import QrReader from './QrReader';
import { useNavigate } from 'react-router-dom';
import { fetchMyTransactions } from '../helpers/apiRequests';
import defaultCover from '../../src/img/cover-not-found.png'

const BookDetails = ({ book }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!book) {
      navigate('/404');
    }
  }, [book, navigate]);

  const [buttonText, setButtonText] = useState(null);


  useEffect(() => {
    checkStatus();
  }, [book]);

  const checkStatus = async () => {
    try {
      const transactions = await fetchMyTransactions();

      // Check if there's any transaction for the book type and change text on the button accordingly
      const hasTransaction = transactions.some(transaction => {
        const bookType = transaction.book.book_type;
        return bookType.id === book.id
      });

      if (hasTransaction) {
        setButtonText('Return book');
      } else {
        setButtonText('Rent a book');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      console.log('Error object:', error);
    }
  };

  return (
    <div className='whole-page-container'>
      <div className='max-width-container'>
        <div className='cover-photo-container'>
          {book.attributes.cover?.data?.[0] ? (
            <img
              className='circular-image'
              src={`${process.env.REACT_APP_BACKEND}${book.attributes.cover.data[0].attributes.url}` || `${defaultCover}`}
              alt={book.attributes.title || "Book cover"}
            />
          ) : (
            <img
              className='circular-image'
              src={`${defaultCover}`}
              alt={book.attributes.title || "Book cover"}
            />
          )}
        </div>

        <div className='title-container'>
          <span className='about-title'>{book.attributes.title}</span>
        </div>

        <div className='about-btn-container'>
          {/* <QrReader buttonText={buttonText} /> */}
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
