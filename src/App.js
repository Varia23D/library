import React, { useState, useEffect } from 'react';
import './App.css';
import StudentHomePage from './Pages/StudentHomePage';
import Registration from './Pages/Registration';
import { Protector } from "./helpers/Protector";
import { Container, Toast } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Logout from "./components/Logout";
import Login from './Pages/Login';
import AboutBookPage from './Pages/AboutBookPage';
import BookPage from './components/AboutBook';
import { userData } from './helpers/userStorage';
import fetchBookTypes from './helpers/fetchBookTypes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookSearchPage from './Pages/BookSearchPage.jsx';
import NotFoundPage from './Pages/404-page.js'

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
            <Route path="/" element={<Protector Component={StudentHomePage} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/book-search" element={<BookSearchPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            {books.map(book => (
              <Route key={book.id} path={`/book/${book.id}`} element={<AboutBookPage book={book} />} />
            ))}
          </Routes>
        </BrowserRouter>
      </Container>
      <ToastContainer />
    </div >
  );
};

export default App;
