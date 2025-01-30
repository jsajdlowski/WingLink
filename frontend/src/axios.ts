import axios from 'axios'

const backendInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
})

const axiosFetcher = (url: string) =>
  backendInstance.get(url).then((res) => res.data)

export { backendInstance, axiosFetcher }
