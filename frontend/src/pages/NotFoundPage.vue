<script setup lang="ts">
/**
 * 404 Not Found Page
 */

import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary/20">404</h1>
      </div>

      <!-- Message -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-base-content mb-2">Page Not Found</h2>
        <p class="text-base-content/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 justify-center">
        <button @click="goBack" class="btn btn-outline">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back
        </button>
        <button @click="goHome" class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>

