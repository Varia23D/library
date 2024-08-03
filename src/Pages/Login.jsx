import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from '../helpers/userStorage';
import { toast } from 'react-toastify';
import '../css/Login.css'
import { useAuth } from '../helpers/AuthContext';
import { getUserRole } from '../helpers/getUserRole';

const initialUser = { password: '', identifier: '' };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const { setUserRole } = useAuth()
  const navigate = useNavigate();

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
          toast.success('Login successful!'); 
          storeUser(data)

          const role = await getUserRole(data.jwt)
          setUserRole(role)


          setUser(initialUser);
          navigate('/')
        } else {

          toast.error('Invalid login credentials!'); 
        }
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error('Login error. Please try again!');
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