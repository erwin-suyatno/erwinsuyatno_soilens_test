/**
 * Auth Store
 * Manages authentication state and user data
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginResponse } from '@/types/user'
import { api } from '@/utils/api'
import { STORAGE_KEYS } from '@/utils/constants'

// Type for login/register response data
type LoginData = LoginResponse['data']

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role || null)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCashier = computed(() => user.value?.role === 'cashier')
  const isWaiter = computed(() => user.value?.role === 'waiter')

  // Actions
  async function login(email: string, password: string) {
    try {
      const response = await api.post<LoginData>('/login', { email, password })

      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token

        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user))

        // Set token in API client
        api.setToken(response.data.token)
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      throw error
    }
  }

  async function register(registerData: any) {
    try {
      const response = await api.post<LoginData>('/register', registerData)

      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token

        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user))

        // Set token in API client
        api.setToken(response.data.token)
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error)
    } finally {
      clearAuth()
    }
  }

  async function fetchCurrentUser() {
    try {
      const response = await api.get<User>('/me')

      if (response.success && response.data) {
        user.value = response.data
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data))
      }
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  function clearAuth() {
    user.value = null
    token.value = null
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    api.clearToken()
  }

  function initAuth() {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN)
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        api.setToken(storedToken)
      } catch (error) {
        clearAuth()
      }
    }
  }

  return {
    // State
    user,
    token,
    // Getters
    isAuthenticated,
    userRole,
    isAdmin,
    isCashier,
    isWaiter,
    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    clearAuth,
    initAuth,
  }
})

