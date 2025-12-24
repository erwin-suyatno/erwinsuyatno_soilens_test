<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false,
  type: 'button',
})

const buttonClass = computed(() => {
  const classes = ['btn', 'transition-all', 'duration-200']

  // Variant classes
  switch (props.variant) {
    case 'primary':
      classes.push('btn-primary')
      break
    case 'secondary':
      classes.push('btn-secondary')
      break
    case 'outline':
      classes.push('btn-outline')
      break
    case 'danger':
      classes.push('btn-error')
      break
    case 'ghost':
      classes.push('btn-ghost')
      break
  }

  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('btn-sm')
      break
    case 'lg':
      classes.push('btn-lg')
      break
    default:
      classes.push('btn-md')
  }

  // Block
  if (props.block) {
    classes.push('btn-block')
  }

  return classes.join(' ')
})

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button :type="type" :class="buttonClass" :disabled="isDisabled">
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>

