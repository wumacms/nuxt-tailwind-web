<script setup lang="ts">
const { stats } = useSiteData()
</script>

<template>
  <section class="py-16 md:py-20 lg:py-24 bg-section-accent text-section-on-accent relative overflow-hidden transition-colors duration-300">
    <!-- 背景柔和光晕装饰 -->
    <div
      class="absolute top-[-50%] left-[20%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full blur-3xl bg-section-on-accent/15 pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[-50%] right-[10%] w-[400px] h-[400px] rounded-full blur-3xl bg-black/15 pointer-events-none"
    ></div>

    <AppContainer class="relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
        <div
          v-for="(stat, idx) in stats"
          :key="stat.label"
          class="animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-section-on-accent font-display"
          >
            {{ stat.value }}
          </div>
          <div class="mt-2 md:mt-3 text-xs md:text-sm text-section-on-accent/85 font-medium tracking-wide">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
