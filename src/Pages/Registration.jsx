import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import registrationHandler from '../helpers/RegistrationHandler';
import '../css/Registration.css';

const Registration = () => {
    const { user, handleChange, register } = registrationHandler();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [emailError, setEmailError] = useState(false); // State for email error

    // Function to check if passwords match
    const checkPasswordMatch = () => {
        setPasswordsMatch(confirmPassword === user.password);
    };

    // Effect to watch for changes in user.password or confirmPassword
    useEffect(() => {
        checkPasswordMatch();
    }, [user.password, confirmPassword]);

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        handleChange(e); // Update user state
        if (value === '') {
            setEmailError(false); // Reset email error if email field is empty
        } else {
            setEmailError(!validateEmail(value)); // Check if email is valid and update email error state
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className='registration'>
            <h1>Registration</h1>
            <div className='registration_input'>
                <label className='username_label' htmlFor='username'></label>
                <h2>Username</h2>
                <input type='text' name='username' value={user.username} placeholder='Enter your name' onChange={handleChange} />
                <div className='email_wrapper'>
                    <label htmlFor='email'></label>
                    <h2>Email</h2>
                    <input
                        type='email'
                        name='email'
                        value={user.email}
                        placeholder='Enter your email'
                        onChange={handleEmailChange}
                    />
                    {emailError && <p className="email_error_text">Please enter a valid email address</p>}
                </div>
                <label htmlFor='phone_number'></label>
                <h2>Phone number</h2>
                <input type='phone_number' name='phone_number' placeholder='Enter your phone number' />

                <label htmlFor='password'></label>
                <h2>Password</h2>
                <input type='password' name='password' value={user.password} placeholder='Enter your password' onChange={handleChange} />

                <label htmlFor='confirm_password'></label>
                <h2>Confirm password</h2>
                <div className='confirm_password_container'>
                    <input type='password' name='confirm_password' value={confirmPassword} placeholder='Enter your password again' onChange={handleConfirmPasswordChange} />
                    {!passwordsMatch && confirmPassword && user.password && <p className="password_match_text">Passwords do not match</p>}
                </div>

                <button className='register_button' onClick={register}>Register</button>
                <button className='moodle_button'>Register with Moodle</button>
                <Link to="/login" className='backToLogin_button'>Already a user? login</Link>
            </div>
        </div>
    );
};

export default Registration;