import { createContext, useContext, useState } from "react"
import api from "./axiosApi/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  const logout = async () => {
    try {
      await api.post("/logout")
      sessionStorage.clear()
      setIsAuth(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
