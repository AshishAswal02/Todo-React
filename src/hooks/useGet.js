// hooks/useAxios.js
import { useMemo } from "react"
import axios from "axios"
import { env } from "../../config"

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: env.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }, [])

  return axiosInstance
}

export default useAxios
