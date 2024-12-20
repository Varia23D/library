
import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'; // Import css for the toast container
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import the toast container
import { Container } from "reactstrap";
import Protector from "./helpers/Protector";
import RequirePhoneNumber from "./helpers/RequirePhoneNumber";
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
import { Oval } from 'react-loader-spinner'
import EditProfile from './Pages/EditProfile';
import KeycloakRedirect from './helpers/KeycloakRedirect';
import { AuthProvider, useAuth } from './helpers/AuthContext';
import Librarian from './Pages/Librarian';

const AppContent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useAuth()


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
          <Oval
            height={80}
            width={80}
            color="#84CCF8"
          />
        </Container>
      </div>)
  }
  // console.log(userRole)

  return (

    <div className="app-container">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Protector><RequirePhoneNumber>
              {userRole === 'Librarian' ? <Librarian /> : <Home />}
            </RequirePhoneNumber></Protector>} />
            <Route path="/login" element={<Login />} />
            <Route path="/connect/:provider/redirect" element={<KeycloakRedirect />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/book-search" element={<Protector><RequirePhoneNumber>
              <BookSearch />
            </RequirePhoneNumber></Protector>} />
            <Route path="/book/:id" element={<RequirePhoneNumber>
              <AboutBook books={books} />
            </RequirePhoneNumber>} />
            <Route path="/account-settings" element={<EditProfile />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <ToastContainer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
