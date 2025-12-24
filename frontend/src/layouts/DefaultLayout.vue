<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import Footer from '@/components/layout/Footer.vue'

const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-base-200">
    <!-- Sidebar Desktop -->
    <div class="hidden lg:block">
      <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />
    </div>

    <!-- Sidebar Mobile -->
    <Transition name="slide">
      <div v-if="mobileSidebarOpen" class="fixed inset-0 z-50 lg:hidden">
        <div
          class="absolute inset-0 bg-black/50"
          @click="toggleMobileSidebar"
        ></div>
        <div class="relative h-full w-64">
          <Sidebar @toggle="toggleMobileSidebar" />
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Navbar -->
      <Navbar :toggle-sidebar="toggleMobileSidebar" />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <slot />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

