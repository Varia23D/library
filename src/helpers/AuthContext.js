import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null)

  const value = {
    userRole,
    setUserRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}