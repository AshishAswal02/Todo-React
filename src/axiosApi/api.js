import axios from "axios"
import { env } from "../../config"

const api = axios.create({
  baseURL: env.baseURL,
  withCredentials: true
})

export default api