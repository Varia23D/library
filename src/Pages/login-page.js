import React, { useState } from 'react';
import axios from 'axios';

// TODO
// Routes to the component
// add some stile to the page, make it look pretty (use own or Nea's)
// TBA

const initialUser = { password: '', identifier: '' };

const Login = () => {
  const [user, setUser] = useState(initialUser);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = 'http://81.200.149.55:1337/api/auth/local';
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        console.log (data)
        if (data.jwt) {
          alert('Login successful!');
          setUser(initialUser);
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
