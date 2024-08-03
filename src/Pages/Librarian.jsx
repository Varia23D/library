import { useEffect, useState } from "react"
import Greeting from "../components/Greeting"
import { userData } from '../helpers/userStorage';
import Footer from "../components/Footer";

const Librarian = () => {
  const {books, setBooks} = useState()
  const {username} = userData() || {}

  return (
    <div className="app-container">
      <Greeting username={username} />
      <Footer />
    </div>
  )

}

export default Librarian