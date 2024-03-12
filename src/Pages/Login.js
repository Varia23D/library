import React, { useState } from 'react';
import loginHandler from '../helpers/loginHandler';

// Define the initial state for the user with empty email and password

// TODO
// Routes to the component
// add some stile to the page, make it look pretty (use own or Nea's)
// TBA


const initialUser = { password: '', identifier: '' };

// Define the LoginForm functional component
const Login = () => {
  // State hook to manage the user's input
  const [user, setUser] = useState(initialUser);
  // Event handler for input changes (email and password)
  const handleChange = ({ target }) => {
    // Extract the name and value from the input field
    const { name, value } = target;
    // Update the user state using the previous state
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  // Event handler for the login button click
  const handleLogin = () => {
    loginHandler(user, setUser, initialUser);
  };

  // JSX rendering for the login form
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