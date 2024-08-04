import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/librarian/BookItem.css'

const LBookItem = ({book = []}) => {
  // const title = book.book.book_type.title || 'Default Title'
  const title = 'Default Title'
  // const author = book.book.book_type.author || 'Default Author'
  const author = 'Default Author'
  return (
    <div className='librarian-book-item'>
      <Link to={`/`}>
      <span>{title}</span>
      <span>{author}</span>
      </Link>
    </div>
  );
}

export default LBookItem;
