<script setup lang="ts">
import { APP_NAME, APP_VERSION } from '@/utils/constants'
import { Heart } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-emerald-500/20">
    <!-- Subtle Background Glow -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Compact Single Row Layout -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
        <!-- Left: Brand & Copyright -->
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div class="p-1.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <span class="text-sm font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {{ APP_NAME }}
            </span>
            <span class="text-xs text-gray-600 font-semibold">v{{ APP_VERSION }}</span>
          </div>

          <!-- Divider (Mobile hidden) -->
          <div class="hidden sm:block w-px h-6 bg-gray-700"></div>

          <!-- Copyright -->
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <span>© {{ currentYear }}</span>
            <span>•</span>
            <div class="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart class="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>
        </div>

        <!-- Center: Tech Stack (Compact Badges) -->
        <div class="flex items-center gap-2">
          <div class="px-2 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span class="text-xs font-bold text-gray-400">Vue 3</span>
          </div>
          <div class="px-2 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span class="text-xs font-bold text-gray-400">TypeScript</span>
          </div>
          <div class="px-2 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <span class="text-xs font-bold text-gray-400">Tailwind</span>
          </div>
        </div>

        <!-- Right: Links -->
        <div class="flex items-center gap-4 text-xs">
          <a href="#" class="text-gray-400 hover:text-emerald-400 font-semibold transition-colors">Privacy</a>
          <a href="#" class="text-gray-400 hover:text-emerald-400 font-semibold transition-colors">Terms</a>
          <a href="#" class="text-gray-400 hover:text-emerald-400 font-semibold transition-colors">Support</a>
        </div>
      </div>
    </div>
  </footer>
</template>

