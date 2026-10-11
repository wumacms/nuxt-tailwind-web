<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/layout/AppBreadcrumb.vue'

interface Props {
  title: string
  subtitle?: string
  badge?: string
  bgImage?: string
  breadcrumbs?: BreadcrumbItem[]
}

const props = withDefaults(defineProps<Props>(), {
  bgImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=700&fit=crop',
})
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-24 bg-gray-950 text-white">
    <!-- 背景大图与暗色渐变遮罩 -->
    <div class="absolute inset-0 pointer-events-none select-none">
      <img
        :src="bgImage"
        :alt="title"
        class="w-full h-full object-cover object-center opacity-65 scale-105 transition-transform duration-1000"
      />
      <!-- 渐变遮罩：保留暗调摄影艺术感，同时保障文字高对比度可读性 -->
      <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-black/40"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/40 to-transparent"></div>
      <!-- 柔和环境光晕：同首页 Hero 一致的艺术氛围呼吸光 -->
      <div class="absolute -top-1/4 -right-10 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse-glow [background:radial-gradient(circle,var(--color-accent)_0%,transparent_70%)] opacity-25"></div>
    </div>

    <AppContainer class="relative z-10">
      <!-- 面包屑 -->
      <div v-if="breadcrumbs && breadcrumbs.length" class="mb-4 animate-on-scroll">
        <AppBreadcrumb :items="breadcrumbs" variant="light" />
      </div>

      <div class="max-w-3xl">
        <span
          v-if="badge"
          class="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 uppercase tracking-wider mb-4 animate-on-scroll delay-50"
        >
          {{ badge }}
        </span>

        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight animate-on-scroll delay-100">
          {{ title }}
        </h1>

        <p
          v-if="subtitle"
          class="text-base sm:text-lg md:text-xl text-gray-300 mt-4 leading-relaxed font-light animate-on-scroll delay-150"
        >
          {{ subtitle }}
        </p>
      </div>
    </AppContainer>
  </section>
</template>
