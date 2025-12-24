/**
 * useToast Composable
 * Toast notification system
 */

import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

const toasts = ref<Toast[]>([])
let toastIdCounter = 0

export function useToast() {
  const showToast = (message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = `toast-${++toastIdCounter}`
    
    const toast: Toast = {
      id,
      type,
      message,
      duration,
    }

    toasts.value.push(toast)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const success = (message: string, duration?: number) => {
    return showToast(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    return showToast(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    return showToast(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    return showToast(message, 'info', duration)
  }

  return {
    toasts,
    showToast,
    removeToast,
    clear,
    success,
    error,
    warning,
    info,
  }
}
