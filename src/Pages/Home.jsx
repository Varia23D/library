import React, { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks'
import BookList from '../components/BookList';
import TopNavbar from '../components/TopNavbar'; 
import Greeting from '../components/Greeting';
// import QrReader from '../components/QrReader';
import Footer from '../components/Footer';
import { userData } from '../helpers/userStorage';
import BarcodeScannerInput from '../components/BarcodeScannerInput';
import { closeTransaction, createTransaction, fetchTransactionData, getBookIdbyISBN, isTaken } from '../helpers/apiRequests';
import { toast } from 'react-toastify';

const Home = () => {
  const {books, updateBooks} = useBooks();
  const {username} = userData() || {}
  

  useEffect(() => {
    updateBooks()
  }, [updateBooks]); 

  const handleBarcodeScan = async (barcode) => {
    // console.log('Scanned barcode:', barcode);
    try {

      const decodedText = await getBookIdbyISBN(barcode);

      const transactionId = await fetchTransactionData(decodedText);
      if (transactionId) {
        await closeTransaction(transactionId, decodedText);
        // console.log('Transaction was closed');
        toast.success('Book returned!');   // Toast success message
      } else {
        const taken = await isTaken(decodedText);
        if (!taken) {
          await createTransaction(decodedText);
          // console.log('Transaction was created');
          toast.success('Book taken!');   // Toast success 
        } else {
          // console.log('book is taken')
          toast.error('Book is already taken by another user!');   // Toast error
          return
        }
  
      }
      updateBooks();
    } catch (error) {
  
    }
    // Здесь можно добавить логику для обработки кода, например, вызвать updateBooks с нужными параметрами
    updateBooks(barcode);
  };

  return (
    <div className="app-container"> 
      <TopNavbar />
      <Greeting username={username} />
      <BarcodeScannerInput onScan={handleBarcodeScan} />
      <BookList books={books} />
      <Footer />
    </div>
  );
};

export default Home;