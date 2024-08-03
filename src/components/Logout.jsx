import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'

const Logout = () => {
  
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("user", "")
    localStorage.setItem('userRole', '')
    Cookies.remove('userData')
    navigate('/login')
  }, [navigate]);

  return null
}

export default Logout
