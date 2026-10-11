<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-canvas text-main text-center">
    <!-- 光圈图形 -->
    <div class="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white mb-6 shadow-xl animate-float-slow">
      <Icon name="lucide:aperture" class="w-10 h-10 text-white" />
    </div>

    <div class="text-7xl sm:text-9xl font-extrabold font-display text-accent">
      {{ error.statusCode || 404 }}
    </div>

    <h1 class="text-2xl sm:text-3xl font-bold mt-4 mb-2 font-display">
      画面焦距失准：该页面未找到
    </h1>

    <p class="text-sm sm:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed">
      抱歉，您访问的光影页面可能已重构或暂未发布。请检查网址或返回官网首页继续探索。
    </p>

    <div class="flex gap-4">
      <AppButton size="lg" @click="handleError">
        返回 Aperture 首页 &rarr;
      </AppButton>
      <AppButton variant="outline" size="lg" to="/courses">
        探索摄影学院
      </AppButton>
    </div>
  </div>
</template>
