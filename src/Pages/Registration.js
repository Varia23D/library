import axios from 'axios';
import {useState} from 'react';
import './Registration.css';
// import {useHistory} from 'react-router-dom';


let user1 = {username:'', email:'', password:''};                  // blank initial user

let Registration = () => {

    let [user, setUser] = useState(user1);                         // pass blank initial user to useState

    let register = async () => {
        try{
            let url = 'http://localhost:1337/api/auth/local/register'; // (test database 'http://81.200.149.55:1337')
            if (user.username && user.email && user.password){     // ensure all input fields have content
                let result = await axios.post(url, user);          // make post request to API with user info
                if (result){
                    setUser(user1);                                // if the API responds, set input values to the user
                    console.log('registered successfully');
                    alert('registered successfully');
                    // TO ADD: navigate to login page after successful registration
                    // Suggestion: use react-router-dom library
                    // to navigate to login page using useHistory hook
                    // like that: history.push('/login'); 
                }
            }
        }
        catch(error){
            console.error(error.message);                           // display error message if registration is unsuccessful 
            alert('Registration unsuccessful: ' + error.message);
        }
    };

    let handleChange = ({target}) => {                              // function to handle input  
        let {name, value} = target;                                 // target's name and value assigned to variables
        setUser((currentUser) => ({...currentUser, [name]:value})); // assigns input value to the blank user with setUser hook
    };

    return { user, handleChange, register };
}

export default Registration;