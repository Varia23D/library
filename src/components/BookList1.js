const BookList = ( {books} ) => {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    return formattedDate;
  }
  
  return (
    <div>
      {books && books.length > 0 ? (
        books.map((item, index) => (
          <div key={item.id}>
            <h3>{item.book.book.title}</h3>
            
            <p>{item.book.book.description}</p>
            {item.book.book.cover && item.book.book.cover[0] ? (
              <img style={{maxHeight: '200px' }} src={`${process.env.REACT_APP_BACKEND}${item.book.book.cover[0].url}`} alt={item.book.title} />
              ) : (
                <p>No cover available</p>
                )}
            <p>Status: {item.open ? 'Taken' : 'Available'}; loan date: {formatDate(item.publishedAt)} return date: {item.returnDate}</p>
          </div>
        ))
      ) : (
        <p>No loaned books yet</p>
      )}
    </div>
  )
}

export default BookList;