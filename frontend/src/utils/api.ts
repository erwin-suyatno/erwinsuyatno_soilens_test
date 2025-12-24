/**
 * API Client Utility
 * Axios wrapper with interceptors and error handling
 */

import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from 'axios'
import type { ApiResponse, ApiError } from '@/types/api'
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from './constants'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse>) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status,
          errors: error.response?.data?.errors,
        }

        // Handle 401 - Unauthorized (token expired)
        if (error.response?.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          
          // Redirect to login if not already there
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
        }

        return Promise.reject(apiError)
      }
    )
  }

  // Generic request method
  async request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.request<ApiResponse<T>>(config)
    return response.data
  }

  // GET request
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', url, ...config })
  }

  // POST request
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', url, data, ...config })
  }

  // PUT request
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data, ...config })
  }

  // DELETE request
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', url, ...config })
  }

  // Set auth token
  setToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  }

  // Clear auth token
  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }
}

// Export singleton instance
export const api = new ApiClient()

// Export class for testing
export { ApiClient }

