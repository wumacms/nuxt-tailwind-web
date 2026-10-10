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
    // 异步页面数据渲染补充触发，防止骨架屏过渡后元素停留在透明状态
    setTimeout(() => {
      initObserver()
    }, 150)
  }
)
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-canvas text-main antialiased selection:bg-accent selection:text-on-accent">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <SideToolbar />
    <BackToTop />
  </div>
</template>
