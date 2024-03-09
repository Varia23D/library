import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from '../components/helpers/userStorage';

const initialUser = { password: '', identifier: '' };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
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

      console.error('Error during login:', error.message);

      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className='login'>
      <div>
        <h2>Login:</h2>
        <label>
          Email:
          <input
            type='email'
            name='identifier'
            value={user.identifier}
            onChange={handleChange}
            placeholder='Enter your email'
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
