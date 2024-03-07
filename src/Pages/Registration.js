import axios from 'axios';
import React, {useState} from 'react';
import './Registration.css';

//TODO:
//lets change the name of user1 variable to more understandable like initialUser 
// use const instead of let if it is possible, it helps to read code and provides it's security (so you don't change something that don't need to be changed)
//add navigation to login page
//add some style to .css to make it look pretty (use your own or Nea's) 
//routes to your component


let user1 = {username:'', email:'', password:''};                  // blank initial user 
//lets change the name of it to more understandable like initialUser and use const not let

let Registration = () => {

    let [user, setUser] = useState(user1);                         // pass blank initial user to useState
    //same insted of let use const 
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
    //lets do that:
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

    return(
        <>
            <div className='registration'>
                <input type='text' name='username' value={user.username} placeholder='name here' onChange={handleChange}/>
                <input type='email' name='email' value={user.email} placeholder='email here' onChange={handleChange}/>
                <input type='password' name='password' value={user.password} placeholder='password here' onChange={handleChange}/>
                <button onClick={register}>register</button>
            </div>
        </>
    );
}

export default Registration;


