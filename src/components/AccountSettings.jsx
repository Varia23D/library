import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userData } from '../helpers/userStorage';
import { useNavigate } from 'react-router-dom';
import '../css/AccountSettings.css';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = userData();
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        });
        setUser(response.data);
        setPhone(response.data.phone || '');
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
      setMessage('Phone number is required');
      return;
    }

    if (!/^(\+\d{1,3}\d{8,9}|0\d{8,9})$/.test(phone)) {
      setMessage('Invalid phone number format');
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/users/me`,
        { phone },
        {
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
          },
        }
      );
      setMessage('Phone number updated successfully');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating phone number');
      console.error('Error updating phone number:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="account-settings-container">
        <div className="account-settings-box">
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
                />
            </div>
            {!isEditing && (
                <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
            )}
            {isEditing && <button className="button" onClick={handleSave}>Save</button>}
            {message && <p>{message}</p>}
        </div>
    </div>
  );
};

export default AccountSettings;