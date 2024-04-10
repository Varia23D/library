import BarIndicator from "./BarIndicator";
import { formatDate } from "../helpers/formatDate";
import '../css/BookList.css';
import { Link } from "react-router-dom";


const BookItem = ({ book }) => (
  <Link to={`/book/${book.book.book_type.id}`}>
  <div className="book-container">
    <div className="book-cover">
      {book.book.book_type.cover && book.book.book_type.cover[0] ? (
        <img style={{maxWidth: '100px' }} 
        src={`${process.env.REACT_APP_BACKEND}${book.book.book_type.cover[0].url}`} 
        alt={book.book.book_type.title} />
        ) : (
        <p>No cover available</p>
        )}
    </div>
    
    <div className="book-details">
      <h2>{book.book.book_type.title}</h2>
      <BarIndicator rentedDate={formatDate(book.publishedAt)} dueDate={book.returnDate} />
      <p className="due-date">return date: {book.returnDate}</p>
    </div>
  </div>
  </Link>
);

export default BookItem