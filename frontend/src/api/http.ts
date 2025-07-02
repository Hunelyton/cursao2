import axios from 'axios'
import { tokenService } from '../services/tokenService'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

http.interceptors.request.use(
  (config: any) => {
    const token = tokenService.getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      tokenService.deleteToken()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default http
