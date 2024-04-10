
import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'; // Import css for the toast container
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import the toast container
import { Container } from "reactstrap";
import { Protector } from "./helpers/Protector"
import fetchBookTypes from './helpers/fetchBookTypes';
//pages
import Login from './Pages/Login';
import Logout from "./components/Logout";
import Registration from './Pages/Registration'
import Home from './Pages/Home';
import AboutBook from './Pages/AboutBook';
import BookSearch from './Pages/BookSearch';
import NotFoundPage from './Pages/404';

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
              <Route key={book.id} path={`/book/${book.id}`} element={<AboutBook book={book} />} />
            ))}
          </Routes>
        </BrowserRouter>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;