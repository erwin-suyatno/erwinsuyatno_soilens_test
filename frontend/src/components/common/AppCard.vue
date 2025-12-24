<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  bordered?: boolean
  shadow?: boolean
  hoverable?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  shadow: true,
  hoverable: false,
  compact: false,
})

const cardClass = computed(() => {
  const classes = ['card', 'bg-base-100']

  if (props.bordered) {
    classes.push('border', 'border-base-300')
  }

  if (props.shadow) {
    classes.push('shadow-lg')
  }

  if (props.hoverable) {
    classes.push('hover:shadow-xl', 'transition-shadow', 'duration-200')
  }

  if (props.compact) {
    classes.push('card-compact')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="cardClass">
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>
    <div class="card-body">
      <h2 v-if="title || $slots.title" class="card-title">
        <slot name="title">{{ title }}</slot>
      </h2>
      <slot />
      <div v-if="$slots.actions" class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

