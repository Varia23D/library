
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import Registration from './Pages/Registration'
import { Protector } from "./helpers/Protector"
import { Container } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Logout from "./components/Logout";
import Login from './Pages/Login';
import AboutBookPage from './Pages/AboutBook';
import fetchBookTypes from './helpers/fetchBookTypes';
import NotFoundPage from './Pages/404';
import BookSearch from './Pages/BookSearch';
import { ToastContainer } from 'react-toastify'; // Import the toast container
import 'react-toastify/dist/ReactToastify.css'; // Import css for the toast container
const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBookTypes()
      .then(data => {
        setBooks(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (

    <div className="app-container">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Protector Component={Home} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/book-search" element={<BookSearch />} />
            <Route path="/*" element={<NotFoundPage />} />
            {books.map(book => (
              <Route key={book.id} path={`/book/${book.id}`} element={<AboutBookPage book={book} />} />
            ))}
          </Routes>
        </BrowserRouter>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;