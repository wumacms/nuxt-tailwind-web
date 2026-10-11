<script setup lang="ts">
const { testimonials } = useSiteData()
</script>

<template>
  <section class="py-20 md:py-28 lg:py-32 bg-surface">
    <AppContainer>
      <div class="max-w-2xl mx-auto text-center mb-12 md:mb-16">
        <span class="inline-block text-sm font-semibold text-accent uppercase tracking-wider animate-on-scroll">
          客户评价
        </span>
        <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight font-display animate-on-scroll delay-50">
          真实的声音
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <figure
          v-for="(item, idx) in testimonials"
          :key="item.id"
          class="flex flex-col h-full p-6 md:p-8 rounded-2xl border border-line bg-card shadow-sm animate-on-scroll"
          :class="`delay-${(idx + 1) * 100}`"
        >
          <!-- 5 Stars -->
          <div aria-label="评分 5 星" class="flex gap-1 text-accent mb-4">
            <svg
              v-for="star in item.rating"
              :key="star"
              class="w-4 h-4 fill-accent text-accent"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <blockquote class="flex-1 text-muted leading-relaxed text-base italic">
            “{{ item.quote }}”
          </blockquote>

          <figcaption class="mt-6 flex items-center gap-3 pt-4 border-t border-line/60">
            <img
              :src="item.avatar"
              :alt="item.author"
              class="w-11 h-11 rounded-full object-cover ring-2 ring-accent/20"
              width="80"
              height="80"
              loading="lazy"
            />
            <div>
              <div class="font-semibold text-sm text-main">
                {{ item.author }}
              </div>
              <div class="text-xs text-caption">
                {{ item.company }} · {{ item.role }}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </AppContainer>
  </section>
</template>
