<script setup lang="ts">
const { timeline } = useSiteData()
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-canvas">
    <div class="max-w-5xl mx-auto px-4 md:px-8">
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          发展历程
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          用镜头记录时间
        </h2>
        <p class="mt-4 text-base text-muted animate-on-scroll delay-100">
          从独立暗房到跨界视觉先锋，Aperture 始终坚守光影美学底色。
        </p>
      </div>

      <div class="relative">
        <!-- 轴线 -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-line"></div>

        <div class="space-y-10 md:space-y-12">
          <div
            v-for="(item, idx) in timeline"
            :key="item.year"
            class="relative md:grid md:grid-cols-2 md:gap-12 items-center"
          >
            <!-- 左右交错布局 -->
            <div
              :class="[
                idx % 2 === 0
                  ? 'pl-10 md:pl-0 md:text-right md:pr-12'
                  : 'hidden md:block',
              ]"
            >
              <div v-if="idx % 2 === 0" class="animate-on-scroll delay-100">
                <div class="text-lg font-bold text-accent font-display">
                  {{ item.year }}
                </div>
                <h3 class="mt-1 font-bold text-lg md:text-xl text-main">
                  {{ item.title }}
                </h3>
                <p class="mt-2 text-sm text-muted leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div
              :class="[
                idx % 2 !== 0
                  ? 'pl-10 md:pl-12'
                  : 'hidden md:block',
              ]"
            >
              <div v-if="idx % 2 !== 0" class="animate-on-scroll delay-200">
                <div class="text-lg font-bold text-accent font-display">
                  {{ item.year }}
                </div>
                <h3 class="mt-1 font-bold text-lg md:text-xl text-main">
                  {{ item.title }}
                </h3>
                <p class="mt-2 text-sm text-muted leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <!-- 时间轴圆点 -->
            <span
              class="absolute left-4 md:left-1/2 top-2 w-3.5 h-3.5 rounded-full bg-accent border-4 border-canvas shadow-sm -translate-x-1/2"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
