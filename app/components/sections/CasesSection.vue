<script setup lang="ts">
import type { CaseItem } from '~/types'

interface Props {
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  showViewAll: true,
})

const siteData = useSiteData()
const casesList = computed<CaseItem[]>(() => ((siteData as Record<string, any>).cases || []))
const displayedCases = computed<CaseItem[]>(() => casesList.value.slice(0, props.limit))
</script>

<template>
  <section id="cases" class="py-20 md:py-28 lg:py-32 bg-canvas">
    <AppContainer>
      <div class="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
        <div class="max-w-xl">
          <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
            客户故事
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
            他们选择了 Aperture
          </h2>
        </div>
        <NuxtLink
          v-if="showViewAll"
          to="/cases"
          class="text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all animate-on-scroll delay-100"
        >
          查看全部案例 &rarr;
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLink
          v-for="(item, idx) in displayedCases"
          :key="item.id"
          :to="`/cases/${item.id}`"
          class="group block rounded-2xl overflow-hidden border border-line bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
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
              class="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-xs text-main shadow-xs"
            >
              {{ item.categoryLabel }}
            </span>
          </div>

          <div class="p-6">
            <h3 class="font-bold text-lg md:text-xl text-main group-hover:text-accent transition leading-snug">
              {{ item.title }}
            </h3>
            <p class="mt-2.5 text-sm text-muted leading-relaxed line-clamp-2">
              {{ item.summary }}
            </p>
            <div class="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs text-caption">
              <span>{{ item.client }}</span>
              <span class="text-accent font-medium group-hover:translate-x-0.5 transition-transform">
                查看案例 &rarr;
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </AppContainer>
  </section>
</template>
