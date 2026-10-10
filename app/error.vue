<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-[#faf9f7] dark:bg-[#12100e] text-[#1a1816] dark:text-[#f5f2ed] text-center">
    <!-- 光圈图形 -->
    <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white mb-6 shadow-xl animate-float-slow">
      <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
    </div>

    <div class="text-7xl sm:text-9xl font-extrabold font-display bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
      {{ error.statusCode || 404 }}
    </div>

    <h1 class="text-2xl sm:text-3xl font-bold mt-4 mb-2 font-display">
      画面焦距失准：该页面未找到
    </h1>

    <p class="text-sm sm:text-base text-[#4a4540] dark:text-[#c4bdb1] max-w-md mx-auto mb-8 leading-relaxed">
      抱歉，您访问的光影页面可能已重构或暂未发布。请检查网址或返回官网首页继续探索。
    </p>

    <div class="flex gap-4">
      <AppButton size="lg" @click="handleError">
        返回 Aperture 首页 &rarr;
      </AppButton>
      <AppButton variant="outline" size="lg" to="/services">
        浏览拍摄服务
      </AppButton>
    </div>
  </div>
</template>
