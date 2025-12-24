<script setup lang="ts">
/**
 * Register Page
 * Staff registration (Admin only in production)
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.store'
import { useToast } from '@/composables/useToast'
import { UserPlus, Eye, EyeOff, Lock, Mail, User, Briefcase } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const { showToast } = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'cashier' as 'admin' | 'cashier' | 'waiter',
  restaurant_id: 1,
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Validation
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return { strength: 0, label: '', color: '' }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' }
  if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' }
  if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' }
  return { strength, label: 'Strong', color: 'bg-green-500' }
})

const passwordsMatch = computed(() => {
  if (!form.value.password_confirmation) return null
  return form.value.password === form.value.password_confirmation
})

const handleRegister = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    showToast('Passwords do not match', 'error')
    return
  }

  if (form.value.password.length < 8) {
    showToast('Password must be at least 8 characters', 'error')
    return
  }

  loading.value = true
  try {
    await authStore.register(form.value)
    showToast('Registration successful!', 'success')
    router.push('/admin/dashboard')
  } catch (error: any) {
    showToast(error.message || 'Registration failed', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
        <UserPlus class="w-8 h-8 text-emerald-600" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p class="text-gray-600">Register as staff member</p>
    </div>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister" class="space-y-5">
      <!-- Full Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="john@smartresto.com"
          />
        </div>
      </div>

      <!-- Role -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase class="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="role"
            v-model="form.role"
            class="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none bg-white"
          >
            <option value="cashier">Cashier</option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
            <option value="admin">Admin</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <Eye v-if="!showPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <!-- Password Strength -->
        <div v-if="form.password" class="mt-2">
          <div class="flex items-center gap-2">
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                :class="[passwordStrength.color, 'h-full transition-all duration-300']"
                :style="{ width: `${(passwordStrength.strength / 5) * 100}%` }"
              ></div>
            </div>
            <span class="text-xs font-medium text-gray-600">{{ passwordStrength.label }}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">Use 8+ characters with mix of letters, numbers & symbols</p>
        </div>
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password_confirmation"
            v-model="form.password_confirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
            :class="[
              'block w-full pl-10 pr-12 py-2.5 border rounded-lg transition-colors',
              passwordsMatch === null ? 'border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500' :
              passwordsMatch ? 'border-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500' :
              'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500'
            ]"
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <Eye v-if="!showConfirmPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <!-- Password Match Feedback -->
        <p v-if="passwordsMatch === true" class="mt-1 text-xs text-green-600 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Passwords match
        </p>
        <p v-else-if="passwordsMatch === false" class="mt-1 text-xs text-red-600 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          Passwords don't match
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || passwordsMatch === false"
        class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Create Account</span>
        <span v-else class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating account...
        </span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Already have an account?</span>
      </div>
    </div>

    <!-- Login Link -->
    <div class="text-center">
      <router-link
        to="/login"
        class="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
      >
        Sign in instead
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>

    <!-- Info Note -->
    <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-xs text-blue-800">
        <strong>Note:</strong> Staff registration is typically done by an admin. Contact your restaurant manager if you need access.
      </p>
    </div>
  </div>
</template>

