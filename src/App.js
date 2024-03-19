
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
// import {ToastContainer} from 'react-toastify';
const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch book data from your API endpoint
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => setBooks(data))
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
          <Route path="/AboutBookPage" element={<AboutBookPage />} />
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </Container>
    </div>
  );
};

export default App;