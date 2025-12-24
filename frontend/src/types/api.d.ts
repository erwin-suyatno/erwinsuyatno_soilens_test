/**
 * API Response Type Definitions
 * Based on Test Soilents API Documentation
 */

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
  }
}

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export interface StatisticsResponse {
  total_orders: number
  completed_orders: number
  pending_orders: number
  cancelled_orders: number
  total_revenue: number
}

export interface PaymentStatisticsResponse {
  total_payments: number
  total_amount: number
  payment_methods: Record<string, number>
  completed_payments: number
  pending_payments: number
}

