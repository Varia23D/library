import axios from 'axios';
import Cookies from 'js-cookie';

const Auth = async (user, setUser, initialUser) => {
  // API endpoint for authentication
  const url = 'http://81.200.149.55:1337/api/auth/local';// (test database 'http://81.200.149.55:1337')
  try {
    // Check if both email and password are providedA
    if (user.identifier && user.password) {
      // Make a POST request to the authentication API
      const { data } = await axios.post(url, user);
      // Log the response data to the console
      console.log(data);

      // Check if a JWT token is received in the response
      if (data.jwt) {
        // Store JWT token in cookies
        Cookies.set('jwt', data.jwt, { expires: 30 }); // Expires in 30 days
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

export default Auth;