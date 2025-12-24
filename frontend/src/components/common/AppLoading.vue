<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-4 w-4'
    case 'lg':
      return 'h-12 w-12'
    default:
      return 'h-8 w-8'
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-8">
    <Loader2 :class="[iconSize, 'animate-spin text-primary']" />
    <p v-if="text" class="text-sm text-gray-500">{{ text }}</p>
  </div>
</template>

