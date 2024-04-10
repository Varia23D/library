import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BookDetails from '../components/BookDetails';
import Footer from '../components/Footer';

const AboutBook = ({book}) => {
  return (
    <div>
    <TopNavbar />
    <BookDetails book={book}/>
    <Footer />
    </div>
  );
}

export default AboutBook;