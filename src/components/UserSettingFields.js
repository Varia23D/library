import React, { useState } from 'react'
import changeUserData from '../helpers/changeUserData';

const UserSettingFields = ({user}) => {
  const [phone, setPhone] = useState(user ? user.phone : '')

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)

  }

  const handleConfirmClick = async () => {
    try {
      await changeUserData({ phone }); // Call 
      console.log('Phone number updated successfully');
    } catch (error) {
      console.error('Error changing user data:', error);
    }
  };
  return (
    <div>
      <label >
        email:
        {`${user.email}`}
      </label>
      <label>
        phone number
        <input 
        type="tel" 
        required 
        value={phone} 
        onChange={handlePhoneChange} 
        />
        <button onClick={handleConfirmClick}>Confirm</button>
        
      </label>
    </div>
  )
}

export default UserSettingFields
