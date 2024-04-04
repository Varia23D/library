import { closeTransaction, createTransaction, fetchTransactionData } from "./apiRequests";
import { toast } from 'react-toastify';  // Import toast

//function takes data from QR code and function to update info about user transactions
//
export const handleQRCodeScan = async (decodedText, updateBooks) => {
  try {
    const transactionId = await fetchTransactionData(decodedText);
    if (transactionId) {
      await closeTransaction(transactionId, decodedText);
      console.log('Transaction was closed');
      toast.success('Book returned!');   // Toast success message
    } else {
      await createTransaction(decodedText);
      console.log('Transaction was created');
      toast.success('Book taken!');   // Toast success message
    }
    updateBooks();
  } catch (error) {
    console.error('Error handling QR code scan:', error);
    toast.error('QR scan error. Please try again!');   // Toast error message
  }

};