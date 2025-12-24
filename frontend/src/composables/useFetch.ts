/**
 * useFetch Composable
 * Generic fetch utility with loading, error handling, and caching
 */

import { ref, type Ref } from 'vue'
import { api } from '@/utils/api'
import type { ApiResponse, ApiError } from '@/types/api'

interface UseFetchOptions<T> {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
}

interface UseFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<ApiError | null>
  execute: () => Promise<void>
  refresh: () => Promise<void>
}

/**
 * Composable for fetching data with loading and error states
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Object with data, loading, error, and execute function
 *
 * @example
 * const { data, loading, error, execute } = useFetch<Menu[]>('/menus')
 */
export function useFetch<T = any>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const endpoint = typeof url === 'function' ? url() : url
      const response: ApiResponse<T> = await api.get(endpoint)

      if (response.success && response.data) {
        data.value = response.data
        options.onSuccess?.(response.data)
      } else {
        throw new Error(response.message || 'Failed to fetch data')
      }
    } catch (err: any) {
      error.value = err as ApiError
      options.onError?.(err as ApiError)
    } finally {
      loading.value = false
    }
  }

  const refresh = execute

  // Execute immediately if specified
  if (options.immediate !== false) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute,
    refresh,
  }
}

/**
 * Composable for POST requests
 */
export function usePost<TRequest = any, TResponse = any>() {
  const data = ref<TResponse | null>(null) as Ref<TResponse | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async (url: string, payload: TRequest): Promise<TResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<TResponse> = await api.post(url, payload)

      if (response.success && response.data) {
        data.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Request failed')
      }
    } catch (err: any) {
      error.value = err as ApiError
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}

/**
 * Composable for PUT requests
 */
export function usePut<TRequest = any, TResponse = any>() {
  const data = ref<TResponse | null>(null) as Ref<TResponse | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async (url: string, payload: TRequest): Promise<TResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<TResponse> = await api.put(url, payload)

      if (response.success && response.data) {
        data.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Request failed')
      }
    } catch (err: any) {
      error.value = err as ApiError
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}

/**
 * Composable for DELETE requests
 */
export function useDelete<TResponse = any>() {
  const data = ref<TResponse | null>(null) as Ref<TResponse | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async (url: string): Promise<TResponse | null> => {
    loading.value = true
    error.value = null

    try {
      const response: ApiResponse<TResponse> = await api.delete(url)

      if (response.success && response.data) {
        data.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Request failed')
      }
    } catch (err: any) {
      error.value = err as ApiError
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}

