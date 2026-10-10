<script setup lang="ts">
import { computed } from 'vue'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-md hover:shadow-lg active:scale-[0.98]',
  secondary:
    'bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 shadow-md active:scale-[0.98]',
  outline:
    'border border-[#c4bdb1] dark:border-[#4a4540] text-[#1a1816] dark:text-[#f5f2ed] hover:border-gray-900 dark:hover:border-white bg-transparent active:scale-[0.98]',
  ghost:
    'text-[#4a4540] dark:text-[#c4bdb1] hover:text-[#1a1816] dark:hover:text-[#f5f2ed] hover:bg-black/5 dark:hover:bg-white/5',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 shadow-md active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-medium',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5 font-semibold',
}

const computedClasses = computed(() => [
  'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
  props.disabled || props.loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="computedClasses">
    <span v-if="loading" class="animate-spin mr-1.5">⟳</span>
    <slot />
  </NuxtLink>

  <a v-else-if="href" :href="href" :class="computedClasses">
    <span v-if="loading" class="animate-spin mr-1.5">⟳</span>
    <slot />
  </a>

  <button v-else :type="type" :disabled="disabled || loading" :class="computedClasses">
    <span v-if="loading" class="animate-spin mr-1.5">⟳</span>
    <slot />
  </button>
</template>
