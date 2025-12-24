/**
 * Format number as Indonesian Rupiah currency
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Parse currency string to number
 * @param currencyString - Currency string to parse
 * @returns Parsed number
 */
export function parseCurrency(currencyString: string): number {
  return Number(currencyString.replace(/[^0-9.-]+/g, ''))
}
