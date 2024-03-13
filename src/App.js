
import React, { useState, useEffect } from 'react';
import './App.css';
import StudentHomePage from './Pages/StudentHomePage';
import Registration from './Pages/Registration'
import { Protector } from "./components/helpers/Protector"
import { Container } from "reactstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Logout from "./components/Logout";
import Login from './Pages/login-page';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => setBooks(data))
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
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </Container>
    </div>
  );
};

export default App;