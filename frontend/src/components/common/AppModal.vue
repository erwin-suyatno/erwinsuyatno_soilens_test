<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  show: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalClass = computed(() => {
  const classes = ['modal-box']

  switch (props.maxWidth) {
    case 'sm':
      classes.push('max-w-sm')
      break
    case 'lg':
      classes.push('max-w-lg')
      break
    case 'xl':
      classes.push('max-w-xl')
      break
    case '2xl':
      classes.push('max-w-2xl')
      break
    default:
      classes.push('max-w-md')
  }

  return classes.join(' ')
})

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div v-if="show" class="modal modal-open">
    <div :class="modalClass">
      <div class="flex items-start justify-between">
        <h3 v-if="title || $slots.header" class="text-lg font-bold">
          <slot name="header">{{ title }}</slot>
        </h3>
        <button
          class="btn btn-circle btn-ghost btn-sm"
          type="button"
          @click="handleClose"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <div class="py-4">
        <slot />
      </div>

      <div v-if="$slots.footer" class="modal-action">
        <slot name="footer" />
      </div>
    </div>
    <div class="modal-backdrop" @click="handleBackdropClick"></div>
  </div>
</template>

