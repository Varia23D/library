import React, { useState } from "react"
import { userData } from "../helpers/userStorage"

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const token = userData()
  const openTransactionsQuerry = '/api/users/me?populate[transactions][populate][book][populate][book][populate]=*&populate[transactions][filters][open]=true'

  
  const fetchBooks = async () => {
    fetch(`${process.env.REACT_APP_BACKEND}${openTransactionsQuerry}`, {
      headers: {
        "Authorization": `Bearer ${token.jwt}`
      }
    })
      .then((res) => res.json())
      .then((book) => {
        console.log('book:', books)
        setBooks(book.transactions);
       });
  }

  const updateBooks = () => {
    fetchBooks();
  };
  return {books, updateBooks}
}