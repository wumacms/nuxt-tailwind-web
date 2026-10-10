<script setup lang="ts">
export interface TabItem {
  id: string
  label: string
  count?: number
  to?: string
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
    <template v-for="tab in tabs" :key="tab.id">
      <NuxtLink
        v-if="tab.to"
        :to="tab.to"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer inline-flex items-center"
        :class="[
          modelValue === tab.id
            ? 'bg-main text-canvas shadow-sm'
            : 'bg-subtle/60 hover:bg-subtle text-muted hover:text-main',
        ]"
      >
        {{ tab.label }}
        <span
          v-if="tab.count !== undefined"
          class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
          :class="modelValue === tab.id ? 'bg-canvas/20 text-canvas' : 'bg-line/60 text-muted'"
        >
          {{ tab.count }}
        </span>
      </NuxtLink>
      <button
        v-else
        type="button"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer inline-flex items-center"
        :class="[
          modelValue === tab.id
            ? 'bg-main text-canvas shadow-sm'
            : 'bg-subtle/60 hover:bg-subtle text-muted hover:text-main',
        ]"
        @click="emit('update:modelValue', tab.id)"
      >
        {{ tab.label }}
        <span
          v-if="tab.count !== undefined"
          class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
          :class="modelValue === tab.id ? 'bg-canvas/20 text-canvas' : 'bg-line/60 text-muted'"
        >
          {{ tab.count }}
        </span>
      </button>
    </template>
  </div>
</template>
