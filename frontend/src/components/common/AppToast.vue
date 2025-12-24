<script setup lang="ts">
import type { ToastType } from '@/composables/useToast'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'

interface Props {
  message: string
  type?: ToastType
  duration?: number
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertCircle
    case 'info':
      return Info
  }
}

const getAlertClass = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'alert-success'
    case 'error':
      return 'alert-error'
    case 'warning':
      return 'alert-warning'
    case 'info':
      return 'alert-info'
    default:
      return ''
  }
}
</script>

<template>
  <div :class="['alert', getAlertClass(type), 'shadow-lg']">
    <div class="flex items-center gap-2">
      <component :is="getIcon(type)" class="h-5 w-5 flex-shrink-0" />
      <span>{{ message }}</span>
    </div>
    <button class="btn btn-circle btn-ghost btn-sm" @click="emit('close')">
      <X class="h-4 w-4" />
    </button>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

