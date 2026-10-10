<script setup lang="ts">
const { testimonials } = useSiteData()
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-[#f3f0eb] dark:bg-[#1a1816]">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16 animate-on-scroll">
        <span class="text-sm font-semibold text-[#b45309] dark:text-[#f59e0b] uppercase tracking-wider">
          客户评价
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1816] dark:text-[#f5f2ed] tracking-tight font-display">
          真实的声音
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <figure
          v-for="(item, idx) in testimonials"
          :key="item.id"
          class="flex flex-col h-full p-6 md:p-8 rounded-2xl border border-[#ddd8cf] dark:border-[#2d2a26] bg-white dark:bg-[#211f1c] shadow-sm animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <!-- 5 Stars -->
          <div aria-label="评分 5 星" class="flex gap-1 text-amber-500 mb-4">
            <svg
              v-for="star in item.rating"
              :key="star"
              class="w-4 h-4 fill-amber-500 text-amber-500"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <blockquote class="flex-1 text-[#4a4540] dark:text-[#c4bdb1] leading-relaxed text-base italic">
            “{{ item.quote }}”
          </blockquote>

          <figcaption class="mt-6 flex items-center gap-3 pt-4 border-t border-[#ddd8cf]/60 dark:border-[#2d2a26]">
            <img
              :src="item.avatar"
              :alt="item.author"
              class="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/20"
              width="80"
              height="80"
              loading="lazy"
            />
            <div>
              <div class="font-semibold text-sm text-[#1a1816] dark:text-[#f5f2ed]">
                {{ item.author }}
              </div>
              <div class="text-xs text-[#6b655d] dark:text-[#8a8378]">
                {{ item.company }} · {{ item.role }}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </AppContainer>
  </section>
</template>
