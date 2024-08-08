import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/librarian/BookItem.css'

const LBookItem = ({ book }) => {
  // const title = book.book.book_type.title || 'Default Title'
  const title = book.attributes?.book_type?.data?.attributes?.title || 'title'
  // const author = book.book.book_type.author || 'Default Author'
  const author = book.attributes?.book_type?.data?.attributes?.author || 'author'
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
