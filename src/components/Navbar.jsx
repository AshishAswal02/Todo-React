import "./../styles/navbar.css"

import { NavLink } from "react-router"
import { createPortal } from "react-dom"
import { useAuth } from "../AuthContext.jsx"

const Navbar = () => {
  const { logout} = useAuth()


  return createPortal(
    <nav className="navbar">
      <div className="navContent">
        <div
          className="redirectHome"
          onClick={() => (window.location.href = "/")}
        >
          <h2>TODO</h2>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/add" className="nav-link">
              Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link" onClick={() => logout()}>
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>,
    document.getElementById("navbar-root"),
  )
}

export default Navbar
