<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center space-x-2 text-xs md:text-sm text-[#6b655d] dark:text-[#8a8378]">
      <li>
        <NuxtLink to="/" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
          首页
        </NuxtLink>
      </li>
      <template v-for="(item, index) in items" :key="index">
        <li class="text-[#c4bdb1] dark:text-[#4a4540]">/</li>
        <li>
          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="text-[#1a1816] dark:text-[#f5f2ed] font-medium">
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
