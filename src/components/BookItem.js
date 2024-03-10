import BarIndicator from "./BarIndicator";
import { formatDate } from "./helpers/formatDate";


const BookItem = ({ book }) => (
  <div className="book-container">
    <div className="book-cover">
      {console.log('book data:',book)}
      {book.book.book.cover && book.book.book.cover[0] ? (
        <img style={{maxHeight: '55px' }} 
        src={`${process.env.REACT_APP_BACKEND}${book.book.book.cover[0].url}`} 
        alt={book.book.title} />
        ) : (
        <p>No cover available</p>
        )}
    </div>
    <div className="book-details">
      <h2>{book.book.book.title}</h2>
      <BarIndicator rentedDate={formatDate(book.publishedAt)} dueDate={book.returnDate} />
      <p className="due-date">return date: {book.returnDate}</p>
    </div>
  </div>
);

export default BookItem