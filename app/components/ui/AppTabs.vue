<script setup lang="ts">
export interface TabItem {
  id: string
  label: string
  count?: number
}

interface Props {
  tabs: TabItem[]
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer"
      :class="[
        modelValue === tab.id
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
          : 'bg-[#e8e4dd]/60 hover:bg-[#e8e4dd] dark:bg-[#2d2a26]/60 dark:hover:bg-[#2d2a26] text-[#4a4540] dark:text-[#c4bdb1] hover:text-[#1a1816] dark:hover:text-[#f5f2ed]',
      ]"
      @click="emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
      <span
        v-if="tab.count !== undefined"
        class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
        :class="modelValue === tab.id ? 'bg-white/20 text-white dark:bg-black/10 dark:text-gray-900' : 'bg-black/10 dark:bg-white/10'"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>
