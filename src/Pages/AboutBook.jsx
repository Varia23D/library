import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BookDetails from '../components/BookDetails';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const AboutBook = ({books}) => {
  const {id} = useParams()
  const book = books && books.find(book => book.id === parseInt(id))
  console.log('AboutBook bookdata', book)
  return (
    <div>
    <TopNavbar />
    <BookDetails book={book}/>
    <Footer />
    </div>
  );
}

export default AboutBook;