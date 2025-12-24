<script setup lang="ts">
/**
 * Root App Component
 * Handles global toast notifications, route transitions, and layout switching
 */

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '@/composables/useToast'
import AuthLayout from '@/layouts/AuthLayout.vue'
// import LoginPage from '@/pages/auth/LoginPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const { toasts, removeToast } = useToast()

// Determine which layout to use based on route meta
const layout = computed(() => {
  const layoutType = route.meta.layout as string | undefined
  
  if (layoutType === 'auth') {
    return AuthLayout
  } else if (layoutType === 'none') {
    return null
  } else {
    return DefaultLayout
  }
})
</script>

<template>
  <div id="app">
    <!-- Router View with Dynamic Layout -->
    <router-view v-slot="{ Component, route: currentRoute }">
      <transition name="fade" mode="out-in">
        <!-- No Layout (Customer pages) -->
        <component 
          v-if="!layout" 
          :is="Component" 
          :key="currentRoute.path" 
        />
        
        <!-- With Layout (Auth or Admin pages) -->
        <component 
          v-else 
          :is="layout" 
          :key="currentRoute.path"
        >
          <component :is="Component" />
        </component>
      </transition>
    </router-view>

    <!-- Global Toast Notifications -->
    <div class="toast toast-top toast-end z-50">
      <AppToast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @close="removeToast(toast.id)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

