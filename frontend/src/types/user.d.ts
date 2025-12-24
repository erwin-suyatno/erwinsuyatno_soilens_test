/**
 * User (Staff) Type Definitions
 * Based on Test Soilents API Documentation
 */

export type UserRole = 'admin' | 'cashier' | 'waiter'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  restaurant_id: number
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
  }
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: UserRole
  restaurant_id: number
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

