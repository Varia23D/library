
import React, { useState, useEffect } from 'react';
import './App.css';
import StudentHomePage from './Pages/StudentHomePage';
import Registration from './Pages/Registration'
import { Protector } from "./helpers/Protector"
import { Container } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Logout from "./components/Logout";
import Login from './Pages/Login';
import AboutBookPage from './Pages/AboutBookPage';
import BookPage from './components/AboutBook';
import { userData } from './helpers/userStorage';
// import {ToastContainer} from 'react-toastify';
const App = () => {
  const [books, setBooks] = useState([]);
  const { jwt } = userData()
  useEffect(() => {
    // Fetch book data from your API endpoint
    fetch(`${process.env.REACT_APP_BACKEND}/api/book-types/?populate=*`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(data => {
        
        setBooks(data.data)
        console.log('data: ', data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (

    <div className="app-container"> {/* Add a class for styling */}
      {/* <StudentHomePage/> */}
       {/* <Registration/> */}
       <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protector Component={StudentHomePage} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Registration />} />
          {/* <Route path="/AboutBookPage" element={<AboutBookPage />} /> */}
          {books.map(book => (
              <Route key={book.id} path={`/book/${book.id}`} element={<AboutBookPage book={book} />} />
            ))}
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </Container>
    </div>
  );
};

export default App;