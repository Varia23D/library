import { useEffect, useState } from "react"
import { getJWT } from "../../helpers/jwtUtils"
import LBookItem from "./LBookItem"

const LBookList = ({ tab }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPage] = useState(1)
  const pageSize = 25;


  const getBooks = async () => {
    const jwt = getJWT()
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/book-copies?populate=*&[filters][taken][$eq]=true`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch transaction data');
      }
      const data = await response.json();
      const books = data.data

      //filter books by tab taken/overdue
      let filteredBooks 
      if (tab === 'overdue') {
        const currentDate = new Date()
        filteredBooks = books.filter((book) => book.attributes.transactions.data.some(transaction => 
          transaction.attributes.open === true && 
          new Date(transaction.attributes.returnDate) < currentDate
        ));
      } else if ( tab === 'taken') {
        filteredBooks = books
      }
      
      
      setBooks(filteredBooks)
      setTotalPage(data.meta.pagination.pageCount)
    } catch (error) {
      console.error('Error getting transaction data:', error);
        throw error;
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    setLoading(true)
    getBooks()
  }, [tab, currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="librarian-book-list">
      {
        loading ? (
          <p>Loading</p>
        ) : books.length === 0 ? (
          <p>{tab === 'overdue' ? 'There are no overdue books' : 'There are no taken books'}</p>
        ) : (
          <>
          {books.map((book) => (
            <LBookItem key={book.id} book={book}/>
          ))}
          {totalPages > 1 && (
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
            </button>
            <span>Page {currentPage} from {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>)}
          </>
        )}
    </div>
  )
}

export default LBookList