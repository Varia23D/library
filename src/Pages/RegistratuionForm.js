import React from 'react';
import Registration from './Registration';
import './Registration.css';


//Returns a registration form component.
 
const RegistrationForm = () => {
    const { user, handleChange, register } = Registration();

    return (
        <div className='registration'>
            <input type='text' name='username' value={user.username} placeholder='name here' onChange={handleChange} />
            <input type='email' name='email' value={user.email} placeholder='email here' onChange={handleChange} />
            <input type='password' name='password' value={user.password} placeholder='password here' onChange={handleChange} />
            <button onClick={register}>register</button>
        </div>
    );
};

export default RegistrationForm;