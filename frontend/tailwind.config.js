/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // emerald-500
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        smartresto: {
          primary: '#10b981', // emerald-500
          'primary-focus': '#059669', // emerald-600
          'primary-content': '#ffffff',
          secondary: '#6b7280', // gray-500
          'secondary-focus': '#4b5563', // gray-600
          'secondary-content': '#ffffff',
          accent: '#f59e0b', // amber-500
          'accent-focus': '#d97706', // amber-600
          'accent-content': '#ffffff',
          neutral: '#1f2937', // gray-800
          'neutral-focus': '#111827', // gray-900
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb', // gray-50
          'base-300': '#f3f4f6', // gray-100
          'base-content': '#1f2937', // gray-800
          info: '#3b82f6', // blue-500
          success: '#10b981', // emerald-500
          warning: '#f59e0b', // amber-500
          error: '#ef4444', // red-500
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}

