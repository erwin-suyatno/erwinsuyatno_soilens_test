/**
 * Date formatting utilities
 */

import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Format date to Indonesian format
 * @param date - Date string or Date object
 * @param formatString - Format string (default: 'dd MMM yyyy HH:mm')
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, formatString: string = 'dd MMM yyyy HH:mm'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatString, { locale: id })
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

/**
 * Format date as relative time (e.g., "2 hours ago")
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: id })
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return '-'
  }
}

/**
 * Format date for input fields
 * @param date - Date string or Date object
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateForInput(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date for input:', error)
    return ''
  }
}

/**
 * Format date time for input fields
 * @param date - Date string or Date object
 * @returns Date time string in YYYY-MM-DD HH:mm format
 */
export function formatDateTimeForInput(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, "yyyy-MM-dd'T'HH:mm")
  } catch (error) {
    console.error('Error formatting datetime for input:', error)
    return ''
  }
}
