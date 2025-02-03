import axios from 'axios'

const backendInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
})

export { backendInstance }
