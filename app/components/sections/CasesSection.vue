<script setup lang="ts">
interface Props {
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  showViewAll: true,
})

const { cases } = useSiteData()
const displayedCases = computed(() => cases.slice(0, props.limit))
</script>

<template>
  <section id="cases" class="py-20 md:py-28 lg:py-32 bg-[#faf9f7] dark:bg-[#12100e]">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 animate-on-scroll">
        <div class="max-w-xl">
          <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
            客户故事
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
            他们选择了 Aperture
          </h2>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/cases"
          class="text-[#b45309] dark:text-[#f59e0b] font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          查看全部案例 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLink
          v-for="(item, idx) in displayedCases"
          :key="item.id"
          :to="`/cases/${item.id}`"
          class="group block rounded-2xl overflow-hidden border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <div class="aspect-[4/3] overflow-hidden relative">
            <img
              :src="item.coverImage"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="800"
              height="600"
            />
            <span
              class="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xs text-gray-900 dark:text-white"
            >
              {{ item.categoryLabel }}
            </span>
          </div>

          <div class="p-6">
            <h3 class="font-bold text-lg md:text-xl text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition leading-snug">
              {{ item.title }}
            </h3>
            <p class="mt-2.5 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed line-clamp-2">
              {{ item.summary }}
            </p>
            <div class="mt-4 pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26] flex items-center justify-between text-xs text-[#6b655d] dark:text-[#8a8378]">
              <span>{{ item.client }}</span>
              <span class="text-amber-600 dark:text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                查看案例 &rarr;
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </AppContainer>
  </section>
</template>
