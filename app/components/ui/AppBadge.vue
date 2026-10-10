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
  amber: 'bg-[#fef3c7] text-[#92400e] dark:bg-[#78350f33] dark:text-[#fcd34d] border-amber-100 dark:border-amber-900/50',
  emerald: 'bg-[#ecfdf5] text-[#059669] dark:bg-[#064e3b33] dark:text-[#34d399] border-emerald-100 dark:border-emerald-900/50',
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50',
  rose: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-100 dark:border-rose-900/50',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
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
