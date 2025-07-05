import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { appConfig } from '~/config/app'
import { getAuthToken, removeAuthToken } from './auth'
import { message } from 'antd'

// Create base axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem(appConfig.auth.refreshTokenKey)
        if (refreshToken) {
          const response = await axios.post(`${appConfig.api.baseUrl}/auth/refresh`, {
            refreshToken,
          })
          const { token } = response.data
          localStorage.setItem(appConfig.auth.tokenKey, token)
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        removeAuthToken()
        window.location.href = appConfig.auth.loginPath
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    if (error.response?.status >= 500) {
      message.error('Server error. Please try again later.')
    } else if (error.response?.status === 403) {
      message.error('Access denied. You don\'t have permission to perform this action.')
    } else if (error.response?.status === 404) {
      message.error('Resource not found.')
    } else if (error.code === 'ECONNABORTED') {
      message.error('Request timeout. Please check your connection.')
    } else if (!error.response) {
      message.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

// API wrapper functions
export const api = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then((response) => response.data)
  },

  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post(url, data, config).then((response) => response.data)
  },

  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put(url, data, config).then((response) => response.data)
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch(url, data, config).then((response) => response.data)
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete(url, config).then((response) => response.data)
  },
}

export default apiClient