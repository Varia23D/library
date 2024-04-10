import { closeTransaction, createTransaction, fetchTransactionData, isTaken } from "./apiRequests";
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
      const taken = await isTaken(decodedText);
      if (!taken) {
        await createTransaction(decodedText);
        console.log('Transaction was created');
        toast.success('Book taken!');   // Toast success 
      } else {
        console.log('book is taken')
        toast.error('Book is already taken by another user!');   // Toast error
        return
      }

    }
    updateBooks();
  } catch (error) {

  }

};