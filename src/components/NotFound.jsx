import { Link } from "react-router"
import "./../styles/404.css"

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are trying to access doesn’t exist.</p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default NotFound
