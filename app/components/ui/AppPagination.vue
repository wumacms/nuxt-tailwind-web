<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  getPageUrl?: (page: number) => string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const setPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const visiblePages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }
  
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }
  
  return [1, '...', current - 1, current, current + 1, '...', total]
})
</script>

<template>
  <nav v-if="totalPages > 1" aria-label="分页导航" class="flex items-center justify-center gap-2 pt-10">
    <!-- 上一页 -->
    <NuxtLink
      v-if="getPageUrl && currentPage > 1"
      :to="getPageUrl(currentPage - 1)"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line transition cursor-pointer bg-card text-main hover:border-accent inline-flex items-center"
    >
      &larr; 上一页
    </NuxtLink>
    <span
      v-else-if="getPageUrl"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line opacity-40 cursor-not-allowed text-caption inline-flex items-center"
    >
      &larr; 上一页
    </span>
    <button
      v-else
      type="button"
      :disabled="currentPage <= 1"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line transition cursor-pointer"
      :class="[
        currentPage <= 1
          ? 'opacity-40 cursor-not-allowed text-caption'
          : 'bg-card text-main hover:border-accent',
      ]"
      @click="setPage(currentPage - 1)"
    >
      &larr; 上一页
    </button>

    <!-- 页码数字 -->
    <div class="flex items-center gap-1.5">
      <template v-for="(p, index) in visiblePages" :key="index">
        <span v-if="p === '...'" class="w-9 h-9 flex items-center justify-center text-muted text-sm font-medium">
          ...
        </span>
        <template v-else-if="getPageUrl">
          <NuxtLink
            :to="getPageUrl(Number(p))"
            class="w-9 h-9 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer flex items-center justify-center"
            :class="[
              currentPage === p
                ? 'bg-accent text-on-accent shadow-md'
                : 'bg-card border border-line text-muted hover:border-accent',
            ]"
          >
            {{ p }}
          </NuxtLink>
        </template>
        <template v-else>
          <button
            type="button"
            class="w-9 h-9 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer flex items-center justify-center"
            :class="[
              currentPage === p
                ? 'bg-accent text-on-accent shadow-md'
                : 'bg-card border border-line text-muted hover:border-accent',
            ]"
            @click="setPage(Number(p))"
          >
            {{ p }}
          </button>
        </template>
      </template>
    </div>

    <!-- 下一页 -->
    <NuxtLink
      v-if="getPageUrl && currentPage < totalPages"
      :to="getPageUrl(currentPage + 1)"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line transition cursor-pointer bg-card text-main hover:border-accent inline-flex items-center"
    >
      下一页 &rarr;
    </NuxtLink>
    <span
      v-else-if="getPageUrl"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line opacity-40 cursor-not-allowed text-caption inline-flex items-center"
    >
      下一页 &rarr;
    </span>
    <button
      v-else
      type="button"
      :disabled="currentPage >= totalPages"
      class="px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium border border-line transition cursor-pointer"
      :class="[
        currentPage >= totalPages
          ? 'opacity-40 cursor-not-allowed text-caption'
          : 'bg-card text-main hover:border-accent',
      ]"
      @click="setPage(currentPage + 1)"
    >
      下一页 &rarr;
    </button>
  </nav>
</template>
