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
    <ol class="flex items-center space-x-2 text-xs md:text-sm text-caption">
      <li>
        <NuxtLink to="/" class="hover:text-accent transition-colors">
          首页
        </NuxtLink>
      </li>
      <template v-for="(item, index) in items" :key="index">
        <li class="text-line-strong">/</li>
        <li>
          <NuxtLink
            v-if="item.to && index < items.length - 1"
            :to="item.to"
            class="hover:text-accent transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="text-main font-medium">
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
