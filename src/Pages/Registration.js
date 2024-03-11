import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import './Registration.css';


const user1 = {username:'', email:'', password:''};                  // blank initial user

let Registration = () => {

    const [user, setUser] = useState(user1);                         // pass blank initial user to useState
    const navigate = useNavigate();
    let register = async () => {
        try{
            const url = 'http://81.200.149.55:1337/api/auth/local/register'; // (test database 'http://81.200.149.55:1337')
            if (user.username && user.email && user.password){     // ensure all input fields have content
                const result = await axios.post(url, user);          // make post request to API with user info
                if (result){
                    setUser(user1);                                // if the API responds, set input values to the user
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

export default Registration;