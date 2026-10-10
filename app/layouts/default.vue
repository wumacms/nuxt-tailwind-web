<script setup lang="ts">
import { watch, nextTick } from 'vue'

const { initObserver } = useScrollAnimation()
const route = useRoute()

watch(
  () => route.path,
  () => {
    nextTick(() => {
      initObserver()
    })
  }
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#faf9f7] text-[#1a1816] dark:bg-[#12100e] dark:text-[#f5f2ed] antialiased selection:bg-amber-500 selection:text-white">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>
