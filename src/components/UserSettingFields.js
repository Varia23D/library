import React, { useState } from 'react'

const UserSettingFields = ({user}) => {
  const [phone, setPhone] = useState(user ? user.phone : '')

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
    
  }
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
        <button>Confirm</button>
      </label>
    </div>
  )
}

export default UserSettingFields
