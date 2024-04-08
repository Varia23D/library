import React, { useEffect, useState } from 'react'
import TopNavbar from '../components/TopNavbar'
import Greeting from '../components/Greeting'
import fetchUserData from '../helpers/fetchUserData'
import UserSettingFields from '../components/UserSettingFields';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const userData = await fetchUserData()
      setUser(userData)
    }
    fetchUser()
  }, [])
  console.log(user)

  return (
    <div>
      <TopNavbar />
      <Greeting username={user ? user.username : ''} />
      <UserSettingFields user = {user}/>
    </div>
  )
}
