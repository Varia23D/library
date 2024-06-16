import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from '../helpers/userStorage';
import { toast } from 'react-toastify';             // Import toast
import '../css/Login.css'
// import varialogo from '../Pages/varialogo.png';

// Define the initial state for the user with empty email and password
const initialUser = { password: '', identifier: '' };

// Define the Login functional component
const Login = () => {
  const [user, setUser] = useState(initialUser);

  const navigate = useNavigate();

  // Event handler for input changes (email and password)
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSignUpBtn = () => {
    navigate('/registration')
  }
  const handleLogin = async () => {
    const url = `${process.env.REACT_APP_BACKEND}/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          toast.success('Login successful!');   // Toast success message instead of an alert
          storeUser(data)
          setUser(initialUser);
          navigate('/')
        } else {

          toast.error('Invalid login credentials!');    // Toast error message instead of an alert
        }
      }
    } catch (error) {
      // Log and display an error message in case of an exception
      console.error('Error during login:', error.message);
      toast.error('Login error. Please try again!');   // Toast error message instead of an alert
    }
  };

  return (
    <div className='loginWholeContainer'>
    <div className='loginForm-container'>
      <h1>Login</h1>
      <div className='login-container'>
        <label className='login-label-email'>
          <h2>Email</h2>
          <input
            className='login-input'
            type='email'
            name='identifier'
            value={user.identifier}
            onChange={handleChange}
            placeholder='Enter your email'
            autoComplete='email'
          />
        </label>
        <label className='login-label-password'>
          <h2 className=''>Password</h2>
          <input
            className='login-input'
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Enter your password'
            autoComplete='current-password'
          />
        </label>
        <button className='login-btn' onClick={handleLogin}>Login</button>
        <button className='moodle-login-btn'>Moodle</button>
        <p className='login-options-separator'>Or</p>
        <button className='signup-btn' onClick={handleSignUpBtn}>Sign up</button>
      </div>
    </div>
    </div>
  );
};

export default Login;