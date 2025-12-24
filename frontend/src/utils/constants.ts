/**
 * Application Constants
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Test Soilents'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'smart_resto_token',
  USER: 'smart_resto_user',
  THEME: 'smart_resto_theme',
} as const

// API Timeout
export const API_TIMEOUT = 30000 // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// Order Types
export const ORDER_TYPES = {
  DINE_IN: 'dine_in',
  TAKE_AWAY: 'take_away',
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

// Payment Status
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  QRIS: 'qris',
  GOPAY: 'gopay',
  OVO: 'ovo',
  DANA: 'dana',
  SHOPEEPAY: 'shopeepay',
  CARD: 'card',
} as const

// KITCHEN FEATURE - HIDDEN FOR PHASE 1
// TODO: Uncomment for Phase 2 when kitchen feature is ready
// // Kitchen Ticket Status
// export const KITCHEN_TICKET_STATUS = {
//   PENDING: 'pending',
//   PREPARING: 'preparing',
//   READY: 'ready',
//   SERVED: 'served',
// } as const

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CASHIER: 'cashier',
  WAITER: 'waiter',
} as const

// Status Colors (for UI)
export const STATUS_COLORS = {
  pending: 'warning',
  paid: 'success',
  cancelled: 'error',
  completed: 'info',
  unpaid: 'error',
  refunded: 'warning',
  // KITCHEN FEATURE - HIDDEN FOR PHASE 1
  // preparing: 'info',
  // ready: 'success',
  // served: 'neutral',
} as const

// Payment Method Icons/Labels
export const PAYMENT_METHOD_LABELS = {
  cash: 'Cash',
  qris: 'QRIS',
  gopay: 'GoPay',
  ovo: 'OVO',
  dana: 'DANA',
  shopeepay: 'ShopeePay',
  card: 'Card',
} as const

