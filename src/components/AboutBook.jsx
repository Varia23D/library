import React from 'react';
import './AboutBook.css';


const AboutBook = ({ book }) => {
  return (
    <div className='about-container'>
        <div className='cover-photo-mask' />
        <div className='cover-photo'/>
        
      <div className='Titlecontainer'>
        <span className='AboutTitle'>The Lord of the Rings</span>
        <span className='AboutAuthor'>Rachel Gillig</span>
      </div>
      <div className='info-container'>
        <button className='returnBookBtn'>
             <span className='btn-text'>Return book</span>
        </button>
        <div className='infoGrid'>
          <div className='infoYear'>
            <span className='year'>Year</span>
            <span className='year-value'>2000</span>
          </div>
          <div className='infoEdition'>
            <span className='edition'>Edition</span>
            <span className='edyear'>2000</span>
          </div>
          <div className='InfoIspn'>
            <span className='ispn'>Ispn</span>
            <span className='ispnCode'>978-3-16-148410-0</span>
          </div>
        </div>
        <div className='AboutSection'>
            <span className='AboutTheBookTitle'>About</span>
            <span className='AboutTheBookText'>
              One Ring to rule them all, One Ring to find them, One Ring to bring
             them all and in the darkness bind themIn ancient times the Rings of
             Power were crafted by the Elven-smiths, and Sauron, the Dark Lord,
             forged the One Ring, filling it with his own power so that he could
              rule all others. But the One Ring was taken from him, and though he
             sought it throughout Middle-earth, it remained lost to him. After many
             ages it fell by chance into the hands of the hobbit Bilbo Baggins.
            </span>
        </div>
      </div>
    </div>
  );
}

export default AboutBook;