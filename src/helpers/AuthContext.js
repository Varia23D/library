import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
const savedRole = localStorage.getItem('userRole')
return savedRole || null
  })

  useEffect(() => {

    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole')
    }
  }, [userRole])

  const value = {
    userRole,
    setUserRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}