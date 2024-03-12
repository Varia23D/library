import React from 'react';
import Registration from '../helpers/RegistrationHandler';
import './Registration.css';


//Returns a registration form component.
 
const Registration = () => {
    const { user, handleChange, register } = Registration();

    return (
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
};

export default Registration;