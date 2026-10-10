<script setup lang="ts">
import { computed } from 'vue'
import { staticFeatures } from '~/constants/features'

const { services } = useSiteData()

const featureList = computed(() => [
  ...(services.value || []),
  ...staticFeatures,
])
</script>

<template>
  <section id="features" class="py-20 md:py-28 lg:py-32 bg-canvas">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">
          核心服务
        </span>
        <h2
          class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display">
          我们为你捕捉每一个重要瞬间
        </h2>
        <p class="mt-4 text-base md:text-lg text-muted">
          从商业广告到私人肖像，Aperture 提供一站式、高规格的视觉叙事解决方案。
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        <AppCard v-for="(item, idx) in featureList" :key="item.id"
          class="animate-on-scroll"
          :class="`delay-${(idx % 5 + 1) * 100}`"
          padding="lg">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-accent-soft text-accent-soft-text shadow-xs">
            <AppIcon :name="item.icon || 'aperture'" size="24" />
          </div>
          <h3 class="font-semibold text-lg md:text-xl mb-2.5 text-main">
            {{ item.title }}
          </h3>
          <p class="text-muted text-sm leading-relaxed">
            {{ item.description }}
          </p>
        </AppCard>
      </div>
    </AppContainer>
  </section>
</template>
