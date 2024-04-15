
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
//loading circles
import {Circles} from 'react-loader-spinner'

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookTypes()
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
    <div className='loading-container'>
      <Container>
        <Circles 
        height={80}
        width={80}
        color="#84CCF8"
        />  
      </Container>
    </div>)
  }

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
            <Route path="/book/:id" element={<AboutBook books={books}/>} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;