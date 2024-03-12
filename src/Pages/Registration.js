import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import './Registration.css';

//TODO:
//lets change the name of user1 variable to more understandable like initialUser 
// use const instead of let if it is possible, it helps to read code and provides it's security (so you don't change something that don't need to be changed)
//add navigation to login page
//add some style to .css to make it look pretty (use your own or Nea's) 
//routes to your component


const initialUser = {username:'', email:'', password:''};                  // blank initial user

const Registration = () => {

    const [user, setUser] = useState(initialUser);                         // pass blank initial user to useState
    const navigate = useNavigate();

    const register = async () => {
        try{
            const url = 'http://81.200.149.55:1337/api/auth/local/register';
            if (user.username && user.email && user.password){             // ensure all input fields have content
                const result = await axios.post(url, user);                // make post request to API with user info
                if (result){
                    setUser(initialUser);                                  // if the API responds, set input values to the user
                    console.log('registered successfully');
                    alert('registered successfully');
                    navigate('./Pages/login-page');                        // using useNavigate to redirect to the login page 
                }                                                          // after successful registration
            }
        }
        catch(error){
            console.error(error.message);                                  // display error message if registration is unsuccessful 
            alert('Registration unsuccessful: ' + error.message);
        }
    };

    const handleChange = ({target}) => {                                   // function to handle input  
        const {name, value} = target;                                      // target's name and value assigned to variables
        setUser((currentUser) => ({...currentUser, [name]:value}));        // assigns input value to the blank user with setUser hook
    };

    return(
        <div className='main'>
            <div className='title'>
                <div className='registration'><h1>Registration</h1></div>
            </div>
            <div className='input'>
                <label htmlFor='username' >Name</label> 
                <input type='text' name='username' value={user.username} placeholder='Enter your name' onChange={handleChange}/>
                <label htmlFor='email' >Email</label>
                <input type='email' name='email' value={user.email} placeholder='Enter your email' onChange={handleChange}/>
                <label htmlFor='password' >Password</label>
                <input type='password' name='password' value={user.password} placeholder='Enter your password' onChange={handleChange}/>
                <div className='buttonBox'> <button className='registerButton' onClick={register}>register</button> </div>
            </div>
        </div>
    );
}

export default Registration;


