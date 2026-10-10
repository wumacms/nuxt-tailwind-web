<script setup lang="ts">
const { stats } = useSiteData()
</script>

<template>
  <section class="py-16 md:py-20 lg:py-24 bg-gray-900 dark:bg-black text-white relative overflow-hidden">
    <div
      class="absolute top-[-50%] left-[20%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full blur-3xl [background:radial-gradient(circle,rgba(245,158,11,.22)_0%,rgba(245,158,11,0)_70%)] dark:[background:radial-gradient(circle,rgba(245,158,11,.15)_0%,rgba(245,158,11,0)_70%)]"
    ></div>

    <AppContainer class="relative">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
        <div
          v-for="(stat, idx) in stats"
          :key="stat.label"
          class="animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent font-display"
          >
            {{ stat.value }}
          </div>
          <div class="mt-2 md:mt-3 text-xs md:text-sm text-gray-400 font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
