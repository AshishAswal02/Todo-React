import { useEffect, useState } from "react"
import "./../styles/list.css"
import { useNavigate } from "react-router"
import api from "../axiosApi/api"

const List = () => {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()
  const name = JSON.parse(sessionStorage.getItem("userInfo"))?.name
  async function fetchTodoData() {
    try {
      const res = await api.get("/list")
      setTasks(res?.data?.tasks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodoData()
  }, [])


  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/delete/${id}`)
      fetchTodoData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="list-container">
      <h2>{name} Tasks</h2>

      <div className="task-list">
        {tasks?.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-header">
              <h3>{task.title}</h3>
              <span>{task.date}</span>
            </div>

            <p>{task.description}</p>

            <div className="task-actions">
              <button
                onClick={() => navigate(`/edit/${task._id}`)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
