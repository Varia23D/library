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
      toast.success('QR scan succesfull!'); // Toast message
    } else {
      await createTransaction(decodedText);
      console.log('Transaction was created');
      toast.success('QR scan succesfull!');   // toast message
    }
    updateBooks();
  } catch (error) {
    console.error('Error handling QR code scan:', error);
    toast.error('QR scan error!'); //Error message as toast
  }

};