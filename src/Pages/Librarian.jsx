import { useEffect, useState } from "react"
import Greeting from "../components/Greeting"
import { userData } from '../helpers/userStorage';
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
import fetchBookTypes from "../helpers/fetchBookTypes";
import '../css/librarian/Librarian.css'
import TabBtn from "../components/librarian/TabBtn";
import LBookList from "../components/librarian/LBookList";

const Librarian = () => {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('overdue')
  const { username } = userData() || {}

  // useEffect(() => {
  //   fetchBookTypes()
  //     .then(data => {
  //       setBooks(data)
  //     })
  //     .catch(error => {
  //       console.log('Error fethcing data: ', error)
  //     })
  // }, [])

  // const overdueBooks = books.filter(book => book.status === 'overdue')
  // const rentedBooks = books.filter(book => book.status === 'taken')

  const getFilterForTab = (tab) => {
    switch (tab) {
      case 'overdue':
        return 'overdue'
      case 'rented':
        return 'taken'
      default:
        return 'overdue'

    }
  }

  return (
    <div className="app-container">

      <TopNavbar />
      <Greeting username={username} />
      <div className="librarian-wrapper">
        <div className="librarian-page_book-tabs">
          <TabBtn
            label='Overdue'
            active={activeTab === 'overdue'}
            onClick={() => setActiveTab('overdue')}
          />
          <TabBtn
            label='Rented'
            active={activeTab === 'rented'}
            onClick={() => setActiveTab('rented')}
          />
        </div>
        <div className="book-list">
          {activeTab === 'overdue' && (
            <div>
              <LBookList tab={'overdue'} />
            </div>
          )}
          {activeTab === 'rented' && (
            <div>
              <LBookList tab={'taken'} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default Librarian