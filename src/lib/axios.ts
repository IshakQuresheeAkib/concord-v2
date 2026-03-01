// lib/axios.ts
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://concord-server.vercel.app'

// Public axios instance (no auth required)
export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Secure axios instance (with credentials)
export const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
axiosSecure.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('API Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Session expired')
    }
    return Promise.reject(error)
  }
)