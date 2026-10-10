<script setup lang="ts">
const { services } = useSiteData()

const featureList = [
  ...services,
  {
    id: 'creative',
    title: '创意策划',
    description: '从概念到执行，为品牌量身定制完整的视觉方案与情绪板。',
    icon: 'aperture',
  },
  {
    id: 'consultant',
    title: '专属顾问',
    description: '一对一沟通，从拍摄档期确认到最终文件交付全程贴心跟进。',
    icon: 'headphones',
  },
]
</script>

<template>
  <section id="features" class="py-20 md:py-28 lg:py-32 bg-[#faf9f7] dark:bg-[#12100e]">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
        <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
          核心服务
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
          我们为你捕捉每一个重要瞬间
        </h2>
        <p class="mt-4 text-base md:text-lg text-[#4a4540] dark:text-[#c4bdb1]">
          从商业广告到私人肖像，Aperture 提供一站式、高规格的视觉叙事解决方案。
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        <div
          v-for="(item, idx) in featureList"
          :key="item.id"
          class="p-6 md:p-7 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
          :class="`delay-${(idx % 5 + 1) * 100}`"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#fef3c7] text-[#b45309] dark:bg-[#78350f33] dark:text-[#f59e0b] shadow-xs"
          >
            <!-- Camera / Aperture generic icon -->
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m14.3 8 5.7 9.9" />
              <path d="M9.7 8h11.5" />
              <path d="M7.4 12 13.1 2.1" />
              <path d="M9.7 16 4 6.1" />
              <path d="M14.3 16H2.8" />
              <path d="m16.6 12-5.7 9.9" />
            </svg>
          </div>
          <h3 class="font-semibold text-lg md:text-xl mb-2.5 text-[#1a1816] dark:text-[#f5f2ed]">
            {{ item.title }}
          </h3>
          <p class="text-[#4a4540] dark:text-[#c4bdb1] text-sm leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
