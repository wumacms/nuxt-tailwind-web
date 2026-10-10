<script setup lang="ts">
interface Props {
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  showViewAll: true,
})

const { articles } = useSiteData()
const displayedArticles = computed(() => articles.slice(0, props.limit))
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 animate-on-scroll">
        <div class="max-w-xl">
          <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
            新闻动态
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
            了解 Aperture 的最新动态
          </h2>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/news"
          class="text-[#b45309] dark:text-[#f59e0b] font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          查看全部新闻 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(item, idx) in displayedArticles"
          :key="item.id"
          class="group rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <NuxtLink :to="`/news/${item.id}`" class="block aspect-[16/10] overflow-hidden">
            <img
              :src="item.coverImage"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              loading="lazy"
              width="800"
              height="500"
            />
          </NuxtLink>

          <div class="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-3 text-xs text-[#6b655d] dark:text-[#8a8378] mb-3">
                <span class="inline-flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
                  {{ item.categoryLabel }}
                </span>
                <span>•</span>
                <span>{{ item.date }}</span>
              </div>
              <h3 class="font-bold text-lg leading-snug text-[#1a1816] dark:text-[#f5f2ed] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                <NuxtLink :to="`/news/${item.id}`">
                  {{ item.title }}
                </NuxtLink>
              </h3>
              <p class="mt-3 text-sm text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed line-clamp-2">
                {{ item.summary }}
              </p>
            </div>

            <div class="mt-5 pt-4 border-t border-[#ddd8cf] dark:border-[#2d2a26]">
              <NuxtLink
                :to="`/news/${item.id}`"
                class="text-[#b45309] dark:text-[#f59e0b] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                阅读全文 <span>&rarr;</span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </AppContainer>
  </section>
</template>
