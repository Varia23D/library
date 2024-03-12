import React, { useState } from 'react';
import axios from 'axios';
import '../components/loginPage.css'

// Define the initial state for the user with empty email and password
const initialUser = { password: '', identifier: '' };

// Define the Login functional component
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
  const handleLogin = async () => {
    // API endpoint for authentication
    const url = 'http://81.200.149.55:1337/api/auth/local';
    try {
      // Check if both email and password are provided
      if (user.identifier && user.password) {
        // Make a POST request to the authentication API
        const { data } = await axios.post(url, user);
        // Log the response data to the console
        console.log(data);

        // Check if a JWT token is received in the response
        if (data.jwt) {
          // Display a success alert and reset the user state
          alert('Login successful!');
          setUser(initialUser);
        } else {
          // Display an alert for invalid login credentials
          alert('Invalid login credentials!');
        }
      }
    } catch (error) {
      // Log and display an error message in case of an exception
      console.error('Error during login:', error.message);
      alert('Error during login. Please try again.');
    }
  };

  // JSX rendering for the login form
  return (
    <div className='login'>
      <div>
        <h2>Login</h2>
        <div className='container1'>
          <label className='email'>
            <input className='emailBar'
            type='email'
            name='identifier'
            value={user.identifier}
            onChange={handleChange}
            placeholder='Email: '
          />
        </label>
        <label className='password'>
          <input className='passwordBar'
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Password: '
          />
        </label>
        <button className='loginBtn'onClick={handleLogin}>Login</button>
        <button className='moodleLoginBtn'>Moodle login</button>
        <p class='or'>or </p>
        <button class='signupBtn'>Sign up:</button>
        </div>
      </div>
      <p1 class='filler'></p1>
    </div>
  );
};

export default Login;