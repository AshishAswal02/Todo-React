import { useEffect, useState } from "react"
import "./../styles/signup.css"
import { useNavigate } from "react-router"
import api from "./../axiosApi/api"
import { useAuth } from "../AuthContext"

const Signup = () => {
  const {setIsAuth} = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      navigate("/")
    }
  }, [navigate])

  const validate = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{4,}$/

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be atleast 4+ chars, include uppercase, lowercase, number & special character"
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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
       const res = await api.post("/signup", formData)
      alert("Signup successful")

      sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
      setIsAuth(true)

      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          className={errors.name ? "error-input" : ""}
          onChange={handleChange}
        />
        {errors.name && <small className="error">{errors.name}</small>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          className={errors.email ? "error-input" : ""}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className={errors.password ? "error-input" : ""}
          onChange={handleChange}
        />
        {errors.password && <small className="error">{errors.password}</small>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className={errors.confirmPassword ? "error-input" : ""}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <small className="error">{errors.confirmPassword}</small>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <span className="login-text">
          Already have an account? <a href="/login">Login</a>
        </span>
      </form>
    </div>
  )
}

export default Signup
