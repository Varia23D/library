import { getJWT } from "./jwtUtils";

export const fetchTransactionData = async (bookId) => {
  const jwt = getJWT()
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/transactions?filters[book]=${bookId}&filters[open]=true`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    const data = await response.json();
    const transactions = data.data;
    const openTransaction = transactions.find(transaction => transaction.attributes.open);
    return openTransaction ? openTransaction.id : null

  } catch (error) {
    console.error('Error getting transaction data:', error);
      throw error;
  }
};

export const closeTransaction = async (transactionId, bookId) => {
  const jwt = getJWT()
  try {
    const body = {
          data: {
            open: false
          }
        };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/transactions/${transactionId}`, {
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

export const createTransaction = async (bookId) => {
  const jwt = getJWT()
  try {
    const body = {
      data: { book: bookId }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/transactions/`, {
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

export const changeBookStatus = async (bookId, status) => {
  const jwt = getJWT()
  try {
    const body = {
      data: {
        taken: status === 'taken' ? true : false,
      }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/book-copies/${bookId}`, {
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
