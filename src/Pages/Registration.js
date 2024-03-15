//tishchuk-separation-of-the-visual-part-and-business-in-registration-and-login
import React from 'react';
import registrationHandler from '../helpers/RegistrationHandler';
import './Registration.css';
//Returns a registration form component.
 
const Registration = () => {
    const { user, handleChange, register } = registrationHandler();

    return (
        <div className='registration'>
        <div className='registration_background_img'>
            <div className='registration_heading'>
                <h1>Registration</h1>
            </div>
            <div className='registration_input'>
                <label htmlFor='username' >Name</label> 
                <input type='text' name='username' value={user.username} placeholder='Enter your name' onChange={handleChange}/>
                <label htmlFor='email' >Email</label>
                <input type='email' name='email' value={user.email} placeholder='Enter your email' onChange={handleChange}/>
                <label htmlFor='password' >Password</label>
                <input type='password' name='password' value={user.password} placeholder='Enter your password' onChange={handleChange}/>
                <div className='registration_buttons'> 
                    <button className='register_button' onClick={register}>register</button>
                    <button className='moodle_button'>register with moodle</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Registration;


