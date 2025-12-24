<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { useAuth } from '@/composables/useAuth'
import { Menu, LogOut, User as UserIcon, Settings, Bell, Search, UtensilsCrossed } from 'lucide-vue-next'

interface Props {
  toggleSidebar?: () => void
}

defineProps<Props>()

const router = useRouter()
// const { user, logout } = useAuth()
const showDropdown = ref(false)

const handleLogout = async () => {
  // await logout()
  showDropdown.value = false
}

const goToProfile = () => {
  // router.push('/profile')
  showDropdown.value = false
}

// Get user initials
// const userInitials = computed(() => {
//   if (!user.value?.name) return '?'
//   const names = user.value.name.split(' ')
//   if (names.length > 1) {
//     return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
//   }
//   return user.value.name.charAt(0).toUpperCase()
// })

// Get role badge color
// const roleBadgeColor = computed(() => {
//   const role = user.value?.role?.toLowerCase()
//   switch (role) {
//     case 'admin':
//       return 'from-purple-500 to-pink-500'
//     case 'cashier':
//       return 'from-blue-500 to-cyan-500'
//     case 'chef':
//       return 'from-orange-500 to-amber-500'
//     case 'waiter':
//       return 'from-emerald-500 to-green-500'
//     default:
//       return 'from-gray-500 to-gray-600'
//   }
// })
</script>

<template>
  <nav class="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b-2 border-gray-200/50 shadow-lg">
    <div class="max-w-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left Section: Menu Toggle + Logo -->
        <div class="flex items-center gap-3">
          <!-- Mobile Menu Toggle -->
          <button
            class="lg:hidden p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-emerald-300"
            @click="toggleSidebar"
          >
            <Menu class="h-5 w-5" />
          </button>

          <!-- Logo -->
          <router-link
            to="/admin/dashboard"
            class="group flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-xl transition-all"
          >
            <div class="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <UtensilsCrossed class="w-5 h-5 text-white" />
            </div>
            <span class="hidden sm:block text-xl font-black bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Test Soilents
            </span>
          </router-link>
        </div>

        <!-- Right Section: Search + Notifications + User -->
        <div class="flex items-center gap-3">
          <!-- Search Bar (Optional - Desktop Only) -->
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <Search class="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              class="bg-transparent border-none outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400 w-48"
            />
          </div>

          <!-- Notifications Button -->
          <button
            class="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-emerald-300"
            title="Notifications"
          >
            <Bell class="h-5 w-5" />
            <!-- Notification Badge -->
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <!-- User Dropdown -->
          <div class="relative">
            <button
              class="group flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-all border-2 border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md"
              @click="showDropdown = !showDropdown"
            >
              <!-- User Avatar -->
              <div class="relative">
                <div :class="['w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg bg-gradient-to-br', roleBadgeColor]">
                  {{ userInitials }}
                </div>
                <!-- Online Status -->
                <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <!-- User Info (Desktop Only) -->
              <div class="hidden lg:block text-left">
                <p class="text-sm font-bold text-gray-900 leading-none">{{ user?.name }}</p>
                <p class="text-xs text-gray-500 capitalize mt-0.5">{{ user?.role }}</p>
              </div>

              <!-- Dropdown Icon -->
              <svg
                class="hidden lg:block w-4 h-4 text-gray-400 transition-transform group-hover:text-emerald-600"
                :class="showDropdown && 'rotate-180'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="showDropdown"
                class="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden"
                @click="showDropdown = false"
              >
                <!-- User Header -->
                <div :class="['px-4 py-5 bg-gradient-to-br text-white', roleBadgeColor]">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {{ userInitials }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-black text-white truncate">{{ user?.name }}</p>
                      <p class="text-xs text-white/80 capitalize">{{ user?.role }}</p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="p-2">
                  <button
                    @click="goToProfile"
                    class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all font-semibold"
                  >
                    <UserIcon class="h-5 w-5" />
                    <span>My Profile</span>
                  </button>

                  <router-link
                    to="/admin/settings"
                    class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all font-semibold"
                  >
                    <Settings class="h-5 w-5" />
                    <span>Settings</span>
                  </router-link>
                </div>

                <!-- Divider -->
                <div class="h-px bg-gray-200 mx-2"></div>

                <!-- Logout -->
                <div class="p-2">
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                  >
                    <LogOut class="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

