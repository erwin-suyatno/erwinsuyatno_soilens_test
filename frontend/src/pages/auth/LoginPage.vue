<script setup lang="ts">
/**
 * Login Page
 * Staff authentication
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.store'
import { useToast } from '@/composables/useToast'
import { LogIn, Eye, EyeOff, Lock, Mail, UserCircle, ChefHat, Wallet } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const { showToast } = useToast()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    showToast('Please fill in all fields', 'error')
    return
  }

  loading.value = true
  try {
    await authStore.login(form.value.email, form.value.password)
    showToast('Login successful!', 'success')
    router.push('/admin/dashboard')
  } catch (error) {
    const err = error as Error
    showToast(err.message || 'Login failed', 'error')
  } finally {
    loading.value = false
  }
}

// Quick login helpers for development
const quickLogin = (email: string, password: string = 'password') => {
  form.value.email = email
  form.value.password = password
}
</script>

<template>
  <div class="space-y-8">

      <!-- Header with Enhanced Animation -->
      <div class="text-center space-y-6">
        <!-- Animated Logo with Glass Effect -->
        <div class="relative inline-block group">
          <!-- Outer Glow Rings -->
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-xl opacity-30 animate-ping animation-delay-1000"></div>
          
          <!-- Logo Container with Glass Morphism -->
          <div class="relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 p-6 rounded-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div class="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
            <LogIn class="relative w-12 h-12 text-white drop-shadow-lg" />
          </div>
          
          <!-- Decorative Dots -->
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-300"></div>
        </div>
        
        <!-- Enhanced Title -->
        <div class="space-y-3">
          <h1 class="text-5xl font-extrabold">
            <span class="bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent animate-gradient">
              Welcome Back!
            </span>
          </h1>
          <div class="flex items-center justify-center gap-2">
            <div class="h-1 w-8 bg-gradient-to-r from-transparent to-emerald-400 rounded-full"></div>
            <p class="text-gray-600 text-lg font-medium">
              Sign in to your staff dashboard
            </p>
            <div class="h-1 w-8 bg-gradient-to-l from-transparent to-emerald-400 rounded-full"></div>
          </div>
        </div>
      </div>

    <!-- Login Form Card with Glass Effect -->
    <div class="relative">
      <!-- Card Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-3xl blur-xl"></div>
      
      <!-- Main Form Card -->
      <div class="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-transform duration-300">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Email Field with Premium Design -->
          <div class="group">
            <label for="email" class="block text-sm font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
              <span class="text-emerald-600">•</span>
              Email Address
            </label>
            <div class="relative">
              <!-- Icon Container with Gradient -->
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <div class="p-2 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl group-focus-within:from-emerald-200 group-focus-within:to-cyan-200 transition-all duration-300 shadow-sm">
                  <Mail class="h-5 w-5 text-emerald-600 group-focus-within:scale-110 transition-transform" />
                </div>
              </div>
              <!-- Input with Premium Styling -->
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="block w-full pl-16 pr-4 py-4 text-gray-900 font-medium bg-gradient-to-r from-gray-50 to-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
                placeholder="admin@smartresto.com"
              />
            </div>
          </div>

          <!-- Password Field with Premium Design -->
          <div class="group">
            <div class="flex items-center justify-between mb-3 ml-1">
              <label for="password" class="block text-sm font-bold text-gray-800 flex items-center gap-2">
                <span class="text-emerald-600">•</span>
                Password
              </label>
              <a href="#" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all">
                Forgot Password?
              </a>
            </div>
            <div class="relative">
              <!-- Icon Container with Gradient -->
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <div class="p-2 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl group-focus-within:from-emerald-200 group-focus-within:to-cyan-200 transition-all duration-300 shadow-sm">
                  <Lock class="h-5 w-5 text-emerald-600 group-focus-within:scale-110 transition-transform" />
                </div>
              </div>
              <!-- Input with Premium Styling -->
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                class="block w-full pl-16 pr-16 py-4 text-gray-900 font-medium bg-gradient-to-r from-gray-50 to-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
                placeholder="••••••••••"
              />
              <!-- Show/Hide Password Button -->
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-4 flex items-center z-10 group/eye"
                @click="showPassword = !showPassword"
              >
                <div class="p-2.5 hover:bg-emerald-50 rounded-xl transition-all duration-200 group-hover/eye:scale-110">
                  <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400 group-hover/eye:text-emerald-600 transition-colors" />
                  <EyeOff v-else class="h-5 w-5 text-emerald-600" />
                </div>
              </button>
            </div>
          </div>

          <!-- Remember Me with Premium Design -->
          <div class="flex items-center justify-between pt-2">
            <label for="remember" class="flex items-center cursor-pointer group/check">
              <div class="relative">
                <input
                  id="remember"
                  v-model="form.remember"
                  type="checkbox"
                  class="w-5 h-5 text-emerald-600 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all cursor-pointer checked:bg-emerald-600 hover:border-emerald-400"
                />
                <div class="absolute inset-0 rounded-lg bg-emerald-600 opacity-0 group-hover/check:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
              <span class="ml-3 text-sm font-semibold text-gray-700 group-hover/check:text-emerald-700 transition-colors">
                Remember me for 30 days
              </span>
            </label>
          </div>

          <!-- Submit Button with Premium Gradient & Animation -->
          <button
            type="submit"
            :disabled="loading"
            class="relative w-full group/btn mt-8"
          >
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-500 to-emerald-600 rounded-2xl blur-lg opacity-40 group-hover/btn:opacity-60 transition-opacity duration-300 animate-gradient-x"></div>
            
            <!-- Main Button -->
            <div class="relative flex items-center justify-center py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-cyan-600 rounded-2xl shadow-xl hover:shadow-2xl text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover/btn:scale-[1.02] active:scale-[0.98]">
              <!-- Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-1000"></div>
              
              <span v-if="!loading" class="relative flex items-center gap-2">
                <LogIn class="w-5 h-5" />
                <span>Sign In to Dashboard</span>
                <svg class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
              <span v-else class="relative flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- Elegant Divider -->
    <div class="relative py-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="px-6 py-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-sm font-bold text-gray-500 rounded-full shadow-sm">
          OR
        </span>
      </div>
    </div>

    <!-- Customer Link with Premium Card Design -->
    <router-link to="/" class="block group/customer">
      <div class="relative">
        <!-- Card Glow -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover/customer:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Card -->
        <div class="relative bg-gradient-to-br from-white to-gray-50 p-6 border-2 border-dashed border-gray-300 rounded-2xl group-hover/customer:border-solid group-hover/customer:border-emerald-400 group-hover/customer:shadow-xl transition-all duration-300 transform group-hover/customer:scale-[1.02]">
          <div class="flex items-center justify-center gap-3">
            <!-- Icon with Animation -->
            <div class="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover/customer:from-emerald-100 group-hover/customer:to-cyan-100 transition-all duration-300 group-hover/customer:rotate-6 group-hover/customer:scale-110">
              <UserCircle class="w-6 h-6 text-blue-600 group-hover/customer:text-emerald-600 transition-colors" />
            </div>
            
            <!-- Text -->
            <div class="flex items-center gap-2">
              <span class="font-bold text-base text-gray-700 group-hover/customer:text-emerald-600 transition-colors">
                Continue as Customer
              </span>
              <svg class="w-5 h-5 text-gray-400 group-hover/customer:text-emerald-600 transform group-hover/customer:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
            
            <!-- Badge -->
            <span class="ml-auto text-xs font-bold bg-gradient-to-r from-blue-100 to-purple-100 group-hover/customer:from-emerald-100 group-hover/customer:to-cyan-100 text-blue-700 group-hover/customer:text-emerald-700 px-3 py-1.5 rounded-full transition-all">
              No Login
            </span>
          </div>
        </div>
      </div>
    </router-link>

    <!-- Development Quick Login with Ultra Premium Design -->
    <div class="pt-8 border-t-2 border-gradient-to-r from-transparent via-gray-200 to-transparent">
      <div class="relative">
        <!-- Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-orange-200/30 to-amber-200/30 rounded-3xl blur-2xl"></div>
        
        <!-- Main Card -->
        <div class="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300/50 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl animate-pulse">
                <svg class="w-5 h-5 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
              </div>
              <p class="text-base font-black text-amber-900">
                Quick Login
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1.5 rounded-full font-black shadow-lg animate-pulse">
                DEV MODE
              </span>
            </div>
          </div>
          
          <!-- Quick Login Buttons -->
          <div class="grid grid-cols-3 gap-4 mb-4">
            <!-- Admin -->
            <button
              type="button"
              class="relative group/role overflow-hidden"
              @click="quickLogin('admin@smartresto.com')"
            >
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover/role:opacity-40 transition-opacity"></div>
              
              <!-- Card -->
              <div class="relative flex flex-col items-center justify-center p-5 bg-white border-2 border-amber-200 rounded-2xl group-hover/role:border-purple-400 shadow-md group-hover/role:shadow-xl transform group-hover/role:-translate-y-2 group-hover/role:scale-105 transition-all duration-300">
                <!-- Badge -->
                <div class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg group-hover/role:animate-bounce">
                  A
                </div>
                
                <!-- Icon -->
                <div class="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-3 group-hover/role:scale-110 transition-transform">
                  <UserCircle class="w-8 h-8 text-purple-600" />
                </div>
                
                <!-- Label -->
                <span class="text-sm font-black text-gray-700 group-hover/role:text-purple-600 transition-colors">Admin</span>
              </div>
            </button>
            
            <!-- Cashier -->
            <button
              type="button"
              class="relative group/role overflow-hidden"
              @click="quickLogin('cashier@smartresto.com')"
            >
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover/role:opacity-40 transition-opacity"></div>
              
              <!-- Card -->
              <div class="relative flex flex-col items-center justify-center p-5 bg-white border-2 border-amber-200 rounded-2xl group-hover/role:border-blue-400 shadow-md group-hover/role:shadow-xl transform group-hover/role:-translate-y-2 group-hover/role:scale-105 transition-all duration-300">
                <!-- Badge -->
                <div class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg group-hover/role:animate-bounce">
                  C
                </div>
                
                <!-- Icon -->
                <div class="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-3 group-hover/role:scale-110 transition-transform">
                  <Wallet class="w-8 h-8 text-blue-600" />
                </div>
                
                <!-- Label -->
                <span class="text-sm font-black text-gray-700 group-hover/role:text-blue-600 transition-colors">Cashier</span>
              </div>
            </button>
            
            <!-- Waiter -->
            <button
              type="button"
              class="relative group/role overflow-hidden"
              @click="quickLogin('waiter@smartresto.com')"
            >
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl blur opacity-0 group-hover/role:opacity-40 transition-opacity"></div>
              
              <!-- Card -->
              <div class="relative flex flex-col items-center justify-center p-5 bg-white border-2 border-amber-200 rounded-2xl group-hover/role:border-orange-400 shadow-md group-hover/role:shadow-xl transform group-hover/role:-translate-y-2 group-hover/role:scale-105 transition-all duration-300">
                <!-- Badge -->
                <div class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-orange-500 to-amber-500 text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg group-hover/role:animate-bounce">
                  W
                </div>
                
                <!-- Icon -->
                <div class="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl mb-3 group-hover/role:scale-110 transition-transform">
                  <ChefHat class="w-8 h-8 text-orange-600" />
                </div>
                
                <!-- Label -->
                <span class="text-sm font-black text-gray-700 group-hover/role:text-orange-600 transition-colors">Waiter</span>
              </div>
            </button>
          </div>
          
          <!-- Password Info -->
          <div class="flex items-center justify-center gap-3 pt-4 border-t-2 border-amber-200/50">
            <span class="text-sm text-amber-800 font-bold">Default Password:</span>
            <code class="text-sm bg-gradient-to-r from-white to-amber-50 px-4 py-2 rounded-xl border-2 border-amber-300 font-mono font-black text-amber-900 shadow-sm">
              password
            </code>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Banner with Premium Design -->
    <div class="relative group/info">
      <!-- Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-xl opacity-0 group-hover/info:opacity-100 transition-opacity"></div>
      
      <!-- Banner -->
      <div class="relative p-5 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 border-2 border-blue-300/50 rounded-3xl shadow-lg backdrop-blur-sm">
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div class="flex-shrink-0 p-3 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl shadow-md">
            <svg class="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          
          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-sm font-black text-blue-900 mb-2 flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Staff Portal Information
            </h3>
            <p class="text-sm text-blue-800 leading-relaxed font-medium">
              This portal is exclusively for restaurant staff. Customers can browse our menu and place orders without needing to log in.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
