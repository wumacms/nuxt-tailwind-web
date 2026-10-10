<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hoverable?: boolean
  bordered?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: true,
  bordered: true,
  padding: 'md',
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5 md:p-6',
  lg: 'p-6 md:p-8',
}

const computedClasses = computed(() => [
  'bg-white dark:bg-[#211f1c] rounded-2xl transition-all duration-300',
  props.bordered ? 'border border-[#ddd8cf] dark:border-[#2d2a26]' : '',
  props.hoverable ? 'hover:shadow-xl hover:-translate-y-1' : 'shadow-sm',
  paddingClasses[props.padding],
])
</script>

<template>
  <div :class="computedClasses">
    <slot />
  </div>
</template>
