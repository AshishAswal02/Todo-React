import { Navigate } from "react-router"

const Protected = ({ children }) => {
  const isAuth = sessionStorage.getItem("userInfo")
  return isAuth ? children : <Navigate to="/login" />
}

export default Protected
