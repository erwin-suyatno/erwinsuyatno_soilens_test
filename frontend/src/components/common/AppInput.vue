<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputClass = computed(() => {
  const classes = ['input', 'input-bordered', 'w-full']

  if (props.error) {
    classes.push('input-error')
  }

  switch (props.size) {
    case 'sm':
      classes.push('input-sm')
      break
    case 'lg':
      classes.push('input-lg')
      break
    default:
      classes.push('input-md')
  }

  return classes.join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </span>
    </label>
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute left-3 top-1/2 -translate-y-1/2">
        <slot name="prefix" />
      </div>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[inputClass, $slots.prefix && 'pl-10', $slots.suffix && 'pr-10']"
        @input="handleInput"
      />
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2">
        <slot name="suffix" />
      </div>
    </div>
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

