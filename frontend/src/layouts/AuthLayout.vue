<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>

    <!-- Main Content Container with Max Width -->
    <div class="relative max-w-md mx-auto space-y-8">
      <!-- Back to Home Button -->
      <router-link to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium transition-colors group">
        <div class="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm group-hover:shadow-md group-hover:bg-emerald-50 transition-all">
          <ArrowLeft class="w-5 h-5" />
        </div>
        <span>Back to Home</span>
      </router-link>
      
      <!-- Router View Content (LoginPage, RegisterPage, etc) -->
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>

