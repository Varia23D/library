import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getUserRole } from './getUserRole';
import { useAuth } from './AuthContext';

const LoginHandler = async (user, setUser, initialUser, navigate) => { 
  const url = `${process.env.REACT_APP_BACKEND}/api/auth/local`;
  try {
    if (user.identifier && user.password) {
      const { data } = await axios.post(url, user);

      if (data.jwt) {
        Cookies.set('userData', data, { expires: 30 });
        toast.success('Login successful!');

        // get user role
        const role = await getUserRole(data.jwt)
        const {setUserRole} = useAuth()
        setUserRole(role)

        setUser(initialUser);
        navigate('/');
      } else {
        toast.error('Invalid login credentials!');
      }
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    toast.error('Login error. Please try again!'); 
  }
};

export default LoginHandler;
