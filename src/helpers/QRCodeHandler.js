import { closeTransaction, createTransaction, fetchTransactionData } from "./apiRequests";

//function takes data from QR code and function to update info about user transactions
//
export const handleQRCodeScan = async (decodedText, updateBooks) => {
  try {
    const transactionId = await fetchTransactionData(decodedText);
    if (transactionId) {
      await closeTransaction(transactionId, decodedText);
      console.log('Transaction was closed');
    } else {
      await createTransaction(decodedText);
      console.log('Transaction was created');
    }
    updateBooks();
  } catch (error) {
    console.error('Error handling QR code scan:', error);
  }

};