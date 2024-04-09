import React from 'react';
import { getJWT } from './jwtUtils';

export default async function changeUserData(userData) {
  console.log('change user data', userData);
  const jwt = getJWT();
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/me`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: userData }), // Ensure userData is nested under 'data' key
    });

    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to change user data');
    }
  } catch (error) {
    console.error('Error changing user data:', error);
    throw error;
  }
}
