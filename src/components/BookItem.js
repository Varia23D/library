import BarIndicator from "./BarIndicator";
import { formatDate } from "./helpers/formatDate";


const BookItem = ({ book }) => {
  const title = book.book.book.title;
  const coverUrl = book.book.book.cover[0].url
  const defaultCoverUrl = '/uploads/thumbnail_book_default_cover_2550bfef95.jpg'
  return (
  <div className="book-container">
    <div className="book-cover">
      {console.log('book data:',book)}
      {book.book.book.cover && book.book.book.cover[0] ? (
        <img style={{maxHeight: '55px' }} 
        src={`${process.env.REACT_APP_BACKEND}${coverUrl}`} 
        alt={`cover of ${title}`} />
        ) : (
        <img src={`${process.env.REACT_APP_BACKEND}${defaultCoverUrl}`} alt="default book cover" />
        )}
    </div>
    <div className="book-details">
      <h2>{title}</h2>
      <BarIndicator rentedDate={formatDate(book.publishedAt)} dueDate={book.returnDate} />
      <p className="due-date">return date: {book.returnDate}</p>
    </div>
  </div>
  )
};

export default BookItem