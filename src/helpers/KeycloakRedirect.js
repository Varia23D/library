import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function KeycloakRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code'); // Extract the authorization code

    if (code) {
      // Exchange the authorization code for an access token
      axios.get(`${process.env.REACT_APP_BACKEND}/api/connect/keycloak/callback?code=${code}`)
        .then(response => {
          const { jwt, user } = response.data;
          // Save the JWT and user data in your application (e.g., in the state or local storage)
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('user', JSON.stringify(user));
          // Navigate to the home page or another page
          navigate('/');
        })
        .catch(error => {
          console.error('Error during Keycloak callback:', error);
          // Handle the error (e.g., show an error message)
        });
    }
  }, [location, navigate]);

  return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );
}

export default KeycloakRedirect;