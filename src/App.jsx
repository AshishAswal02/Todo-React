import Navbar from "./components/Navbar"
import { Routes, Route, useLocation } from "react-router"
import List from "./components/List"
import Add from "./components/Add.jsx"
import Edit from "./components/Edit"
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import { useEffect, useState } from "react"

import Protected from "./components/Protected.jsx"
import NotFound from "./components/NotFound.jsx"
import { env } from "../config.js"
import axios from "axios"
import { useAuth } from "./AuthContext.jsx"

const App = () => {
  const location = useLocation()
  const { isAuth, logout, setIsAuth } = useAuth()

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup"

  useEffect(() => {
    axios
      .get(`${env.baseURL}/me`, { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => {
        setIsAuth(false)
        if (isAuthPage == false) {
          logout()
        }
      })
  }, [])

  return (
    <>
      {/* <Protected children={<Navbar />} /> */}
      <Routes>
        <Route path="/" element={<Protected children={<List />} />} />
        <Route path="/add" element={<Protected children={<Add />} />} />
        <Route path="/edit/:id" element={<Protected children={<Edit />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
