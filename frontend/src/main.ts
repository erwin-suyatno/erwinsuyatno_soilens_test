/**
 * Main Entry Point
 * Test Soilents - Restaurant Management System
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/styles/main.css'
import { useAuthStore } from '@/store/auth.store'

// Create Vue app instance
const app = createApp(App)

// Create pinia instance
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Initialize auth before mounting
const authStore = useAuthStore()
authStore.initAuth()

// Mount app
app.mount('#app')

