<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items: BreadcrumbItem[]
  variant?: 'default' | 'light'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-2">
    <ol
      class="flex items-center space-x-2 text-xs md:text-sm"
      :class="variant === 'light' ? 'text-gray-300' : 'text-caption'"
    >
      <li>
        <NuxtLink to="/" class="hover:text-accent transition-colors">
          首页
        </NuxtLink>
      </li>
      <template v-for="(item, index) in items" :key="index">
        <li :class="variant === 'light' ? 'text-gray-500' : 'text-line-strong'">/</li>
        <li>
          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="hover:text-accent transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="font-medium"
            :class="variant === 'light' ? 'text-white' : 'text-main'"
          >
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
