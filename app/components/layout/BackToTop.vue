<script setup lang="ts">
import { computed } from 'vue'

const { scrollY } = useScroll()
const isVisible = computed(() => scrollY.value > 300)

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="isVisible"
      type="button"
      aria-label="返回顶部"
      class="fixed bottom-6 right-6 md:hidden z-40 w-11 h-11 rounded-full bg-main text-canvas shadow-2xl hover:opacity-90 transition flex items-center justify-center cursor-pointer border border-line"
      @click="scrollToTop"
    >
      <Icon name="lucide:arrow-up" class="w-5 h-5 stroke-[2.5]" />
    </button>
  </Transition>
</template>
