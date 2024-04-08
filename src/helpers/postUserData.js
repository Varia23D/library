import React from 'react'

export default async function postUserData() {
  const {jwt} = userData() 
  try {
    const response = await fetch (`${process.env.REACT_APP_BACKEND}/api/users/me`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
    })
    if (!response.ok) {
      throw new Error('Failed to get user data')
    }
    const userData = await response.json()
    console.log(userData)
    return userData
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}
