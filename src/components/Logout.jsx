import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'

const Logout = () => {
  
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("user", "")
    Cookies.remove('userData')
    navigate('/login')
  }, [navigate]);

  return null
}

export default Logout
