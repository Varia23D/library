import React, { useState } from "react"
import { userData } from "../helpers/userStorage"

//function to get data from current user via srapi request about user (me)
export const useBooks = () => {
  const [books, setBooks] = useState([])
  const { jwt } = userData() 
  const openTransactionsQuerry = '/api/users/me?populate[transactions][populate][book][populate][book][populate]=*&populate[transactions][filters][open]=true' // populate user data and focus only on transactions, filter them by finding only open. That means we show only currently taken books by current user. That filtering can give data about type books, so we have access to title, cover and other info of taken books

  
  const fetchUserData = async () => {
    try {
      const response = await  fetch(`${process.env.REACT_APP_BACKEND}${openTransactionsQuerry}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      })

      if (!response) {
        throw new Error ('Failed to fethc user data')
      }
      const data = await response.json()
      setBooks(data.transactions) //take only needed data about transactions
    } catch (error) {
        console.error('Error fethcing user data: ', error)
        setBooks([])  
    }

  }

  const updateBooks = () => {
    fetchUserData();
  }; //update info from the server


  return {books, updateBooks}
}