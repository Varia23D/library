import axios from 'axios';
import React, {useState} from 'react';
import './Registration.css';

let user1 = {username:'', email:'', password:''};

let Registration = () => {

    let [user, setUser] = useState(user1);    

    let register = async () => {
        try{
            let url = 'http://localhost:1337/api/auth/local/register'; // database link
            if (user.username && user.email && user.password){
                let result = await axios.post(url, user);
                if (result){
                    setUser(user1);
                    console.log("registered successfully");
                    // navigate to login page
                }
            }
        }
        catch(error){
            console.error(error.message);
        }
    };

    let handleChange = ({target}) => {
        let {name, value} = target;
        setUser((currentUser) => ({...currentUser, [name]:value}));
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