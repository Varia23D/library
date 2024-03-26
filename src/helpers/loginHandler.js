import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const LoginHandler = async (user, setUser, initialUser, navigate) => { // Accept navigate function as a parameter
  // API endpoint for authentication
  const url = `${process.env.REACT_APP_BACKEND}/api/auth/local`;
  try {
    // Check if both email and password are provided
    if (user.identifier && user.password) {
      // Make a POST request to the authentication API
      const { data } = await axios.post(url, user);
      // Check if a JWT token is received in the response
      if (data.jwt) {
        console.log('data jwt: ', data);
        // Store JWT token in cookies
        Cookies.set('userData', data, { expires: 30 }); // Expires in 30 days
        // Display a success alert and reset the user state
        toast.success('Login successful!');   // Toast success message
        setUser(initialUser);
        console.log('initial user', initialUser);
        navigate('/'); // Use the navigate function for navigation
      } else {
        // Display an alert for invalid login credentials
        toast.error('Invalid login credentials!');    // Toast error message
      }
    }
  } catch (error) {
    // Log and display an error message in case of an exception
    console.error('Error during login:', error.message);
    toast.error('Error during login' + error.message);   // Toast error message
  }
};

export default LoginHandler;
