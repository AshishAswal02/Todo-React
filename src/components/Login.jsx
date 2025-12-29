import { useEffect, useState } from "react"
import "./../styles/login.css"
import { useNavigate } from "react-router"
import api from './../axiosApi/api'
import { useAuth } from "../AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const {setIsAuth} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      navigate("/list")
    }
  }, [navigate])

  const validate = () => {
    const newErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)
      const res = await api.post("/login", formData)

      sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
      setIsAuth(true)
      navigate("/")
      alert("Login successful")
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <p>Login to your account</p>

        <input
          className={errors.email ? "error-input" : ""}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}

        <input
          className={errors.password ? "error-input" : ""}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="error">{errors.password}</small>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <span className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </span>
      </form>
    </div>
  )
}

export default Login
