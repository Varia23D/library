import { getJWT } from "./jwtUtils";
import { toast } from 'react-toastify';

export const fetchTransactionData = async (bookId) => {
  const jwt = getJWT();
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/transactions?filters[book]=${bookId}&filters[open]=true`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    const data = await response.json();
    const transactions = data.data;
    const openTransaction = transactions.find(transaction => transaction.attributes.open);
    return openTransaction ? openTransaction.id : null;
  } catch (error) {
    console.error('Error getting transaction data:', error);
    toast.error("Error fetching transaction data. Please try again.");
    throw error;
  }
};

export const closeTransaction = async (transactionId, bookId) => {
  const jwt = getJWT();
  try {
    const body = { data: { open: false } };
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
    toast.success('Transaction closed successfully');
    await changeBookStatus(bookId, 'returned');
  } catch (error) {
    console.error('Error closing transaction:', error);
    toast.error("Error closing transaction. Please try again.");
    throw error;
  }
};

export const createTransaction = async (bookId) => {
  const jwt = getJWT();
  try {
    const body = { data: { book: bookId } };
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
    toast.success('Transaction created successfully');
  } catch (error) {
    console.error('Error creating transaction:', error);
    toast.error("Error creating transaction. Please try again.");
    throw error;
  }
  changeBookStatus(bookId, 'taken');
};

export const changeBookStatus = async (bookId, status) => {
  const jwt = getJWT();
  try {
    const body = { data: { taken: status === 'taken' } };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/book-copies/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed to change book ${bookId} status to ${status}`);
    }
    toast.success(`${bookId} status changed to ${status}`);
  } catch (error) {
    console.error('Error modifying book status:', error);
    toast.error(`Error changing book status to ${status}. Please try again.`);
    throw error;
  }
};
