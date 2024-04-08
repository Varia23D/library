import React from 'react'
import fetchUserData from './fetchUserData';

export default async function hasPhoneNumber(jwt) {
    const userData = fetchUserData()
    const userPhoneNumber = userData.phone
    console.log('userData: ', userData)
    return userPhoneNumber

}
