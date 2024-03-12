import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router';
// import './Registration.css';


const initialUser = {username:'', email:'', password:''};                  // blank initial user

const RegistrationHandler = () => {

    const [user, setUser] = useState(initialUser);                         // pass blank initial user to useState
    const navigate = useNavigate();
    const register = async () => {
        try{
            const url = `${process.env.REACT_APP_BACKEND}/api/auth/local/register`;
            if (user.username && user.email && user.password){     // ensure all input fields have content
                const result = await axios.post(url, user);          // make post request to API with user info
                if (result){
                    setUser(initialUser);                                // if the API responds, set input values to the user
                    console.log('registered successfully');
                    alert('registered successfully');
                }
                navigate('./Pages/login-page');    
            }
        }
        catch(error){
            console.error(error.message);                           // display error message if registration is unsuccessful 
            alert('Registration unsuccessful: ' + error.message);
        }
    };

    const handleChange = ({target}) => {                              // function to handle input  
        const {name, value} = target;                                 // target's name and value assigned to variables
        setUser((currentUser) => ({...currentUser, [name]:value})); // assigns input value to the blank user with setUser hook
    };

    return { user, handleChange, register };
}

export default RegistrationHandler;