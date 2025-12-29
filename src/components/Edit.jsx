import { useNavigate, useParams } from "react-router"
import { useState, useEffect } from "react"
import api from "../axiosApi/api"
import "../styles/add.css"

const Edit = () => {
  const params = useParams()
  const taskId = params.id
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  })

  async function fetchOneTodoData() {
    try {
      const res = await api.get(`/list/${taskId}`)
      console.log("res", res?.data)
      setFormData(res?.data?.task)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOneTodoData()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/update/${taskId}`, formData)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add-container">
      <form className="add-card" onSubmit={(e) => handleEdit(e)}>
        <h2>Edit Task</h2>

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

        <button type="submit">Edit Task</button>
      </form>
    </div>
  )
}

export default Edit
