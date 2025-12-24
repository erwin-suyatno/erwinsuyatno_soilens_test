<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { useAuth } from '@/composables/useAuth'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Table2,
  ShoppingCart,
  Receipt,
  Users,
  Settings,
  ChevronLeft,
  CreditCard,
} from 'lucide-vue-next'

interface Props {
  collapsed?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const router = useRouter()
const route = useRoute()
// const { user } = useAuth()

interface MenuItem {
  title: string
  icon: any
  path: string
  roles?: string[]
}

const menuItems = computed<MenuItem[]>(() => {
  const items: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      title: 'Menu',
      icon: UtensilsCrossed,
      path: '/admin/menu',
    },
    {
      title: 'Tables',
      icon: Table2,
      path: '/admin/tables',
      roles: ['admin', 'cashier'],
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders',
    },
    {
      title: 'POS',
      icon: CreditCard,
      path: '/admin/pos',
      roles: ['admin', 'cashier'],
    },
    {
      title: 'Payments',
      icon: Receipt,
      path: '/admin/payments',
      roles: ['admin', 'cashier'],
    },
    // KITCHEN FEATURE - HIDDEN FOR PHASE 1
    // TODO: Uncomment for Phase 2 when kitchen feature is ready
    // {
    //   title: 'Kitchen',
    //   icon: UtensilsCrossed,
    //   path: '/admin/kitchen',
    //   roles: ['admin', 'chef'],
    // },
    {
      title: 'Users',
      icon: Users,
      path: '/admin/users',
      roles: ['admin'],
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      roles: ['admin'],
    },
  ]

  // Filter by role
  return items.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes('')
  })
})

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleNavigate = (path: string) => {
  router.push(path)
}

const toggleSidebar = () => {
  emit('toggle')
}
</script>

<template>
  <aside
    :class="[
      'flex h-screen flex-col border-r-2 border-gray-200/50 bg-gradient-to-b from-gray-50 to-white shadow-xl transition-all duration-300',
      collapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between border-b-2 border-gray-200/50 p-4">
      <h2
        v-if="!collapsed"
        class="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-lg font-black text-transparent"
      >
        Navigation
      </h2>
      <button
        class="rounded-xl p-2 text-gray-600 shadow-sm transition-all hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md"
        @click="toggleSidebar"
        :title="collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
      >
        <ChevronLeft
          :class="['h-5 w-5 transition-transform duration-300', collapsed && 'rotate-180']"
        />
      </button>
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 space-y-1 overflow-y-auto p-3">
      <div v-for="item in menuItems" :key="item.path" class="group relative">
        <button
          :class="[
            'flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold transition-all duration-200',
            collapsed ? 'justify-center' : 'justify-start',
            isActive(item.path)
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-md',
          ]"
          @click="handleNavigate(item.path)"
        >
          <!-- Glow Effect for Active Item -->
          <div
            v-if="isActive(item.path)"
            class="absolute inset-0 rounded-xl bg-emerald-500 opacity-20 blur"
          ></div>

          <!-- Icon -->
          <component
            :is="item.icon"
            :class="[
              'relative z-10 h-5 w-5 flex-shrink-0 transition-transform',
              isActive(item.path) && 'scale-110',
            ]"
          />

          <!-- Title -->
          <span v-if="!collapsed" class="relative z-10">{{ item.title }}</span>

          <!-- Active Indicator -->
          <div
            v-if="isActive(item.path) && !collapsed"
            class="relative z-10 ml-auto h-2 w-2 rounded-full bg-white"
          ></div>
        </button>

        <!-- Tooltip for Collapsed State -->
        <div
          v-if="collapsed"
          class="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
        >
          {{ item.title }}
          <!-- Arrow -->
          <div
            class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"
          ></div>
        </div>
      </div>
    </nav>

    <!-- User Info (Bottom) -->
    <div
      class="border-t-2 border-gray-200/50 p-4"
      :class="collapsed && 'flex justify-center'"
    >
      <div
        v-if="!collapsed"
        class="flex items-center gap-3 rounded-xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-3"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-black text-white shadow-lg"
        >
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="truncate text-sm font-black text-gray-900">{{ user.name }}</p>
          <p class="truncate text-xs font-semibold capitalize text-gray-600">{{ user.role }}</p>
        </div>
      </div>

      <!-- Collapsed User Avatar -->
      <div
        v-else
        class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-black text-white shadow-lg"
      >
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
    </div>
  </aside>
</template>
