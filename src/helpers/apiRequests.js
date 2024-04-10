import { getJWT } from "./jwtUtils";


//function takse book id and checks if there does user have an open transaction with that book id?
// if he does function returns transaction data or null if he doesn't
export const fetchTransactionData = async (bookId) => {
  const jwt = getJWT()
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/users/me?populate[transactions][populate][book][filters][id]=${bookId}&populate[transactions][filters][open][$eq]=true&populate[transactions][fields][1]=open`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    const data = await response.json();
    const transactions = data.transactions;
    const openTransaction = transactions.find(transaction => transaction.open && transaction.book && transaction.book.id === bookId);
    console.log('transactions: ', transactions)
    return openTransaction ? openTransaction.id : null

  } catch (error) {
    console.error('Error getting transaction data:', error);
      throw error;
  }
};

//function checks books status taken (true/false) 
export const isTaken = async (bookId) => {
  const jwt = getJWT()
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/book-copies/${bookId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
    });
    if (!response.ok) {
    throw new Error('Failed to close transaction');}
    const book = await response.json();
    const takenStatus = book.data.attributes.taken;
    console.log('status knigi:', takenStatus)
    return takenStatus 
  } catch (error) {
    console.error('Error closing transaction:', error);
    throw error;
  }
}

//function takes transaction and book ids and sendsa  put request to change open status of taken transaction and launches function to change book status to returned 
export const closeTransaction = async (transactionId, bookId) => {
  const jwt = getJWT()
  try {
    const body = {
          data: {
            open: false
          }
        };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/transactions/${transactionId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to close transaction');
    }
    console.log('Transaction closed successfully');
    await changeBookStatusReturned(bookId);
  } catch (error) {
    console.error('Error closing transaction:', error);
    throw error;
  }
};

//function takes book id and sends a post request to create a new transaction with that book id and launches function to change book status to taken 

export const createTransaction = async (bookId, loan_period) => {
  const jwt = getJWT()
  const todayDate = new Date();
  const return_date = todayDate + loan_period;
  try {
    const body = {
      data: { 
        book: bookId,
        return_date: return_date
      }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/transactions/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    console.log('Transaction created successfully');
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
  changeBookStatusTaken(bookId);
};


// function takes book id and status to make a put request to change the book status to taken/returned, depending on status value 
export const changeBookStatus = async (bookId, status) => {
  const jwt = getJWT()
  try {
    const body = {
      data: {
        taken: status === 'taken' ? true : false,
      }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/book-copies/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${ jwt }`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed to change book ${bookId} status to ${status}`);
    }
    console.log(`${bookId} status changed to ${status}`)
  } catch (error) {
    console.error('Error modifying book status:', error);
    throw error;
  }
}

export const changeBookStatusReturned = async (bookId) => {
  await changeBookStatus(bookId, 'returned')
}
export const changeBookStatusTaken = async (bookId) => {
  await changeBookStatus(bookId, 'taken')
}
