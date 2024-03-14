import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from '../helpers/userStorage';
import '../components/loginPage.css'
import varialogo from '../Pages/varialogo.png';

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


  const handleLogin = async () => {
    const url = `${process.env.REACT_APP_BACKEND}/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        console.log (data)
        if (data.jwt) {
          alert('Login successful!');
          storeUser(data)
          setUser(initialUser);
          navigate('/')
        } else {

          alert('Invalid login credentials!');
        }
      }
    } catch (error) {
      // Log and display an error message in case of an exception
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className='login-form'>
      <div className='logo-container'>
        <img src={varialogo} alt="Logo" className='logo-image' />
      </div>
      <div className='login-container'>
      <h2>Login</h2>
        <label className='login-label-email'>
          
          <input
            className='login-input'
            type='email'
            name='identifier'
            value={user.identifier}
            onChange={handleChange}
            placeholder='Enter your email'
          />
        </label>
        <label className='login-label-password'>
          
          <input
            className='login-input'
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </label>
        <button className='login-btn' onClick={handleLogin}>Login</button>
        <button className='moodle-login-btn'>Moodle login</button>
        <p className='login-options-separator'>or</p>
        <button className='signup-btn'>Sign up</button>
      </div>
    </div>
  );
};

export default Login;