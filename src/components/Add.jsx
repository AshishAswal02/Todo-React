import { useState } from "react"
import "./../styles/add.css"
import { useNavigate } from "react-router"
import api from "../axiosApi/api"

const Add = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post("/add", formData)

    setFormData({
      title: "",
      description: "",
      date: "",
    })
    navigate("/")
  }

  return (
    <div className="add-container">
      <form className="add-card" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>

        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}

export default Add
