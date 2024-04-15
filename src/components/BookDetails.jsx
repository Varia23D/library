import React from 'react';
import '../css/BookDetails.css';
import QrReader from './QrReader';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const BookDetails = ({ book,updateBooks}) => {
  const navigate = useNavigate();
  if (!book || !book.attributes || !book.attributes.cover || !book.attributes.cover.data || !book.attributes.cover.data[0]) {
    navigate('/404')
    return null
  }
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
          <QrReader updateBooks={updateBooks}/>
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
