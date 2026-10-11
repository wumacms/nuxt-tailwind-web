<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: number | string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  class: '',
})

// 自动别名映射表与默认 lucide 图标库前缀
const iconAliases: Record<string, string> = {
  weibo: 'simple-icons:sinaweibo',
  sinaweibo: 'simple-icons:sinaweibo',
  xiaohongshu: 'simple-icons:xiaohongshu',
  instagram: 'simple-icons:instagram',
}

const resolvedIconName = computed(() => {
  if (!props.name) return 'lucide:alert-circle'
  const trimmed = props.name.trim()
  if (iconAliases[trimmed]) {
    return iconAliases[trimmed]
  }
  // 若未包含 collection 前缀（即没有冒号），默认使用 lucide:
  if (!trimmed.includes(':')) {
    return `lucide:${trimmed}`
  }
  return trimmed
})

const normalizedSize = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})
</script>

<template>
  <Icon
    :name="resolvedIconName"
    :size="normalizedSize"
    :class="props.class"
  />
</template>
