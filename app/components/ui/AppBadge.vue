<script setup lang="ts">
import { computed } from 'vue'

export type BadgeVariant = 'amber' | 'emerald' | 'indigo' | 'rose' | 'gray'

interface Props {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'amber',
  size: 'sm',
})

const variantClasses: Record<BadgeVariant, string> = {
  amber: 'bg-accent-soft text-accent-soft-text border-accent-soft/30',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40',
  rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/40',
  gray: 'bg-subtle text-caption border-line',
}

const sizeClasses = {
  sm: 'text-xs px-2.5 py-0.5',
  md: 'text-xs md:text-sm px-3.5 py-1',
}

const computedClass = computed(() => [
  'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <span :class="computedClass">
    <slot />
  </span>
</template>
