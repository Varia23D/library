import React from 'react';
import TopNavbar from '../../src/components/TopNavbar';
import AboutBook from '../components/AboutBook';
import Footer from '../../src/components/Footer';

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