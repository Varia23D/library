import React, { useState, useEffect } from 'react';
import './App.css';
import StudentHomePage from './Pages/StudentHomePage';
import Registration from './Pages/Registration';
import { Protector } from "./helpers/Protector";
import { Container } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Logout from "./components/Logout";
import Login from './Pages/Login';
import AboutBookPage from './Pages/AboutBookPage';
import BookPage from './components/AboutBook';
import { userData } from './helpers/userStorage';
import fetchBookTypes from './helpers/fetchBookTypes';
<<<<<<< HEAD
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

=======
import NotFoundPage from './Pages/404-page';
import BookSearchPage from './Pages/BookSearchPage';
// import {ToastContainer} from 'react-toastify';
>>>>>>> f145d46a7a12d0a4532f83b05c33df68dee85e07
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
<<<<<<< HEAD
      <Container>
=======
       <Container>
>>>>>>> f145d46a7a12d0a4532f83b05c33df68dee85e07
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Protector Component={StudentHomePage} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/registration" element={<Registration />} />
<<<<<<< HEAD
            {books.map(book => (
              <Route key={book.id} path={`/book/${book.id}`} element={<AboutBookPage book={book} />} />
            ))}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
=======
            <Route path="/book-search" element={<BookSearchPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            {books.map(book => (
                <Route key={book.id} path={`/book/${book.id}`} element={<AboutBookPage book={book} />} />
              ))}
          </Routes>
        </BrowserRouter>
>>>>>>> f145d46a7a12d0a4532f83b05c33df68dee85e07
      </Container>
    </div>
  );
};

export default App;
