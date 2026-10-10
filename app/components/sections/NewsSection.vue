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
  <section class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12 animate-on-scroll">
        <div class="max-w-xl">
          <span class="text-sm font-semibold text-accent uppercase tracking-wider">
            新闻动态
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display">
            了解 Aperture 的最新动态
          </h2>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/news"
          class="text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          查看全部新闻 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(item, idx) in displayedArticles"
          :key="item.id"
          class="group rounded-2xl border border-line bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col animate-on-scroll"
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
              <div class="flex flex-wrap items-center gap-3 text-xs text-caption mb-3">
                <span class="inline-flex items-center gap-1 font-medium text-accent">
                  {{ item.categoryLabel }}
                </span>
                <span>•</span>
                <span>{{ item.date }}</span>
              </div>
              <h3 class="font-bold text-lg leading-snug text-main group-hover:text-accent transition">
                <NuxtLink :to="`/news/${item.id}`">
                  {{ item.title }}
                </NuxtLink>
              </h3>
              <p class="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
                {{ item.summary }}
              </p>
            </div>

            <div class="mt-5 pt-4 border-t border-line">
              <NuxtLink
                :to="`/news/${item.id}`"
                class="text-accent text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
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
