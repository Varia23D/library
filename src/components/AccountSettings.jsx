import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userData } from '../helpers/userStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/AccountSettings.css';

const AccountSettings = () => {
  const [user, setUser] = useState(null);				// State for storing user data
  const [phone, setPhone] = useState('');				// State for storing phone number
  const [isEditing, setIsEditing] = useState(false);	// State for toggling edit mode
  const navigate = useNavigate();						// Hook for navigation

  useEffect(() => {
														// Fetch user data
    const fetchUserData = async () => {
      const currentUser = userData();
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        });
        setUser(response.data);
        setPhone(response.data.phone || '');			// Set phone number if available
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/404');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    const currentUser = userData();
    if (!phone) {
      toast.error('Phone number is required');			// Show error if phone number is empty
      return;
    }

    if (!/^(\+\d{1,3}\d{8,9}|0\d{8,9})$/.test(phone)) {
      toast.error('Invalid phone number format');		// Show error if phone number format is invalid
      return;
    }

    try {
														// Make an API call to update phone number
      await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/users/me`,
        { phone },
        {
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        }
      );
      toast.success('Phone number updated successfully');
      setIsEditing(false);								// Disable edit mode
    } catch (error) {
      toast.error('Error updating phone number');
      console.error('Error updating phone number:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="account-settings-container">
      <h1>Account Settings</h1>
      <div className="account-settings-field">
          <label>Name:</label>
          <input className="account-settings-input" type="text" value={user.username} readOnly />
      </div>
      <div className="account-settings-field">
          <label>Email:</label>
          <input className="account-settings-input" type="email" value={user.email} readOnly />
      </div>
      <div className="account-settings-field">
          <label>Phone:</label>
          <input
              className="account-settings-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              readOnly={!isEditing}
              placeholder='Phone number is required'
          />
      </div>
      {!isEditing && (
          <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
      )}
      {isEditing && <button className="button" onClick={handleSave}>Save</button>}
    </div>
  );
};

export default AccountSettings;
