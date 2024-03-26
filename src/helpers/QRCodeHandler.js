import { closeTransaction, createTransaction, fetchTransactionData } from "./apiRequests";
import { toast } from 'react-toastify';


//function takes data from QR code and function to update info about user transactions
//
export const handleQRCodeScan = async (decodedText, updateBooks) => {
  try {
    const transactionId = await fetchTransactionData(decodedText);
    if (transactionId) {
      await closeTransaction(transactionId, decodedText);
      console.log('Transaction was closed');
      toast.success('Transaction was closed'); //Toast message
    } else {
      await createTransaction(decodedText);
      console.log('Transaction was created');
      toast.success('Transaction was created');   //Success message as toast
    }
    updateBooks();
  } catch (error) {
    console.error('Error handling QR code scan:', error);
    toast.error('Error handling QR code scan. Please try again.'); //Error message as toast
  }

};