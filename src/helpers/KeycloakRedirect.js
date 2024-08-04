import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { storeUser } from './userStorage';

const KeycloakRedirect = () => {
  const navigate = useNavigate();
  const { provider } = useParams();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      axios.get(`${process.env.REACT_APP_BACKEND}/api/auth/${provider}/callback`, {
        params: { access_token: accessToken }
      })
      .then(response => {
        const { jwt, user } = response.data;
        storeUser({ jwt, user }); // Save user and token
        navigate('/'); // Redirect to home
      })
      .catch(error => {
        console.error('Error during Keycloak callback:', error.response || error.message);
      });
    }
  }, [location, navigate, provider]);

  return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );
}

export default KeycloakRedirect;
