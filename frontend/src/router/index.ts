/**
 * Vue Router Configuration
 * Handles all application routing with lazy loading
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


// Route definitions with lazy loading
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/queue/QueuePage.vue'),
    meta: { requiresAuth: false, layout: 'none' },
  }
  // Auth Routes
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/pages/auth/LoginPage.vue'),
  //   meta: { requiresAuth: false, layout: 'auth' },
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('@/pages/auth/RegisterPage.vue'),
  //   meta: { requiresAuth: false, layout: 'auth' },
  // },

  // Customer Routes (Public - No Authentication Required)
  // {
  //   path: '/',
  //   name: 'CustomerHome',
  //   component: () => import('@/pages/customer/HomePage.vue'),
  //   meta: { requiresAuth: false, title: 'Welcome', layout: 'none' },
  // },
  // {
  //   path: '/customer/menu',
  //   name: 'CustomerMenu',
  //   component: () => import('@/pages/customer/MenuPage.vue'),
  //   meta: { requiresAuth: false, title: 'Browse Menu', layout: 'none' },
  // },
  // {
  //   path: '/customer/order',
  //   name: 'CustomerOrder',
  //   component: () => import('@/pages/customer/OrderPage.vue'),
  //   meta: { requiresAuth: false, title: 'Place Order', layout: 'none' },
  // },
  // {
  //   path: '/customer/order-success',
  //   name: 'CustomerOrderSuccess',
  //   component: () => import('@/pages/customer/OrderSuccessPage.vue'),
  //   meta: { requiresAuth: false, title: 'Order Successful', layout: 'none' },
  // },

  // Admin Routes (Protected - Authentication Required)
  // {
  //   path: '/admin',
  //   redirect: '/admin/dashboard',
  // },
  // {
  //   path: '/admin/dashboard',
  //   name: 'AdminDashboard',
  //   component: () => import('@/pages/dashboard/DashboardPage.vue'),
  //   meta: { title: 'Dashboard' },
  // },
  // {
  //   path: '/admin/menu',
  //   name: 'AdminMenu',
  //   component: () => import('@/pages/menu/MenuPage.vue'),
  //   meta: { requiresAuth: true, title: 'Menu Management' },
  // },
  // {
  //   path: '/admin/tables',
  //   name: 'AdminTables',
  //   component: () => import('@/pages/table/TablePage.vue'),
  //   meta: { requiresAuth: true, title: 'Table Management' },
  // },
  // {
  //   path: '/admin/orders',
  //   name: 'AdminOrders',
  //   component: () => import('@/pages/order/OrderPage.vue'),
  //   meta: { requiresAuth: true, title: 'Order Management' },
  // },
  // {
  //   path: '/admin/payments',
  //   name: 'AdminPayments',
  //   component: () => import('@/pages/payment/PaymentPage.vue'),
  //   meta: { requiresAuth: true, title: 'Payment Management' },
  // },
  // KITCHEN FEATURE - HIDDEN FOR PHASE 1
  // TODO: Uncomment for Phase 2 when kitchen feature is ready
  // {
  //   path: '/admin/kitchen',
  //   name: 'AdminKitchen',
  //   component: () => import('@/pages/kitchen/KitchenPage.vue'),
  //   meta: { requiresAuth: true, title: 'Kitchen Display' },
  // },
  // {
  //   path: '/admin/pos',
  //   name: 'AdminPOS',
  //   component: () => import('@/pages/pos/POSPage.vue'),
  //   meta: { requiresAuth: true, title: 'Point of Sale' },
  // },

  // Legacy redirects for backward compatibility
  // {
  //   path: '/dashboard',
  //   redirect: '/admin/dashboard',
  // },
  // {
  //   path: '/menu',
  //   redirect: '/admin/menu',
  // },
  // {
  //   path: '/tables',
  //   redirect: '/admin/tables',
  // },
  // {
  //   path: '/orders',
  //   redirect: '/admin/orders',
  // },
  // {
  //   path: '/payments',
  //   redirect: '/admin/payments',
  // },
  // KITCHEN FEATURE - HIDDEN FOR PHASE 1
  // {
  //   path: '/kitchen',
  //   redirect: '/admin/kitchen',
  // },
  // {
  //   path: '/pos',
  //   redirect: '/admin/pos',
  // },

  // 404 Not Found
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/pages/NotFoundPage.vue'),
  //   meta: { requiresAuth: false, layout: 'none' },
  // },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
// router.beforeEach((to, _from, next) => {
//   const authStore = useAuthStore()
//   const requiresAuth = to.meta.requiresAuth !== false
//   const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

//   // Set page title
//   document.title = to.meta.title 
//     ? `${to.meta.title} - Test Soilents` 
//     : 'Test Soilents'

//   // Check authentication
//   // if (requiresAuth && !token) {
//   //   // Redirect to login if not authenticated
//   //   next({ name: 'Login', query: { redirect: to.fullPath } })
//   // } else if (!requiresAuth && token && (to.name === 'Login' || to.name === 'Register')) {
//   //   // Redirect to admin dashboard if already logged in
//   //   next({ name: 'AdminDashboard' })
//   // } else {
//   //   // Initialize auth state if needed
//   //   if (token && !authStore.user) {
//   //     authStore.initAuth()
//   //   }
//   //   next()
//   // }
// })

export default router

