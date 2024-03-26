import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// import './Registration.css';

const initialUser = { username: '', email: '', password: '' }; // blank initial user

const RegistrationHandler = () => {
    const [user, setUser] = useState(initialUser); // pass blank initial user to useState
    const navigate = useNavigate();

    const register = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND}/api/auth/local/register`;
            // Ensure all input fields have content
            if (user.username && user.email && user.password) {
                const result = await axios.post(url, user); // Make post request to API with user info
                if (result) {
                    setUser(initialUser); // Reset user input
                    console.log('registered successfully');
                    toast.success('Registered successfully'); // Display success message as toast
                }
                navigate('/login'); // Navigate to login page after successful registration
            }
        } catch (error) {
            console.error(error.message); // Log error message
            toast.error('Registration unsuccessful: ' + error.message); // Display error message as toast
        }
    };

    const handleChange = ({ target }) => { // Function to handle input changes
        const { name, value } = target;
        setUser((currentUser) => ({ ...currentUser, [name]: value })); // Update user state
    };

    return { user, handleChange, register };
}

export default RegistrationHandler;
