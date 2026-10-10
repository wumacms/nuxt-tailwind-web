<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  as: 'div',
})

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'w-full',
}

const computedClass = computed(() => [
  'mx-auto px-4 md:px-8 w-full',
  sizeClasses[props.size],
])
</script>

<template>
  <component :is="as" :class="computedClass">
    <slot />
  </component>
</template>
