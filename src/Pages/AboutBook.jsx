import React from 'react';
import TopNavbar from '../components/TopNavbar';
import AboutBook from '../components/BookDetails';
import Footer from '../components/Footer';

const AboutBookPage = ({book}) => {
  return (
    <div>
    <TopNavbar />
    <AboutBook book={book}/>
    {/*<Footer />*/}
    </div>
  );
}

export default AboutBookPage;