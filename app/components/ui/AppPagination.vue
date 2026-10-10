<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
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
</script>

<template>
  <nav v-if="totalPages > 1" aria-label="分页导航" class="flex items-center justify-center gap-2 pt-10">
    <!-- 上一页 -->
    <button
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
      <button
        v-for="p in totalPages"
        :key="p"
        type="button"
        class="w-9 h-9 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer flex items-center justify-center"
        :class="[
          currentPage === p
            ? 'bg-accent text-white shadow-md'
            : 'bg-card border border-line text-muted hover:border-accent',
        ]"
        @click="setPage(p)"
      >
        {{ p }}
      </button>
    </div>

    <!-- 下一页 -->
    <button
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
